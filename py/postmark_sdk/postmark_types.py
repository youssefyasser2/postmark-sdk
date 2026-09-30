# Typed models for the Postmark SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Bounce(TypedDict, total=False):
    BouncedAt: str
    CanActivate: bool
    Content: str
    Description: str
    Details: str
    DumpAvailable: bool
    Email: str
    ID: str
    Inactive: bool
    MessageID: str
    Name: str
    Subject: str
    Tag: str
    Type: str
    TypeCode: int
    id: str


class BounceLoadMatch(TypedDict):
    id: str


class BounceListMatchRequired(TypedDict):
    count: Any
    offset: int


class BounceListMatch(BounceListMatchRequired, total=False):
    email_filter: Any
    fromdate: Any
    inactive: Any
    message_id: str
    tag: Any
    todate: Any
    type: Any


class BounceUpdateDataRequired(TypedDict):
    id: str


class BounceUpdateData(BounceUpdateDataRequired, total=False):
    BouncedAt: str
    CanActivate: bool
    Content: str
    Description: str
    Details: str
    DumpAvailable: bool
    Email: str
    ID: str
    Inactive: bool
    MessageID: str
    Name: str
    Subject: str
    Tag: str
    Type: str
    TypeCode: int


class BounceDump(TypedDict, total=False):
    Body: str
    id: str


class BounceDumpLoadMatch(TypedDict):
    id: str


class Bypass(TypedDict, total=False):
    ErrorCode: int
    Message: str


class BypassUpdateDataRequired(TypedDict):
    inbound_id: str


class BypassUpdateData(BypassUpdateDataRequired, total=False):
    ErrorCode: int
    Message: str


class DeliveryStat(TypedDict, total=False):
    Count: int
    Name: str
    Type: str


class DeliveryStatListMatch(TypedDict, total=False):
    Count: int
    Name: str
    Type: str


class Dynamic(TypedDict):
    pass


class DynamicLoadMatch(TypedDict, total=False):
    fromdate: Any
    tag: Any
    todate: Any


class Inbound(TypedDict, total=False):
    Attachments: list
    Cc: str
    CcFull: list
    Date: str
    From: str
    FromFull: Any
    FromName: str
    MailboxHash: str
    MessageID: str
    OriginalRecipient: str
    ReplyTo: str
    Status: str
    Subject: str
    Tag: str
    To: str
    ToFull: list


class InboundListMatchRequired(TypedDict):
    count: Any
    offset: int


class InboundListMatch(InboundListMatchRequired, total=False):
    fromdate: Any
    fromemail: Any
    mailboxhash: Any
    recipient: Any
    status: Any
    subject: Any
    tag: Any
    todate: Any


class InboundMessageFullDetail(TypedDict, total=False):
    Attachments: list
    BlockedReason: str
    Cc: str
    CcFull: list
    Date: str
    From: str
    FromFull: Any
    FromName: str
    Headers: list
    HtmlBody: str
    MailboxHash: str
    MessageID: str
    OriginalRecipient: str
    ReplyTo: str
    Status: str
    Subject: str
    Tag: str
    TextBody: str
    To: str
    ToFull: list
    id: str


class InboundMessageFullDetailListMatch(TypedDict):
    id: str


class Inboundrule(TypedDict, total=False):
    ID: int
    Rule: str
    id: str


class InboundruleListMatch(TypedDict):
    count: Any
    offset: int


class InboundruleCreateData(TypedDict, total=False):
    body: Any
    ID: int
    Rule: str
    id: str


class InboundruleRemoveMatch(TypedDict):
    id: str


class MessageClickSearch(TypedDict, total=False):
    ClickLocation: str
    Clicks: list
    Client: Any
    Geo: Any
    MessageID: str
    OS: Any
    OriginalLink: str
    Platform: str
    ReceivedAt: str
    Recipient: str
    Tag: str
    TotalCount: int
    UserAgent: str


class MessageClickSearchLoadMatch(TypedDict):
    messageid: Any
    count: Any
    offset: int


