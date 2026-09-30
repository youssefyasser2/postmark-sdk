

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


describe('SendEmailEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when POSTMARK_TEST_LIVE=TRUE.
  afterEach(liveDelay('POSTMARK_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = PostmarkSDK.test()
    const ent = testsdk.SendEmail()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.POSTMARK_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'send_email.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"ErrorCode":{"a":true,"h":"Error Code","n":"ErrorCode","r":false,"t":"`$INTEGER`","key$":"ErrorCode","index$":0},"Message":{"a":true,"h":"Message","n":"Message","r":false,"t":"`$STRING`","key$":"Message","index$":1},"MessageID":{"a":true,"h":"Message Id","n":"MessageID","r":false,"t":"`$STRING`","key$":"MessageID","index$":2},"SubmittedAt":{"a":true,"fo":"date-time","h":"Submitted At","n":"SubmittedAt","r":false,"t":"`$STRING`","key$":"SubmittedAt","index$":3},"To":{"a":true,"h":"To","n":"To","r":false,"t":"`$STRING`","key$":"To","index$":4}},"name":"send_email","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /email","source":"swagger2","version":2},"g":{"header":[{"a":true,"k":"header","n":"x_postmark_server_token","or":"X-Postmark-Server-Token","r":true,"t":"`$ANY`","index$":0}],"query":[{"a":true,"k":"query","n":"body","or":"body","r":false,"t":"`$ANY`","index$":0}]},"k":"http","m":"POST","o":"/email","q":{"exist":["body","x_postmark_server_token"]},"r":{},"s":[{"lit":"email"}],"t":{"req":"`reqdata.body`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"POST /email/withTemplate","source":"swagger2","version":2},"g":{"header":[{"a":true,"k":"header","n":"x_postmark_server_token","or":"X-Postmark-Server-Token","r":true,"t":"`$ANY`","index$":0}],"query":[{"a":true,"k":"query","n":"body","or":"body","r":true,"t":"`$ANY`","index$":0}]},"k":"http","m":"POST","o":"/email/withTemplate","q":{"exist":["body","x_postmark_server_token"]},"r":{},"s":[{"lit":"email"},{"lit":"withTemplate"}],"t":{"req":"`reqdata.body`","res":"`body`"},"index$":1}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"send_email","name__orig":"send_email","Name":"SendEmail","name_":"send_email","name-":"send-email","NAME":"SEND_EMAIL","index$":14}, {"active":true,"entity":"send_email","key$":"BasicSendEmailFlow","kind":"basic","name":"BasicSendEmailFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"send_email_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'SendEmail', {"POST /email":{"protocol":"http","parameters":[{"name":"X-Postmark-Server-Token","required":true,"description":"The token associated with the Server on which this request will operate.","type":"string","in":"header","index$":0},{"name":"body","in":"body","schema":{"properties":{"From":{"description":"The sender email address. Must have a registered and confirmed Sender Signature.","type":"string"},"To":{"description":"Recipient email address. Multiple addresses are comma seperated. Max 50.","type":"string"},"Cc":{"description":"Recipient email address. Multiple addresses are comma seperated. Max 50.","type":"string"},"Bcc":{"description":"Bcc recipient email address. Multiple addresses are comma seperated. Max 50.","type":"string"},"Subject":{"description":"Email Subject","type":"string"},"Tag":{"description":"Email tag that allows you to categorize outgoing emails and get detailed statistics.","type":"string"},"HtmlBody":{"description":"If no TextBody specified HTML email message","type":"string"},"TextBody":{"description":"If no HtmlBody specified Plain text email message","type":"string"},"ReplyTo":{"description":"Reply To override email address. Defaults to the Reply To set in the sender signature.","type":"string"},"TrackOpens":{"description":"Activate open tracking for this email.","type":"boolean"},"TrackLinks":{"description":"Replace links in content to enable \"click tracking\" stats. Default is 'null', which uses the server's LinkTracking setting'.","type":"string","enum":["None","HtmlAndText","HtmlOnly","TextOnly"]},"Headers":{"type":"array","items":{"description":"A single header for an email message.","properties":{"Name":{"description":"The header's name.","type":"string"},"Value":{"description":"The header's value.","type":"string"}},"x-ref":"#/definitions/MessageHeader"},"x-ref":"#/definitions/HeaderCollection"},"Attachments":{"type":"array","items":{"description":"An attachment for an email message.","properties":{"Name":{"type":"string"},"Content":{"type":"string"},"ContentType":{"type":"string"},"ContentID":{"type":"string"}},"x-ref":"#/definitions/Attachment"},"x-ref":"#/definitions/AttachmentCollection"}},"x-ref":"#/definitions/SendEmailRequest"},"index$":1}]},"POST /email/withTemplate":{"protocol":"http","parameters":[{"name":"X-Postmark-Server-Token","required":true,"description":"The token associated with the Server on which this request will operate.","type":"string","in":"header","index$":0},{"name":"body","in":"body","required":true,"schema":{"properties":{"TemplateId":{"description":"Required if 'TemplateAlias' is not specified.","type":"integer"},"TemplateAlias":{"description":"Required if 'TemplateId' is not specified.","type":"string"},"TemplateModel":{"type":"object"},"InlineCss":{"type":"boolean","default":true},"From":{"type":"string","format":"email"},"To":{"type":"string","format":"email"},"Cc":{"type":"string","format":"email"},"Bcc":{"type":"string","format":"email"},"Tag":{"type":"string"},"ReplyTo":{"type":"string"},"Headers":{"type":"array","items":{"description":"A single header for an email message.","properties":{"Name":{"description":"The header's name.","type":"string"},"Value":{"description":"The header's value.","type":"string"}},"x-ref":"#/definitions/MessageHeader"},"x-ref":"#/definitions/HeaderCollection"},"TrackOpens":{"description":"Activate open tracking for this email.","type":"boolean"},"TrackLinks":{"description":"Replace links in content to enable \"click tracking\" stats. Default is 'null', which uses the server's LinkTracking setting'.","type":"string","enum":["None","HtmlAndText","HtmlOnly","TextOnly"]},"Attachments":{"type":"array","items":{"description":"An attachment for an email message.","properties":{"Name":{"type":"string"},"Content":{"type":"string"},"ContentType":{"type":"string"},"ContentID":{"type":"string"}},"x-ref":"#/definitions/Attachment"},"x-ref":"#/definitions/AttachmentCollection"}},"required":["TemplateId","TemplateAlias","TemplateModel","To","From"],"x-ref":"#/definitions/EmailWithTemplateRequest"},"index$":1}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const send_email_ref01_ent = client.SendEmail()
    let send_email_ref01_data = setup.data.new.send_email['send_email_ref01']

    send_email_ref01_data = (await send_email_ref01_ent.create(send_email_ref01_data)).data()
    assert(null != send_email_ref01_data)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/send_email/SendEmailTestData.json')

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
    ['send_email01','send_email02','send_email03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'POSTMARK_TEST_SEND_EMAIL_ENTID': idmap,
    'POSTMARK_TEST_LIVE': 'FALSE',
    'POSTMARK_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['POSTMARK_TEST_SEND_EMAIL_ENTID']

  const live = 'TRUE' === env.POSTMARK_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['POSTMARK_TEST_SEND_EMAIL_ENTID']
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
  
