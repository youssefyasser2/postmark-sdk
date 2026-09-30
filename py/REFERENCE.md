# Postmark Python SDK Reference

Complete API reference for the Postmark Python SDK.


## PostmarkSDK

### Constructor

```python
from postmark_sdk import PostmarkSDK

client = PostmarkSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `PostmarkSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = PostmarkSDK.test()
```


### Instance Methods

#### `Bounce(data=None)`

Create a new `BounceEntity` instance. Pass `None` for no initial data.

#### `BounceDump(data=None)`

Create a new `BounceDumpEntity` instance. Pass `None` for no initial data.

#### `Bypass(data=None)`

Create a new `BypassEntity` instance. Pass `None` for no initial data.

#### `DeliveryStat(data=None)`

Create a new `DeliveryStatEntity` instance. Pass `None` for no initial data.

#### `Dynamic(data=None)`

Create a new `DynamicEntity` instance. Pass `None` for no initial data.

#### `Inbound(data=None)`

Create a new `InboundEntity` instance. Pass `None` for no initial data.

#### `InboundMessageFullDetail(data=None)`

Create a new `InboundMessageFullDetailEntity` instance. Pass `None` for no initial data.

#### `Inboundrule(data=None)`

Create a new `InboundruleEntity` instance. Pass `None` for no initial data.

#### `MessageClickSearch(data=None)`

Create a new `MessageClickSearchEntity` instance. Pass `None` for no initial data.

#### `MessageOpenSearch(data=None)`

Create a new `MessageOpenSearchEntity` instance. Pass `None` for no initial data.

#### `Outbound(data=None)`

Create a new `OutboundEntity` instance. Pass `None` for no initial data.

#### `OutboundMessageDetail(data=None)`

Create a new `OutboundMessageDetailEntity` instance. Pass `None` for no initial data.

#### `OutboundMessageDump(data=None)`

Create a new `OutboundMessageDumpEntity` instance. Pass `None` for no initial data.

#### `Retry(data=None)`

Create a new `RetryEntity` instance. Pass `None` for no initial data.

#### `SendEmail(data=None)`

Create a new `SendEmailEntity` instance. Pass `None` for no initial data.

#### `SendEmailBatch(data=None)`

Create a new `SendEmailBatchEntity` instance. Pass `None` for no initial data.

#### `SentCount(data=None)`

Create a new `SentCountEntity` instance. Pass `None` for no initial data.

#### `Server(data=None)`

Create a new `ServerEntity` instance. Pass `None` for no initial data.

#### `StatsApi(data=None)`

Create a new `StatsApiEntity` instance. Pass `None` for no initial data.

#### `Template(data=None)`

Create a new `TemplateEntity` instance. Pass `None` for no initial data.

#### `TemplateValidation(data=None)`

Create a new `TemplateValidationEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## BounceEntity

