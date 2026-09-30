# Postmark Python SDK



The Python SDK for the Postmark API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Bounce()` — each
carrying a small, uniform set of operations (`list`, `load`, `create`, `update`, `remove`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/postmark-sdk/releases)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
from postmark_sdk import PostmarkSDK

client = PostmarkSDK()
```

### 2. List bounce records

`list()` returns a `list` of records (each a `dict`) and raises on
error — iterate it directly.

```python
try:
    bounces = client.Bounce().list({"count": "example", "offset": 1})
    for bounce in bounces:
        print(bounce)
except Exception as err:
    print(f"list failed: {err}")
```

### 3. Load a bounce

`load()` returns the ENTITY — call data_get() for the record — and raises on error.

```python
try:
    bounce = client.Bounce().load({"id": "example_id"})
    print(bounce)
except Exception as err:
    print(f"load failed: {err}")
```

### 4. Create, update, and remove

```python
# Update
client.Bounce().update({"id": "example_id", "BouncedAt": "example_BouncedAt", "CanActivate": True})

```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    statsapis = client.StatsApi().list()
    print(statsapis)
except Exception as err:
    print(f"list failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = PostmarkSDK.test()

# Entity ops return the ENTITY and raises on error;
# call data_get() for the record.
statsapi = client.StatsApi().list()
# statsapi contains the mock response record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = PostmarkSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
    },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
POSTMARK_TEST_LIVE=TRUE
```

Then run:

```bash
cd py && pytest test/
```


## Reference

### PostmarkSDK

```python
from postmark_sdk import PostmarkSDK

client = PostmarkSDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = PostmarkSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### PostmarkSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
| `Bounce` | `(data) -> BounceEntity` | Create a Bounce entity instance. |
| `BounceDump` | `(data) -> BounceDumpEntity` | Create a BounceDump entity instance. |
| `Bypass` | `(data) -> BypassEntity` | Create a Bypass entity instance. |
| `DeliveryStat` | `(data) -> DeliveryStatEntity` | Create a DeliveryStat entity instance. |
| `Dynamic` | `(data) -> DynamicEntity` | Create a Dynamic entity instance. |
| `Inbound` | `(data) -> InboundEntity` | Create an Inbound entity instance. |
| `InboundMessageFullDetail` | `(data) -> InboundMessageFullDetailEntity` | Create an InboundMessageFullDetail entity instance. |
| `Inboundrule` | `(data) -> InboundruleEntity` | Create an Inboundrule entity instance. |
| `MessageClickSearch` | `(data) -> MessageClickSearchEntity` | Create a MessageClickSearch entity instance. |
| `MessageOpenSearch` | `(data) -> MessageOpenSearchEntity` | Create a MessageOpenSearch entity instance. |
| `Outbound` | `(data) -> OutboundEntity` | Create an Outbound entity instance. |
| `OutboundMessageDetail` | `(data) -> OutboundMessageDetailEntity` | Create an OutboundMessageDetail entity instance. |
| `OutboundMessageDump` | `(data) -> OutboundMessageDumpEntity` | Create an OutboundMessageDump entity instance. |
| `Retry` | `(data) -> RetryEntity` | Create a Retry entity instance. |
| `SendEmail` | `(data) -> SendEmailEntity` | Create a SendEmail entity instance. |
| `SendEmailBatch` | `(data) -> SendEmailBatchEntity` | Create a SendEmailBatch entity instance. |
| `SentCount` | `(data) -> SentCountEntity` | Create a SentCount entity instance. |
| `Server` | `(data) -> ServerEntity` | Create a Server entity instance. |
| `StatsApi` | `(data) -> StatsApiEntity` | Create a StatsApi entity instance. |
| `Template` | `(data) -> TemplateEntity` | Create a Template entity instance. |
| `TemplateValidation` | `(data) -> TemplateValidationEntity` | Create a TemplateValidation entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria. Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `update` | `(reqdata, ctrl) -> any` | Update an existing entity. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> any` | Remove an entity. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (a `dict` for single-entity
ops, a `list` for `list`) and raise on error. Wrap calls in
`try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

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

Operations: List, Load, Update.

API path: `/bounces`

#### BounceDump

| Field | Description |
| --- | --- |
| `Body` | Raw source of bounce. |
| `id` |  |

Operations: Load.

API path: `/bounces/{bounceid}/dump`

#### Bypass

| Field | Description |
| --- | --- |
| `ErrorCode` |  |
| `Message` |  |

Operations: Update.

API path: `/messages/inbound/{messageid}/bypass`

#### DeliveryStat

| Field | Description |
| --- | --- |
| `Count` |  |
| `Name` |  |
| `Type` |  |

Operations: List.

API path: `/deliverystats`

#### Dynamic

| Field | Description |
| --- | --- |

