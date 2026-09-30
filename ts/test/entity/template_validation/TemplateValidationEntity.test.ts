

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


describe('TemplateValidationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when POSTMARK_TEST_LIVE=TRUE.
  afterEach(liveDelay('POSTMARK_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = PostmarkSDK.test()
    const ent = testsdk.TemplateValidation()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.POSTMARK_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'template_validation.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"AllContentIsValid":{"a":true,"h":"All Content Is Valid","n":"AllContentIsValid","r":false,"t":"`$BOOLEAN`","key$":"AllContentIsValid","index$":0},"HtmlBody":{"a":true,"h":"Html Body","n":"HtmlBody","r":false,"t":"`$ANY`","key$":"HtmlBody","index$":1},"Subject":{"a":true,"h":"Subject","n":"Subject","r":false,"t":"`$ANY`","key$":"Subject","index$":2},"SuggestedTemplateModel":{"a":true,"h":"Suggested Template Model","n":"SuggestedTemplateModel","r":false,"t":"`$OBJECT`","key$":"SuggestedTemplateModel","index$":3},"TextBody":{"a":true,"h":"Text Body","n":"TextBody","r":false,"t":"`$ANY`","key$":"TextBody","index$":4}},"name":"template_validation","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /templates/validate","source":"swagger2","version":2},"g":{"header":[{"a":true,"k":"header","n":"x_postmark_server_token","or":"X-Postmark-Server-Token","r":true,"t":"`$ANY`","index$":0}],"query":[{"a":true,"k":"query","n":"body","or":"body","r":false,"t":"`$ANY`","index$":0}]},"k":"http","m":"POST","o":"/templates/validate","q":{"exist":["body","x_postmark_server_token"]},"r":{},"s":[{"lit":"templates"},{"lit":"validate"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"template_validation","name__orig":"template_validation","Name":"TemplateValidation","name_":"template_validation","name-":"template-validation","NAME":"TEMPLATE_VALIDATION","index$":20}, {"active":true,"entity":"template_validation","key$":"BasicTemplateValidationFlow","kind":"basic","name":"BasicTemplateValidationFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"template_validation_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'TemplateValidation', {"POST /templates/validate":{"protocol":"http","parameters":[{"name":"X-Postmark-Server-Token","required":true,"description":"The token associated with the Server on which this request will operate.","type":"string","in":"header","index$":0},{"name":"body","in":"body","schema":{"properties":{"Subject":{"type":"string","description":"The subject content to validate. Must be specified if HtmlBody or\nTextBody are not. See our template language documentation for more\ninformation on the syntax for this field.\n"},"HtmlBody":{"type":"string","description":"The html body content to validate. Must be specified if Subject or\nTextBody are not. See our template language documentation for more\ninformation on the syntax for this field.\n"},"TextBody":{"type":"string","description":"The text body content to validate. Must be specified if HtmlBody or\nSubject are not. See our template language documentation for more\ninformation on the syntax for this field.\n"},"TestRenderModel":{"type":"object","description":"The model to be used when rendering test content."},"InlineCssForHtmlTestRender":{"type":"boolean","default":true,"description":"When HtmlBody is specified, the test render will have style blocks\ninlined as style attributes on matching html elements. You may disable\nthe css inlining behavior by passing false for this parameter.\n"}},"x-ref":"#/definitions/TemplateValidationRequest"},"index$":1}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const template_validation_ref01_ent = client.TemplateValidation()
    let template_validation_ref01_data = setup.data.new.template_validation['template_validation_ref01']

    template_validation_ref01_data = (await template_validation_ref01_ent.create(template_validation_ref01_data)).data()
    assert(null != template_validation_ref01_data)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/template_validation/TemplateValidationTestData.json')

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
    ['template_validation01','template_validation02','template_validation03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'POSTMARK_TEST_TEMPLATE_VALIDATION_ENTID': idmap,
    'POSTMARK_TEST_LIVE': 'FALSE',
    'POSTMARK_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['POSTMARK_TEST_TEMPLATE_VALIDATION_ENTID']

  const live = 'TRUE' === env.POSTMARK_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['POSTMARK_TEST_TEMPLATE_VALIDATION_ENTID']
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
  
