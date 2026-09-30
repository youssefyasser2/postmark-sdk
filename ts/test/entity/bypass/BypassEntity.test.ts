

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


describe('BypassEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when POSTMARK_TEST_LIVE=TRUE.
  afterEach(liveDelay('POSTMARK_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = PostmarkSDK.test()
    const ent = testsdk.Bypass()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.POSTMARK_TEST_LIVE
    for (const op of ['update']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'bypass.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"ErrorCode":{"a":true,"h":"Error Code","n":"ErrorCode","r":false,"t":"`$INTEGER`","key$":"ErrorCode","index$":0},"Message":{"a":true,"h":"Message","n":"Message","r":false,"t":"`$STRING`","key$":"Message","index$":1}},"name":"bypass","op":{"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PUT /messages/inbound/{messageid}/bypass","source":"swagger2","version":2},"g":{"header":[{"a":true,"k":"header","n":"x_postmark_server_token","or":"X-Postmark-Server-Token","r":true,"t":"`$ANY`","index$":0}],"params":[{"a":true,"k":"param","n":"inbound_id","or":"messageid","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PUT","o":"/messages/inbound/{messageid}/bypass","q":{"exist":["inbound_id","x_postmark_server_token"]},"r":{"param":{"messageid":"inbound_id"}},"s":[{"lit":"messages"},{"lit":"inbound"},{"var":"inbound_id"},{"lit":"bypass"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[["$.main.kit.entity.inbound"]]},"key$":"bypass","name__orig":"bypass","Name":"Bypass","name_":"bypass","name-":"bypass","NAME":"BYPASS","index$":2}, {"active":true,"entity":"bypass","key$":"BasicBypassFlow","kind":"basic","name":"BasicBypassFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"bypass_ref01","srcdatavar":"bypass_ref01_data","suffix":"_up0","textfield":"Message"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-bypass_ref01"}}],"v":[],"index$":0}]}, 'Bypass', {"PUT /messages/inbound/{messageid}/bypass":{"protocol":"http","parameters":[{"name":"X-Postmark-Server-Token","required":true,"description":"The token associated with the Server on which this request will operate.","type":"string","in":"header","index$":0},{"name":"messageid","description":"The ID of the message which should bypass inbound rules.","in":"path","required":true,"type":"string","index$":1}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let bypass_ref01_data = Object.values(setup.data.existing.bypass)[0] as any

    // UPDATE
    const bypass_ref01_ent = client.Bypass()
    const bypass_ref01_data_up0: any = {}

    const bypass_ref01_markdef_up0 = { name: 'Message', value: 'Mark01-bypass_ref01_' + setup.now }
    ;(bypass_ref01_data_up0 as any)[bypass_ref01_markdef_up0.name] = bypass_ref01_markdef_up0.value

    const bypass_ref01_resdata_up0 = (await bypass_ref01_ent.update(bypass_ref01_data_up0)).data()
    assert(null != bypass_ref01_resdata_up0)

    assert((bypass_ref01_resdata_up0 as any)[bypass_ref01_markdef_up0.name] === bypass_ref01_markdef_up0.value)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/bypass/BypassTestData.json')

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
    ['bypass01','bypass02','bypass03','inbound01','inbound02','inbound03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'POSTMARK_TEST_BYPASS_ENTID': idmap,
    'POSTMARK_TEST_LIVE': 'FALSE',
    'POSTMARK_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['POSTMARK_TEST_BYPASS_ENTID']

  const live = 'TRUE' === env.POSTMARK_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['POSTMARK_TEST_BYPASS_ENTID']
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
  
