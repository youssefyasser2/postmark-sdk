// Postmark Ts SDK

import { BounceEntity } from './entity/BounceEntity'
import { BounceDumpEntity } from './entity/BounceDumpEntity'
import { BypassEntity } from './entity/BypassEntity'
import { DeliveryStatEntity } from './entity/DeliveryStatEntity'
import { DynamicEntity } from './entity/DynamicEntity'
import { InboundEntity } from './entity/InboundEntity'
import { InboundMessageFullDetailEntity } from './entity/InboundMessageFullDetailEntity'
import { InboundruleEntity } from './entity/InboundruleEntity'
import { MessageClickSearchEntity } from './entity/MessageClickSearchEntity'
import { MessageOpenSearchEntity } from './entity/MessageOpenSearchEntity'
import { OutboundEntity } from './entity/OutboundEntity'
import { OutboundMessageDetailEntity } from './entity/OutboundMessageDetailEntity'
import { OutboundMessageDumpEntity } from './entity/OutboundMessageDumpEntity'
import { RetryEntity } from './entity/RetryEntity'
import { SendEmailEntity } from './entity/SendEmailEntity'
import { SendEmailBatchEntity } from './entity/SendEmailBatchEntity'
import { SentCountEntity } from './entity/SentCountEntity'
import { ServerEntity } from './entity/ServerEntity'
import { StatsApiEntity } from './entity/StatsApiEntity'
import { TemplateEntity } from './entity/TemplateEntity'
import { TemplateValidationEntity } from './entity/TemplateValidationEntity'

export type * from './PostmarkTypes'


import { inspect } from 'node:util'

import type { Context, Feature } from './types'

import { config } from './Config'
import { PostmarkEntityBase } from './PostmarkEntityBase'
import { Utility } from './utility/Utility'


import { BaseFeature } from './feature/base/BaseFeature'



const stdutil = new Utility()


class PostmarkSDK {
  _mode: string = 'live'
  _options: any
  _utility = new Utility()
  _features: Feature[]
  _rootctx: Context
  

