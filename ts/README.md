# Postmark TypeScript SDK



The TypeScript SDK for the Postmark API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Bounce()` — each with a small set of operations (`list`, `load`, `create`, `update`, `remove`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Also generated from this model: `py` — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/postmark-sdk/releases)), or from a
clone, which carries the compiled `dist/`:

```bash
git clone https://github.com/voxgig-sdk/postmark-sdk
npm install ./postmark-sdk/ts
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { PostmarkSDK } from '@voxgig-sdk/postmark-sdk'

const client = new PostmarkSDK()
```

### 2. List bounce records

`list()` resolves to an array of Bounce ENTITIES — every operation
resolves to entities, not raw records. Iterate them directly, and call
`.data()` on one for the record it holds:

```ts
const bounces = await client.Bounce().list({ count: "example", offset: 1 })

for (const bounce of bounces) {
  console.log(bounce)
}
```

### 3. Load a bounce

`load()` returns the entity directly and throws on failure:

```ts
try {
  const bounce = await client.Bounce().load({ id: 'example_id' })
  console.log(bounce)
} catch (err) {
  console.error('load failed:', err)
}
```

### 4. Create, update, and remove

```ts
// Update
const updated = await client.Bounce().update({
  id: 'example_id',
  BouncedAt: 'example_BouncedAt',
  CanActivate: true,
})

```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const statsapis = await client.StatsApi().list()
  console.log(statsapis)
} catch (err) {
  console.error('list failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
value or an `Error`, so check the result before using it:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (result instanceof Error) {
  throw result
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result instanceof Error) {
  throw result
}
if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = PostmarkSDK.test()

const statsapi = await client.StatsApi().list()
// statsapi is the entity, populated with mock response data
// — call statsapi.data() for the record itself
console.log(statsapi)
```

You can also use the instance method:

```ts
const client = new PostmarkSDK()
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.StatsApi()

// First call runs the operation and stores its result
await entity.list()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new PostmarkSDK({
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
POSTMARK_TEST_LIVE=TRUE
```

Then run:

```bash
cd ts && npm test
```

Live entity tests continue independent operations after errors and attempt
supported cleanup. Their final result reports failures and missing prerequisites
after the remaining work completes. The model and test inputs determine which
API operations the generated scenarios cover.


## Reference

### PostmarkSDK

#### Constructor

```ts
new PostmarkSDK(options?: {
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Bounce(data?)` | `BounceEntity` | Create a Bounce entity instance. |
| `BounceDump(data?)` | `BounceDumpEntity` | Create a BounceDump entity instance. |
| `Bypass(data?)` | `BypassEntity` | Create a Bypass entity instance. |
| `DeliveryStat(data?)` | `DeliveryStatEntity` | Create a DeliveryStat entity instance. |
| `Dynamic(data?)` | `DynamicEntity` | Create a Dynamic entity instance. |
| `Inbound(data?)` | `InboundEntity` | Create an Inbound entity instance. |
| `InboundMessageFullDetail(data?)` | `InboundMessageFullDetailEntity` | Create an InboundMessageFullDetail entity instance. |
| `Inboundrule(data?)` | `InboundruleEntity` | Create an Inboundrule entity instance. |
| `MessageClickSearch(data?)` | `MessageClickSearchEntity` | Create a MessageClickSearch entity instance. |
| `MessageOpenSearch(data?)` | `MessageOpenSearchEntity` | Create a MessageOpenSearch entity instance. |
| `Outbound(data?)` | `OutboundEntity` | Create an Outbound entity instance. |
| `OutboundMessageDetail(data?)` | `OutboundMessageDetailEntity` | Create an OutboundMessageDetail entity instance. |
| `OutboundMessageDump(data?)` | `OutboundMessageDumpEntity` | Create an OutboundMessageDump entity instance. |
| `Retry(data?)` | `RetryEntity` | Create a Retry entity instance. |
| `SendEmail(data?)` | `SendEmailEntity` | Create a SendEmail entity instance. |
| `SendEmailBatch(data?)` | `SendEmailBatchEntity` | Create a SendEmailBatch entity instance. |
| `SentCount(data?)` | `SentCountEntity` | Create a SentCount entity instance. |
| `Server(data?)` | `ServerEntity` | Create a Server entity instance. |
| `StatsApi(data?)` | `StatsApiEntity` | Create a StatsApi entity instance. |
| `Template(data?)` | `TemplateEntity` | Create a Template entity instance. |
| `TemplateValidation(data?)` | `TemplateValidationEntity` | Create a TemplateValidation entity instance. |
| `tester(testopts?, sdkopts?)` | `PostmarkSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `PostmarkSDK.test(testopts?, sdkopts?)` | `PostmarkSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria. |
| `create` | `create(reqdata?, ctrl?): Promise<Entity>` | Create a new entity. |
| `update` | `update(reqdata?, ctrl?): Promise<Entity>` | Update an existing entity. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<void>` | Remove an entity. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): PostmarkSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load`, `create` and `update` resolve to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).
- `remove` resolves to `void`.

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### Bounce

