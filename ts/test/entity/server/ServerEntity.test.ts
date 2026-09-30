

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


describe('ServerEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when POSTMARK_TEST_LIVE=TRUE.
  afterEach(liveDelay('POSTMARK_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = PostmarkSDK.test()
    const ent = testsdk.Server()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.POSTMARK_TEST_LIVE
    for (const op of ['list', 'update']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'server.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"ApiTokens":{"a":true,"h":"Api Tokens","n":"ApiTokens","r":false,"t":"`$ARRAY`","key$":"ApiTokens","index$":0},"BounceHookUrl":{"a":true,"h":"Bounce Hook Url","n":"BounceHookUrl","r":false,"t":"`$STRING`","key$":"BounceHookUrl","index$":1},"ClickHookUrl":{"a":true,"h":"Click Hook Url","n":"ClickHookUrl","r":false,"t":"`$STRING`","key$":"ClickHookUrl","index$":2},"Color":{"a":true,"h":"Color","n":"Color","r":false,"t":"`$STRING`","key$":"Color","index$":3},"DeliveryHookUrl":{"a":true,"h":"Delivery Hook Url","n":"DeliveryHookUrl","r":false,"t":"`$STRING`","key$":"DeliveryHookUrl","index$":4},"ID":{"a":true,"h":"Id","n":"ID","r":false,"t":"`$INTEGER`","key$":"ID","index$":5},"InboundAddress":{"a":true,"fo":"email","h":"Inbound Address","n":"InboundAddress","r":false,"t":"`$STRING`","key$":"InboundAddress","index$":6},"InboundDomain":{"a":true,"h":"Inbound Domain","n":"InboundDomain","r":false,"t":"`$STRING`","key$":"InboundDomain","index$":7},"InboundHash":{"a":true,"h":"Inbound Hash","n":"InboundHash","r":false,"t":"`$STRING`","key$":"InboundHash","index$":8},"InboundHookUrl":{"a":true,"h":"Inbound Hook Url","n":"InboundHookUrl","r":false,"t":"`$STRING`","key$":"InboundHookUrl","index$":9},"InboundSpamThreshold":{"a":true,"h":"Inbound Spam Threshold","n":"InboundSpamThreshold","r":false,"t":"`$INTEGER`","key$":"InboundSpamThreshold","index$":10},"Name":{"a":true,"h":"Name","n":"Name","r":false,"t":"`$STRING`","key$":"Name","index$":11},"OpenHookUrl":{"a":true,"h":"Open Hook Url","n":"OpenHookUrl","r":false,"t":"`$STRING`","key$":"OpenHookUrl","index$":12},"PostFirstOpenOnly":{"a":true,"h":"Post First Open Only","n":"PostFirstOpenOnly","r":false,"t":"`$BOOLEAN`","key$":"PostFirstOpenOnly","index$":13},"RawEmailEnabled":{"a":true,"h":"Raw Email Enabled","n":"RawEmailEnabled","r":false,"t":"`$BOOLEAN`","key$":"RawEmailEnabled","index$":14},"ServerLink":{"a":true,"h":"Server Link","n":"ServerLink","r":false,"t":"`$STRING`","key$":"ServerLink","index$":15},"SmtpApiActivated":{"a":true,"h":"Smtp Api Activated","n":"SmtpApiActivated","r":false,"t":"`$BOOLEAN`","key$":"SmtpApiActivated","index$":16},"TrackLinks":{"a":true,"h":"Track Links","n":"TrackLinks","r":false,"t":"`$STRING`","key$":"TrackLinks","index$":17},"TrackOpens":{"a":true,"h":"Track Opens","n":"TrackOpens","r":false,"t":"`$BOOLEAN`","key$":"TrackOpens","index$":18}},"name":"server","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /server","source":"swagger2","version":2},"g":{"header":[{"a":true,"k":"header","n":"x_postmark_server_token","or":"X-Postmark-Server-Token","r":true,"t":"`$ANY`","index$":0}]},"k":"http","m":"GET","o":"/server","q":{"exist":["x_postmark_server_token"]},"r":{},"s":[{"lit":"server"}],"t":{"req":"`reqdata`","res":"`body.ApiTokens`"},"index$":0}],"key$":"list"},"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PUT /server","source":"swagger2","version":2},"g":{"header":[{"a":true,"k":"header","n":"x_postmark_server_token","or":"X-Postmark-Server-Token","r":true,"t":"`$ANY`","index$":0}],"query":[{"a":true,"k":"query","n":"body","or":"body","r":false,"t":"`$ANY`","index$":0}]},"k":"http","m":"PUT","o":"/server","q":{"exist":["body","x_postmark_server_token"]},"r":{},"s":[{"lit":"server"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"server","name__orig":"server","Name":"Server","name_":"server","name-":"server","NAME":"SERVER","index$":17}, {"active":true,"entity":"server","key$":"BasicServerFlow","kind":"basic","name":"BasicServerFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"server_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"server_ref01","srcdatavar":"server_ref01_data","suffix":"_up0","textfield":"BounceHookUrl"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-server_ref01"}}],"v":[],"index$":1}]}, 'Server', {"GET /server":{"protocol":"http","parameters":[{"name":"X-Postmark-Server-Token","required":true,"description":"The token associated with the Server on which this request will operate.","type":"string","in":"header","index$":0}]},"PUT /server":{"protocol":"http","parameters":[{"name":"X-Postmark-Server-Token","required":true,"description":"The token associated with the Server on which this request will operate.","type":"string","in":"header","index$":0},{"name":"body","description":"The settings that should be modified for the current server.","in":"body","schema":{"properties":{"Name":{"type":"string"},"Color":{"type":"string","enum":["purple","blue","turqoise","green","red","yellow","grey"]},"RawEmailEnabled":{"type":"boolean"},"DeliveryHookUrl":{"type":"string"},"SmtpApiActivated":{"type":"boolean"},"InboundHookUrl":{"type":"string"},"BounceHookUrl":{"type":"string"},"OpenHookUrl":{"type":"string"},"PostFirstOpenOnly":{"type":"boolean"},"TrackOpens":{"type":"boolean"},"TrackLinks":{"type":"string","enum":["None","HtmlAndText","HtmlOnly","TextOnly"]},"ClickHookUrl":{"description":"Webhook url allowing real-time notification when tracked links are clicked.","type":"string"},"InboundDomain":{"type":"string"},"InboundSpamThreshold":{"type":"integer"}},"x-ref":"#/definitions/EditServerConfigurationRequest"},"index$":1}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let server_ref01_data = Object.values(setup.data.existing.server)[0] as any

    // LIST
    const server_ref01_ent = client.Server()
    const server_ref01_match: any = {}

    const server_ref01_list = (await server_ref01_ent.list(server_ref01_match)).map((e: any) => e.data())


    // UPDATE
    const server_ref01_data_up0: any = {}

    const server_ref01_markdef_up0 = { name: 'BounceHookUrl', value: 'Mark01-server_ref01_' + setup.now }
    ;(server_ref01_data_up0 as any)[server_ref01_markdef_up0.name] = server_ref01_markdef_up0.value

    const server_ref01_resdata_up0 = (await server_ref01_ent.update(server_ref01_data_up0)).data()
    assert(null != server_ref01_resdata_up0)

    assert((server_ref01_resdata_up0 as any)[server_ref01_markdef_up0.name] === server_ref01_markdef_up0.value)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/server/ServerTestData.json')

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
    ['server01','server02','server03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'POSTMARK_TEST_SERVER_ENTID': idmap,
    'POSTMARK_TEST_LIVE': 'FALSE',
    'POSTMARK_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['POSTMARK_TEST_SERVER_ENTID']

  const live = 'TRUE' === env.POSTMARK_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['POSTMARK_TEST_SERVER_ENTID']
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
  
