

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


describe('SentCountEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when POSTMARK_TEST_LIVE=TRUE.
  afterEach(liveDelay('POSTMARK_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = PostmarkSDK.test()
    const ent = testsdk.SentCount()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.POSTMARK_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'sent_count.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"Date":{"a":true,"h":"Date","n":"Date","r":false,"t":"`$STRING`","key$":"Date","index$":0},"Sent":{"a":true,"h":"Sent","n":"Sent","r":false,"t":"`$INTEGER`","key$":"Sent","index$":1}},"name":"sent_count","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /stats/outbound/sends","source":"swagger2","version":2},"g":{"header":[{"a":true,"k":"header","n":"x_postmark_server_token","or":"X-Postmark-Server-Token","r":true,"t":"`$ANY`","index$":0}],"query":[{"a":true,"k":"query","n":"fromdate","or":"fromdate","r":false,"t":"`$ANY`","index$":0},{"a":true,"k":"query","n":"tag","or":"tag","r":false,"t":"`$ANY`","index$":1},{"a":true,"k":"query","n":"todate","or":"todate","r":false,"t":"`$ANY`","index$":2}]},"k":"http","m":"GET","o":"/stats/outbound/sends","q":{"exist":["fromdate","tag","todate","x_postmark_server_token"]},"r":{},"s":[{"lit":"stats"},{"lit":"outbound"},{"lit":"sends"}],"t":{"req":"`reqdata`","res":"`body.Days`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"sent_count","name__orig":"sent_count","Name":"SentCount","name_":"sent_count","name-":"sent-count","NAME":"SENT_COUNT","index$":16}, {"active":true,"entity":"sent_count","key$":"BasicSentCountFlow","kind":"basic","name":"BasicSentCountFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"sent_count_ref01"}}],"index$":0}]}, 'SentCount', {"GET /stats/outbound/sends":{"protocol":"http","parameters":[{"name":"X-Postmark-Server-Token","required":true,"description":"The token associated with the Server on which this request will operate.","type":"string","in":"header","index$":0},{"name":"tag","description":"Filter by tag","in":"query","type":"string","index$":1},{"name":"fromdate","description":"Filter stats starting from the date specified. e.g. `2014-01-01`","in":"query","type":"string","format":"date","index$":2},{"name":"todate","description":"Filter stats up to the date specified. e.g. `2014-02-01`","in":"query","type":"string","format":"date","index$":3}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let sent_count_ref01_data = Object.values(setup.data.existing.sent_count)[0] as any

    // LIST
    const sent_count_ref01_ent = client.SentCount()
    const sent_count_ref01_match: any = {}

    const sent_count_ref01_list = (await sent_count_ref01_ent.list(sent_count_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/sent_count/SentCountTestData.json')

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
    ['sent_count01','sent_count02','sent_count03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'POSTMARK_TEST_SENT_COUNT_ENTID': idmap,
    'POSTMARK_TEST_LIVE': 'FALSE',
    'POSTMARK_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['POSTMARK_TEST_SENT_COUNT_ENTID']

  const live = 'TRUE' === env.POSTMARK_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['POSTMARK_TEST_SENT_COUNT_ENTID']
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
  