| Field | Description |
| --- | --- |
| `BouncedAt` |  |
| `CanActivate` |  |
| `Content` |  |
| `Description` |  |
| `Details` |  |
| `DumpAvailable` |  |
| `Email` |  |
| `ID` |  |
| `Inactive` |  |
| `MessageID` |  |
| `Name` |  |
| `Subject` |  |
| `Tag` |  |
| `Type` |  |
| `TypeCode` |  |
| `id` |  |

Operations: list, load, update.

API path: `/bounces`

#### BounceDump

| Field | Description |
| --- | --- |
| `Body` | Raw source of bounce. |
| `id` |  |

Operations: load.

API path: `/bounces/{bounceid}/dump`

#### Bypass

| Field | Description |
| --- | --- |
| `ErrorCode` |  |
| `Message` |  |

Operations: update.

API path: `/messages/inbound/{messageid}/bypass`

#### DeliveryStat

| Field | Description |
| --- | --- |
| `Count` |  |
| `Name` |  |
| `Type` |  |

Operations: list.

API path: `/deliverystats`

#### Dynamic

| Field | Description |
| --- | --- |

Operations: load.

API path: `/stats/outbound/clicks`

#### Inbound

| Field | Description |
| --- | --- |
| `Attachments` |  |
| `Cc` |  |
| `CcFull` |  |
| `Date` |  |
| `From` |  |
| `FromFull` |  |
| `FromName` |  |
| `MailboxHash` |  |
| `MessageID` |  |
| `OriginalRecipient` |  |
| `ReplyTo` |  |
| `Status` |  |
| `Subject` |  |
| `Tag` |  |
| `To` |  |
| `ToFull` |  |

Operations: list.

API path: `/messages/inbound`

#### InboundMessageFullDetail

| Field | Description |
| --- | --- |
| `Attachments` |  |
| `BlockedReason` |  |
| `Cc` |  |
| `CcFull` |  |
| `Date` |  |
| `From` |  |
| `FromFull` |  |
| `FromName` |  |
| `Headers` |  |
| `HtmlBody` |  |
| `MailboxHash` |  |
| `MessageID` |  |
| `OriginalRecipient` |  |
| `ReplyTo` |  |
| `Status` |  |
| `Subject` |  |
| `Tag` |  |
| `TextBody` |  |
| `To` |  |
| `ToFull` |  |
| `id` |  |

Operations: list.

API path: `/messages/inbound/{messageid}/details`

#### Inboundrule

| Field | Description |
| --- | --- |
| `ID` |  |
| `Rule` |  |
| `id` |  |

Operations: create, list, remove.

API path: `/triggers/inboundrules`

#### MessageClickSearch

| Field | Description |
| --- | --- |
| `ClickLocation` |  |
| `Clicks` |  |
| `Client` |  |
| `Geo` |  |
| `MessageID` |  |
| `OS` |  |
| `OriginalLink` |  |
| `Platform` |  |
| `ReceivedAt` |  |
| `Recipient` |  |
| `Tag` |  |
| `TotalCount` |  |
| `UserAgent` |  |

Operations: list, load.

API path: `/messages/outbound/clicks`

#### MessageOpenSearch

| Field | Description |
| --- | --- |
| `Client` |  |
| `FirstOpen` |  |
| `Geo` |  |
| `MessageID` |  |
| `OS` |  |
| `Opens` |  |
| `Platform` |  |
| `ReceivedAt` |  |
| `Recipient` |  |
| `Tag` |  |
| `TotalCount` |  |
| `UserAgent` |  |

Operations: list, load.

API path: `/messages/outbound/opens`

#### Outbound

