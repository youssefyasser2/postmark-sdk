

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


describe('StatsApiEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when POSTMARK_TEST_LIVE=TRUE.
  afterEach(liveDelay('POSTMARK_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = PostmarkSDK.test()
    const ent = testsdk.StatsApi()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.POSTMARK_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'stats_api.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"Date":{"a":true,"h":"Date","n":"Date","r":false,"t":"`$STRING`","key$":"Date","index$":0},"Days":{"a":true,"h":"Days","n":"Days","r":false,"t":"`$ARRAY`","key$":"Days","index$":1},"Desktop":{"a":true,"h":"Desktop","n":"Desktop","r":false,"t":"`$INTEGER`","key$":"Desktop","index$":2},"HardBounce":{"a":true,"h":"Hard Bounce","n":"HardBounce","r":false,"t":"`$INTEGER`","key$":"HardBounce","index$":3},"Mobile":{"a":true,"h":"Mobile","n":"Mobile","r":false,"t":"`$INTEGER`","key$":"Mobile","index$":4},"Opens":{"a":true,"h":"Opens","n":"Opens","r":false,"t":"`$INTEGER`","key$":"Opens","index$":5},"SMTPApiError":{"a":true,"h":"Smtp Api Error","n":"SMTPApiError","r":false,"t":"`$INTEGER`","key$":"SMTPApiError","index$":6},"SoftBounce":{"a":true,"h":"Soft Bounce","n":"SoftBounce","r":false,"t":"`$INTEGER`","key$":"SoftBounce","index$":7},"SpamComplaint":{"a":true,"h":"Spam Complaint","n":"SpamComplaint","r":false,"t":"`$INTEGER`","key$":"SpamComplaint","index$":8},"Tracked":{"a":true,"h":"Tracked","n":"Tracked","r":false,"t":"`$INTEGER`","key$":"Tracked","index$":9},"Transient":{"a":true,"h":"Transient","n":"Transient","r":false,"t":"`$INTEGER`","key$":"Transient","index$":10},"Unique":{"a":true,"h":"Unique","n":"Unique","r":false,"t":"`$INTEGER`","key$":"Unique","index$":11},"Unknown":{"a":true,"h":"Unknown","n":"Unknown","r":false,"t":"`$INTEGER`","key$":"Unknown","index$":12},"WebMail":{"a":true,"h":"Web Mail","n":"WebMail","r":false,"t":"`$INTEGER`","key$":"WebMail","index$":13}},"name":"stats_api","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /stats/outbound/bounces","source":"swagger2","version":2},"g":{"header":[{"a":true,"k":"header","n":"x_postmark_server_token","or":"X-Postmark-Server-Token","r":true,"t":"`$ANY`","index$":0}],"query":[{"a":true,"k":"query","n":"fromdate","or":"fromdate","r":false,"t":"`$ANY`","index$":0},{"a":true,"k":"query","n":"tag","or":"tag","r":false,"t":"`$ANY`","index$":1},{"a":true,"k":"query","n":"todate","or":"todate","r":false,"t":"`$ANY`","index$":2}]},"k":"http","m":"GET","o":"/stats/outbound/bounces","q":{"exist":["fromdate","tag","todate","x_postmark_server_token"]},"r":{},"s":[{"lit":"stats"},{"lit":"outbound"},{"lit":"bounces"}],"t":{"req":"`reqdata`","res":"`body.Days`"},"index$":0},{"a":true,"co":{"id":"GET /stats/outbound/opens","source":"swagger2","version":2},"g":{"header":[{"a":true,"k":"header","n":"x_postmark_server_token","or":"X-Postmark-Server-Token","r":true,"t":"`$ANY`","index$":0}],"query":[{"a":true,"k":"query","n":"fromdate","or":"fromdate","r":false,"t":"`$ANY`","index$":0},{"a":true,"k":"query","n":"tag","or":"tag","r":false,"t":"`$ANY`","index$":1},{"a":true,"k":"query","n":"todate","or":"todate","r":false,"t":"`$ANY`","index$":2}]},"k":"http","m":"GET","o":"/stats/outbound/opens","q":{"exist":["fromdate","tag","todate","x_postmark_server_token"]},"r":{},"s":[{"lit":"stats"},{"lit":"outbound"},{"lit":"opens"}],"t":{"req":"`reqdata`","res":"`body.Days`"},"index$":1},{"a":true,"co":{"id":"GET /stats/outbound/opens/emailclients","source":"swagger2","version":2},"g":{"header":[{"a":true,"k":"header","n":"x_postmark_server_token","or":"X-Postmark-Server-Token","r":true,"t":"`$ANY`","index$":0}],"query":[{"a":true,"k":"query","n":"fromdate","or":"fromdate","r":false,"t":"`$ANY`","index$":0},{"a":true,"k":"query","n":"tag","or":"tag","r":false,"t":"`$ANY`","index$":1},{"a":true,"k":"query","n":"todate","or":"todate","r":false,"t":"`$ANY`","index$":2}]},"k":"http","m":"GET","o":"/stats/outbound/opens/emailclients","q":{"exist":["fromdate","tag","todate","x_postmark_server_token"]},"r":{},"s":[{"lit":"stats"},{"lit":"outbound"},{"lit":"opens"},{"lit":"emailclients"}],"t":{"req":"`reqdata`","res":"`body.Days`"},"index$":2},{"a":true,"co":{"id":"GET /stats/outbound/opens/platforms","source":"swagger2","version":2},"g":{"header":[{"a":true,"k":"header","n":"x_postmark_server_token","or":"X-Postmark-Server-Token","r":true,"t":"`$ANY`","index$":0}],"query":[{"a":true,"k":"query","n":"fromdate","or":"fromdate","r":false,"t":"`$ANY`","index$":0},{"a":true,"k":"query","n":"tag","or":"tag","r":false,"t":"`$ANY`","index$":1},{"a":true,"k":"query","n":"todate","or":"todate","r":false,"t":"`$ANY`","index$":2}]},"k":"http","m":"GET","o":"/stats/outbound/opens/platforms","q":{"exist":["fromdate","tag","todate","x_postmark_server_token"]},"r":{},"s":[{"lit":"stats"},{"lit":"outbound"},{"lit":"opens"},{"lit":"platforms"}],"t":{"req":"`reqdata`","res":"`body.Days`"},"index$":3},{"a":true,"co":{"id":"GET /stats/outbound/spam","source":"swagger2","version":2},"g":{"header":[{"a":true,"k":"header","n":"x_postmark_server_token","or":"X-Postmark-Server-Token","r":true,"t":"`$ANY`","index$":0}],"query":[{"a":true,"k":"query","n":"fromdate","or":"fromdate","r":false,"t":"`$ANY`","index$":0},{"a":true,"k":"query","n":"tag","or":"tag","r":false,"t":"`$ANY`","index$":1},{"a":true,"k":"query","n":"todate","or":"todate","r":false,"t":"`$ANY`","index$":2}]},"k":"http","m":"GET","o":"/stats/outbound/spam","q":{"exist":["fromdate","tag","todate","x_postmark_server_token"]},"r":{},"s":[{"lit":"stats"},{"lit":"outbound"},{"lit":"spam"}],"t":{"req":"`reqdata`","res":"`body.Days`"},"index$":4},{"a":true,"co":{"id":"GET /stats/outbound/tracked","source":"swagger2","version":2},"g":{"header":[{"a":true,"k":"header","n":"x_postmark_server_token","or":"X-Postmark-Server-Token","r":true,"t":"`$ANY`","index$":0}],"query":[{"a":true,"k":"query","n":"fromdate","or":"fromdate","r":false,"t":"`$ANY`","index$":0},{"a":true,"k":"query","n":"tag","or":"tag","r":false,"t":"`$ANY`","index$":1},{"a":true,"k":"query","n":"todate","or":"todate","r":false,"t":"`$ANY`","index$":2}]},"k":"http","m":"GET","o":"/stats/outbound/tracked","q":{"exist":["fromdate","tag","todate","x_postmark_server_token"]},"r":{},"s":[{"lit":"stats"},{"lit":"outbound"},{"lit":"tracked"}],"t":{"req":"`reqdata`","res":"`body.Days`"},"index$":5}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /stats/outbound/clicks/browserfamilies","source":"swagger2","version":2},"g":{"header":[{"a":true,"k":"header","n":"x_postmark_server_token","or":"X-Postmark-Server-Token","r":true,"t":"`$ANY`","index$":0}],"query":[{"a":true,"k":"query","n":"fromdate","or":"fromdate","r":false,"t":"`$ANY`","index$":0},{"a":true,"k":"query","n":"tag","or":"tag","r":false,"t":"`$ANY`","index$":1},{"a":true,"k":"query","n":"todate","or":"todate","r":false,"t":"`$ANY`","index$":2}]},"k":"http","m":"GET","o":"/stats/outbound/clicks/browserfamilies","q":{"exist":["fromdate","tag","todate","x_postmark_server_token"]},"r":{},"s":[{"lit":"stats"},{"lit":"outbound"},{"lit":"clicks"},{"lit":"browserfamilies"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"stats_api","name__orig":"stats_api","Name":"StatsApi","name_":"stats_api","name-":"stats-api","NAME":"STATS_API","index$":18}, {"active":true,"entity":"stats_api","key$":"BasicStatsApiFlow","kind":"basic","name":"BasicStatsApiFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"stats_api_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"stats_api_ref01","srcdatavar":"stats_api_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-stats_api_ref01"}}],"index$":1}]}, 'StatsApi', {"GET /stats/outbound/bounces":{"protocol":"http","parameters":[{"name":"X-Postmark-Server-Token","required":true,"description":"The token associated with the Server on which this request will operate.","type":"string","in":"header","index$":0},{"name":"tag","description":"Filter by tag","in":"query","type":"string","index$":1},{"name":"fromdate","in":"query","description":"Filter stats starting from the date specified. e.g. `2014-01-01`","type":"string","format":"date","index$":2},{"name":"todate","in":"query","description":"Filter stats up to the date specified. e.g. `2014-02-01`","type":"string","format":"date","index$":3}]},"GET /stats/outbound/opens":{"protocol":"http","parameters":[{"name":"X-Postmark-Server-Token","required":true,"description":"The token associated with the Server on which this request will operate.","type":"string","in":"header","index$":0},{"name":"tag","description":"Filter by tag","in":"query","type":"string","index$":1},{"name":"fromdate","in":"query","description":"Filter stats starting from the date specified. e.g. `2014-01-01`","type":"string","format":"date","index$":2},{"name":"todate","description":"Filter stats up to the date specified. e.g. `2014-02-01`","in":"query","type":"string","format":"date","index$":3}]},"GET /stats/outbound/opens/emailclients":{"protocol":"http","parameters":[{"name":"X-Postmark-Server-Token","required":true,"description":"The token associated with the Server on which this request will operate.","type":"string","in":"header","index$":0},{"name":"tag","description":"Filter by tag","in":"query","type":"string","index$":1},{"name":"fromdate","in":"query","description":"Filter stats starting from the date specified. e.g. `2014-01-01`","type":"string","format":"date","index$":2},{"name":"todate","description":"Filter stats up to the date specified. e.g. `2014-02-01`","in":"query","type":"string","format":"date","index$":3}]},"GET /stats/outbound/opens/platforms":{"protocol":"http","parameters":[{"name":"X-Postmark-Server-Token","required":true,"description":"The token associated with the Server on which this request will operate.","type":"string","in":"header","index$":0},{"name":"tag","description":"Filter by tag","in":"query","type":"string","index$":1},{"name":"fromdate","in":"query","description":"Filter stats starting from the date specified. e.g. `2014-01-01`","type":"string","format":"date","index$":2},{"name":"todate","description":"Filter stats up to the date specified. e.g. `2014-02-01`","in":"query","type":"string","format":"date","index$":3}]},"GET /stats/outbound/spam":{"protocol":"http","parameters":[{"name":"X-Postmark-Server-Token","required":true,"description":"The token associated with the Server on which this request will operate.","type":"string","in":"header","index$":0},{"name":"tag","in":"query","description":"Filter by tag","type":"string","index$":1},{"name":"fromdate","in":"query","type":"string","description":"Filter stats starting from the date specified. e.g. `2014-01-01`","format":"date","index$":2},{"name":"todate","in":"query","description":"Filter stats up to the date specified. e.g. `2014-02-01`","type":"string","format":"date","index$":3}]},"GET /stats/outbound/tracked":{"protocol":"http","parameters":[{"name":"X-Postmark-Server-Token","required":true,"description":"The token associated with the Server on which this request will operate.","type":"string","in":"header","index$":0},{"name":"tag","in":"query","description":"Filter by tag","type":"string","index$":1},{"name":"fromdate","in":"query","type":"string","description":"Filter stats starting from the date specified. e.g. `2014-01-01`","format":"date","index$":2},{"name":"todate","in":"query","description":"Filter stats starting from the date specified. e.g. `2014-01-01`","type":"string","format":"date","index$":3}]},"GET /stats/outbound/clicks/browserfamilies":{"protocol":"http","parameters":[{"name":"X-Postmark-Server-Token","required":true,"description":"The token associated with the Server on which this request will operate.","type":"string","in":"header","index$":0},{"name":"tag","description":"Filter by tag","in":"query","type":"string","index$":1},{"name":"fromdate","in":"query","description":"Filter stats starting from the date specified. e.g. `2014-01-01`","type":"string","format":"date","index$":2},{"name":"todate","description":"Filter stats up to the date specified. e.g. `2014-02-01`","in":"query","type":"string","format":"date","index$":3}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let stats_api_ref01_data = Object.values(setup.data.existing.stats_api)[0] as any

    // LIST
    const stats_api_ref01_ent = client.StatsApi()
    const stats_api_ref01_match: any = {}

    const stats_api_ref01_list = (await stats_api_ref01_ent.list(stats_api_ref01_match)).map((e: any) => e.data())


    // LOAD
    const stats_api_ref01_match_dt0: any = {}
    const stats_api_ref01_data_dt0 = (await stats_api_ref01_ent.load(stats_api_ref01_match_dt0)).data()
    assert(null != stats_api_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/stats_api/StatsApiTestData.json')

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
    ['stats_api01','stats_api02','stats_api03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'POSTMARK_TEST_STATS_API_ENTID': idmap,
    'POSTMARK_TEST_LIVE': 'FALSE',
    'POSTMARK_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['POSTMARK_TEST_STATS_API_ENTID']

  const live = 'TRUE' === env.POSTMARK_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['POSTMARK_TEST_STATS_API_ENTID']
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
  
