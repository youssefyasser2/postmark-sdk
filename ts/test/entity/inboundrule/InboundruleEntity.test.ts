

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


describe('InboundruleEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when POSTMARK_TEST_LIVE=TRUE.
  afterEach(liveDelay('POSTMARK_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = PostmarkSDK.test()
    const ent = testsdk.Inboundrule()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.POSTMARK_TEST_LIVE
    for (const op of ['create', 'list', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'inboundrule.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"ID":{"a":true,"h":"Id","n":"ID","r":false,"t":"`$INTEGER`","key$":"ID","index$":0},"Rule":{"a":true,"fo":"email","h":"Rule","n":"Rule","r":false,"t":"`$STRING`","key$":"Rule","index$":1},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":2}},"id":{"field":"id","name":"id"},"name":"inboundrule","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /triggers/inboundrules","source":"swagger2","version":2},"g":{"header":[{"a":true,"k":"header","n":"x_postmark_server_token","or":"X-Postmark-Server-Token","r":true,"t":"`$ANY`","index$":0}],"query":[{"a":true,"k":"query","n":"body","or":"body","r":false,"t":"`$ANY`","index$":0}]},"k":"http","m":"POST","o":"/triggers/inboundrules","q":{"exist":["body","x_postmark_server_token"]},"r":{},"s":[{"lit":"triggers"},{"lit":"inboundrules"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /triggers/inboundrules","source":"swagger2","version":2},"g":{"header":[{"a":true,"k":"header","n":"x_postmark_server_token","or":"X-Postmark-Server-Token","r":true,"t":"`$ANY`","index$":0}],"query":[{"a":true,"k":"query","n":"count","or":"count","r":true,"t":"`$ANY`","index$":0},{"a":true,"k":"query","n":"offset","or":"offset","r":true,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/triggers/inboundrules","q":{"exist":["count","offset","x_postmark_server_token"]},"r":{},"s":[{"lit":"triggers"},{"lit":"inboundrules"}],"t":{"req":"`reqdata`","res":"`body.InboundRules`"},"index$":0}],"key$":"list"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /triggers/inboundrules/{triggerid}","source":"swagger2","version":2},"g":{"header":[{"a":true,"k":"header","n":"x_postmark_server_token","or":"X-Postmark-Server-Token","r":true,"t":"`$ANY`","index$":0}],"params":[{"a":true,"k":"param","n":"id","or":"triggerid","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/triggers/inboundrules/{triggerid}","q":{"exist":["id","x_postmark_server_token"]},"r":{"param":{"triggerid":"id"}},"s":[{"lit":"triggers"},{"lit":"inboundrules"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"}},"relations":{"ancestors":[]},"key$":"inboundrule","name__orig":"inboundrule","Name":"Inboundrule","name_":"inboundrule","name-":"inboundrule","NAME":"INBOUNDRULE","index$":7}, {"active":true,"entity":"inboundrule","key$":"BasicInboundruleFlow","kind":"basic","name":"BasicInboundruleFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"inboundrule_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"inboundrule_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"inboundrule_ref01","suffix":"_rm0"},"m":{"id":"inboundrule01"},"o":"remove","s":[],"v":[],"index$":2},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"inboundrule_ref01"}}],"index$":3}]}, 'Inboundrule', {"POST /triggers/inboundrules":{"protocol":"http","parameters":[{"name":"X-Postmark-Server-Token","required":true,"description":"The token associated with the Server on which this request will operate.","type":"string","in":"header","index$":0},{"name":"body","in":"body","schema":{"description":"","properties":{"Rule":{"format":"email","type":"string"}},"x-ref":"#/definitions/CreateInboundRuleRequest"},"index$":1}]},"GET /triggers/inboundrules":{"protocol":"http","parameters":[{"name":"X-Postmark-Server-Token","required":true,"description":"The token associated with the Server on which this request will operate.","type":"string","in":"header","index$":0},{"name":"count","in":"query","type":"integer","required":true,"description":"Number of records to return per request.","index$":1},{"name":"offset","in":"query","type":"integer","required":true,"description":"Number of records to skip.","index$":2}]},"DELETE /triggers/inboundrules/{triggerid}":{"protocol":"http","parameters":[{"name":"X-Postmark-Server-Token","required":true,"description":"The token associated with the Server on which this request will operate.","type":"string","in":"header","index$":0},{"name":"triggerid","in":"path","type":"integer","description":"The ID of the Inbound Rule that should be deleted.","required":true,"index$":1}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const inboundrule_ref01_ent = client.Inboundrule()
    let inboundrule_ref01_data = setup.data.new.inboundrule['inboundrule_ref01']

    inboundrule_ref01_data = (await inboundrule_ref01_ent.create(inboundrule_ref01_data)).data()
    assert(null != inboundrule_ref01_data.id)


    // LIST
    const inboundrule_ref01_match: any = {}

    const inboundrule_ref01_list = (await inboundrule_ref01_ent.list(inboundrule_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(inboundrule_ref01_list, { id: inboundrule_ref01_data.id })))


    // REMOVE
    const inboundrule_ref01_match_rm0: any = { id: inboundrule_ref01_data.id }
    await inboundrule_ref01_ent.remove(inboundrule_ref01_match_rm0)
  

    // LIST
    const inboundrule_ref01_match_rt0: any = {}

    const inboundrule_ref01_list_rt0 = (await inboundrule_ref01_ent.list(inboundrule_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(inboundrule_ref01_list_rt0, { id: inboundrule_ref01_data.id })))


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/inboundrule/InboundruleTestData.json')

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
    ['inboundrule01','inboundrule02','inboundrule03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'POSTMARK_TEST_INBOUNDRULE_ENTID': idmap,
    'POSTMARK_TEST_LIVE': 'FALSE',
    'POSTMARK_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['POSTMARK_TEST_INBOUNDRULE_ENTID']

  const live = 'TRUE' === env.POSTMARK_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['POSTMARK_TEST_INBOUNDRULE_ENTID']
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
  