| Field | Description |
| --- | --- |
| `Attachments` |  |
| `Bcc` |  |
| `BounceRate` |  |
| `Bounced` |  |
| `Cc` |  |
| `From` |  |
| `MessageID` |  |
| `Opens` |  |
| `ReceivedAt` |  |
| `Recipients` |  |
| `SMTPAPIErrors` |  |
| `Sent` |  |
| `SpamComplaints` |  |
| `SpamComplaintsRate` |  |
| `Status` |  |
| `Subject` |  |
| `Tag` |  |
| `To` |  |
| `TotalClicks` |  |
| `TotalTrackedLinksSent` |  |
| `TrackLinks` |  |
| `TrackOpens` |  |
| `Tracked` |  |
| `UniqueLinksClicked` |  |
| `UniqueOpens` |  |
| `WithClientRecorded` |  |
| `WithLinkTracking` |  |
| `WithOpenTracking` |  |
| `WithPlatformRecorded` |  |

Operations: list, load.

API path: `/messages/outbound`

#### OutboundMessageDetail

| Field | Description |
| --- | --- |
| `Attachments` |  |
| `Bcc` |  |
| `Body` |  |
| `Cc` |  |
| `From` |  |
| `HtmlBody` |  |
| `MessageEvents` |  |
| `MessageID` |  |
| `ReceivedAt` |  |
| `Recipients` |  |
| `Status` |  |
| `Subject` |  |
| `Tag` |  |
| `TextBody` |  |
| `To` |  |
| `TrackLinks` |  |
| `TrackOpens` |  |
| `id` |  |

Operations: list.

API path: `/messages/outbound/{messageid}/details`

#### OutboundMessageDump

| Field | Description |
| --- | --- |
| `Body` | Raw source of message. |
| `id` |  |

Operations: load.

API path: `/messages/outbound/{messageid}/dump`

#### Retry

| Field | Description |
| --- | --- |
| `ErrorCode` |  |
| `Message` |  |

Operations: update.

API path: `/messages/inbound/{messageid}/retry`

#### SendEmail

| Field | Description |
| --- | --- |
| `ErrorCode` |  |
| `Message` |  |
| `MessageID` |  |
| `SubmittedAt` |  |
| `To` |  |

Operations: create.

API path: `/email`

#### SendEmailBatch

| Field | Description |
| --- | --- |
| `ErrorCode` |  |
| `Message` |  |
| `MessageID` |  |
| `SubmittedAt` |  |
| `To` |  |

Operations: create.

API path: `/email/batch`

#### SentCount

| Field | Description |
| --- | --- |
| `Date` |  |
| `Sent` |  |

Operations: list.

API path: `/stats/outbound/sends`

#### Server

| Field | Description |
| --- | --- |
| `ApiTokens` |  |
| `BounceHookUrl` |  |
| `ClickHookUrl` |  |
| `Color` |  |
| `DeliveryHookUrl` |  |
| `ID` |  |
| `InboundAddress` |  |
| `InboundDomain` |  |
| `InboundHash` |  |
| `InboundHookUrl` |  |
| `InboundSpamThreshold` |  |
| `Name` |  |
| `OpenHookUrl` |  |
| `PostFirstOpenOnly` |  |
| `RawEmailEnabled` |  |
| `ServerLink` |  |
| `SmtpApiActivated` |  |
| `TrackLinks` |  |
| `TrackOpens` |  |

Operations: list, update.

API path: `/server`

#### StatsApi

| Field | Description |
| --- | --- |
| `Date` |  |
| `Days` |  |
| `Desktop` |  |
| `HardBounce` |  |
| `Mobile` |  |
| `Opens` |  |
| `SMTPApiError` |  |
| `SoftBounce` |  |
| `SpamComplaint` |  |
| `Tracked` |  |
| `Transient` |  |
| `Unique` |  |
| `Unknown` |  |
| `WebMail` |  |

Operations: list, load.

API path: `/stats/outbound/bounces`

#### Template

| Field | Description |
| --- | --- |
| `Active` | Indicates that this template may be used for sending email. |
| `Alias` | The user-supplied alias for this template. |
| `AssociatedServerId` | The ID of the Server with which this template is associated. |
| `HtmlBody` | The content to use for the HtmlBody when this template is used to send email. |
| `Name` | The display name for the template. |
| `Subject` | The content to use for the Subject when this template is used to send email. |
| `TemplateID` | The ID associated with the template. |
| `TemplateId` | The associated ID for this template. |
| `TextBody` | The content to use for the TextBody when this template is used to send email. |
| `id` |  |

