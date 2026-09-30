# Bypass entity test

import json
import os
import time

import pytest

from postmark_sdk.utility.voxgig_struct import voxgig_struct as vs
from postmark_sdk import PostmarkSDK
from postmark_sdk.core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestBypassEntity:

    def test_should_create_instance(self):
        testsdk = PostmarkSDK.test(None, None)
        ent = testsdk.Bypass(None)
        assert ent is not None

    def test_should_run_basic_flow(self):
        setup = _bypass_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["update"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "bypass." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set POSTMARK_TEST_BYPASS_ENTID JSON to run live")
        client = setup["client"]

        # Bootstrap entity data from existing test data.
        bypass_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.bypass")))
        bypass_ref01_data = None
        if len(bypass_ref01_data_raw) > 0:
            bypass_ref01_data = helpers.to_map(bypass_ref01_data_raw[0][1])

        # UPDATE
        bypass_ref01_ent = client.Bypass(None)
        bypass_ref01_data_up0_up = {
        }

        bypass_ref01_markdef_up0_name = "Message"
        bypass_ref01_markdef_up0_value = "Mark01-bypass_ref01_" + str(setup["now"])
        bypass_ref01_data_up0_up[bypass_ref01_markdef_up0_name] = bypass_ref01_markdef_up0_value

        bypass_ref01_resdata_up0 = helpers.to_map(runner.entity_data(bypass_ref01_ent.update(bypass_ref01_data_up0_up, None)))
        assert bypass_ref01_resdata_up0 is not None
        assert bypass_ref01_resdata_up0[bypass_ref01_markdef_up0_name] == bypass_ref01_markdef_up0_value



def _bypass_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/bypass/BypassTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = PostmarkSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["bypass01", "bypass02", "bypass03", "inbound01", "inbound02", "inbound03"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Detect ENTID env override before envOverride consumes it. When live
    # mode is on without a real override, the basic test runs against synthetic
    # IDs from the fixture and 4xx's. We surface this so the test can skip.
    _entid_env_raw = os.environ.get(
        "POSTMARK_TEST_BYPASS_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "POSTMARK_TEST_BYPASS_ENTID": idmap,
        "POSTMARK_TEST_LIVE": "FALSE",
        "POSTMARK_TEST_EXPLAIN": "FALSE",
    })

    idmap_resolved = helpers.to_map(
        env.get("POSTMARK_TEST_BYPASS_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("POSTMARK_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            # FIRST, so the generated fields below win: sdk-test-control.json's
            # test.client.options adds to the live client, it does not
            # redirect it.
            runner.live_client_options(),
            {
            },
            extra or {},
        ])
        client = PostmarkSDK(helpers.to_map(merged_opts))

    _live = env.get("POSTMARK_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("POSTMARK_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