Operations: Load.

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

Operations: List.

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

Operations: List.

API path: `/messages/inbound/{messageid}/details`

#### Inboundrule

| Field | Description |
| --- | --- |
| `ID` |  |
| `Rule` |  |
| `id` |  |

Operations: Create, List, Remove.

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

Operations: List, Load.

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

Operations: List, Load.

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

Operations: List, Load.

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

Operations: List.

API path: `/messages/outbound/{messageid}/details`

#### OutboundMessageDump

| Field | Description |
| --- | --- |
| `Body` | Raw source of message. |
| `id` |  |

Operations: Load.

API path: `/messages/outbound/{messageid}/dump`

#### Retry

| Field | Description |
| --- | --- |
| `ErrorCode` |  |
| `Message` |  |

Operations: Update.

API path: `/messages/inbound/{messageid}/retry`

#### SendEmail

| Field | Description |
| --- | --- |
| `ErrorCode` |  |
| `Message` |  |
| `MessageID` |  |
| `SubmittedAt` |  |
| `To` |  |

Operations: Create.

API path: `/email`

#### SendEmailBatch

| Field | Description |
| --- | --- |
| `ErrorCode` |  |
| `Message` |  |
| `MessageID` |  |
| `SubmittedAt` |  |
| `To` |  |

Operations: Create.

API path: `/email/batch`

#### SentCount

| Field | Description |
| --- | --- |
| `Date` |  |
| `Sent` |  |

Operations: List.

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

Operations: List, Update.

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

Operations: List, Load.

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

Operations: Create, List, Load, Remove, Update.

API path: `/templates`

#### TemplateValidation

| Field | Description |
| --- | --- |
| `AllContentIsValid` |  |
| `HtmlBody` |  |
| `Subject` |  |
| `SuggestedTemplateModel` |  |
| `TextBody` |  |

Operations: Create.

API path: `/templates/validate`



## Entities


### Bounce

Create an instance: `bounce = client.Bounce()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `BouncedAt` | `str` |  |
| `CanActivate` | `bool` |  |
| `Content` | `str` |  |
| `Description` | `str` |  |
| `Details` | `str` |  |
| `DumpAvailable` | `bool` |  |
| `Email` | `str` |  |
| `ID` | `str` |  |
| `Inactive` | `bool` |  |
| `MessageID` | `str` |  |
| `Name` | `str` |  |
| `Subject` | `str` |  |
| `Tag` | `str` |  |
| `Type` | `str` |  |
| `TypeCode` | `int` |  |
| `id` | `str` |  |

#### Example: Load

```python
bounce = client.Bounce().load({"id": "bounce_id"})
```

#### Example: List

```python
bounces = client.Bounce().list({"count": "example", "offset": 1})
```


### BounceDump

Create an instance: `bounce_dump = client.BounceDump()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `Body` | `str` | Raw source of bounce. |
| `id` | `str` |  |

#### Example: Load

```python
bounce_dump = client.BounceDump().load({"id": "bounce_dump_id"})
```


### Bypass

Create an instance: `bypass = client.Bypass()`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ErrorCode` | `int` |  |
| `Message` | `str` |  |


### DeliveryStat

Create an instance: `delivery_stat = client.DeliveryStat()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `Count` | `int` |  |
| `Name` | `str` |  |
| `Type` | `str` |  |

#### Example: List

```python
delivery_stats = client.DeliveryStat().list()
```


### Dynamic

Create an instance: `dynamic = client.Dynamic()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
dynamic = client.Dynamic().load()
```


### Inbound

Create an instance: `inbound = client.Inbound()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `Attachments` | `list` |  |
| `Cc` | `str` |  |
| `CcFull` | `list` |  |
| `Date` | `str` |  |
| `From` | `str` |  |
| `FromFull` | `Any` |  |
| `FromName` | `str` |  |
| `MailboxHash` | `str` |  |
| `MessageID` | `str` |  |
| `OriginalRecipient` | `str` |  |
| `ReplyTo` | `str` |  |
| `Status` | `str` |  |
| `Subject` | `str` |  |
| `Tag` | `str` |  |
| `To` | `str` |  |
| `ToFull` | `list` |  |

#### Example: List

```python
inbounds = client.Inbound().list({"count": "example", "offset": 1})
```


### InboundMessageFullDetail

Create an instance: `inbound_message_full_detail = client.InboundMessageFullDetail()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `Attachments` | `list` |  |
| `BlockedReason` | `str` |  |
| `Cc` | `str` |  |
| `CcFull` | `list` |  |
| `Date` | `str` |  |
| `From` | `str` |  |
| `FromFull` | `Any` |  |
| `FromName` | `str` |  |
| `Headers` | `list` |  |
| `HtmlBody` | `str` |  |
| `MailboxHash` | `str` |  |
| `MessageID` | `str` |  |
| `OriginalRecipient` | `str` |  |
| `ReplyTo` | `str` |  |
| `Status` | `str` |  |
| `Subject` | `str` |  |
| `Tag` | `str` |  |
| `TextBody` | `str` |  |
| `To` | `str` |  |
| `ToFull` | `list` |  |
| `id` | `str` |  |

