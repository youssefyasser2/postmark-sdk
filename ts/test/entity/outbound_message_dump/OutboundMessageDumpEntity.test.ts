

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


describe('OutboundMessageDumpEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when POSTMARK_TEST_LIVE=TRUE.
  afterEach(liveDelay('POSTMARK_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = PostmarkSDK.test()
    const ent = testsdk.OutboundMessageDump()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.POSTMARK_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'outbound_message_dump.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"Body":{"a":true,"h":"Body","n":"Body","r":false,"sh":"Raw source of message.","t":"`$STRING`","key$":"Body","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":1}},"id":{"field":"id","name":"id"},"name":"outbound_message_dump","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /messages/outbound/{messageid}/dump","source":"swagger2","version":2},"g":{"header":[{"a":true,"k":"header","n":"x_postmark_server_token","or":"X-Postmark-Server-Token","r":true,"t":"`$ANY`","index$":0}],"params":[{"a":true,"k":"param","n":"id","or":"messageid","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/messages/outbound/{messageid}/dump","q":{"exist":["id","x_postmark_server_token"]},"r":{"param":{"messageid":"id"}},"s":[{"lit":"messages"},{"lit":"outbound"},{"var":"id"},{"lit":"dump"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"outbound_message_dump","name__orig":"outbound_message_dump","Name":"OutboundMessageDump","name_":"outbound_message_dump","name-":"outbound-message-dump","NAME":"OUTBOUND_MESSAGE_DUMP","index$":12}, {"active":true,"entity":"outbound_message_dump","key$":"BasicOutboundMessageDumpFlow","kind":"basic","name":"BasicOutboundMessageDumpFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"outbound_message_dump_ref01","srcdatavar":"outbound_message_dump_ref01_data","suffix":"_dt0"},"m":{"id":"outbound_message_dump01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-outbound_message_dump_ref01"}}],"index$":0}]}, 'OutboundMessageDump', {"GET /messages/outbound/{messageid}/dump":{"protocol":"http","parameters":[{"name":"X-Postmark-Server-Token","required":true,"description":"The token associated with the Server on which this request will operate.","type":"string","in":"header","index$":0},{"name":"messageid","description":"The ID of the message for which to retrieve a dump.","in":"path","required":true,"type":"string","index$":1}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let outbound_message_dump_ref01_data = Object.values(setup.data.existing.outbound_message_dump)[0] as any

    // LOAD
    const outbound_message_dump_ref01_ent = client.OutboundMessageDump()
    const outbound_message_dump_ref01_match_dt0: any = {}
    outbound_message_dump_ref01_match_dt0.id = outbound_message_dump_ref01_data.id
    const outbound_message_dump_ref01_data_dt0 = (await outbound_message_dump_ref01_ent.load(outbound_message_dump_ref01_match_dt0)).data()
    assert(outbound_message_dump_ref01_data_dt0.id === outbound_message_dump_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/outbound_message_dump/OutboundMessageDumpTestData.json')

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
    ['outbound_message_dump01','outbound_message_dump02','outbound_message_dump03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'POSTMARK_TEST_OUTBOUND_MESSAGE_DUMP_ENTID': idmap,
    'POSTMARK_TEST_LIVE': 'FALSE',
    'POSTMARK_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['POSTMARK_TEST_OUTBOUND_MESSAGE_DUMP_ENTID']

  const live = 'TRUE' === env.POSTMARK_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['POSTMARK_TEST_OUTBOUND_MESSAGE_DUMP_ENTID']
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
  
