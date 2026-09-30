

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


describe('OutboundEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when POSTMARK_TEST_LIVE=TRUE.
  afterEach(liveDelay('POSTMARK_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = PostmarkSDK.test()
    const ent = testsdk.Outbound()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.POSTMARK_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'outbound.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"Attachments":{"a":true,"h":"Attachments","n":"Attachments","r":false,"t":"`$ARRAY`","key$":"Attachments","index$":0},"Bcc":{"a":true,"h":"Bcc","n":"Bcc","r":false,"t":"`$ARRAY`","key$":"Bcc","index$":1},"BounceRate":{"a":true,"h":"Bounce Rate","n":"BounceRate","r":false,"t":"`$INTEGER`","key$":"BounceRate","index$":2},"Bounced":{"a":true,"h":"Bounced","n":"Bounced","r":false,"t":"`$INTEGER`","key$":"Bounced","index$":3},"Cc":{"a":true,"h":"Cc","n":"Cc","r":false,"t":"`$ARRAY`","key$":"Cc","index$":4},"From":{"a":true,"h":"From","n":"From","r":false,"t":"`$STRING`","key$":"From","index$":5},"MessageID":{"a":true,"h":"Message Id","n":"MessageID","r":false,"t":"`$STRING`","key$":"MessageID","index$":6},"Opens":{"a":true,"h":"Opens","n":"Opens","r":false,"t":"`$INTEGER`","key$":"Opens","index$":7},"ReceivedAt":{"a":true,"fo":"date-time","h":"Received At","n":"ReceivedAt","r":false,"t":"`$STRING`","key$":"ReceivedAt","index$":8},"Recipients":{"a":true,"h":"Recipients","n":"Recipients","r":false,"t":"`$ARRAY`","key$":"Recipients","index$":9},"SMTPAPIErrors":{"a":true,"h":"Smtpapi Errors","n":"SMTPAPIErrors","r":false,"t":"`$INTEGER`","key$":"SMTPAPIErrors","index$":10},"Sent":{"a":true,"h":"Sent","n":"Sent","r":false,"t":"`$INTEGER`","key$":"Sent","index$":11},"SpamComplaints":{"a":true,"h":"Spam Complaints","n":"SpamComplaints","r":false,"t":"`$INTEGER`","key$":"SpamComplaints","index$":12},"SpamComplaintsRate":{"a":true,"h":"Spam Complaints Rate","n":"SpamComplaintsRate","r":false,"t":"`$INTEGER`","key$":"SpamComplaintsRate","index$":13},"Status":{"a":true,"h":"Status","n":"Status","r":false,"t":"`$STRING`","key$":"Status","index$":14},"Subject":{"a":true,"h":"Subject","n":"Subject","r":false,"t":"`$STRING`","key$":"Subject","index$":15},"Tag":{"a":true,"h":"Tag","n":"Tag","r":false,"t":"`$STRING`","key$":"Tag","index$":16},"To":{"a":true,"h":"To","n":"To","r":false,"t":"`$ARRAY`","key$":"To","index$":17},"TotalClicks":{"a":true,"h":"Total Clicks","n":"TotalClicks","r":false,"t":"`$INTEGER`","key$":"TotalClicks","index$":18},"TotalTrackedLinksSent":{"a":true,"h":"Total Tracked Links Sent","n":"TotalTrackedLinksSent","r":false,"t":"`$INTEGER`","key$":"TotalTrackedLinksSent","index$":19},"TrackLinks":{"a":true,"h":"Track Links","n":"TrackLinks","r":false,"t":"`$STRING`","key$":"TrackLinks","index$":20},"TrackOpens":{"a":true,"h":"Track Opens","n":"TrackOpens","r":false,"t":"`$BOOLEAN`","key$":"TrackOpens","index$":21},"Tracked":{"a":true,"h":"Tracked","n":"Tracked","r":false,"t":"`$INTEGER`","key$":"Tracked","index$":22},"UniqueLinksClicked":{"a":true,"h":"Unique Links Clicked","n":"UniqueLinksClicked","r":false,"t":"`$INTEGER`","key$":"UniqueLinksClicked","index$":23},"UniqueOpens":{"a":true,"h":"Unique Opens","n":"UniqueOpens","r":false,"t":"`$INTEGER`","key$":"UniqueOpens","index$":24},"WithClientRecorded":{"a":true,"h":"With Client Recorded","n":"WithClientRecorded","r":false,"t":"`$INTEGER`","key$":"WithClientRecorded","index$":25},"WithLinkTracking":{"a":true,"h":"With Link Tracking","n":"WithLinkTracking","r":false,"t":"`$INTEGER`","key$":"WithLinkTracking","index$":26},"WithOpenTracking":{"a":true,"h":"With Open Tracking","n":"WithOpenTracking","r":false,"t":"`$INTEGER`","key$":"WithOpenTracking","index$":27},"WithPlatformRecorded":{"a":true,"h":"With Platform Recorded","n":"WithPlatformRecorded","r":false,"t":"`$INTEGER`","key$":"WithPlatformRecorded","index$":28}},"name":"outbound","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /messages/outbound","source":"swagger2","version":2},"g":{"header":[{"a":true,"k":"header","n":"x_postmark_server_token","or":"X-Postmark-Server-Token","r":true,"t":"`$ANY`","index$":0}],"query":[{"a":true,"k":"query","n":"count","or":"count","r":true,"t":"`$ANY`","index$":0},{"a":true,"k":"query","n":"fromdate","or":"fromdate","r":false,"t":"`$ANY`","index$":1},{"a":true,"k":"query","n":"fromemail","or":"fromemail","r":false,"t":"`$ANY`","index$":2},{"a":true,"k":"query","n":"offset","or":"offset","r":true,"t":"`$INTEGER`","index$":3},{"a":true,"k":"query","n":"recipient","or":"recipient","r":false,"t":"`$ANY`","index$":4},{"a":true,"k":"query","n":"status","or":"status","r":false,"t":"`$ANY`","index$":5},{"a":true,"k":"query","n":"tag","or":"tag","r":false,"t":"`$ANY`","index$":6},{"a":true,"k":"query","n":"todate","or":"todate","r":false,"t":"`$ANY`","index$":7}]},"k":"http","m":"GET","o":"/messages/outbound","q":{"exist":["count","fromdate","fromemail","offset","recipient","status","tag","todate","x_postmark_server_token"]},"r":{},"s":[{"lit":"messages"},{"lit":"outbound"}],"t":{"req":"`reqdata`","res":"`body.Messages`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /stats/outbound","source":"swagger2","version":2},"g":{"header":[{"a":true,"k":"header","n":"x_postmark_server_token","or":"X-Postmark-Server-Token","r":true,"t":"`$ANY`","index$":0}],"query":[{"a":true,"k":"query","n":"fromdate","or":"fromdate","r":false,"t":"`$ANY`","index$":0},{"a":true,"k":"query","n":"tag","or":"tag","r":false,"t":"`$ANY`","index$":1},{"a":true,"k":"query","n":"todate","or":"todate","r":false,"t":"`$ANY`","index$":2}]},"k":"http","m":"GET","o":"/stats/outbound","q":{"exist":["fromdate","tag","todate","x_postmark_server_token"]},"r":{},"s":[{"lit":"stats"},{"lit":"outbound"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"outbound","name__orig":"outbound","Name":"Outbound","name_":"outbound","name-":"outbound","NAME":"OUTBOUND","index$":10}, {"active":true,"entity":"outbound","key$":"BasicOutboundFlow","kind":"basic","name":"BasicOutboundFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"outbound_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"outbound_ref01","srcdatavar":"outbound_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-outbound_ref01"}}],"index$":1}]}, 'Outbound', {"GET /messages/outbound":{"protocol":"http","parameters":[{"name":"X-Postmark-Server-Token","required":true,"description":"The token associated with the Server on which this request will operate.","type":"string","in":"header","index$":0},{"name":"count","description":"Number of messages to return per request. Max 500.","in":"query","required":true,"type":"integer","index$":1},{"name":"offset","description":"Number of messages to skip","required":true,"type":"integer","in":"query","index$":2},{"name":"recipient","description":"Filter by the user who was receiving the email","in":"query","type":"string","format":"email","index$":3},{"name":"fromemail","description":"Filter by the sender email address","in":"query","type":"string","format":"email","index$":4},{"name":"tag","in":"query","description":"Filter by tag","type":"string","index$":5},{"name":"status","in":"query","description":"Filter by status (`queued` or `sent`)","type":"string","enum":["queued","sent"],"index$":6},{"name":"todate","in":"query","description":"Filter messages up to the date specified. e.g. `2014-02-01`","type":"string","format":"date","index$":7},{"name":"fromdate","description":"Filter messages starting from the date specified. e.g. `2014-02-01`","in":"query","type":"string","format":"date","index$":8}]},"GET /stats/outbound":{"protocol":"http","parameters":[{"name":"X-Postmark-Server-Token","required":true,"description":"The token associated with the Server on which this request will operate.","type":"string","in":"header","index$":0},{"name":"tag","in":"query","description":"Filter by tag","type":"string","index$":1},{"name":"fromdate","in":"query","description":"Filter stats starting from the date specified. e.g. `2014-01-01`","type":"string","format":"date","index$":2},{"name":"todate","in":"query","description":"Filter stats up to the date specified. e.g. `2014-02-01`","type":"string","format":"date","index$":3}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let outbound_ref01_data = Object.values(setup.data.existing.outbound)[0] as any

    // LIST
    const outbound_ref01_ent = client.Outbound()
    const outbound_ref01_match: any = {}

    const outbound_ref01_list = (await outbound_ref01_ent.list(outbound_ref01_match)).map((e: any) => e.data())


    // LOAD
    const outbound_ref01_match_dt0: any = {}
    const outbound_ref01_data_dt0 = (await outbound_ref01_ent.load(outbound_ref01_match_dt0)).data()
    assert(null != outbound_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/outbound/OutboundTestData.json')

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
    ['outbound01','outbound02','outbound03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'POSTMARK_TEST_OUTBOUND_ENTID': idmap,
    'POSTMARK_TEST_LIVE': 'FALSE',
    'POSTMARK_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['POSTMARK_TEST_OUTBOUND_ENTID']

  const live = 'TRUE' === env.POSTMARK_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['POSTMARK_TEST_OUTBOUND_ENTID']
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
  
