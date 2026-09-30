# Postmark SDK

from postmark_sdk.utility.voxgig_struct import voxgig_struct as vs
from postmark_sdk.core.utility_type import PostmarkUtility
from postmark_sdk.core.spec import PostmarkSpec
from postmark_sdk.core import helpers

# Load utility registration (populates Utility._registrar)
from postmark_sdk.utility import register

# Load features
from postmark_sdk.feature.base_feature import PostmarkBaseFeature
from postmark_sdk.features import _has_feature, _make_feature


class PostmarkSDK:

    def __init__(self, options=None):
        self.mode = "live"
        self.features = []
        self.options = None

        utility = PostmarkUtility()
        self._utility = utility

        from postmark_sdk.config import shared_config
        config = shared_config()

        self._rootctx = utility.make_context({
            "client": self,
            "utility": utility,
            "config": config,
            "options": options if options is not None else {},
            "shared": {},
        }, None)

        self.options = utility.make_options(self._rootctx)

        if vs.getpath(self.options, "feature.test.active") is True:
            self.mode = "test"

        self._rootctx.options = self.options

        # Add features in the resolved order (make_options puts an explicit
        # list order first, else defaults to test-first). Ordering matters: the
        # `test` feature installs the base mock transport and the transport
        # features (retry/cache/netsim/proxy/ratelimit) wrap whatever is
        # current, so `test` must be added before them to sit at the base.
        # Extension feature INSTANCES come from the RAW construction
        # options - extend is consumed exactly once, here. make_options
        # strips the key before cloning (vs.clone flattens arbitrary
        # objects), so self.options never carries the instances.
        feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
        extend = options.get("extend") if isinstance(options, dict) else None
        if not isinstance(extend, list):
            extend = []
        if feature_opts is not None:
            featureorder = vs.getpath(self.options, "__derived__.featureorder")
            if isinstance(featureorder, list):
                for fname in featureorder:
                    fopts = helpers.to_map(feature_opts.get(fname))
                    if fopts is not None and fopts.get("active") is True:
                        # An active name with no generated feature class is
                        # legal when an extend-supplied instance carries that
                        # name (station's adopt path): the instance is added
                        # below, positioned by its own __after__ entry, so
                        # skip it here rather than add a BaseFeature stray
                        # that would silently shift feature positions.
                        if not _has_feature(fname) and any(
                            fname == (f.get("name") if isinstance(f, dict)
                                      else getattr(f, "name", None))
                            for f in extend
                        ):
                            continue
                        utility.feature_add(self._rootctx, _make_feature(fname))

        # Add extension features.
        for f in extend:
            if isinstance(f, dict) or (hasattr(f, "get_name") and callable(f.get_name)):
                utility.feature_add(self._rootctx, f)

        # Initialize features.
        for f in self.features:
            utility.feature_init(self._rootctx, f)

        utility.feature_hook(self._rootctx, "PostConstruct")

        # #BuildFeatures

    def options_map(self):
        out = vs.clone(self.options)
        if isinstance(out, dict):
            return out
        return {}

    def get_utility(self):
        return PostmarkUtility.copy(self._utility)

    def get_root_ctx(self):
        return self._rootctx

    def prepare(self, fetchargs=None):
        utility = self._utility

        if fetchargs is None:
            fetchargs = {}

        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "prepare",
            "ctrl": ctrl,
        }, self._rootctx)

        options = self.options

        path = vs.getprop(fetchargs, "path") or ""
        if not isinstance(path, str):
            path = ""

        method = vs.getprop(fetchargs, "method") or "GET"
        if not isinstance(method, str):
            method = "GET"

        params = helpers.to_map(vs.getprop(fetchargs, "params"))
        if params is None:
            params = {}
        query = helpers.to_map(vs.getprop(fetchargs, "query"))
        if query is None:
            query = {}

        headers = utility.prepare_headers(ctx)

        base = vs.getprop(options, "base") or ""
        if not isinstance(base, str):
            base = ""
        prefix = vs.getprop(options, "prefix") or ""
        if not isinstance(prefix, str):
            prefix = ""
        suffix = vs.getprop(options, "suffix") or ""
        if not isinstance(suffix, str):
            suffix = ""

        ctx.spec = PostmarkSpec({
            "base": base,
            "prefix": prefix,
            "suffix": suffix,
            "path": path,
            "method": method,
            "params": params,
            "query": query,
            "headers": headers,
            "body": vs.getprop(fetchargs, "body"),
            "step": "start",
        })

        # Merge user-provided headers.
        uh = vs.getprop(fetchargs, "headers")
        if isinstance(uh, dict):
            for k, v in uh.items():
                ctx.spec.headers[k] = v

        _, err = utility.prepare_auth(ctx)
        if err is not None:
            raise err

        fetchdef, err = utility.make_fetch_def(ctx)
        if err is not None:
            raise err

        return fetchdef

    # Raw endpoint access is operator-controllable, like every entity op.
    # Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
    # either one reaches the same endpoint.
    def direct(self, fetchargs=None):
        if not self._op_allowed("direct"):
            return self._op_denied("direct")

        return self._raw_request(fetchargs)

    # Is this raw-access op permitted by the SDK's allow.op option?
    def _op_allowed(self, op):
        allow_op = vs.getpath(self.options, "allow.op")
        return isinstance(allow_op, str) and op in allow_op

    def _op_denied(self, op):
        allow_op = vs.getpath(self.options, "allow.op")
        return {
            "ok": False,
            "err": Exception(
                "PostmarkSDK: " + op + ": operation not allowed by"
                ' SDK option allow.op value: "' + str(allow_op) + '"'),
        }

    # Ungated request path shared by direct and graphql, each of which checks
    # its own allow.op token first. Private, rather than a flag on fetchargs:
    # a caller-supplied marker would let anyone opt straight back out of the
    # gate by passing it.
    def _raw_request(self, fetchargs=None):
        utility = self._utility

        try:
            fetchdef = self.prepare(fetchargs)
        except Exception as err:
            # direct() is the raw-HTTP escape hatch: it never raises, it
            # returns a result object callers branch on via result["ok"].
            return {"ok": False, "err": err}

        if fetchargs is None:
            fetchargs = {}
        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "direct",
            "ctrl": ctrl,
        }, self._rootctx)

        url = fetchdef.get("url", "")
        fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

        if fetch_err is not None:
            return {"ok": False, "err": fetch_err}

        if fetched is None:
            return {
                "ok": False,
                "err": ctx.make_error("direct_no_response", "response: undefined"),
            }

        if isinstance(fetched, dict):
            status = helpers.to_int(vs.getprop(fetched, "status"))
            headers = vs.getprop(fetched, "headers") or {}

            # No-body responses (204, 304) and explicit zero content-length
            # must skip JSON parsing — calling json() on an empty body raises.
            content_length = None
            if isinstance(headers, dict):
                content_length = headers.get("content-length")
            no_body = status in (204, 304) or str(content_length) == "0"

            json_data = None
            if not no_body:
                jf = vs.getprop(fetched, "json")
                if callable(jf):
                    try:
                        json_data = jf()
                    except Exception:
                        # Non-JSON body (e.g. text/plain, text/html). Surface
                        # status + headers but leave data as None.
                        json_data = None

            return {
                "ok": status >= 200 and status < 300,
                "status": status,
                "headers": headers,
                "data": json_data,
            }

        return {
            "ok": False,
            "err": ctx.make_error("direct_invalid", "invalid response type"),
        }

    # Raw GraphQL access: the pressure valve that makes the generated
    # surface's deliberate omissions (per-call selection sets, typed filter
    # builders, batching, subscriptions) livable — the whole schema stays
    # reachable.
    #
    # Thin wrapper over the same prepare/fetch path direct uses, with the one
    # thing raw direct cannot do for GraphQL: a GraphQL failure rides HTTP 200
    # as a top-level `errors` array, so status alone would report a failed
    # query as ok.
    #
    # NOTE: like direct, this bypasses the feature pipeline — no retry,
    # ratelimit or paging features apply.
    def graphql(self, query, variables=None, ctrl=None):
        if not self._op_allowed("graphql"):
            return self._op_denied("graphql")

        res = self._raw_request({
            "method": "POST",
            "headers": {"content-type": "application/json"},
            "body": {"query": query, "variables": variables or {}},
            "ctrl": ctrl or {},
        })

        # Errors are read BEFORE any status check: a GraphQL parse or
        # validation failure comes back as HTTP 400 carrying the standard
        # { errors: [...] } body, and the raw path represents a non-2xx as
        # ok:False with no err — so returning early on status would discard
        # the server's own diagnostics, which are the only useful part of
        # that response.
        errors = vs.getpath(res, "data.errors")

        if isinstance(errors, list) and 0 < len(errors):
            first = errors[0] if isinstance(errors[0], dict) else {}
            msg = first.get("message") or "graphql error"
            res["ok"] = False
            res["err"] = Exception("PostmarkSDK: graphql: " + str(msg))
            res["graphql"] = errors

        return res


    def Bounce(self, data=None) -> "BounceEntity":
        """Entity factory: client.Bounce().list() / client.Bounce().load({"id": ...})."""
        from postmark_sdk.entity.bounce_entity import BounceEntity
        return BounceEntity(self, data)


    def BounceDump(self, data=None) -> "BounceDumpEntity":
        """Entity factory: client.BounceDump().list() / client.BounceDump().load({"id": ...})."""
        from postmark_sdk.entity.bounce_dump_entity import BounceDumpEntity
        return BounceDumpEntity(self, data)


    def Bypass(self, data=None) -> "BypassEntity":
        """Entity factory: client.Bypass().list() / client.Bypass().load({"id": ...})."""
        from postmark_sdk.entity.bypass_entity import BypassEntity
        return BypassEntity(self, data)


    def DeliveryStat(self, data=None) -> "DeliveryStatEntity":
        """Entity factory: client.DeliveryStat().list() / client.DeliveryStat().load({"id": ...})."""
        from postmark_sdk.entity.delivery_stat_entity import DeliveryStatEntity
        return DeliveryStatEntity(self, data)


    def Dynamic(self, data=None) -> "DynamicEntity":
        """Entity factory: client.Dynamic().list() / client.Dynamic().load({"id": ...})."""
        from postmark_sdk.entity.dynamic_entity import DynamicEntity
        return DynamicEntity(self, data)


    def Inbound(self, data=None) -> "InboundEntity":
        """Entity factory: client.Inbound().list() / client.Inbound().load({"id": ...})."""
        from postmark_sdk.entity.inbound_entity import InboundEntity
        return InboundEntity(self, data)


    def InboundMessageFullDetail(self, data=None) -> "InboundMessageFullDetailEntity":
        """Entity factory: client.InboundMessageFullDetail().list() / client.InboundMessageFullDetail().load({"id": ...})."""
        from postmark_sdk.entity.inbound_message_full_detail_entity import InboundMessageFullDetailEntity
        return InboundMessageFullDetailEntity(self, data)


    def Inboundrule(self, data=None) -> "InboundruleEntity":
        """Entity factory: client.Inboundrule().list() / client.Inboundrule().load({"id": ...})."""
        from postmark_sdk.entity.inboundrule_entity import InboundruleEntity
        return InboundruleEntity(self, data)


    def MessageClickSearch(self, data=None) -> "MessageClickSearchEntity":
        """Entity factory: client.MessageClickSearch().list() / client.MessageClickSearch().load({"id": ...})."""
        from postmark_sdk.entity.message_click_search_entity import MessageClickSearchEntity
        return MessageClickSearchEntity(self, data)


    def MessageOpenSearch(self, data=None) -> "MessageOpenSearchEntity":
        """Entity factory: client.MessageOpenSearch().list() / client.MessageOpenSearch().load({"id": ...})."""
        from postmark_sdk.entity.message_open_search_entity import MessageOpenSearchEntity
        return MessageOpenSearchEntity(self, data)


    def Outbound(self, data=None) -> "OutboundEntity":
        """Entity factory: client.Outbound().list() / client.Outbound().load({"id": ...})."""
        from postmark_sdk.entity.outbound_entity import OutboundEntity
        return OutboundEntity(self, data)


    def OutboundMessageDetail(self, data=None) -> "OutboundMessageDetailEntity":
        """Entity factory: client.OutboundMessageDetail().list() / client.OutboundMessageDetail().load({"id": ...})."""
        from postmark_sdk.entity.outbound_message_detail_entity import OutboundMessageDetailEntity
        return OutboundMessageDetailEntity(self, data)


    def OutboundMessageDump(self, data=None) -> "OutboundMessageDumpEntity":
        """Entity factory: client.OutboundMessageDump().list() / client.OutboundMessageDump().load({"id": ...})."""
        from postmark_sdk.entity.outbound_message_dump_entity import OutboundMessageDumpEntity
        return OutboundMessageDumpEntity(self, data)


    def Retry(self, data=None) -> "RetryEntity":
        """Entity factory: client.Retry().list() / client.Retry().load({"id": ...})."""
        from postmark_sdk.entity.retry_entity import RetryEntity
        return RetryEntity(self, data)


    def SendEmail(self, data=None) -> "SendEmailEntity":
        """Entity factory: client.SendEmail().list() / client.SendEmail().load({"id": ...})."""
        from postmark_sdk.entity.send_email_entity import SendEmailEntity
        return SendEmailEntity(self, data)


    def SendEmailBatch(self, data=None) -> "SendEmailBatchEntity":
        """Entity factory: client.SendEmailBatch().list() / client.SendEmailBatch().load({"id": ...})."""
        from postmark_sdk.entity.send_email_batch_entity import SendEmailBatchEntity
        return SendEmailBatchEntity(self, data)


    def SentCount(self, data=None) -> "SentCountEntity":
        """Entity factory: client.SentCount().list() / client.SentCount().load({"id": ...})."""
        from postmark_sdk.entity.sent_count_entity import SentCountEntity
        return SentCountEntity(self, data)


    def Server(self, data=None) -> "ServerEntity":
        """Entity factory: client.Server().list() / client.Server().load({"id": ...})."""
        from postmark_sdk.entity.server_entity import ServerEntity
        return ServerEntity(self, data)


    def StatsApi(self, data=None) -> "StatsApiEntity":
        """Entity factory: client.StatsApi().list() / client.StatsApi().load({"id": ...})."""
        from postmark_sdk.entity.stats_api_entity import StatsApiEntity
        return StatsApiEntity(self, data)


    def Template(self, data=None) -> "TemplateEntity":
        """Entity factory: client.Template().list() / client.Template().load({"id": ...})."""
        from postmark_sdk.entity.template_entity import TemplateEntity
        return TemplateEntity(self, data)


    def TemplateValidation(self, data=None) -> "TemplateValidationEntity":
        """Entity factory: client.TemplateValidation().list() / client.TemplateValidation().load({"id": ...})."""
        from postmark_sdk.entity.template_validation_entity import TemplateValidationEntity
        return TemplateValidationEntity(self, data)



    @classmethod
    def test(cls, testopts=None, sdkopts=None) -> "PostmarkSDK":
        if sdkopts is None:
            sdkopts = {}
        sdkopts = vs.clone(sdkopts)
        if not isinstance(sdkopts, dict):
            sdkopts = {}

        if testopts is None:
            testopts = {}
        testopts = vs.clone(testopts)
        if not isinstance(testopts, dict):
            testopts = {}
        testopts["active"] = True

        vs.setpath(sdkopts, "feature.test", testopts)

        sdk = cls(sdkopts)
        sdk.mode = "test"

        return sdk


