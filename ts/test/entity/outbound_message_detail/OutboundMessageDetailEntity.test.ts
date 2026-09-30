

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


describe('OutboundMessageDetailEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when POSTMARK_TEST_LIVE=TRUE.
  afterEach(liveDelay('POSTMARK_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = PostmarkSDK.test()
    const ent = testsdk.OutboundMessageDetail()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.POSTMARK_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'outbound_message_detail.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"Attachments":{"a":true,"h":"Attachments","n":"Attachments","r":false,"t":"`$ARRAY`","key$":"Attachments","index$":0},"Bcc":{"a":true,"h":"Bcc","n":"Bcc","r":false,"t":"`$ARRAY`","key$":"Bcc","index$":1},"Body":{"a":true,"h":"Body","n":"Body","r":false,"t":"`$STRING`","key$":"Body","index$":2},"Cc":{"a":true,"h":"Cc","n":"Cc","r":false,"t":"`$ARRAY`","key$":"Cc","index$":3},"From":{"a":true,"h":"From","n":"From","r":false,"t":"`$STRING`","key$":"From","index$":4},"HtmlBody":{"a":true,"h":"Html Body","n":"HtmlBody","r":false,"t":"`$STRING`","key$":"HtmlBody","index$":5},"MessageEvents":{"a":true,"h":"Message Events","n":"MessageEvents","r":false,"t":"`$ARRAY`","key$":"MessageEvents","index$":6},"MessageID":{"a":true,"h":"Message Id","n":"MessageID","r":false,"t":"`$STRING`","key$":"MessageID","index$":7},"ReceivedAt":{"a":true,"fo":"date-time","h":"Received At","n":"ReceivedAt","r":false,"t":"`$STRING`","key$":"ReceivedAt","index$":8},"Recipients":{"a":true,"h":"Recipients","n":"Recipients","r":false,"t":"`$ARRAY`","key$":"Recipients","index$":9},"Status":{"a":true,"h":"Status","n":"Status","r":false,"t":"`$STRING`","key$":"Status","index$":10},"Subject":{"a":true,"h":"Subject","n":"Subject","r":false,"t":"`$STRING`","key$":"Subject","index$":11},"Tag":{"a":true,"h":"Tag","n":"Tag","r":false,"t":"`$STRING`","key$":"Tag","index$":12},"TextBody":{"a":true,"h":"Text Body","n":"TextBody","r":false,"t":"`$STRING`","key$":"TextBody","index$":13},"To":{"a":true,"h":"To","n":"To","r":false,"t":"`$ARRAY`","key$":"To","index$":14},"TrackLinks":{"a":true,"h":"Track Links","n":"TrackLinks","r":false,"t":"`$STRING`","key$":"TrackLinks","index$":15},"TrackOpens":{"a":true,"h":"Track Opens","n":"TrackOpens","r":false,"t":"`$BOOLEAN`","key$":"TrackOpens","index$":16},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":17}},"id":{"field":"id","name":"id"},"name":"outbound_message_detail","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /messages/outbound/{messageid}/details","source":"swagger2","version":2},"g":{"header":[{"a":true,"k":"header","n":"x_postmark_server_token","or":"X-Postmark-Server-Token","r":true,"t":"`$ANY`","index$":0}],"params":[{"a":true,"k":"param","n":"id","or":"messageid","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/messages/outbound/{messageid}/details","q":{"exist":["id","x_postmark_server_token"]},"r":{"param":{"messageid":"id"}},"s":[{"lit":"messages"},{"lit":"outbound"},{"var":"id"},{"lit":"details"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"outbound_message_detail","name__orig":"outbound_message_detail","Name":"OutboundMessageDetail","name_":"outbound_message_detail","name-":"outbound-message-detail","NAME":"OUTBOUND_MESSAGE_DETAIL","index$":11}, {"active":true,"entity":"outbound_message_detail","key$":"BasicOutboundMessageDetailFlow","kind":"basic","name":"BasicOutboundMessageDetailFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"messageid":"messageid01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"outbound_message_detail_ref01"}}],"index$":0}]}, 'OutboundMessageDetail', {"GET /messages/outbound/{messageid}/details":{"protocol":"http","parameters":[{"name":"X-Postmark-Server-Token","required":true,"description":"The token associated with the Server on which this request will operate.","type":"string","in":"header","index$":0},{"name":"messageid","description":"The ID of the message for which to retrieve details.","in":"path","type":"string","required":true,"index$":1}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let outbound_message_detail_ref01_data = Object.values(setup.data.existing.outbound_message_detail)[0] as any

    // LIST
    const outbound_message_detail_ref01_ent = client.OutboundMessageDetail()
    const outbound_message_detail_ref01_match: any = {}
    outbound_message_detail_ref01_match['messageid'] = setup.idmap['messageid01']

    const outbound_message_detail_ref01_list = (await outbound_message_detail_ref01_ent.list(outbound_message_detail_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/outbound_message_detail/OutboundMessageDetailTestData.json')

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
    ['outbound_message_detail01','outbound_message_detail02','outbound_message_detail03','messageid01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'POSTMARK_TEST_OUTBOUND_MESSAGE_DETAIL_ENTID': idmap,
    'POSTMARK_TEST_LIVE': 'FALSE',
    'POSTMARK_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['POSTMARK_TEST_OUTBOUND_MESSAGE_DETAIL_ENTID']

  const live = 'TRUE' === env.POSTMARK_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['POSTMARK_TEST_OUTBOUND_MESSAGE_DETAIL_ENTID']
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
  