class MessageClickSearchListMatchRequired(TypedDict):
    count: Any
    offset: int


class MessageClickSearchListMatch(MessageClickSearchListMatchRequired, total=False):
    city: Any
    client_company: Any
    client_family: Any
    client_name: Any
    country: Any
    os_company: Any
    os_family: Any
    os_name: Any
    platform: Any
    recipient: Any
    region: Any
    tag: Any


class MessageOpenSearch(TypedDict, total=False):
    Client: Any
    FirstOpen: bool
    Geo: Any
    MessageID: str
    OS: Any
    Opens: list
    Platform: str
    ReceivedAt: str
    Recipient: str
    Tag: str
    TotalCount: int
    UserAgent: str


class MessageOpenSearchLoadMatch(TypedDict):
    messageid: Any
    count: Any
    offset: int


class MessageOpenSearchListMatchRequired(TypedDict):
    count: Any
    offset: int


class MessageOpenSearchListMatch(MessageOpenSearchListMatchRequired, total=False):
    city: Any
    client_company: Any
    client_family: Any
    client_name: Any
    country: Any
    os_company: Any
    os_family: Any
    os_name: Any
    platform: Any
    recipient: Any
    region: Any
    tag: Any


class Outbound(TypedDict, total=False):
    Attachments: list
    Bcc: list
    BounceRate: int
    Bounced: int
    Cc: list
    From: str
    MessageID: str
    Opens: int
    ReceivedAt: str
    Recipients: list
    SMTPAPIErrors: int
    Sent: int
    SpamComplaints: int
    SpamComplaintsRate: int
    Status: str
    Subject: str
    Tag: str
    To: list
    TotalClicks: int
    TotalTrackedLinksSent: int
    TrackLinks: str
    TrackOpens: bool
    Tracked: int
    UniqueLinksClicked: int
    UniqueOpens: int
    WithClientRecorded: int
    WithLinkTracking: int
    WithOpenTracking: int
    WithPlatformRecorded: int


class OutboundLoadMatch(TypedDict, total=False):
    fromdate: Any
    tag: Any
    todate: Any


class OutboundListMatchRequired(TypedDict):
    count: Any
    offset: int


class OutboundListMatch(OutboundListMatchRequired, total=False):
    fromdate: Any
    fromemail: Any
    recipient: Any
    status: Any
    tag: Any
    todate: Any


class OutboundMessageDetail(TypedDict, total=False):
    Attachments: list
    Bcc: list
    Body: str
    Cc: list
    From: str
    HtmlBody: str
    MessageEvents: list
    MessageID: str
    ReceivedAt: str
    Recipients: list
    Status: str
    Subject: str
    Tag: str
    TextBody: str
    To: list
    TrackLinks: str
    TrackOpens: bool
    id: str


class OutboundMessageDetailListMatch(TypedDict):
    id: str


class OutboundMessageDump(TypedDict, total=False):
    Body: str
    id: str


class OutboundMessageDumpLoadMatch(TypedDict):
    id: str


class Retry(TypedDict, total=False):
    ErrorCode: int
    Message: str


class RetryUpdateDataRequired(TypedDict):
    inbound_id: str


class RetryUpdateData(RetryUpdateDataRequired, total=False):
    ErrorCode: int
    Message: str


class SendEmail(TypedDict, total=False):
    ErrorCode: int
    Message: str
    MessageID: str
    SubmittedAt: str
    To: str


class SendEmailCreateData(TypedDict, total=False):
    body: Any
    ErrorCode: int
    Message: str
    MessageID: str
    SubmittedAt: str
    To: str


class SendEmailBatch(TypedDict, total=False):
    ErrorCode: int
    Message: str
    MessageID: str
    SubmittedAt: str
    To: str


class SendEmailBatchCreateData(TypedDict, total=False):
    body: list
    ErrorCode: int
    Message: str
    MessageID: str
    SubmittedAt: str
    To: str