from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from postmark_sdk.entity.bounce_entity import BounceEntity
    from postmark_sdk.entity.bounce_dump_entity import BounceDumpEntity
    from postmark_sdk.entity.bypass_entity import BypassEntity
    from postmark_sdk.entity.delivery_stat_entity import DeliveryStatEntity
    from postmark_sdk.entity.dynamic_entity import DynamicEntity
    from postmark_sdk.entity.inbound_entity import InboundEntity
    from postmark_sdk.entity.inbound_message_full_detail_entity import InboundMessageFullDetailEntity
    from postmark_sdk.entity.inboundrule_entity import InboundruleEntity
    from postmark_sdk.entity.message_click_search_entity import MessageClickSearchEntity
    from postmark_sdk.entity.message_open_search_entity import MessageOpenSearchEntity
    from postmark_sdk.entity.outbound_entity import OutboundEntity
    from postmark_sdk.entity.outbound_message_detail_entity import OutboundMessageDetailEntity
    from postmark_sdk.entity.outbound_message_dump_entity import OutboundMessageDumpEntity
    from postmark_sdk.entity.retry_entity import RetryEntity
    from postmark_sdk.entity.send_email_entity import SendEmailEntity
    from postmark_sdk.entity.send_email_batch_entity import SendEmailBatchEntity
    from postmark_sdk.entity.sent_count_entity import SentCountEntity
    from postmark_sdk.entity.server_entity import ServerEntity
    from postmark_sdk.entity.stats_api_entity import StatsApiEntity
    from postmark_sdk.entity.template_entity import TemplateEntity
    from postmark_sdk.entity.template_validation_entity import TemplateValidationEntity
