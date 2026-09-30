

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { PostmarkSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('BounceEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when POSTMARK_TEST_LIVE=TRUE.
  afterEach(liveDelay('POSTMARK_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = PostmarkSDK.test()
    const ent = testsdk.Bounce()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.POSTMARK_TEST_LIVE
    for (const op of ['list', 'update', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'bounce.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"BouncedAt":{"a":true,"fo":"date-time","h":"Bounced At","n":"BouncedAt","r":false,"t":"`$STRING`","key$":"BouncedAt","index$":0},"CanActivate":{"a":true,"h":"Can Activate","n":"CanActivate","r":false,"t":"`$BOOLEAN`","key$":"CanActivate","index$":1},"Content":{"a":true,"h":"Content","n":"Content","r":false,"t":"`$STRING`","key$":"Content","index$":2},"Description":{"a":true,"h":"Description","n":"Description","r":false,"t":"`$STRING`","key$":"Description","index$":3},"Details":{"a":true,"h":"Details","n":"Details","r":false,"t":"`$STRING`","key$":"Details","index$":4},"DumpAvailable":{"a":true,"h":"Dump Available","n":"DumpAvailable","r":false,"t":"`$BOOLEAN`","key$":"DumpAvailable","index$":5},"Email":{"a":true,"fo":"email","h":"Email","n":"Email","r":false,"t":"`$STRING`","key$":"Email","index$":6},"ID":{"a":true,"h":"Id","n":"ID","r":false,"t":"`$STRING`","key$":"ID","index$":7},"Inactive":{"a":true,"h":"Inactive","n":"Inactive","r":false,"t":"`$BOOLEAN`","key$":"Inactive","index$":8},"MessageID":{"a":true,"h":"Message Id","n":"MessageID","r":false,"t":"`$STRING`","key$":"MessageID","index$":9},"Name":{"a":true,"h":"Name","n":"Name","r":false,"t":"`$STRING`","key$":"Name","index$":10},"Subject":{"a":true,"h":"Subject","n":"Subject","r":false,"t":"`$STRING`","key$":"Subject","index$":11},"Tag":{"a":true,"h":"Tag","n":"Tag","r":false,"t":"`$STRING`","key$":"Tag","index$":12},"Type":{"a":true,"h":"Type","n":"Type","r":false,"t":"`$STRING`","key$":"Type","index$":13},"TypeCode":{"a":true,"h":"Type Code","n":"TypeCode","r":false,"t":"`$INTEGER`","key$":"TypeCode","index$":14},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":15}},"id":{"field":"id","name":"id"},"name":"bounce","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /bounces","source":"swagger2","version":2},"g":{"header":[{"a":true,"k":"header","n":"x_postmark_server_token","or":"X-Postmark-Server-Token","r":true,"t":"`$ANY`","index$":0}],"query":[{"a":true,"k":"query","n":"count","or":"count","r":true,"t":"`$ANY`","index$":0},{"a":true,"k":"query","n":"email_filter","or":"emailFilter","r":false,"t":"`$ANY`","index$":1},{"a":true,"k":"query","n":"fromdate","or":"fromdate","r":false,"t":"`$ANY`","index$":2},{"a":true,"k":"query","n":"inactive","or":"inactive","r":false,"t":"`$ANY`","index$":3},{"a":true,"k":"query","n":"message_id","or":"messageID","r":false,"t":"`$STRING`","index$":4},{"a":true,"k":"query","n":"offset","or":"offset","r":true,"t":"`$INTEGER`","index$":5},{"a":true,"k":"query","n":"tag","or":"tag","r":false,"t":"`$ANY`","index$":6},{"a":true,"k":"query","n":"todate","or":"todate","r":false,"t":"`$ANY`","index$":7},{"a":true,"k":"query","n":"type","or":"type","r":false,"t":"`$ANY`","index$":8}]},"k":"http","m":"GET","o":"/bounces","q":{"exist":["count","email_filter","fromdate","inactive","message_id","offset","tag","todate","type","x_postmark_server_token"]},"r":{},"s":[{"lit":"bounces"}],"t":{"req":"`reqdata`","res":"`body.Bounces`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /bounces/{bounceid}","source":"swagger2","version":2},"g":{"header":[{"a":true,"k":"header","n":"x_postmark_server_token","or":"X-Postmark-Server-Token","r":true,"t":"`$ANY`","index$":0}],"params":[{"a":true,"k":"param","n":"id","or":"bounceid","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/bounces/{bounceid}","q":{"exist":["id","x_postmark_server_token"]},"r":{"param":{"bounceid":"id"}},"s":[{"lit":"bounces"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PUT /bounces/{bounceid}/activate","source":"swagger2","version":2},"g":{"header":[{"a":true,"k":"header","n":"x_postmark_server_token","or":"X-Postmark-Server-Token","r":true,"t":"`$ANY`","index$":0}],"params":[{"a":true,"k":"param","n":"id","or":"bounceid","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PUT","o":"/bounces/{bounceid}/activate","q":{"$action":"activate","exist":["id","x_postmark_server_token"]},"r":{"param":{"bounceid":"id"}},"s":[{"lit":"bounces"},{"var":"id"},{"lit":"activate"}],"t":{"req":"`reqdata`","res":"`body.Bounce`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"bounce","name__orig":"bounce","Name":"Bounce","name_":"bounce","name-":"bounce","NAME":"BOUNCE","index$":0}, {"active":true,"entity":"bounce","key$":"BasicBounceFlow","kind":"basic","name":"BasicBounceFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"bounce_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"bounce_ref01","srcdatavar":"bounce_ref01_data","suffix":"_up0","textfield":"BouncedAt"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-bounce_ref01"}}],"v":[],"index$":1},{"a":true,"d":{},"i":{"ref":"bounce_ref01","srcdatavar":"bounce_ref01_data","suffix":"_dt0"},"m":{"id":"bounce01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-bounce_ref01"}}],"index$":2}]}, 'Bounce', {"GET /bounces":{"protocol":"http","parameters":[{"name":"X-Postmark-Server-Token","required":true,"description":"The token associated with the Server on which this request will operate.","type":"string","in":"header","index$":0},{"name":"count","in":"query","description":"Number of bounces to return per request. Max 500.","type":"integer","maximum":500,"required":true,"index$":1},{"name":"offset","description":"Number of bounces to skip.","in":"query","required":true,"type":"integer","index$":2},{"name":"type","description":"Filter by type of bounce","in":"query","type":"string","enum":["HardBounce","Transient","Unsubscribe","Subscribe","AutoResponder","AddressChange","DnsError","SpamNotification","OpenRelayTest","Unknown","SoftBounce","VirusNotification","MailFrontier Matador.","BadEmailAddress","SpamComplaint","ManuallyDeactivated","Unconfirmed","Blocked","SMTPApiError","InboundError","DMARCPolicy","TemplateRenderingFailed"],"index$":3},{"name":"inactive","description":"Filter by emails that were deactivated by Postmark due to the bounce. Set to true or false. If this isn't specified it will return both active and inactive.","in":"query","type":"boolean","index$":4},{"name":"emailFilter","in":"query","description":"Filter by email address","type":"string","format":"email","index$":5},{"name":"messageID","description":"Filter by messageID","in":"query","type":"string","index$":6},{"name":"tag","description":"Filter by tag","type":"string","in":"query","index$":7},{"name":"todate","in":"query","description":"Filter messages up to the date specified. e.g. `2014-02-01`","type":"string","format":"date","index$":8},{"name":"fromdate","description":"Filter messages starting from the date specified. e.g. `2014-02-01`","in":"query","type":"string","format":"date","index$":9}]},"GET /bounces/{bounceid}":{"protocol":"http","parameters":[{"name":"X-Postmark-Server-Token","required":true,"description":"The token associated with the Server on which this request will operate.","type":"string","in":"header","index$":0},{"name":"bounceid","in":"path","description":"The ID of the bounce to retrieve.","required":true,"type":"integer","format":"int64","index$":1}]},"PUT /bounces/{bounceid}/activate":{"protocol":"http","parameters":[{"name":"X-Postmark-Server-Token","required":true,"description":"The token associated with the Server on which this request will operate.","type":"string","in":"header","index$":0},{"name":"bounceid","in":"path","description":"The ID of the Bounce to activate.","required":true,"type":"integer","format":"int64","index$":1}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let bounce_ref01_data = Object.values(setup.data.existing.bounce)[0] as any

    // LIST
    const bounce_ref01_ent = client.Bounce()
    const bounce_ref01_match: any = {}

    const bounce_ref01_list = (await bounce_ref01_ent.list(bounce_ref01_match)).map((e: any) => e.data())


    // UPDATE
    const bounce_ref01_data_up0: any = {}
    bounce_ref01_data_up0.id = bounce_ref01_data.id

    const bounce_ref01_markdef_up0 = { name: 'BouncedAt', value: 'Mark01-bounce_ref01_' + setup.now }
    ;(bounce_ref01_data_up0 as any)[bounce_ref01_markdef_up0.name] = bounce_ref01_markdef_up0.value

    const bounce_ref01_resdata_up0 = (await bounce_ref01_ent.update(bounce_ref01_data_up0)).data()
    assert(bounce_ref01_resdata_up0.id === bounce_ref01_data_up0.id)

    assert((bounce_ref01_resdata_up0 as any)[bounce_ref01_markdef_up0.name] === bounce_ref01_markdef_up0.value)


    // LOAD
    const bounce_ref01_match_dt0: any = {}
    bounce_ref01_match_dt0.id = bounce_ref01_data.id
    const bounce_ref01_data_dt0 = (await bounce_ref01_ent.load(bounce_ref01_match_dt0)).data()
    assert(bounce_ref01_data_dt0.id === bounce_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/bounce/BounceTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = PostmarkSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['bounce01','bounce02','bounce03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'POSTMARK_TEST_BOUNCE_ENTID': idmap,
    'POSTMARK_TEST_LIVE': 'FALSE',
    'POSTMARK_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['POSTMARK_TEST_BOUNCE_ENTID']

  const live = 'TRUE' === env.POSTMARK_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['POSTMARK_TEST_BOUNCE_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new PostmarkSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.POSTMARK_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