```python
bounce = client.Bounce()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `BouncedAt` | `str` | No |  |
| `CanActivate` | `bool` | No |  |
| `Content` | `str` | No |  |
| `Description` | `str` | No |  |
| `Details` | `str` | No |  |
| `DumpAvailable` | `bool` | No |  |
| `Email` | `str` | No |  |
| `ID` | `str` | No |  |
| `Inactive` | `bool` | No |  |
| `MessageID` | `str` | No |  |
| `Name` | `str` | No |  |
| `Subject` | `str` | No |  |
| `Tag` | `str` | No |  |
| `Type` | `str` | No |  |
| `TypeCode` | `int` | No |  |
| `id` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Bounce().list({"count": "example", "offset": 1})
for bounce in results:
    print(bounce)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Bounce().load({"id": "bounce_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.Bounce().update({
    "id": "bounce_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BounceEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## BounceDumpEntity

```python
bounce_dump = client.BounceDump()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `Body` | `str` | No | Raw source of bounce. |
| `id` | `str` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.BounceDump().load({"id": "bounce_dump_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BounceDumpEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## BypassEntity

```python
bypass = client.Bypass()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ErrorCode` | `int` | No |  |
| `Message` | `str` | No |  |

### Operations

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.Bypass().update({
    "inbound_id": "inbound_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BypassEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DeliveryStatEntity

```python
delivery_stat = client.DeliveryStat()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `Count` | `int` | No |  |
| `Name` | `str` | No |  |
| `Type` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.DeliveryStat().list()
for delivery_stat in results:
    print(delivery_stat)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DeliveryStatEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DynamicEntity

```python
dynamic = client.Dynamic()
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Dynamic().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DynamicEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## InboundEntity

```python
inbound = client.Inbound()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `Attachments` | `list` | No |  |
| `Cc` | `str` | No |  |
| `CcFull` | `list` | No |  |
| `Date` | `str` | No |  |
| `From` | `str` | No |  |
| `FromFull` | `Any` | No |  |
| `FromName` | `str` | No |  |
| `MailboxHash` | `str` | No |  |
| `MessageID` | `str` | No |  |
| `OriginalRecipient` | `str` | No |  |
| `ReplyTo` | `str` | No |  |
| `Status` | `str` | No |  |
| `Subject` | `str` | No |  |
| `Tag` | `str` | No |  |
| `To` | `str` | No |  |
| `ToFull` | `list` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Inbound().list({"count": "example", "offset": 1})
for inbound in results:
    print(inbound)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `InboundEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## InboundMessageFullDetailEntity

```python
inbound_message_full_detail = client.InboundMessageFullDetail()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `Attachments` | `list` | No |  |
| `BlockedReason` | `str` | No |  |
| `Cc` | `str` | No |  |
| `CcFull` | `list` | No |  |
| `Date` | `str` | No |  |
| `From` | `str` | No |  |
| `FromFull` | `Any` | No |  |
| `FromName` | `str` | No |  |
| `Headers` | `list` | No |  |
| `HtmlBody` | `str` | No |  |
| `MailboxHash` | `str` | No |  |
| `MessageID` | `str` | No |  |
| `OriginalRecipient` | `str` | No |  |
| `ReplyTo` | `str` | No |  |
| `Status` | `str` | No |  |
| `Subject` | `str` | No |  |
| `Tag` | `str` | No |  |
| `TextBody` | `str` | No |  |
| `To` | `str` | No |  |
| `ToFull` | `list` | No |  |
| `id` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.InboundMessageFullDetail().list({"id": "example"})
for inbound_message_full_detail in results:
    print(inbound_message_full_detail)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `InboundMessageFullDetailEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## InboundruleEntity

```python
inboundrule = client.Inboundrule()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ID` | `int` | No |  |
| `Rule` | `str` | No |  |
| `id` | `str` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Inboundrule().create({
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Inboundrule().list({"count": "example", "offset": 1})
for inboundrule in results:
    print(inboundrule)
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Inboundrule().remove({"id": "id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `InboundruleEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## MessageClickSearchEntity

```python
message_click_search = client.MessageClickSearch()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ClickLocation` | `str` | No |  |
| `Clicks` | `list` | No |  |
| `Client` | `Any` | No |  |
| `Geo` | `Any` | No |  |
| `MessageID` | `str` | No |  |
| `OS` | `Any` | No |  |
| `OriginalLink` | `str` | No |  |
| `Platform` | `str` | No |  |
| `ReceivedAt` | `str` | No |  |
| `Recipient` | `str` | No |  |
| `Tag` | `str` | No |  |
| `TotalCount` | `int` | No |  |
| `UserAgent` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.MessageClickSearch().list({"count": "example", "offset": 1})
for message_click_search in results:
    print(message_click_search)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.MessageClickSearch().load({"messageid": "messageid", "count": "count", "offset": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MessageClickSearchEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## MessageOpenSearchEntity

```python
message_open_search = client.MessageOpenSearch()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `Client` | `Any` | No |  |
| `FirstOpen` | `bool` | No |  |
| `Geo` | `Any` | No |  |
| `MessageID` | `str` | No |  |
| `OS` | `Any` | No |  |
| `Opens` | `list` | No |  |
| `Platform` | `str` | No |  |
| `ReceivedAt` | `str` | No |  |
| `Recipient` | `str` | No |  |
| `Tag` | `str` | No |  |
| `TotalCount` | `int` | No |  |
| `UserAgent` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.MessageOpenSearch().list({"count": "example", "offset": 1})
for message_open_search in results:
    print(message_open_search)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.MessageOpenSearch().load({"messageid": "messageid", "count": "count", "offset": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MessageOpenSearchEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## OutboundEntity

```python
outbound = client.Outbound()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `Attachments` | `list` | No |  |
| `Bcc` | `list` | No |  |
| `BounceRate` | `int` | No |  |
| `Bounced` | `int` | No |  |
| `Cc` | `list` | No |  |
| `From` | `str` | No |  |
| `MessageID` | `str` | No |  |
| `Opens` | `int` | No |  |
| `ReceivedAt` | `str` | No |  |
| `Recipients` | `list` | No |  |
| `SMTPAPIErrors` | `int` | No |  |
| `Sent` | `int` | No |  |
| `SpamComplaints` | `int` | No |  |
| `SpamComplaintsRate` | `int` | No |  |
| `Status` | `str` | No |  |
| `Subject` | `str` | No |  |
| `Tag` | `str` | No |  |
| `To` | `list` | No |  |
| `TotalClicks` | `int` | No |  |
| `TotalTrackedLinksSent` | `int` | No |  |
| `TrackLinks` | `str` | No |  |
| `TrackOpens` | `bool` | No |  |
| `Tracked` | `int` | No |  |
| `UniqueLinksClicked` | `int` | No |  |
| `UniqueOpens` | `int` | No |  |
| `WithClientRecorded` | `int` | No |  |
| `WithLinkTracking` | `int` | No |  |
| `WithOpenTracking` | `int` | No |  |
| `WithPlatformRecorded` | `int` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Outbound().list({"count": "example", "offset": 1})
for outbound in results:
    print(outbound)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Outbound().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `OutboundEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## OutboundMessageDetailEntity

```python
outbound_message_detail = client.OutboundMessageDetail()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `Attachments` | `list` | No |  |
| `Bcc` | `list` | No |  |
| `Body` | `str` | No |  |
| `Cc` | `list` | No |  |
| `From` | `str` | No |  |
| `HtmlBody` | `str` | No |  |
| `MessageEvents` | `list` | No |  |
| `MessageID` | `str` | No |  |
| `ReceivedAt` | `str` | No |  |
| `Recipients` | `list` | No |  |
| `Status` | `str` | No |  |
| `Subject` | `str` | No |  |
| `Tag` | `str` | No |  |
| `TextBody` | `str` | No |  |
| `To` | `list` | No |  |
| `TrackLinks` | `str` | No |  |
| `TrackOpens` | `bool` | No |  |
| `id` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.OutboundMessageDetail().list({"id": "example"})
for outbound_message_detail in results:
    print(outbound_message_detail)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `OutboundMessageDetailEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## OutboundMessageDumpEntity

```python
outbound_message_dump = client.OutboundMessageDump()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `Body` | `str` | No | Raw source of message. |
| `id` | `str` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.OutboundMessageDump().load({"id": "outbound_message_dump_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `OutboundMessageDumpEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## RetryEntity

```python
retry = client.Retry()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ErrorCode` | `int` | No |  |
| `Message` | `str` | No |  |

### Operations

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.Retry().update({
    "inbound_id": "inbound_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RetryEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SendEmailEntity

```python
send_email = client.SendEmail()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ErrorCode` | `int` | No |  |
| `Message` | `str` | No |  |
| `MessageID` | `str` | No |  |
| `SubmittedAt` | `str` | No |  |
| `To` | `str` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.SendEmail().create({
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SendEmailEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SendEmailBatchEntity

```python
send_email_batch = client.SendEmailBatch()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ErrorCode` | `int` | No |  |
| `Message` | `str` | No |  |
| `MessageID` | `str` | No |  |
| `SubmittedAt` | `str` | No |  |
| `To` | `str` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.SendEmailBatch().create({
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SendEmailBatchEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SentCountEntity

```python
sent_count = client.SentCount()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `Date` | `str` | No |  |
| `Sent` | `int` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.SentCount().list()
for sent_count in results:
    print(sent_count)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SentCountEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ServerEntity

```python
server = client.Server()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ApiTokens` | `list` | No |  |
| `BounceHookUrl` | `str` | No |  |
| `ClickHookUrl` | `str` | No |  |
| `Color` | `str` | No |  |
| `DeliveryHookUrl` | `str` | No |  |
| `ID` | `int` | No |  |
| `InboundAddress` | `str` | No |  |
| `InboundDomain` | `str` | No |  |
| `InboundHash` | `str` | No |  |
| `InboundHookUrl` | `str` | No |  |
| `InboundSpamThreshold` | `int` | No |  |
| `Name` | `str` | No |  |
| `OpenHookUrl` | `str` | No |  |
| `PostFirstOpenOnly` | `bool` | No |  |
| `RawEmailEnabled` | `bool` | No |  |
| `ServerLink` | `str` | No |  |
| `SmtpApiActivated` | `bool` | No |  |
| `TrackLinks` | `str` | No |  |
| `TrackOpens` | `bool` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Server().list()
for server in results:
    print(server)
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.Server().update({
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ServerEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## StatsApiEntity

```python
stats_api = client.StatsApi()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `Date` | `str` | No |  |
| `Days` | `list` | No |  |
| `Desktop` | `int` | No |  |
| `HardBounce` | `int` | No |  |
| `Mobile` | `int` | No |  |
| `Opens` | `int` | No |  |
| `SMTPApiError` | `int` | No |  |
| `SoftBounce` | `int` | No |  |
| `SpamComplaint` | `int` | No |  |
| `Tracked` | `int` | No |  |
| `Transient` | `int` | No |  |
| `Unique` | `int` | No |  |
| `Unknown` | `int` | No |  |
| `WebMail` | `int` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.StatsApi().list()
for stats_api in results:
    print(stats_api)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.StatsApi().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `StatsApiEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## TemplateEntity

```python
template = client.Template()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `Active` | `bool` | No | Indicates that this template may be used for sending email. |
| `Alias` | `str` | No | The user-supplied alias for this template. |
| `AssociatedServerId` | `int` | No | The ID of the Server with which this template is associated. |
| `HtmlBody` | `str` | No | The content to use for the HtmlBody when this template is used to send email. |
| `Name` | `str` | No | The display name for the template. |
| `Subject` | `str` | No | The content to use for the Subject when this template is used to send email. |
| `TemplateID` | `int` | No | The ID associated with the template. |
| `TemplateId` | `float` | No | The associated ID for this template. |
| `TextBody` | `str` | No | The content to use for the TextBody when this template is used to send email. |
| `id` | `str` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Template().create({
    "body": "example_body",  # Any
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Template().list({"count": "example", "offset": 1})
for template in results:
    print(template)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Template().load({"id": "template_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Template().remove({"id": "template_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.Template().update({
    "id": "template_id",
    "body": "body",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TemplateEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## TemplateValidationEntity

```python
template_validation = client.TemplateValidation()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `AllContentIsValid` | `bool` | No |  |
| `HtmlBody` | `Any` | No |  |
| `Subject` | `Any` | No |  |
| `SuggestedTemplateModel` | `dict` | No |  |
| `TextBody` | `Any` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.TemplateValidation().create({
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TemplateValidationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | Test transport |


Features are activated via the `feature` option:

```python
client = PostmarkSDK({
    "feature": {
        "test": {"active": True},
    },
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