#### Example: List

```python
inbound_message_full_details = client.InboundMessageFullDetail().list({"id": "example"})
```


### Inboundrule

Create an instance: `inboundrule = client.Inboundrule()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ID` | `int` |  |
| `Rule` | `str` |  |
| `id` | `str` |  |

#### Example: List

```python
inboundrules = client.Inboundrule().list({"count": "example", "offset": 1})
```

#### Example: Create

```python
inboundrule = client.Inboundrule().create({
})
```


### MessageClickSearch

Create an instance: `message_click_search = client.MessageClickSearch()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ClickLocation` | `str` |  |
| `Clicks` | `list` |  |
| `Client` | `Any` |  |
| `Geo` | `Any` |  |
| `MessageID` | `str` |  |
| `OS` | `Any` |  |
| `OriginalLink` | `str` |  |
| `Platform` | `str` |  |
| `ReceivedAt` | `str` |  |
| `Recipient` | `str` |  |
| `Tag` | `str` |  |
| `TotalCount` | `int` |  |
| `UserAgent` | `str` |  |

#### Example: Load

```python
message_click_search = client.MessageClickSearch().load({"messageid": "messageid", "count": "count", "offset": 1})
```

#### Example: List

```python
message_click_searchs = client.MessageClickSearch().list({"count": "example", "offset": 1})
```


### MessageOpenSearch

Create an instance: `message_open_search = client.MessageOpenSearch()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `Client` | `Any` |  |
| `FirstOpen` | `bool` |  |
| `Geo` | `Any` |  |
| `MessageID` | `str` |  |
| `OS` | `Any` |  |
| `Opens` | `list` |  |
| `Platform` | `str` |  |
| `ReceivedAt` | `str` |  |
| `Recipient` | `str` |  |
| `Tag` | `str` |  |
| `TotalCount` | `int` |  |
| `UserAgent` | `str` |  |

#### Example: Load

```python
message_open_search = client.MessageOpenSearch().load({"messageid": "messageid", "count": "count", "offset": 1})
```

#### Example: List

```python
message_open_searchs = client.MessageOpenSearch().list({"count": "example", "offset": 1})
```


### Outbound

Create an instance: `outbound = client.Outbound()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `Attachments` | `list` |  |
| `Bcc` | `list` |  |
| `BounceRate` | `int` |  |
| `Bounced` | `int` |  |
| `Cc` | `list` |  |
| `From` | `str` |  |
| `MessageID` | `str` |  |
| `Opens` | `int` |  |
| `ReceivedAt` | `str` |  |
| `Recipients` | `list` |  |
| `SMTPAPIErrors` | `int` |  |
| `Sent` | `int` |  |
| `SpamComplaints` | `int` |  |
| `SpamComplaintsRate` | `int` |  |
| `Status` | `str` |  |
| `Subject` | `str` |  |
| `Tag` | `str` |  |
| `To` | `list` |  |
| `TotalClicks` | `int` |  |
| `TotalTrackedLinksSent` | `int` |  |
| `TrackLinks` | `str` |  |
| `TrackOpens` | `bool` |  |
| `Tracked` | `int` |  |
| `UniqueLinksClicked` | `int` |  |
| `UniqueOpens` | `int` |  |
| `WithClientRecorded` | `int` |  |
| `WithLinkTracking` | `int` |  |
| `WithOpenTracking` | `int` |  |
| `WithPlatformRecorded` | `int` |  |

#### Example: Load

```python
outbound = client.Outbound().load()
```

#### Example: List

```python
outbounds = client.Outbound().list({"count": "example", "offset": 1})
```


### OutboundMessageDetail

Create an instance: `outbound_message_detail = client.OutboundMessageDetail()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `Attachments` | `list` |  |
| `Bcc` | `list` |  |
| `Body` | `str` |  |
| `Cc` | `list` |  |
| `From` | `str` |  |
| `HtmlBody` | `str` |  |
| `MessageEvents` | `list` |  |
| `MessageID` | `str` |  |
| `ReceivedAt` | `str` |  |
| `Recipients` | `list` |  |
| `Status` | `str` |  |
| `Subject` | `str` |  |
| `Tag` | `str` |  |
| `TextBody` | `str` |  |
| `To` | `list` |  |
| `TrackLinks` | `str` |  |
| `TrackOpens` | `bool` |  |
| `id` | `str` |  |

#### Example: List

```python
outbound_message_details = client.OutboundMessageDetail().list({"id": "example"})
```


### OutboundMessageDump

Create an instance: `outbound_message_dump = client.OutboundMessageDump()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `Body` | `str` | Raw source of message. |
| `id` | `str` |  |