Operations: create, list, load, remove, update.

API path: `/templates`

#### TemplateValidation

| Field | Description |
| --- | --- |
| `AllContentIsValid` |  |
| `HtmlBody` |  |
| `Subject` |  |
| `SuggestedTemplateModel` |  |
| `TextBody` |  |

Operations: create.

API path: `/templates/validate`



## Entities


### Bounce

Create an instance: `const bounce = client.Bounce()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `BouncedAt` | `string` |  |
| `CanActivate` | `boolean` |  |
| `Content` | `string` |  |
| `Description` | `string` |  |
| `Details` | `string` |  |
| `DumpAvailable` | `boolean` |  |
| `Email` | `string` |  |
| `ID` | `string` |  |
| `Inactive` | `boolean` |  |
| `MessageID` | `string` |  |
| `Name` | `string` |  |
| `Subject` | `string` |  |
| `Tag` | `string` |  |
| `Type` | `string` |  |
| `TypeCode` | `number` |  |
| `id` | `string` |  |

#### Example: Load

```ts
const bounce = await client.Bounce().load({ id: 'bounce_id' })
```

#### Example: List

```ts
const bounces = await client.Bounce().list({ count: "example", offset: 1 })
```


### BounceDump

Create an instance: `const bounce_dump = client.BounceDump()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `Body` | `string` | Raw source of bounce. |
| `id` | `string` |  |

#### Example: Load

```ts
const bounce_dump = await client.BounceDump().load({ id: 'bounce_dump_id' })
```


### Bypass

Create an instance: `const bypass = client.Bypass()`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ErrorCode` | `number` |  |
| `Message` | `string` |  |


### DeliveryStat

Create an instance: `const delivery_stat = client.DeliveryStat()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `Count` | `number` |  |
| `Name` | `string` |  |
| `Type` | `string` |  |

#### Example: List

```ts
const delivery_stats = await client.DeliveryStat().list()
```


### Dynamic

Create an instance: `const dynamic = client.Dynamic()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const dynamic = await client.Dynamic().load()
```


### Inbound

Create an instance: `const inbound = client.Inbound()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `Attachments` | `any[]` |  |
| `Cc` | `string` |  |
| `CcFull` | `any[]` |  |
| `Date` | `string` |  |
| `From` | `string` |  |
| `FromFull` | `any` |  |
| `FromName` | `string` |  |
| `MailboxHash` | `string` |  |
| `MessageID` | `string` |  |
| `OriginalRecipient` | `string` |  |
| `ReplyTo` | `string` |  |
| `Status` | `string` |  |
| `Subject` | `string` |  |
| `Tag` | `string` |  |
| `To` | `string` |  |
| `ToFull` | `any[]` |  |

#### Example: List

```ts
const inbounds = await client.Inbound().list({ count: "example", offset: 1 })
```


### InboundMessageFullDetail

Create an instance: `const inbound_message_full_detail = client.InboundMessageFullDetail()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `Attachments` | `any[]` |  |
| `BlockedReason` | `string` |  |
| `Cc` | `string` |  |
| `CcFull` | `any[]` |  |
| `Date` | `string` |  |
| `From` | `string` |  |
| `FromFull` | `any` |  |
| `FromName` | `string` |  |
| `Headers` | `any[]` |  |
| `HtmlBody` | `string` |  |
| `MailboxHash` | `string` |  |
| `MessageID` | `string` |  |
| `OriginalRecipient` | `string` |  |
| `ReplyTo` | `string` |  |
| `Status` | `string` |  |
| `Subject` | `string` |  |
| `Tag` | `string` |  |
| `TextBody` | `string` |  |
| `To` | `string` |  |
| `ToFull` | `any[]` |  |
| `id` | `string` |  |

#### Example: List

```ts
const inbound_message_full_details = await client.InboundMessageFullDetail().list({ id: "example" })
```


### Inboundrule

Create an instance: `const inboundrule = client.Inboundrule()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ID` | `number` |  |
| `Rule` | `string` |  |
| `id` | `string` |  |

#### Example: List

```ts
const inboundrules = await client.Inboundrule().list({ count: "example", offset: 1 })
```

#### Example: Create

```ts
const inboundrule = await client.Inboundrule().create({
})
```


### MessageClickSearch

