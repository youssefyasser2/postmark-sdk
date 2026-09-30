# Postmark TypeScript SDK Reference

Complete API reference for the Postmark TypeScript SDK.


## PostmarkSDK

### Constructor

```ts
new PostmarkSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `PostmarkSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = PostmarkSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `PostmarkSDK` instance in test mode.


### Instance Methods

#### `Bounce(data?: object)`

Create a new `Bounce` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BounceEntity` instance.

#### `BounceDump(data?: object)`

Create a new `BounceDump` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BounceDumpEntity` instance.

#### `Bypass(data?: object)`

Create a new `Bypass` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BypassEntity` instance.

#### `DeliveryStat(data?: object)`

Create a new `DeliveryStat` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DeliveryStatEntity` instance.

#### `Dynamic(data?: object)`

Create a new `Dynamic` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DynamicEntity` instance.

#### `Inbound(data?: object)`

Create a new `Inbound` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `InboundEntity` instance.

#### `InboundMessageFullDetail(data?: object)`

Create a new `InboundMessageFullDetail` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `InboundMessageFullDetailEntity` instance.

#### `Inboundrule(data?: object)`

Create a new `Inboundrule` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `InboundruleEntity` instance.

#### `MessageClickSearch(data?: object)`

Create a new `MessageClickSearch` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MessageClickSearchEntity` instance.

#### `MessageOpenSearch(data?: object)`

Create a new `MessageOpenSearch` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MessageOpenSearchEntity` instance.

#### `Outbound(data?: object)`

Create a new `Outbound` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `OutboundEntity` instance.

#### `OutboundMessageDetail(data?: object)`

Create a new `OutboundMessageDetail` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `OutboundMessageDetailEntity` instance.

#### `OutboundMessageDump(data?: object)`

Create a new `OutboundMessageDump` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `OutboundMessageDumpEntity` instance.

#### `Retry(data?: object)`

Create a new `Retry` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `RetryEntity` instance.

#### `SendEmail(data?: object)`

Create a new `SendEmail` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SendEmailEntity` instance.

#### `SendEmailBatch(data?: object)`

Create a new `SendEmailBatch` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SendEmailBatchEntity` instance.

#### `SentCount(data?: object)`

Create a new `SentCount` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SentCountEntity` instance.

#### `Server(data?: object)`

Create a new `Server` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ServerEntity` instance.

#### `StatsApi(data?: object)`

Create a new `StatsApi` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `StatsApiEntity` instance.

#### `Template(data?: object)`

Create a new `Template` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `TemplateEntity` instance.

#### `TemplateValidation(data?: object)`

Create a new `TemplateValidation` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `TemplateValidationEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `PostmarkSDK.test()`.

**Returns:** `PostmarkSDK` instance in test mode.


---

## BounceEntity

```ts
const bounce = client.Bounce()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `BouncedAt` | `string` | No |  |
| `CanActivate` | `boolean` | No |  |
| `Content` | `string` | No |  |
| `Description` | `string` | No |  |
| `Details` | `string` | No |  |
| `DumpAvailable` | `boolean` | No |  |
| `Email` | `string` | No |  |
| `ID` | `string` | No |  |
| `Inactive` | `boolean` | No |  |
| `MessageID` | `string` | No |  |
| `Name` | `string` | No |  |
| `Subject` | `string` | No |  |
| `Tag` | `string` | No |  |
| `Type` | `string` | No |  |
| `TypeCode` | `number` | No |  |
| `id` | `string` | No |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `activate` | `/bounces/{bounceid}/activate` | `client.Bounce().update({ $action: 'activate', ... })` |

An action returns that action's OWN response, which is not necessarily a
Bounce record — check the API definition for its shape.

```ts
const result = await client.Bounce().update({
  $action: 'activate',
  /* ...the action's own arguments */
})
```

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Bounce().list({ count: "example", offset: 1 })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Bounce().load({ id: 'bounce_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.Bounce().update({
  id: 'bounce_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BounceEntity` instance with the same client and
options.

#### `client()`

