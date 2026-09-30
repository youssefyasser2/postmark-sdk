// Typed models for the Postmark SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Bounce {
  BouncedAt?: string
  CanActivate?: boolean
  Content?: string
  Description?: string
  Details?: string
  DumpAvailable?: boolean
  Email?: string
  ID?: string
  Inactive?: boolean
  MessageID?: string
  Name?: string
  Subject?: string
  Tag?: string
  Type?: string
  TypeCode?: number
  id?: string
}

export interface BounceLoadMatch {
  id: string
}

export interface BounceListMatch {
  count: any
  email_filter?: any
  fromdate?: any
  inactive?: any
  message_id?: string
  offset: number
  tag?: any
  todate?: any
  type?: any
}

export interface BounceUpdateData {
  id: string
  BouncedAt?: string
  CanActivate?: boolean
  Content?: string
  Description?: string
  Details?: string
  DumpAvailable?: boolean
  Email?: string
  ID?: string
  Inactive?: boolean
  MessageID?: string
  Name?: string
  Subject?: string
  Tag?: string
  Type?: string
  TypeCode?: number

  // Selects a custom action instead of the plain update:
  //   'activate'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface BounceDump {
  Body?: string
  id?: string
}

export interface BounceDumpLoadMatch {
  id: string
}

export interface Bypass {
  ErrorCode?: number
  Message?: string
}

export interface BypassUpdateData {
  inbound_id: string
  ErrorCode?: number
  Message?: string
}

export interface DeliveryStat {
  Count?: number
  Name?: string
  Type?: string
}

export interface DeliveryStatListMatch {
  Count?: number
  Name?: string
  Type?: string
}

export interface Dynamic {
}

export interface DynamicLoadMatch {
  fromdate?: any
  tag?: any
  todate?: any
}

export interface Inbound {
  Attachments?: any[]
  Cc?: string
  CcFull?: any[]
  Date?: string
  From?: string
  FromFull?: any
  FromName?: string
  MailboxHash?: string
  MessageID?: string
  OriginalRecipient?: string
  ReplyTo?: string
  Status?: string
  Subject?: string
  Tag?: string
  To?: string
  ToFull?: any[]
}

export interface InboundListMatch {
  count: any
  fromdate?: any
  fromemail?: any
  mailboxhash?: any
  offset: number
  recipient?: any
  status?: any
  subject?: any
  tag?: any
  todate?: any
}

export interface InboundMessageFullDetail {
  Attachments?: any[]
  BlockedReason?: string
  Cc?: string
  CcFull?: any[]
  Date?: string
  From?: string
  FromFull?: any
  FromName?: string
  Headers?: any[]
  HtmlBody?: string
  MailboxHash?: string
  MessageID?: string
  OriginalRecipient?: string
  ReplyTo?: string
  Status?: string
  Subject?: string
  Tag?: string
  TextBody?: string
  To?: string
  ToFull?: any[]
  id?: string
}

export interface InboundMessageFullDetailListMatch {
  id: string
}

export interface Inboundrule {
  ID?: number
  Rule?: string
  id?: string
}

export interface InboundruleListMatch {
  count: any
  offset: number
}

export interface InboundruleCreateData {
  body?: any
  ID?: number
  Rule?: string
  id?: string
}

export interface InboundruleRemoveMatch {
  id: string
}

export interface MessageClickSearch {
  ClickLocation?: string
  Clicks?: any[]
  Client?: any
  Geo?: any
  MessageID?: string
  OS?: any
  OriginalLink?: string
  Platform?: string
  ReceivedAt?: string
  Recipient?: string
  Tag?: string
  TotalCount?: number
  UserAgent?: string
}

export interface MessageClickSearchLoadMatch {
  messageid: any
  count: any
  offset: number
}

export interface MessageClickSearchListMatch {
  city?: any
  client_company?: any
  client_family?: any
  client_name?: any
  count: any
  country?: any
  offset: number
  os_company?: any
  os_family?: any
  os_name?: any
  platform?: any
  recipient?: any
  region?: any
  tag?: any
}

export interface MessageOpenSearch {
  Client?: any
  FirstOpen?: boolean
  Geo?: any
  MessageID?: string
  OS?: any
  Opens?: any[]
  Platform?: string
  ReceivedAt?: string
  Recipient?: string
  Tag?: string
  TotalCount?: number
  UserAgent?: string
}

export interface MessageOpenSearchLoadMatch {
  messageid: any
  count: any
  offset: number
}

export interface MessageOpenSearchListMatch {
  city?: any
  client_company?: any
  client_family?: any
  client_name?: any
  count: any
  country?: any
  offset: number
  os_company?: any
  os_family?: any
  os_name?: any
  platform?: any
  recipient?: any
  region?: any
  tag?: any
}

export interface Outbound {
  Attachments?: any[]
  Bcc?: any[]
  BounceRate?: number
  Bounced?: number
  Cc?: any[]
  From?: string
  MessageID?: string
  Opens?: number
  ReceivedAt?: string
  Recipients?: any[]
  SMTPAPIErrors?: number
  Sent?: number
  SpamComplaints?: number
  SpamComplaintsRate?: number
  Status?: string
  Subject?: string
  Tag?: string
  To?: any[]
  TotalClicks?: number
  TotalTrackedLinksSent?: number
  TrackLinks?: string
  TrackOpens?: boolean
  Tracked?: number
  UniqueLinksClicked?: number
  UniqueOpens?: number
  WithClientRecorded?: number
  WithLinkTracking?: number
  WithOpenTracking?: number
  WithPlatformRecorded?: number
}

export interface OutboundLoadMatch {
  fromdate?: any
  tag?: any
  todate?: any
}