Create an instance: `const message_click_search = client.MessageClickSearch()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ClickLocation` | `string` |  |
| `Clicks` | `any[]` |  |
| `Client` | `any` |  |
| `Geo` | `any` |  |
| `MessageID` | `string` |  |
| `OS` | `any` |  |
| `OriginalLink` | `string` |  |
| `Platform` | `string` |  |
| `ReceivedAt` | `string` |  |
| `Recipient` | `string` |  |
| `Tag` | `string` |  |
| `TotalCount` | `number` |  |
| `UserAgent` | `string` |  |

#### Example: Load

```ts
const message_click_search = await client.MessageClickSearch().load({ messageid: 'messageid', count: 'count', offset: 1 })
```

#### Example: List

```ts
const message_click_searchs = await client.MessageClickSearch().list({ count: "example", offset: 1 })
```


### MessageOpenSearch

Create an instance: `const message_open_search = client.MessageOpenSearch()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `Client` | `any` |  |
| `FirstOpen` | `boolean` |  |
| `Geo` | `any` |  |
| `MessageID` | `string` |  |
| `OS` | `any` |  |
| `Opens` | `any[]` |  |
| `Platform` | `string` |  |
| `ReceivedAt` | `string` |  |
| `Recipient` | `string` |  |
| `Tag` | `string` |  |
| `TotalCount` | `number` |  |
| `UserAgent` | `string` |  |

#### Example: Load

```ts
const message_open_search = await client.MessageOpenSearch().load({ messageid: 'messageid', count: 'count', offset: 1 })
```

#### Example: List

```ts
const message_open_searchs = await client.MessageOpenSearch().list({ count: "example", offset: 1 })
```


### Outbound

Create an instance: `const outbound = client.Outbound()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `Attachments` | `any[]` |  |
| `Bcc` | `any[]` |  |
| `BounceRate` | `number` |  |
| `Bounced` | `number` |  |
| `Cc` | `any[]` |  |
| `From` | `string` |  |
| `MessageID` | `string` |  |
| `Opens` | `number` |  |
| `ReceivedAt` | `string` |  |
| `Recipients` | `any[]` |  |
| `SMTPAPIErrors` | `number` |  |
| `Sent` | `number` |  |
| `SpamComplaints` | `number` |  |
| `SpamComplaintsRate` | `number` |  |
| `Status` | `string` |  |
| `Subject` | `string` |  |
| `Tag` | `string` |  |
| `To` | `any[]` |  |
| `TotalClicks` | `number` |  |
| `TotalTrackedLinksSent` | `number` |  |
| `TrackLinks` | `string` |  |
| `TrackOpens` | `boolean` |  |
| `Tracked` | `number` |  |
| `UniqueLinksClicked` | `number` |  |
| `UniqueOpens` | `number` |  |
| `WithClientRecorded` | `number` |  |
| `WithLinkTracking` | `number` |  |
| `WithOpenTracking` | `number` |  |
| `WithPlatformRecorded` | `number` |  |

#### Example: Load

```ts
const outbound = await client.Outbound().load()
```

#### Example: List

```ts
const outbounds = await client.Outbound().list({ count: "example", offset: 1 })
```


### OutboundMessageDetail

Create an instance: `const outbound_message_detail = client.OutboundMessageDetail()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `Attachments` | `any[]` |  |
| `Bcc` | `any[]` |  |
| `Body` | `string` |  |
| `Cc` | `any[]` |  |
| `From` | `string` |  |
| `HtmlBody` | `string` |  |
| `MessageEvents` | `any[]` |  |
| `MessageID` | `string` |  |
| `ReceivedAt` | `string` |  |
| `Recipients` | `any[]` |  |
| `Status` | `string` |  |
| `Subject` | `string` |  |
| `Tag` | `string` |  |
| `TextBody` | `string` |  |
| `To` | `any[]` |  |
| `TrackLinks` | `string` |  |
| `TrackOpens` | `boolean` |  |
| `id` | `string` |  |

#### Example: List

```ts
const outbound_message_details = await client.OutboundMessageDetail().list({ id: "example" })
```


### OutboundMessageDump

Create an instance: `const outbound_message_dump = client.OutboundMessageDump()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `Body` | `string` | Raw source of message. |
| `id` | `string` |  |

#### Example: Load

```ts
const outbound_message_dump = await client.OutboundMessageDump().load({ id: 'outbound_message_dump_id' })
```


### Retry