class SentCount(TypedDict, total=False):
    Date: str
    Sent: int


class SentCountListMatch(TypedDict, total=False):
    fromdate: Any
    tag: Any
    todate: Any


class Server(TypedDict, total=False):
    ApiTokens: list
    BounceHookUrl: str
    ClickHookUrl: str
    Color: str
    DeliveryHookUrl: str
    ID: int
    InboundAddress: str
    InboundDomain: str
    InboundHash: str
    InboundHookUrl: str
    InboundSpamThreshold: int
    Name: str
    OpenHookUrl: str
    PostFirstOpenOnly: bool
    RawEmailEnabled: bool
    ServerLink: str
    SmtpApiActivated: bool
    TrackLinks: str
    TrackOpens: bool


class ServerListMatch(TypedDict, total=False):
    ApiTokens: list
    BounceHookUrl: str
    ClickHookUrl: str
    Color: str
    DeliveryHookUrl: str
    ID: int
    InboundAddress: str
    InboundDomain: str
    InboundHash: str
    InboundHookUrl: str
    InboundSpamThreshold: int
    Name: str
    OpenHookUrl: str
    PostFirstOpenOnly: bool
    RawEmailEnabled: bool
    ServerLink: str
    SmtpApiActivated: bool
    TrackLinks: str
    TrackOpens: bool


class ServerUpdateData(TypedDict, total=False):
    body: Any
    ApiTokens: list
    BounceHookUrl: str
    ClickHookUrl: str
    Color: str
    DeliveryHookUrl: str
    ID: int
    InboundAddress: str
    InboundDomain: str
    InboundHash: str
    InboundHookUrl: str
    InboundSpamThreshold: int
    Name: str
    OpenHookUrl: str
    PostFirstOpenOnly: bool
    RawEmailEnabled: bool
    ServerLink: str
    SmtpApiActivated: bool
    TrackLinks: str
    TrackOpens: bool


class StatsApi(TypedDict, total=False):
    Date: str
    Days: list
    Desktop: int
    HardBounce: int
    Mobile: int
    Opens: int
    SMTPApiError: int
    SoftBounce: int
    SpamComplaint: int
    Tracked: int
    Transient: int
    Unique: int
    Unknown: int
    WebMail: int


class StatsApiLoadMatch(TypedDict, total=False):
    fromdate: Any
    tag: Any
    todate: Any


class StatsApiListMatch(TypedDict, total=False):
    fromdate: Any
    tag: Any
    todate: Any


class Template(TypedDict, total=False):
    Active: bool
    Alias: str
    AssociatedServerId: int
    HtmlBody: str
    Name: str
    Subject: str
    TemplateID: int
    TemplateId: float
    TextBody: str
    id: str


class TemplateLoadMatch(TypedDict):
    id: str


class TemplateListMatch(TypedDict):
    count: Any
    offset: int


class TemplateCreateDataRequired(TypedDict):
    body: Any


class TemplateCreateData(TemplateCreateDataRequired, total=False):
    Active: bool
    Alias: str
    AssociatedServerId: int
    HtmlBody: str
    Name: str
    Subject: str
    TemplateID: int
    TemplateId: float
    TextBody: str
    id: str


class TemplateUpdateDataRequired(TypedDict):
    id: str
    body: Any


class TemplateUpdateData(TemplateUpdateDataRequired, total=False):
    Active: bool
    Alias: str
    AssociatedServerId: int
    HtmlBody: str
    Name: str
    Subject: str
    TemplateID: int
    TemplateId: float
    TextBody: str


class TemplateRemoveMatch(TypedDict):
    id: str


class TemplateValidation(TypedDict, total=False):
    AllContentIsValid: bool
    HtmlBody: Any
    Subject: Any
    SuggestedTemplateModel: dict
    TextBody: Any


class TemplateValidationCreateData(TypedDict, total=False):
    body: Any
    AllContentIsValid: bool
    HtmlBody: Any
    Subject: Any
    SuggestedTemplateModel: dict
    TextBody: Any