  constructor(options?: any) {

    this._rootctx = this._utility.makeContext({
      client: this,
      utility: this._utility,
      config,
      options,
      shared: new WeakMap()
    })

    this._options = this._utility.makeOptions(this._rootctx)

    const struct = this._utility.struct
    const getpath = struct.getpath

    if (true === getpath(this._options.feature, 'test.active')) {
      this._mode = 'test'
    }

    this._rootctx.options = this._options

    this._features = []

    const featureAdd = this._utility.featureAdd
    const featureInit = this._utility.featureInit

    // Add features in the resolved order (makeOptions puts an explicit
    // array order first, else defaults to test-first). Ordering matters:
    // the `test` feature installs the base mock transport and the transport
    // features (retry/cache/netsim/proxy/ratelimit) wrap whatever is current,
    // so `test` must be added before them to sit at the base of the chain.
    const extend = this._options.extend || []

    const featureorder = getpath(this._options, '__derived__.featureorder') || []
    for (const fname of featureorder) {
      const fopts = this._options.feature[fname] || {}
      if (fopts.active) {
        // An active name with no generated class is legal when an
        // extend-supplied instance carries that name (station's adopt
        // path): the instance is added below, positioned by its own
        // __after__ entry, so skip it here rather than fail construction.
        if (!this._rootctx.config.hasFeature(fname) &&
          extend.some((f: any) => fname === f.name)) {
          continue
        }
        featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname))
      }
    }

    for (let f of extend) {
      featureAdd(this._rootctx, f)
    }

    for (let f of this._features) {
      featureInit(this._rootctx, f)
    }

    const featureHook = this._utility.featureHook
    featureHook(this._rootctx, 'PostConstruct')
  }


  options() {
    return this._utility.struct.clone(this._options)
  }


  utility() {
    return this._utility.struct.clone(this._utility)
  }

  


  async prepare(fetchargs?: any) {
    const utility = this._utility
    const struct = utility.struct
    const clone = struct.clone

    const {
      makeContext,
      makeFetchDef,
      prepareHeaders,
      prepareAuth,
    } = utility

    fetchargs = fetchargs || {}

    let ctx: Context = makeContext({
      opname: 'prepare',
      ctrl: fetchargs.ctrl || {},
    }, this._rootctx)

    const options = this._options

    const spec: any = {
      base: options.base,
      prefix: options.prefix,
      suffix: options.suffix,
      path: fetchargs.path || '',
      method: fetchargs.method || 'GET',
      params: fetchargs.params || {},
      query: fetchargs.query || {},
      headers: prepareHeaders(ctx),
      body: fetchargs.body,
      step: 'start',
    }

    ctx.spec = spec

    if (fetchargs.headers) {
      const uheaders = fetchargs.headers
      for (let key in uheaders) {
        spec.headers[key] = uheaders[key]
      }
    }

    

    const authResult = prepareAuth(ctx)
    if (authResult instanceof Error) {
      return authResult
    }

    return makeFetchDef(ctx)
  }


  // Raw endpoint access is operator-controllable, like every entity op.
  // Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
  // either one reaches the same endpoint.
  async direct(fetchargs?: any) {
    if (!this._options.allow.op.includes('direct')) {
      return {
        ok: false,
        err: new Error('PostmarkSDK: direct: operation not allowed by' +
          ' SDK option allow.op value: "' + this._options.allow.op + '"'),
      }
    }

    return this._rawRequest(fetchargs)
  }


  // Ungated request path shared by direct() and graphql(), each of which
  // checks its own allow.op token first. Private, rather than a flag on
  // fetchargs: a caller-supplied marker would let anyone opt straight back
  // out of the gate by passing it.
  async _rawRequest(fetchargs?: any) {
    const utility = this._utility

    const fetcher = utility.fetcher
    const makeContext = utility.makeContext

    const fetchdef = await this.prepare(fetchargs)
    if (fetchdef instanceof Error) {
      return fetchdef
    }

    let ctx: Context = makeContext({
      opname: 'direct',
      ctrl: (fetchargs || {}).ctrl || {},
    }, this._rootctx)

    try {
      const fetched = await fetcher(ctx, fetchdef.url, fetchdef)

      if (null == fetched) {
        return { ok: false, err: ctx.error('direct_no_response', 'response: undefined') }
      }
      else if (fetched instanceof Error) {
        return { ok: false, err: fetched }
      }

      const status = fetched.status

      // No body responses (204 No Content, 304 Not Modified) and explicit
      // zero content-length must skip JSON parsing — fetched.json() would
      // throw `Unexpected end of JSON input` on an empty body.
      const headers = fetched.headers
      const contentLength = headers && 'function' === typeof headers.get
        ? headers.get('content-length')
        : (headers || {})['content-length']
      const noBody = 204 === status || 304 === status || '0' === String(contentLength)

      let json: any = undefined
      if (!noBody) {
        try {
          json = 'function' === typeof fetched.json ? await fetched.json() : fetched.json
        }
        catch (parseErr) {
          // Body wasn't valid JSON — surface the raw response rather than
          // throwing. data stays undefined; callers can inspect status/headers.
          json = undefined
        }
      }

      return {
        ok: status >= 200 && status < 300,
        status,
        headers: fetched.headers,
        data: json,
      }
    }
    catch (err: any) {
      return { ok: false, err }
    }
  }



  async graphql(query: string, variables?: any, ctrl?: any) {
    const options = this._options

    if (!options.allow.op.includes('graphql')) {
      return {
        ok: false,
        err: new Error('PostmarkSDK: graphql: operation not allowed by' +
          ' SDK option allow.op value: "' + options.allow.op + '"'),
      }
    }

    const res: any = await this._rawRequest({
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: { query, variables: variables || {} },
      ctrl,
    })

    if (res instanceof Error) {
      return res
    }

    // Errors are read BEFORE any status check: a GraphQL parse or validation
    // failure comes back as HTTP 400 carrying the standard { errors: [...] }
    // body, and the raw path represents a non-2xx as { ok: false } with no
    // err — so returning early on status would discard the server's own
    // diagnostics, which are the only useful part of that response.
    const errors = null == res.data ? undefined : res.data.errors

    if (null != errors && Array.isArray(errors) && 0 < errors.length) {
      const first = errors[0] || {}
      const err: any = new Error('PostmarkSDK: graphql: ' +
        (first.message || 'graphql error'))
      err.graphql = errors
      return { ok: false, status: res.status, headers: res.headers, err, data: res.data }
    }

    return res
  }



  // Entity access: `client.Bounce().list()` / `client.Bounce().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Bounce(entopts?: Record<string, any>) {
    const self = this
    return new BounceEntity(self, entopts)
  }


  // Entity access: `client.BounceDump().list()` / `client.BounceDump().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  BounceDump(entopts?: Record<string, any>) {
    const self = this
    return new BounceDumpEntity(self, entopts)
  }


  // Entity access: `client.Bypass().list()` / `client.Bypass().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Bypass(entopts?: Record<string, any>) {
    const self = this
    return new BypassEntity(self, entopts)
  }


  // Entity access: `client.DeliveryStat().list()` / `client.DeliveryStat().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  DeliveryStat(entopts?: Record<string, any>) {
    const self = this
    return new DeliveryStatEntity(self, entopts)
  }


  // Entity access: `client.Dynamic().list()` / `client.Dynamic().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Dynamic(entopts?: Record<string, any>) {
    const self = this
    return new DynamicEntity(self, entopts)
  }


  // Entity access: `client.Inbound().list()` / `client.Inbound().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Inbound(entopts?: Record<string, any>) {
    const self = this
    return new InboundEntity(self, entopts)
  }


  // Entity access: `client.InboundMessageFullDetail().list()` / `client.InboundMessageFullDetail().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  InboundMessageFullDetail(entopts?: Record<string, any>) {
    const self = this
    return new InboundMessageFullDetailEntity(self, entopts)
  }


  // Entity access: `client.Inboundrule().list()` / `client.Inboundrule().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Inboundrule(entopts?: Record<string, any>) {
    const self = this
    return new InboundruleEntity(self, entopts)
  }


  // Entity access: `client.MessageClickSearch().list()` / `client.MessageClickSearch().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  MessageClickSearch(entopts?: Record<string, any>) {
    const self = this
    return new MessageClickSearchEntity(self, entopts)
  }


  // Entity access: `client.MessageOpenSearch().list()` / `client.MessageOpenSearch().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  MessageOpenSearch(entopts?: Record<string, any>) {
    const self = this
    return new MessageOpenSearchEntity(self, entopts)
  }


  // Entity access: `client.Outbound().list()` / `client.Outbound().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Outbound(entopts?: Record<string, any>) {
    const self = this
    return new OutboundEntity(self, entopts)
  }


  // Entity access: `client.OutboundMessageDetail().list()` / `client.OutboundMessageDetail().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  OutboundMessageDetail(entopts?: Record<string, any>) {
    const self = this
    return new OutboundMessageDetailEntity(self, entopts)
  }


  // Entity access: `client.OutboundMessageDump().list()` / `client.OutboundMessageDump().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  OutboundMessageDump(entopts?: Record<string, any>) {
    const self = this
    return new OutboundMessageDumpEntity(self, entopts)
  }


  // Entity access: `client.Retry().list()` / `client.Retry().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Retry(entopts?: Record<string, any>) {
    const self = this
    return new RetryEntity(self, entopts)
  }


  // Entity access: `client.SendEmail().list()` / `client.SendEmail().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  SendEmail(entopts?: Record<string, any>) {
    const self = this
    return new SendEmailEntity(self, entopts)
  }


  // Entity access: `client.SendEmailBatch().list()` / `client.SendEmailBatch().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  SendEmailBatch(entopts?: Record<string, any>) {
    const self = this
    return new SendEmailBatchEntity(self, entopts)
  }


  // Entity access: `client.SentCount().list()` / `client.SentCount().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  SentCount(entopts?: Record<string, any>) {
    const self = this
    return new SentCountEntity(self, entopts)
  }


  // Entity access: `client.Server().list()` / `client.Server().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Server(entopts?: Record<string, any>) {
    const self = this
    return new ServerEntity(self, entopts)
  }


  // Entity access: `client.StatsApi().list()` / `client.StatsApi().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  StatsApi(entopts?: Record<string, any>) {
    const self = this
    return new StatsApiEntity(self, entopts)
  }


  // Entity access: `client.Template().list()` / `client.Template().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Template(entopts?: Record<string, any>) {
    const self = this
    return new TemplateEntity(self, entopts)
  }


  // Entity access: `client.TemplateValidation().list()` / `client.TemplateValidation().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  TemplateValidation(entopts?: Record<string, any>) {
    const self = this
    return new TemplateValidationEntity(self, entopts)
  }




  static test(testoptsarg?: any, sdkoptsarg?: any) {
    const struct = stdutil.struct
    const setpath = struct.setpath
    const getdef = struct.getdef
    const clone = struct.clone
    const setprop = struct.setprop

    const sdkopts = getdef(clone(sdkoptsarg), {})
    const testopts = getdef(clone(testoptsarg), {})
    setprop(testopts, 'active', true)
    setpath(sdkopts, 'feature.test', testopts)

    const testsdk = new PostmarkSDK(sdkopts)
    testsdk._mode = 'test'

    return testsdk
  }


  tester(testopts?: any, sdkopts?: any) {
    return PostmarkSDK.test(testopts, sdkopts)
  }


  toJSON() {
    return { name: 'Postmark' }
  }

  toString() {
    return 'Postmark ' + this._utility.struct.jsonify(this.toJSON())
  }

  [inspect.custom]() {
    return this.toString()
  }

}




const SDK = PostmarkSDK


export {
  stdutil,
  config,
  

  BaseFeature,
  PostmarkEntityBase,

  PostmarkSDK,
  SDK,
}