Create an instance: `const retry = client.Retry()`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ErrorCode` | `number` |  |
| `Message` | `string` |  |


### SendEmail

Create an instance: `const send_email = client.SendEmail()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ErrorCode` | `number` |  |
| `Message` | `string` |  |
| `MessageID` | `string` |  |
| `SubmittedAt` | `string` |  |
| `To` | `string` |  |

#### Example: Create

```ts
const send_email = await client.SendEmail().create({
})
```


### SendEmailBatch

Create an instance: `const send_email_batch = client.SendEmailBatch()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ErrorCode` | `number` |  |
| `Message` | `string` |  |
| `MessageID` | `string` |  |
| `SubmittedAt` | `string` |  |
| `To` | `string` |  |

#### Example: Create

```ts
const send_email_batch = await client.SendEmailBatch().create({
})
```


### SentCount

Create an instance: `const sent_count = client.SentCount()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `Date` | `string` |  |
| `Sent` | `number` |  |

#### Example: List

```ts
const sent_counts = await client.SentCount().list()
```


### Server

Create an instance: `const server = client.Server()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ApiTokens` | `any[]` |  |
| `BounceHookUrl` | `string` |  |
| `ClickHookUrl` | `string` |  |
| `Color` | `string` |  |
| `DeliveryHookUrl` | `string` |  |
| `ID` | `number` |  |
| `InboundAddress` | `string` |  |
| `InboundDomain` | `string` |  |
| `InboundHash` | `string` |  |
| `InboundHookUrl` | `string` |  |
| `InboundSpamThreshold` | `number` |  |
| `Name` | `string` |  |
| `OpenHookUrl` | `string` |  |
| `PostFirstOpenOnly` | `boolean` |  |
| `RawEmailEnabled` | `boolean` |  |
| `ServerLink` | `string` |  |
| `SmtpApiActivated` | `boolean` |  |
| `TrackLinks` | `string` |  |
| `TrackOpens` | `boolean` |  |

#### Example: List

```ts
const servers = await client.Server().list()
```


### StatsApi

Create an instance: `const stats_api = client.StatsApi()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `Date` | `string` |  |
| `Days` | `any[]` |  |
| `Desktop` | `number` |  |
| `HardBounce` | `number` |  |
| `Mobile` | `number` |  |
| `Opens` | `number` |  |
| `SMTPApiError` | `number` |  |
| `SoftBounce` | `number` |  |
| `SpamComplaint` | `number` |  |
| `Tracked` | `number` |  |
| `Transient` | `number` |  |
| `Unique` | `number` |  |
| `Unknown` | `number` |  |
| `WebMail` | `number` |  |

#### Example: Load

```ts
const stats_api = await client.StatsApi().load()
```

#### Example: List

```ts
const stats_apis = await client.StatsApi().list()
```


### Template

Create an instance: `const template = client.Template()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `Active` | `boolean` | Indicates that this template may be used for sending email. |
| `Alias` | `string` | The user-supplied alias for this template. |
| `AssociatedServerId` | `number` | The ID of the Server with which this template is associated. |
| `HtmlBody` | `string` | The content to use for the HtmlBody when this template is used to send email. |
| `Name` | `string` | The display name for the template. |
| `Subject` | `string` | The content to use for the Subject when this template is used to send email. |
| `TemplateID` | `number` | The ID associated with the template. |
| `TemplateId` | `number` | The associated ID for this template. |
| `TextBody` | `string` | The content to use for the TextBody when this template is used to send email. |
| `id` | `string` |  |

#### Example: Load

```ts
const template = await client.Template().load({ id: 'template_id' })
```

#### Example: List

```ts
const templates = await client.Template().list({ count: "example", offset: 1 })
```

#### Example: Create

```ts
const template = await client.Template().create({
  body: 'example_body',
})
```


### TemplateValidation

Create an instance: `const template_validation = client.TemplateValidation()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `AllContentIsValid` | `boolean` |  |
| `HtmlBody` | `any` |  |
| `Subject` | `any` |  |
| `SuggestedTemplateModel` | `Record<string, any>` |  |
| `TextBody` | `any` |  |

#### Example: Create

```ts
const template_validation = await client.TemplateValidation().create({
})
```

## Features

This SDK ships 1 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`test`](#test) | Test transport |

### test

Test transport.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: Test transport

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
postmark/
├── src/
│   ├── PostmarkSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { PostmarkSDK } from '@voxgig-sdk/postmark-sdk'
```

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const statsapi = client.StatsApi()
await statsapi.list()

// statsapi.data() now returns the statsapi data from the last `list`
// statsapi.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
