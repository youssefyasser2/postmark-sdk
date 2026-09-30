

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


describe('TemplateEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when POSTMARK_TEST_LIVE=TRUE.
  afterEach(liveDelay('POSTMARK_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = PostmarkSDK.test()
    const ent = testsdk.Template()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.POSTMARK_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'template.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"Active":{"a":true,"h":"Active","n":"Active","r":false,"sh":"Indicates that this template may be used for sending email.","t":"`$BOOLEAN`","key$":"Active","index$":0},"Alias":{"a":true,"h":"Alias","n":"Alias","r":false,"sh":"The user-supplied alias for this template.","t":"`$STRING`","key$":"Alias","index$":1},"AssociatedServerId":{"a":true,"h":"Associated Server Id","n":"AssociatedServerId","r":false,"sh":"The ID of the Server with which this template is associated.","t":"`$INTEGER`","key$":"AssociatedServerId","index$":2},"HtmlBody":{"a":true,"h":"Html Body","n":"HtmlBody","r":false,"sh":"The content to use for the HtmlBody when this template is used to send email.","t":"`$STRING`","key$":"HtmlBody","index$":3},"Name":{"a":true,"h":"Name","n":"Name","r":false,"sh":"The display name for the template.","t":"`$STRING`","key$":"Name","index$":4},"Subject":{"a":true,"h":"Subject","n":"Subject","r":false,"sh":"The content to use for the Subject when this template is used to send email.","t":"`$STRING`","key$":"Subject","index$":5},"TemplateID":{"a":true,"h":"Template Id","n":"TemplateID","r":false,"sh":"The ID associated with the template.","t":"`$INTEGER`","key$":"TemplateID","index$":6},"TemplateId":{"a":true,"fo":"int","h":"Template Id","n":"TemplateId","r":false,"sh":"The associated ID for this template.","t":"`$NUMBER`","key$":"TemplateId","index$":7},"TextBody":{"a":true,"h":"Text Body","n":"TextBody","r":false,"sh":"The content to use for the TextBody when this template is used to send email.","t":"`$STRING`","key$":"TextBody","index$":8},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":9}},"id":{"field":"id","name":"id"},"name":"template","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /templates","source":"swagger2","version":2},"g":{"header":[{"a":true,"k":"header","n":"x_postmark_server_token","or":"X-Postmark-Server-Token","r":true,"t":"`$ANY`","index$":0}],"query":[{"a":true,"k":"query","n":"body","or":"body","r":true,"t":"`$ANY`","index$":0}]},"k":"http","m":"POST","o":"/templates","q":{"exist":["body","x_postmark_server_token"]},"r":{},"s":[{"lit":"templates"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /templates","source":"swagger2","version":2},"g":{"header":[{"a":true,"k":"header","n":"x_postmark_server_token","or":"X-Postmark-Server-Token","r":true,"t":"`$ANY`","index$":0}],"query":[{"a":true,"k":"query","n":"count","or":"Count","r":true,"t":"`$ANY`","index$":0},{"a":true,"k":"query","n":"offset","or":"Offset","r":true,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/templates","q":{"exist":["count","offset","x_postmark_server_token"]},"r":{},"s":[{"lit":"templates"}],"t":{"req":"`reqdata`","res":"`body.Templates API`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /templates/{templateIdOrAlias}","source":"swagger2","version":2},"g":{"header":[{"a":true,"k":"header","n":"x_postmark_server_token","or":"X-Postmark-Server-Token","r":true,"t":"`$ANY`","index$":0}],"params":[{"a":true,"k":"param","n":"id","or":"templateIdOrAlias","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/templates/{templateIdOrAlias}","q":{"exist":["id","x_postmark_server_token"]},"r":{"param":{"templateIdOrAlias":"id"}},"s":[{"lit":"templates"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /templates/{templateIdOrAlias}","source":"swagger2","version":2},"g":{"header":[{"a":true,"k":"header","n":"x_postmark_server_token","or":"X-Postmark-Server-Token","r":true,"t":"`$ANY`","index$":0}],"params":[{"a":true,"k":"param","n":"id","or":"templateIdOrAlias","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/templates/{templateIdOrAlias}","q":{"exist":["id","x_postmark_server_token"]},"r":{"param":{"templateIdOrAlias":"id"}},"s":[{"lit":"templates"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PUT /templates/{templateIdOrAlias}","source":"swagger2","version":2},"g":{"header":[{"a":true,"k":"header","n":"x_postmark_server_token","or":"X-Postmark-Server-Token","r":true,"t":"`$ANY`","index$":0}],"params":[{"a":true,"k":"param","n":"id","or":"templateIdOrAlias","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"body","or":"body","r":true,"t":"`$ANY`","index$":0}]},"k":"http","m":"PUT","o":"/templates/{templateIdOrAlias}","q":{"exist":["body","id","x_postmark_server_token"]},"r":{"param":{"templateIdOrAlias":"id"}},"s":[{"lit":"templates"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"template","name__orig":"template","Name":"Template","name_":"template","name-":"template","NAME":"TEMPLATE","index$":19}, {"active":true,"entity":"template","key$":"BasicTemplateFlow","kind":"basic","name":"BasicTemplateFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"template_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"template_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"template_ref01","srcdatavar":"template_ref01_data","suffix":"_up0","textfield":"Alias"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-template_ref01"}}],"v":[],"index$":2},{"a":true,"d":{},"i":{"ref":"template_ref01","srcdatavar":"template_ref01_data","suffix":"_dt0"},"m":{"id":"template01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-template_ref01"}}],"index$":3},{"a":true,"d":{},"i":{"ref":"template_ref01","suffix":"_rm0"},"m":{"id":"template01"},"o":"remove","s":[],"v":[],"index$":4},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"template_ref01"}}],"index$":5}]}, 'Template', {"POST /templates":{"protocol":"http","parameters":[{"name":"X-Postmark-Server-Token","required":true,"description":"The token associated with the Server on which this request will operate.","type":"string","in":"header","index$":0},{"name":"body","in":"body","required":true,"schema":{"description":"The contents required for creating a new template.","properties":{"Alias":{"type":"string","description":"The optional string identifier for referring to this Template (numbers, letters, and '.', '-', '_' characters, starts with a letter)."},"Name":{"type":"string","description":"The friendly display name for the template."},"Subject":{"type":"string","description":"The Subject template definition for this Template."},"HtmlBody":{"type":"string","description":"The HTML template definition for this Template."},"TextBody":{"type":"string","description":"The Text template definition for this Template."}},"required":["Name","Subject"],"x-ref":"#/definitions/CreateTemplateRequest"},"index$":1}]},"GET /templates":{"protocol":"http","parameters":[{"name":"X-Postmark-Server-Token","required":true,"description":"The token associated with the Server on which this request will operate.","type":"string","in":"header","index$":0},{"name":"Count","in":"query","description":"The number of Templates to return","required":true,"type":"number","format":"int","index$":1},{"name":"Offset","in":"query","description":"The number of Templates to \"skip\" before returning results.","required":true,"type":"number","format":"int","index$":2}]},"GET /templates/{templateIdOrAlias}":{"protocol":"http","parameters":[{"name":"X-Postmark-Server-Token","required":true,"description":"The token associated with the Server on which this request will operate.","type":"string","in":"header","index$":0},{"name":"templateIdOrAlias","in":"path","type":"string","required":true,"description":"The 'TemplateID' or 'Alias' value for the Template you wish to retrieve.","index$":1}]},"DELETE /templates/{templateIdOrAlias}":{"protocol":"http","parameters":[{"name":"X-Postmark-Server-Token","required":true,"description":"The token associated with the Server on which this request will operate.","type":"string","in":"header","index$":0},{"name":"templateIdOrAlias","in":"path","type":"string","required":true,"description":"The 'TemplateID' or 'Alias' value for the Template you wish to delete.","index$":1}]},"PUT /templates/{templateIdOrAlias}":{"protocol":"http","parameters":[{"name":"X-Postmark-Server-Token","required":true,"description":"The token associated with the Server on which this request will operate.","type":"string","in":"header","index$":0},{"name":"templateIdOrAlias","in":"path","type":"string","required":true,"description":"The 'TemplateID' or 'Alias' value for the Template you wish to update.","index$":1},{"name":"body","in":"body","required":true,"schema":{"description":"The contents required for creating a new template.","properties":{"Alias":{"type":"string","description":"The optional string identifier for referring to this Template (numbers, letters, and '.', '-', '_' characters, starts with a letter)."},"Name":{"type":"string","description":"The friendly display name for the template."},"Subject":{"type":"string","description":"The Subject template definition for this Template."},"HtmlBody":{"type":"string","description":"The HTML template definition for this Template."},"TextBody":{"type":"string","description":"The Text template definition for this Template."}},"required":["TemplateId"],"x-ref":"#/definitions/EditTemplateRequest"},"index$":2}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const template_ref01_ent = client.Template()
    let template_ref01_data = setup.data.new.template['template_ref01']

    template_ref01_data = (await template_ref01_ent.create(template_ref01_data)).data()
    assert(null != template_ref01_data.id)


    // LIST
    const template_ref01_match: any = {}

    const template_ref01_list = (await template_ref01_ent.list(template_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(template_ref01_list, { id: template_ref01_data.id })))


    // UPDATE
    const template_ref01_data_up0: any = {}
    template_ref01_data_up0.id = template_ref01_data.id

    const template_ref01_markdef_up0 = { name: 'Alias', value: 'Mark01-template_ref01_' + setup.now }
    ;(template_ref01_data_up0 as any)[template_ref01_markdef_up0.name] = template_ref01_markdef_up0.value

    const template_ref01_resdata_up0 = (await template_ref01_ent.update(template_ref01_data_up0)).data()
    assert(template_ref01_resdata_up0.id === template_ref01_data_up0.id)

    assert((template_ref01_resdata_up0 as any)[template_ref01_markdef_up0.name] === template_ref01_markdef_up0.value)


    // LOAD
    const template_ref01_match_dt0: any = {}
    template_ref01_match_dt0.id = template_ref01_data.id
    const template_ref01_data_dt0 = (await template_ref01_ent.load(template_ref01_match_dt0)).data()
    assert(template_ref01_data_dt0.id === template_ref01_data.id)


    // REMOVE
    const template_ref01_match_rm0: any = { id: template_ref01_data.id }
    await template_ref01_ent.remove(template_ref01_match_rm0)
  

    // LIST
    const template_ref01_match_rt0: any = {}

    const template_ref01_list_rt0 = (await template_ref01_ent.list(template_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(template_ref01_list_rt0, { id: template_ref01_data.id })))


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/template/TemplateTestData.json')

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
    ['template01','template02','template03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'POSTMARK_TEST_TEMPLATE_ENTID': idmap,
    'POSTMARK_TEST_LIVE': 'FALSE',
    'POSTMARK_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['POSTMARK_TEST_TEMPLATE_ENTID']

  const live = 'TRUE' === env.POSTMARK_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['POSTMARK_TEST_TEMPLATE_ENTID']
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
  
