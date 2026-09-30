

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


describe('RetryEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when POSTMARK_TEST_LIVE=TRUE.
  afterEach(liveDelay('POSTMARK_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = PostmarkSDK.test()
    const ent = testsdk.Retry()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.POSTMARK_TEST_LIVE
    for (const op of ['update']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'retry.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"ErrorCode":{"a":true,"h":"Error Code","n":"ErrorCode","r":false,"t":"`$INTEGER`","key$":"ErrorCode","index$":0},"Message":{"a":true,"h":"Message","n":"Message","r":false,"t":"`$STRING`","key$":"Message","index$":1}},"name":"retry","op":{"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PUT /messages/inbound/{messageid}/retry","source":"swagger2","version":2},"g":{"header":[{"a":true,"k":"header","n":"x_postmark_server_token","or":"X-Postmark-Server-Token","r":true,"t":"`$ANY`","index$":0}],"params":[{"a":true,"k":"param","n":"inbound_id","or":"messageid","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PUT","o":"/messages/inbound/{messageid}/retry","q":{"exist":["inbound_id","x_postmark_server_token"]},"r":{"param":{"messageid":"inbound_id"}},"s":[{"lit":"messages"},{"lit":"inbound"},{"var":"inbound_id"},{"lit":"retry"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[["$.main.kit.entity.inbound"]]},"key$":"retry","name__orig":"retry","Name":"Retry","name_":"retry","name-":"retry","NAME":"RETRY","index$":13}, {"active":true,"entity":"retry","key$":"BasicRetryFlow","kind":"basic","name":"BasicRetryFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"retry_ref01","srcdatavar":"retry_ref01_data","suffix":"_up0","textfield":"Message"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-retry_ref01"}}],"v":[],"index$":0}]}, 'Retry', {"PUT /messages/inbound/{messageid}/retry":{"protocol":"http","parameters":[{"name":"X-Postmark-Server-Token","required":true,"description":"The token associated with the Server on which this request will operate.","type":"string","in":"header","index$":0},{"name":"messageid","in":"path","description":"The ID of the inbound message on which we should retry processing.","required":true,"type":"string","index$":1}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let retry_ref01_data = Object.values(setup.data.existing.retry)[0] as any

    // UPDATE
    const retry_ref01_ent = client.Retry()
    const retry_ref01_data_up0: any = {}

    const retry_ref01_markdef_up0 = { name: 'Message', value: 'Mark01-retry_ref01_' + setup.now }
    ;(retry_ref01_data_up0 as any)[retry_ref01_markdef_up0.name] = retry_ref01_markdef_up0.value

    const retry_ref01_resdata_up0 = (await retry_ref01_ent.update(retry_ref01_data_up0)).data()
    assert(null != retry_ref01_resdata_up0)

    assert((retry_ref01_resdata_up0 as any)[retry_ref01_markdef_up0.name] === retry_ref01_markdef_up0.value)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/retry/RetryTestData.json')

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
    ['retry01','retry02','retry03','inbound01','inbound02','inbound03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'POSTMARK_TEST_RETRY_ENTID': idmap,
    'POSTMARK_TEST_LIVE': 'FALSE',
    'POSTMARK_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['POSTMARK_TEST_RETRY_ENTID']

  const live = 'TRUE' === env.POSTMARK_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['POSTMARK_TEST_RETRY_ENTID']
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
  