Return the parent `PostmarkSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## BounceDumpEntity

```ts
const bounce_dump = client.BounceDump()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `Body` | `string` | No | Raw source of bounce. |
| `id` | `string` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.BounceDump().load({ id: 'bounce_dump_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BounceDumpEntity` instance with the same client and
options.

#### `client()`

Return the parent `PostmarkSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## BypassEntity

```ts
const bypass = client.Bypass()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ErrorCode` | `number` | No |  |
| `Message` | `string` | No |  |

### Operations

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.Bypass().update({
  inbound_id: 'inbound_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BypassEntity` instance with the same client and
options.

#### `client()`

Return the parent `PostmarkSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DeliveryStatEntity

```ts
const delivery_stat = client.DeliveryStat()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `Count` | `number` | No |  |
| `Name` | `string` | No |  |
| `Type` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.DeliveryStat().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DeliveryStatEntity` instance with the same client and
options.

#### `client()`

Return the parent `PostmarkSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DynamicEntity

```ts
const dynamic = client.Dynamic()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Dynamic().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DynamicEntity` instance with the same client and
options.

#### `client()`

Return the parent `PostmarkSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## InboundEntity

```ts
const inbound = client.Inbound()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `Attachments` | `any[]` | No |  |
| `Cc` | `string` | No |  |
| `CcFull` | `any[]` | No |  |
| `Date` | `string` | No |  |
| `From` | `string` | No |  |
| `FromFull` | `any` | No |  |
| `FromName` | `string` | No |  |
| `MailboxHash` | `string` | No |  |
| `MessageID` | `string` | No |  |
| `OriginalRecipient` | `string` | No |  |
| `ReplyTo` | `string` | No |  |
| `Status` | `string` | No |  |
| `Subject` | `string` | No |  |
| `Tag` | `string` | No |  |
| `To` | `string` | No |  |
| `ToFull` | `any[]` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Inbound().list({ count: "example", offset: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `InboundEntity` instance with the same client and
options.

#### `client()`

Return the parent `PostmarkSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## InboundMessageFullDetailEntity

```ts
const inbound_message_full_detail = client.InboundMessageFullDetail()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `Attachments` | `any[]` | No |  |
| `BlockedReason` | `string` | No |  |
| `Cc` | `string` | No |  |
| `CcFull` | `any[]` | No |  |
| `Date` | `string` | No |  |
| `From` | `string` | No |  |
| `FromFull` | `any` | No |  |
| `FromName` | `string` | No |  |
| `Headers` | `any[]` | No |  |
| `HtmlBody` | `string` | No |  |
| `MailboxHash` | `string` | No |  |
| `MessageID` | `string` | No |  |
| `OriginalRecipient` | `string` | No |  |
| `ReplyTo` | `string` | No |  |
| `Status` | `string` | No |  |
| `Subject` | `string` | No |  |
| `Tag` | `string` | No |  |
| `TextBody` | `string` | No |  |
| `To` | `string` | No |  |
| `ToFull` | `any[]` | No |  |
| `id` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.InboundMessageFullDetail().list({ id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `InboundMessageFullDetailEntity` instance with the same client and
options.

#### `client()`

Return the parent `PostmarkSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## InboundruleEntity

```ts
const inboundrule = client.Inboundrule()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ID` | `number` | No |  |
| `Rule` | `string` | No |  |
| `id` | `string` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Inboundrule().create({
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Inboundrule().list({ count: "example", offset: 1 })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Inboundrule().remove({ id: 'id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `InboundruleEntity` instance with the same client and
options.

#### `client()`

Return the parent `PostmarkSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## MessageClickSearchEntity

```ts
const message_click_search = client.MessageClickSearch()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ClickLocation` | `string` | No |  |
| `Clicks` | `any[]` | No |  |
| `Client` | `any` | No |  |
| `Geo` | `any` | No |  |
| `MessageID` | `string` | No |  |
| `OS` | `any` | No |  |
| `OriginalLink` | `string` | No |  |
| `Platform` | `string` | No |  |
| `ReceivedAt` | `string` | No |  |
| `Recipient` | `string` | No |  |
| `Tag` | `string` | No |  |
| `TotalCount` | `number` | No |  |
| `UserAgent` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.MessageClickSearch().list({ count: "example", offset: 1 })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.MessageClickSearch().load({ messageid: 'messageid', count: 'count', offset: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MessageClickSearchEntity` instance with the same client and
options.

#### `client()`

Return the parent `PostmarkSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## MessageOpenSearchEntity

```ts
const message_open_search = client.MessageOpenSearch()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `Client` | `any` | No |  |
| `FirstOpen` | `boolean` | No |  |
| `Geo` | `any` | No |  |
| `MessageID` | `string` | No |  |
| `OS` | `any` | No |  |
| `Opens` | `any[]` | No |  |
| `Platform` | `string` | No |  |
| `ReceivedAt` | `string` | No |  |
| `Recipient` | `string` | No |  |
| `Tag` | `string` | No |  |
| `TotalCount` | `number` | No |  |
| `UserAgent` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.MessageOpenSearch().list({ count: "example", offset: 1 })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.MessageOpenSearch().load({ messageid: 'messageid', count: 'count', offset: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MessageOpenSearchEntity` instance with the same client and
options.

#### `client()`

Return the parent `PostmarkSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## OutboundEntity

```ts
const outbound = client.Outbound()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `Attachments` | `any[]` | No |  |
| `Bcc` | `any[]` | No |  |
| `BounceRate` | `number` | No |  |
| `Bounced` | `number` | No |  |
| `Cc` | `any[]` | No |  |
| `From` | `string` | No |  |
| `MessageID` | `string` | No |  |
| `Opens` | `number` | No |  |
| `ReceivedAt` | `string` | No |  |
| `Recipients` | `any[]` | No |  |
| `SMTPAPIErrors` | `number` | No |  |
| `Sent` | `number` | No |  |
| `SpamComplaints` | `number` | No |  |
| `SpamComplaintsRate` | `number` | No |  |
| `Status` | `string` | No |  |
| `Subject` | `string` | No |  |
| `Tag` | `string` | No |  |
| `To` | `any[]` | No |  |
| `TotalClicks` | `number` | No |  |
| `TotalTrackedLinksSent` | `number` | No |  |
| `TrackLinks` | `string` | No |  |
| `TrackOpens` | `boolean` | No |  |
| `Tracked` | `number` | No |  |
| `UniqueLinksClicked` | `number` | No |  |
| `UniqueOpens` | `number` | No |  |
| `WithClientRecorded` | `number` | No |  |
| `WithLinkTracking` | `number` | No |  |
| `WithOpenTracking` | `number` | No |  |
| `WithPlatformRecorded` | `number` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Outbound().list({ count: "example", offset: 1 })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Outbound().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `OutboundEntity` instance with the same client and
options.

#### `client()`

Return the parent `PostmarkSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## OutboundMessageDetailEntity

```ts
const outbound_message_detail = client.OutboundMessageDetail()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `Attachments` | `any[]` | No |  |
| `Bcc` | `any[]` | No |  |
| `Body` | `string` | No |  |
| `Cc` | `any[]` | No |  |
| `From` | `string` | No |  |
| `HtmlBody` | `string` | No |  |
| `MessageEvents` | `any[]` | No |  |
| `MessageID` | `string` | No |  |
| `ReceivedAt` | `string` | No |  |
| `Recipients` | `any[]` | No |  |
| `Status` | `string` | No |  |
| `Subject` | `string` | No |  |
| `Tag` | `string` | No |  |
| `TextBody` | `string` | No |  |
| `To` | `any[]` | No |  |
| `TrackLinks` | `string` | No |  |
| `TrackOpens` | `boolean` | No |  |
| `id` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.OutboundMessageDetail().list({ id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `OutboundMessageDetailEntity` instance with the same client and
options.

#### `client()`

Return the parent `PostmarkSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## OutboundMessageDumpEntity

```ts
const outbound_message_dump = client.OutboundMessageDump()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `Body` | `string` | No | Raw source of message. |
| `id` | `string` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.OutboundMessageDump().load({ id: 'outbound_message_dump_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `OutboundMessageDumpEntity` instance with the same client and
options.

#### `client()`

Return the parent `PostmarkSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## RetryEntity

```ts
const retry = client.Retry()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ErrorCode` | `number` | No |  |
| `Message` | `string` | No |  |

### Operations

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.Retry().update({
  inbound_id: 'inbound_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `RetryEntity` instance with the same client and
options.

#### `client()`

Return the parent `PostmarkSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SendEmailEntity

```ts
const send_email = client.SendEmail()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ErrorCode` | `number` | No |  |
| `Message` | `string` | No |  |
| `MessageID` | `string` | No |  |
| `SubmittedAt` | `string` | No |  |
| `To` | `string` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.SendEmail().create({
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SendEmailEntity` instance with the same client and
options.

#### `client()`

Return the parent `PostmarkSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SendEmailBatchEntity

```ts
const send_email_batch = client.SendEmailBatch()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ErrorCode` | `number` | No |  |
| `Message` | `string` | No |  |
| `MessageID` | `string` | No |  |
| `SubmittedAt` | `string` | No |  |
| `To` | `string` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.SendEmailBatch().create({
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SendEmailBatchEntity` instance with the same client and
options.

#### `client()`

Return the parent `PostmarkSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SentCountEntity

```ts
const sent_count = client.SentCount()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `Date` | `string` | No |  |
| `Sent` | `number` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.SentCount().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SentCountEntity` instance with the same client and
options.

#### `client()`

Return the parent `PostmarkSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ServerEntity

```ts
const server = client.Server()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ApiTokens` | `any[]` | No |  |
| `BounceHookUrl` | `string` | No |  |
| `ClickHookUrl` | `string` | No |  |
| `Color` | `string` | No |  |
| `DeliveryHookUrl` | `string` | No |  |
| `ID` | `number` | No |  |
| `InboundAddress` | `string` | No |  |
| `InboundDomain` | `string` | No |  |
| `InboundHash` | `string` | No |  |
| `InboundHookUrl` | `string` | No |  |
| `InboundSpamThreshold` | `number` | No |  |
| `Name` | `string` | No |  |
| `OpenHookUrl` | `string` | No |  |
| `PostFirstOpenOnly` | `boolean` | No |  |
| `RawEmailEnabled` | `boolean` | No |  |
| `ServerLink` | `string` | No |  |
| `SmtpApiActivated` | `boolean` | No |  |
| `TrackLinks` | `string` | No |  |
| `TrackOpens` | `boolean` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Server().list()
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.Server().update({
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ServerEntity` instance with the same client and
options.

#### `client()`

Return the parent `PostmarkSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## StatsApiEntity

```ts
const stats_api = client.StatsApi()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `Date` | `string` | No |  |
| `Days` | `any[]` | No |  |
| `Desktop` | `number` | No |  |
| `HardBounce` | `number` | No |  |
| `Mobile` | `number` | No |  |
| `Opens` | `number` | No |  |
| `SMTPApiError` | `number` | No |  |
| `SoftBounce` | `number` | No |  |
| `SpamComplaint` | `number` | No |  |
| `Tracked` | `number` | No |  |
| `Transient` | `number` | No |  |
| `Unique` | `number` | No |  |
| `Unknown` | `number` | No |  |
| `WebMail` | `number` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.StatsApi().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.StatsApi().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `StatsApiEntity` instance with the same client and
options.

#### `client()`

Return the parent `PostmarkSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## TemplateEntity

```ts
const template = client.Template()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `Active` | `boolean` | No | Indicates that this template may be used for sending email. |
| `Alias` | `string` | No | The user-supplied alias for this template. |
| `AssociatedServerId` | `number` | No | The ID of the Server with which this template is associated. |
| `HtmlBody` | `string` | No | The content to use for the HtmlBody when this template is used to send email. |
| `Name` | `string` | No | The display name for the template. |
| `Subject` | `string` | No | The content to use for the Subject when this template is used to send email. |
| `TemplateID` | `number` | No | The ID associated with the template. |
| `TemplateId` | `number` | No | The associated ID for this template. |
| `TextBody` | `string` | No | The content to use for the TextBody when this template is used to send email. |
| `id` | `string` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Template().create({
  body: 'example_body',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Template().list({ count: "example", offset: 1 })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Template().load({ id: 'template_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Template().remove({ id: 'template_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.Template().update({
  id: 'template_id',
  body: 'body',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `TemplateEntity` instance with the same client and
options.

#### `client()`

Return the parent `PostmarkSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## TemplateValidationEntity

```ts
const template_validation = client.TemplateValidation()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `AllContentIsValid` | `boolean` | No |  |
| `HtmlBody` | `any` | No |  |
| `Subject` | `any` | No |  |
| `SuggestedTemplateModel` | `Record<string, any>` | No |  |
| `TextBody` | `any` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.TemplateValidation().create({
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `TemplateValidationEntity` instance with the same client and
options.

#### `client()`

Return the parent `PostmarkSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | Test transport |


Features are activated via the `feature` option:

```ts
const client = new PostmarkSDK({
  feature: {
    test: { active: true },
  }
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### `test`

Test transport.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `entity` | map |
| `net` | map |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

