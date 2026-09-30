# Postmark API

Postmark makes sending and receiving email incredibly easy.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 21 entities and 43 HTTP routes. There are 2 SDK targets.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### Bounce

Results: OK.

SDK operations: `list`, `load`, `update`.

### BounceDump

Results: OK.

SDK operations: `load`.

Key fields to recognise:

- `Body`: Raw source of bounce. If no dump is available this will return an empty string.

### Bypass

Results: OK.

SDK operations: `update`.

### DeliveryStat

Results: OK.

SDK operations: `list`.

### Dynamic

Results: OK.

SDK operations: `load`.

### Inbound

Results: OK.

SDK operations: `list`.

### InboundMessageFullDetail

Results: OK.

SDK operations: `list`.

### Inboundrule

Results: OK.

SDK operations: `create`, `list`, `remove`.

### MessageClickSearch

Results: OK.

SDK operations: `list`, `load`.

### MessageOpenSearch

Results: OK.

SDK operations: `list`, `load`.

### Outbound

Results: OK.

SDK operations: `list`, `load`.

### OutboundMessageDetail

Results: OK.

SDK operations: `list`.

### OutboundMessageDump

Results: OK.

SDK operations: `load`.

Key fields to recognise:

- `Body`: Raw source of message. If no dump is available this will return an empty string.

### Retry

Results: OK.

SDK operations: `update`.

### SendEmail

Results: OK.

SDK operations: `create`.

### SendEmailBatch

Results: OK.

SDK operations: `create`.

### SentCount

Results: OK.

SDK operations: `list`.

### Server

Results: OK.

SDK operations: `list`, `update`.

### StatsApi

Results: OK.

SDK operations: `list`, `load`.

### Template

Results: OK.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

Key fields to recognise:

- `Active`: True if this template is currently available for use.
- `Alias`: The user-supplied alias for this template.
- `AssociatedServerId`: The ID of the Server with which this template is associated.
- `HtmlBody`: The content to use for the HtmlBody when this template is used to send email.
- `Name`: The display name for this template.

### TemplateValidation

Results: OK.

SDK operations: `create`.

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| Bounce | `list` | `GET /bounces` | See reference |
| Bounce | `load` | `GET /bounces/{bounceid}` | See reference |
| Bounce | `update` | `PUT /bounces/{bounceid}/activate` | See reference |
| BounceDump | `load` | `GET /bounces/{bounceid}/dump` | See reference |
| Bypass | `update` | `PUT /messages/inbound/{messageid}/bypass` | See reference |
| DeliveryStat | `list` | `GET /deliverystats` | See reference |
| Dynamic | `load` | `GET /stats/outbound/clicks` | See reference |
| Dynamic | `load` | `GET /stats/outbound/clicks/location` | See reference |
| Dynamic | `load` | `GET /stats/outbound/clicks/platforms` | See reference |
| Inbound | `list` | `GET /messages/inbound` | See reference |
| InboundMessageFullDetail | `list` | `GET /messages/inbound/{messageid}/details` | See reference |
| Inboundrule | `create` | `POST /triggers/inboundrules` | See reference |
| Inboundrule | `list` | `GET /triggers/inboundrules` | See reference |
| Inboundrule | `remove` | `DELETE /triggers/inboundrules/{triggerid}` | See reference |
| MessageClickSearch | `list` | `GET /messages/outbound/clicks` | See reference |
| MessageClickSearch | `load` | `GET /messages/outbound/clicks/{messageid}` | See reference |
| MessageOpenSearch | `list` | `GET /messages/outbound/opens` | See reference |
| MessageOpenSearch | `load` | `GET /messages/outbound/opens/{messageid}` | See reference |
| Outbound | `list` | `GET /messages/outbound` | See reference |
| Outbound | `load` | `GET /stats/outbound` | See reference |
| OutboundMessageDetail | `list` | `GET /messages/outbound/{messageid}/details` | See reference |
| OutboundMessageDump | `load` | `GET /messages/outbound/{messageid}/dump` | See reference |
| Retry | `update` | `PUT /messages/inbound/{messageid}/retry` | See reference |
| SendEmail | `create` | `POST /email` | See reference |
| SendEmail | `create` | `POST /email/withTemplate` | See reference |
| SendEmailBatch | `create` | `POST /email/batch` | See reference |
| SendEmailBatch | `create` | `POST /email/batchWithTemplates` | See reference |
| SentCount | `list` | `GET /stats/outbound/sends` | See reference |
| Server | `list` | `GET /server` | See reference |
| Server | `update` | `PUT /server` | See reference |
| StatsApi | `list` | `GET /stats/outbound/bounces` | See reference |
| StatsApi | `list` | `GET /stats/outbound/opens` | See reference |
| StatsApi | `list` | `GET /stats/outbound/opens/emailclients` | See reference |
| StatsApi | `list` | `GET /stats/outbound/opens/platforms` | See reference |
| StatsApi | `list` | `GET /stats/outbound/spam` | See reference |
| StatsApi | `list` | `GET /stats/outbound/tracked` | See reference |
| StatsApi | `load` | `GET /stats/outbound/clicks/browserfamilies` | See reference |
| Template | `create` | `POST /templates` | See reference |
| Template | `list` | `GET /templates` | See reference |
| Template | `load` | `GET /templates/{templateIdOrAlias}` | See reference |
| Template | `remove` | `DELETE /templates/{templateIdOrAlias}` | See reference |
| Template | `update` | `PUT /templates/{templateIdOrAlias}` | See reference |
| TemplateValidation | `create` | `POST /templates/validate` | See reference |

## Connect to the API

- API server: `https://api.postmarkapp.com`

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| Python | `py/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `test`: In-memory mock transport for testing without a live server

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

