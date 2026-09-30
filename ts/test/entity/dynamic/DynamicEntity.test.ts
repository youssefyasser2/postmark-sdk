

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


describe('DynamicEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when POSTMARK_TEST_LIVE=TRUE.
  afterEach(liveDelay('POSTMARK_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = PostmarkSDK.test()
    const ent = testsdk.Dynamic()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.POSTMARK_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'dynamic.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"dynamic","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /stats/outbound/clicks","source":"swagger2","version":2},"g":{"header":[{"a":true,"k":"header","n":"x_postmark_server_token","or":"X-Postmark-Server-Token","r":true,"t":"`$ANY`","index$":0}],"query":[{"a":true,"k":"query","n":"fromdate","or":"fromdate","r":false,"t":"`$ANY`","index$":0},{"a":true,"k":"query","n":"tag","or":"tag","r":false,"t":"`$ANY`","index$":1},{"a":true,"k":"query","n":"todate","or":"todate","r":false,"t":"`$ANY`","index$":2}]},"k":"http","m":"GET","o":"/stats/outbound/clicks","q":{"exist":["fromdate","tag","todate","x_postmark_server_token"]},"r":{},"s":[{"lit":"stats"},{"lit":"outbound"},{"lit":"clicks"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /stats/outbound/clicks/location","source":"swagger2","version":2},"g":{"header":[{"a":true,"k":"header","n":"x_postmark_server_token","or":"X-Postmark-Server-Token","r":true,"t":"`$ANY`","index$":0}],"query":[{"a":true,"k":"query","n":"fromdate","or":"fromdate","r":false,"t":"`$ANY`","index$":0},{"a":true,"k":"query","n":"tag","or":"tag","r":false,"t":"`$ANY`","index$":1},{"a":true,"k":"query","n":"todate","or":"todate","r":false,"t":"`$ANY`","index$":2}]},"k":"http","m":"GET","o":"/stats/outbound/clicks/location","q":{"exist":["fromdate","tag","todate","x_postmark_server_token"]},"r":{},"s":[{"lit":"stats"},{"lit":"outbound"},{"lit":"clicks"},{"lit":"location"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"co":{"id":"GET /stats/outbound/clicks/platforms","source":"swagger2","version":2},"g":{"header":[{"a":true,"k":"header","n":"x_postmark_server_token","or":"X-Postmark-Server-Token","r":true,"t":"`$ANY`","index$":0}],"query":[{"a":true,"k":"query","n":"fromdate","or":"fromdate","r":false,"t":"`$ANY`","index$":0},{"a":true,"k":"query","n":"tag","or":"tag","r":false,"t":"`$ANY`","index$":1},{"a":true,"k":"query","n":"todate","or":"todate","r":false,"t":"`$ANY`","index$":2}]},"k":"http","m":"GET","o":"/stats/outbound/clicks/platforms","q":{"exist":["fromdate","tag","todate","x_postmark_server_token"]},"r":{},"s":[{"lit":"stats"},{"lit":"outbound"},{"lit":"clicks"},{"lit":"platforms"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"dynamic","name__orig":"dynamic","Name":"Dynamic","name_":"dynamic","name-":"dynamic","NAME":"DYNAMIC","index$":4}, {"active":true,"entity":"dynamic","key$":"BasicDynamicFlow","kind":"basic","name":"BasicDynamicFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"dynamic_ref01","srcdatavar":"dynamic_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-dynamic_ref01"}}],"index$":0}]}, 'Dynamic', {"GET /stats/outbound/clicks":{"protocol":"http","parameters":[{"name":"X-Postmark-Server-Token","required":true,"description":"The token associated with the Server on which this request will operate.","type":"string","in":"header","index$":0},{"name":"tag","description":"Filter by tag","in":"query","type":"string","index$":1},{"name":"fromdate","in":"query","description":"Filter stats starting from the date specified. e.g. `2014-01-01`","type":"string","format":"date","index$":2},{"name":"todate","description":"Filter stats up to the date specified. e.g. `2014-02-01`","in":"query","type":"string","format":"date","index$":3}]},"GET /stats/outbound/clicks/location":{"protocol":"http","parameters":[{"name":"X-Postmark-Server-Token","required":true,"description":"The token associated with the Server on which this request will operate.","type":"string","in":"header","index$":0},{"name":"tag","description":"Filter by tag","in":"query","type":"string","index$":1},{"name":"fromdate","in":"query","description":"Filter stats starting from the date specified. e.g. `2014-01-01`","type":"string","format":"date","index$":2},{"name":"todate","description":"Filter stats up to the date specified. e.g. `2014-02-01`","in":"query","type":"string","format":"date","index$":3}]},"GET /stats/outbound/clicks/platforms":{"protocol":"http","parameters":[{"name":"X-Postmark-Server-Token","required":true,"description":"The token associated with the Server on which this request will operate.","type":"string","in":"header","index$":0},{"name":"tag","description":"Filter by tag","in":"query","type":"string","index$":1},{"name":"fromdate","in":"query","description":"Filter stats starting from the date specified. e.g. `2014-01-01`","type":"string","format":"date","index$":2},{"name":"todate","description":"Filter stats up to the date specified. e.g. `2014-02-01`","in":"query","type":"string","format":"date","index$":3}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let dynamic_ref01_data = Object.values(setup.data.existing.dynamic)[0] as any

    // LOAD
    const dynamic_ref01_ent = client.Dynamic()
    const dynamic_ref01_match_dt0: any = {}
    const dynamic_ref01_data_dt0 = (await dynamic_ref01_ent.load(dynamic_ref01_match_dt0)).data()
    assert(null != dynamic_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/dynamic/DynamicTestData.json')

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
    ['dynamic01','dynamic02','dynamic03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'POSTMARK_TEST_DYNAMIC_ENTID': idmap,
    'POSTMARK_TEST_LIVE': 'FALSE',
    'POSTMARK_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['POSTMARK_TEST_DYNAMIC_ENTID']

  const live = 'TRUE' === env.POSTMARK_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['POSTMARK_TEST_DYNAMIC_ENTID']
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
  