export interface OutboundListMatch {
  count: any
  fromdate?: any
  fromemail?: any
  offset: number
  recipient?: any
  status?: any
  tag?: any
  todate?: any
}

export interface OutboundMessageDetail {
  Attachments?: any[]
  Bcc?: any[]
  Body?: string
  Cc?: any[]
  From?: string
  HtmlBody?: string
  MessageEvents?: any[]
  MessageID?: string
  ReceivedAt?: string
  Recipients?: any[]
  Status?: string
  Subject?: string
  Tag?: string
  TextBody?: string
  To?: any[]
  TrackLinks?: string
  TrackOpens?: boolean
  id?: string
}

export interface OutboundMessageDetailListMatch {
  id: string
}

export interface OutboundMessageDump {
  Body?: string
  id?: string
}

export interface OutboundMessageDumpLoadMatch {
  id: string
}

export interface Retry {
  ErrorCode?: number
  Message?: string
}

export interface RetryUpdateData {
  inbound_id: string
  ErrorCode?: number
  Message?: string
}

export interface SendEmail {
  ErrorCode?: number
  Message?: string
  MessageID?: string
  SubmittedAt?: string
  To?: string
}

export interface SendEmailCreateData {
  body?: any
  ErrorCode?: number
  Message?: string
  MessageID?: string
  SubmittedAt?: string
  To?: string
}

export interface SendEmailBatch {
  ErrorCode?: number
  Message?: string
  MessageID?: string
  SubmittedAt?: string
  To?: string
}

export interface SendEmailBatchCreateData {
  body?: any[]
  ErrorCode?: number
  Message?: string
  MessageID?: string
  SubmittedAt?: string
  To?: string
}

export interface SentCount {
  Date?: string
  Sent?: number
}

export interface SentCountListMatch {
  fromdate?: any
  tag?: any
  todate?: any
}

export interface Server {
  ApiTokens?: any[]
  BounceHookUrl?: string
  ClickHookUrl?: string
  Color?: string
  DeliveryHookUrl?: string
  ID?: number
  InboundAddress?: string
  InboundDomain?: string
  InboundHash?: string
  InboundHookUrl?: string
  InboundSpamThreshold?: number
  Name?: string
  OpenHookUrl?: string
  PostFirstOpenOnly?: boolean
  RawEmailEnabled?: boolean
  ServerLink?: string
  SmtpApiActivated?: boolean
  TrackLinks?: string
  TrackOpens?: boolean
}

export interface ServerListMatch {
  ApiTokens?: any[]
  BounceHookUrl?: string
  ClickHookUrl?: string
  Color?: string
  DeliveryHookUrl?: string
  ID?: number
  InboundAddress?: string
  InboundDomain?: string
  InboundHash?: string
  InboundHookUrl?: string
  InboundSpamThreshold?: number
  Name?: string
  OpenHookUrl?: string
  PostFirstOpenOnly?: boolean
  RawEmailEnabled?: boolean
  ServerLink?: string
  SmtpApiActivated?: boolean
  TrackLinks?: string
  TrackOpens?: boolean
}

export interface ServerUpdateData {
  body?: any
  ApiTokens?: any[]
  BounceHookUrl?: string
  ClickHookUrl?: string
  Color?: string
  DeliveryHookUrl?: string
  ID?: number
  InboundAddress?: string
  InboundDomain?: string
  InboundHash?: string
  InboundHookUrl?: string
  InboundSpamThreshold?: number
  Name?: string
  OpenHookUrl?: string
  PostFirstOpenOnly?: boolean
  RawEmailEnabled?: boolean
  ServerLink?: string
  SmtpApiActivated?: boolean
  TrackLinks?: string
  TrackOpens?: boolean
}

export interface StatsApi {
  Date?: string
  Days?: any[]
  Desktop?: number
  HardBounce?: number
  Mobile?: number
  Opens?: number
  SMTPApiError?: number
  SoftBounce?: number
  SpamComplaint?: number
  Tracked?: number
  Transient?: number
  Unique?: number
  Unknown?: number
  WebMail?: number
}

export interface StatsApiLoadMatch {
  fromdate?: any
  tag?: any
  todate?: any
}

export interface StatsApiListMatch {
  fromdate?: any
  tag?: any
  todate?: any
}

export interface Template {
  Active?: boolean
  Alias?: string
  AssociatedServerId?: number
  HtmlBody?: string
  Name?: string
  Subject?: string
  TemplateID?: number
  TemplateId?: number
  TextBody?: string
  id?: string
}

export interface TemplateLoadMatch {
  id: string
}

export interface TemplateListMatch {
  count: any
  offset: number
}

export interface TemplateCreateData {
  body: any
  Active?: boolean
  Alias?: string
  AssociatedServerId?: number
  HtmlBody?: string
  Name?: string
  Subject?: string
  TemplateID?: number
  TemplateId?: number
  TextBody?: string
  id?: string
}

export interface TemplateUpdateData {
  id: string
  body: any
  Active?: boolean
  Alias?: string
  AssociatedServerId?: number
  HtmlBody?: string
  Name?: string
  Subject?: string
  TemplateID?: number
  TemplateId?: number
  TextBody?: string
}

export interface TemplateRemoveMatch {
  id: string
}

export interface TemplateValidation {
  AllContentIsValid?: boolean
  HtmlBody?: any
  Subject?: any
  SuggestedTemplateModel?: Record<string, any>
  TextBody?: any
}

export interface TemplateValidationCreateData {
  body?: any
  AllContentIsValid?: boolean
  HtmlBody?: any
  Subject?: any
  SuggestedTemplateModel?: Record<string, any>
  TextBody?: any
}