#### Example: Load

```python
outbound_message_dump = client.OutboundMessageDump().load({"id": "outbound_message_dump_id"})
```


### Retry

Create an instance: `retry = client.Retry()`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ErrorCode` | `int` |  |
| `Message` | `str` |  |


### SendEmail

Create an instance: `send_email = client.SendEmail()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ErrorCode` | `int` |  |
| `Message` | `str` |  |
| `MessageID` | `str` |  |
| `SubmittedAt` | `str` |  |
| `To` | `str` |  |

#### Example: Create

```python
send_email = client.SendEmail().create({
})
```


### SendEmailBatch

Create an instance: `send_email_batch = client.SendEmailBatch()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ErrorCode` | `int` |  |
| `Message` | `str` |  |
| `MessageID` | `str` |  |
| `SubmittedAt` | `str` |  |
| `To` | `str` |  |

#### Example: Create

```python
send_email_batch = client.SendEmailBatch().create({
})
```


### SentCount

Create an instance: `sent_count = client.SentCount()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `Date` | `str` |  |
| `Sent` | `int` |  |

#### Example: List

```python
sent_counts = client.SentCount().list()
```


### Server

Create an instance: `server = client.Server()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ApiTokens` | `list` |  |
| `BounceHookUrl` | `str` |  |
| `ClickHookUrl` | `str` |  |
| `Color` | `str` |  |
| `DeliveryHookUrl` | `str` |  |
| `ID` | `int` |  |
| `InboundAddress` | `str` |  |
| `InboundDomain` | `str` |  |
| `InboundHash` | `str` |  |
| `InboundHookUrl` | `str` |  |
| `InboundSpamThreshold` | `int` |  |
| `Name` | `str` |  |
| `OpenHookUrl` | `str` |  |
| `PostFirstOpenOnly` | `bool` |  |
| `RawEmailEnabled` | `bool` |  |
| `ServerLink` | `str` |  |
| `SmtpApiActivated` | `bool` |  |
| `TrackLinks` | `str` |  |
| `TrackOpens` | `bool` |  |

#### Example: List

```python
servers = client.Server().list()
```


### StatsApi

Create an instance: `stats_api = client.StatsApi()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `Date` | `str` |  |
| `Days` | `list` |  |
| `Desktop` | `int` |  |
| `HardBounce` | `int` |  |
| `Mobile` | `int` |  |
| `Opens` | `int` |  |
| `SMTPApiError` | `int` |  |
| `SoftBounce` | `int` |  |
| `SpamComplaint` | `int` |  |
| `Tracked` | `int` |  |
| `Transient` | `int` |  |
| `Unique` | `int` |  |
| `Unknown` | `int` |  |
| `WebMail` | `int` |  |

#### Example: Load

```python
stats_api = client.StatsApi().load()
```

#### Example: List

```python
stats_apis = client.StatsApi().list()
```


### Template

Create an instance: `template = client.Template()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `Active` | `bool` | Indicates that this template may be used for sending email. |
| `Alias` | `str` | The user-supplied alias for this template. |
| `AssociatedServerId` | `int` | The ID of the Server with which this template is associated. |
| `HtmlBody` | `str` | The content to use for the HtmlBody when this template is used to send email. |
| `Name` | `str` | The display name for the template. |
| `Subject` | `str` | The content to use for the Subject when this template is used to send email. |
| `TemplateID` | `int` | The ID associated with the template. |
| `TemplateId` | `float` | The associated ID for this template. |
| `TextBody` | `str` | The content to use for the TextBody when this template is used to send email. |
| `id` | `str` |  |

#### Example: Load

```python
template = client.Template().load({"id": "template_id"})
```

#### Example: List

```python
templates = client.Template().list({"count": "example", "offset": 1})
```

#### Example: Create

```python
template = client.Template().create({
    "body": "example_body",  # Any
})
```


### TemplateValidation

Create an instance: `template_validation = client.TemplateValidation()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `AllContentIsValid` | `bool` |  |
| `HtmlBody` | `Any` |  |
| `Subject` | `Any` |  |
| `SuggestedTemplateModel` | `dict` |  |
| `TextBody` | `Any` |  |

#### Example: Create

```python
template_validation = client.TemplateValidation().create({
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

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: Test transport

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── postmark_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── schema.py                    -- Generated option + entity specs
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`postmark_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```python
statsapi = client.StatsApi()
statsapi.list()

# statsapi.data_get() now returns the statsapi data from the last list
# statsapi.match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
