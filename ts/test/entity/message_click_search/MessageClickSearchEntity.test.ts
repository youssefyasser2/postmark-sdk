

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


describe('MessageClickSearchEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when POSTMARK_TEST_LIVE=TRUE.
  afterEach(liveDelay('POSTMARK_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = PostmarkSDK.test()
    const ent = testsdk.MessageClickSearch()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.POSTMARK_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'message_click_search.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"ClickLocation":{"a":true,"h":"Click Location","n":"ClickLocation","r":false,"t":"`$STRING`","key$":"ClickLocation","index$":0},"Clicks":{"a":true,"h":"Clicks","n":"Clicks","r":false,"t":"`$ARRAY`","key$":"Clicks","index$":1},"Client":{"a":true,"h":"Client","n":"Client","r":false,"t":"`$ANY`","key$":"Client","index$":2},"Geo":{"a":true,"h":"Geo","n":"Geo","r":false,"t":"`$ANY`","key$":"Geo","index$":3},"MessageID":{"a":true,"h":"Message Id","n":"MessageID","r":false,"t":"`$STRING`","key$":"MessageID","index$":4},"OS":{"a":true,"h":"Os","n":"OS","r":false,"t":"`$ANY`","key$":"OS","index$":5},"OriginalLink":{"a":true,"h":"Original Link","n":"OriginalLink","r":false,"t":"`$STRING`","key$":"OriginalLink","index$":6},"Platform":{"a":true,"h":"Platform","n":"Platform","r":false,"t":"`$STRING`","key$":"Platform","index$":7},"ReceivedAt":{"a":true,"fo":"date-time","h":"Received At","n":"ReceivedAt","r":false,"t":"`$STRING`","key$":"ReceivedAt","index$":8},"Recipient":{"a":true,"fo":"email","h":"Recipient","n":"Recipient","r":false,"t":"`$STRING`","key$":"Recipient","index$":9},"Tag":{"a":true,"h":"Tag","n":"Tag","r":false,"t":"`$STRING`","key$":"Tag","index$":10},"TotalCount":{"a":true,"h":"Total Count","n":"TotalCount","r":false,"t":"`$INTEGER`","key$":"TotalCount","index$":11},"UserAgent":{"a":true,"h":"User Agent","n":"UserAgent","r":false,"t":"`$STRING`","key$":"UserAgent","index$":12}},"name":"message_click_search","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /messages/outbound/clicks","source":"swagger2","version":2},"g":{"header":[{"a":true,"k":"header","n":"x_postmark_server_token","or":"X-Postmark-Server-Token","r":true,"t":"`$ANY`","index$":0}],"query":[{"a":true,"k":"query","n":"city","or":"city","r":false,"t":"`$ANY`","index$":0},{"a":true,"k":"query","n":"client_company","or":"client_company","r":false,"t":"`$ANY`","index$":1},{"a":true,"k":"query","n":"client_family","or":"client_family","r":false,"t":"`$ANY`","index$":2},{"a":true,"k":"query","n":"client_name","or":"client_name","r":false,"t":"`$ANY`","index$":3},{"a":true,"k":"query","n":"count","or":"count","r":true,"t":"`$ANY`","index$":4},{"a":true,"k":"query","n":"country","or":"country","r":false,"t":"`$ANY`","index$":5},{"a":true,"k":"query","n":"offset","or":"offset","r":true,"t":"`$INTEGER`","index$":6},{"a":true,"k":"query","n":"os_company","or":"os_company","r":false,"t":"`$ANY`","index$":7},{"a":true,"k":"query","n":"os_family","or":"os_family","r":false,"t":"`$ANY`","index$":8},{"a":true,"k":"query","n":"os_name","or":"os_name","r":false,"t":"`$ANY`","index$":9},{"a":true,"k":"query","n":"platform","or":"platform","r":false,"t":"`$ANY`","index$":10},{"a":true,"k":"query","n":"recipient","or":"recipient","r":false,"t":"`$ANY`","index$":11},{"a":true,"k":"query","n":"region","or":"region","r":false,"t":"`$ANY`","index$":12},{"a":true,"k":"query","n":"tag","or":"tag","r":false,"t":"`$ANY`","index$":13}]},"k":"http","m":"GET","o":"/messages/outbound/clicks","q":{"exist":["city","client_company","client_family","client_name","count","country","offset","os_company","os_family","os_name","platform","recipient","region","tag","x_postmark_server_token"]},"r":{},"s":[{"lit":"messages"},{"lit":"outbound"},{"lit":"clicks"}],"t":{"req":"`reqdata`","res":"`body.Clicks`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /messages/outbound/clicks/{messageid}","source":"swagger2","version":2},"g":{"header":[{"a":true,"k":"header","n":"x_postmark_server_token","or":"X-Postmark-Server-Token","r":true,"t":"`$ANY`","index$":0}],"params":[{"a":true,"k":"param","n":"messageid","or":"messageid","r":true,"t":"`$ANY`","index$":0}],"query":[{"a":true,"k":"query","n":"count","or":"count","r":true,"t":"`$ANY`","index$":0},{"a":true,"k":"query","n":"offset","or":"offset","r":true,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/messages/outbound/clicks/{messageid}","q":{"exist":["count","messageid","offset","x_postmark_server_token"]},"r":{},"s":[{"lit":"messages"},{"lit":"outbound"},{"lit":"clicks"},{"var":"messageid"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"message_click_search","name__orig":"message_click_search","Name":"MessageClickSearch","name_":"message_click_search","name-":"message-click-search","NAME":"MESSAGE_CLICK_SEARCH","index$":8}, {"active":true,"entity":"message_click_search","key$":"BasicMessageClickSearchFlow","kind":"basic","name":"BasicMessageClickSearchFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"message_click_search_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"message_click_search_ref01","srcdatavar":"message_click_search_ref01_data","suffix":"_dt0"},"m":{"id":"message_click_search01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-message_click_search_ref01"}}],"index$":1}]}, 'MessageClickSearch', {"GET /messages/outbound/clicks":{"protocol":"http","parameters":[{"name":"X-Postmark-Server-Token","required":true,"description":"The token associated with the Server on which this request will operate.","type":"string","in":"header","index$":0},{"name":"count","in":"query","description":"Number of message clicks to return per request. Max 500.","type":"integer","required":true,"index$":1},{"name":"offset","description":"Number of messages to skip","in":"query","type":"integer","required":true,"index$":2},{"name":"recipient","description":"Filter by To, Cc, Bcc","in":"query","type":"string","required":false,"index$":3},{"name":"tag","description":"Filter by tag","in":"query","type":"string","required":false,"index$":4},{"name":"client_name","description":"Filter by client name, i.e. Outlook, Gmail","in":"query","type":"string","required":false,"index$":5},{"name":"client_company","description":"Filter by company, i.e. Microsoft, Apple, Google","in":"query","type":"string","required":false,"index$":6},{"name":"client_family","description":"Filter by client family, i.e. OS X, Chrome","in":"query","type":"string","required":false,"index$":7},{"name":"os_name","description":"Filter by full OS name and specific version, i.e. OS X 10.9 Mavericks, Windows 7","in":"query","type":"string","required":false,"index$":8},{"name":"os_family","description":"Filter by kind of OS used without specific version, i.e. OS X, Windows","in":"query","type":"string","required":false,"index$":9},{"name":"os_company","description":"Filter by company which produced the OS, i.e. Apple Computer, Inc., Microsoft Corporation","in":"query","type":"string","required":false,"index$":10},{"name":"platform","description":"Filter by platform, i.e. webmail, desktop, mobile","in":"query","type":"string","required":false,"index$":11},{"name":"country","description":"Filter by country messages were opened in, i.e. Denmark, Russia","in":"query","type":"string","required":false,"index$":12},{"name":"region","description":"Filter by full name of region messages were opened in, i.e. Moscow, New York","in":"query","type":"string","required":false,"index$":13},{"name":"city","description":"Filter by full name of region messages were opened in, i.e. Moscow, New York","in":"query","type":"string","required":false,"index$":14}]},"GET /messages/outbound/clicks/{messageid}":{"protocol":"http","parameters":[{"name":"X-Postmark-Server-Token","required":true,"description":"The token associated with the Server on which this request will operate.","type":"string","in":"header","index$":0},{"name":"messageid","description":"The ID of the Outbound Message for which click statistics should be retrieved.","in":"path","type":"string","required":true,"index$":1},{"name":"count","in":"query","default":1,"description":"Number of message clicks to return per request. Max 500.","type":"integer","required":true,"minimum":1,"maximum":500,"index$":2},{"name":"offset","in":"query","description":"Number of messages to skip.","type":"integer","required":true,"minimum":0,"default":0,"index$":3}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let message_click_search_ref01_data = Object.values(setup.data.existing.message_click_search)[0] as any

    // LIST
    const message_click_search_ref01_ent = client.MessageClickSearch()
    const message_click_search_ref01_match: any = {}

    const message_click_search_ref01_list = (await message_click_search_ref01_ent.list(message_click_search_ref01_match)).map((e: any) => e.data())



  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/message_click_search/MessageClickSearchTestData.json')

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
    ['message_click_search01','message_click_search02','message_click_search03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'POSTMARK_TEST_MESSAGE_CLICK_SEARCH_ENTID': idmap,
    'POSTMARK_TEST_LIVE': 'FALSE',
    'POSTMARK_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['POSTMARK_TEST_MESSAGE_CLICK_SEARCH_ENTID']

  const live = 'TRUE' === env.POSTMARK_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['POSTMARK_TEST_MESSAGE_CLICK_SEARCH_ENTID']
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
  
