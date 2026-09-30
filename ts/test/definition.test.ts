import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "bounce",
    "accessor": "Bounce",
    "op": "list",
    "method": "GET",
    "path": "/bounces",
    "args": [],
    "select": {
      "count": "v1",
      "email_filter": "v1",
      "fromdate": "v1",
      "inactive": "v1",
      "message_id": "v1",
      "offset": "v1",
      "tag": "v1",
      "todate": "v1",
      "type": "v1"
    },
    "headers": [
      {
        "name": "x_postmark_server_token",
        "wire": "X-Postmark-Server-Token",
        "value": "h1"
      }
    ],
    "query": [
      "count",
      "offset",
      "type",
      "inactive",
      "emailFilter",
      "messageID",
      "tag",
      "todate",
      "fromdate"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "TotalCount": 1,
      "Bounces": [
        {
          "BouncedAt": "2026-01-01T00:00:00Z",
          "CanActivate": true,
          "Content": "x",
          "Description": "x",
          "Details": "x",
          "DumpAvailable": true,
          "Email": "x",
          "ID": "x",
          "Inactive": true,
          "MessageID": "x",
          "Name": "x",
          "Subject": "x",
          "Tag": "x",
          "Type": "x",
          "TypeCode": 1
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "bounce",
    "accessor": "Bounce",
    "op": "load",
    "method": "GET",
    "path": "/bounces/{bounceid}",
    "args": [
      {
        "name": "id",
        "wire": "bounceid",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [
      {
        "name": "x_postmark_server_token",
        "wire": "X-Postmark-Server-Token",
        "value": "h1"
      }
    ],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": {
      "ID": "x",
      "Type": "x",
      "TypeCode": 1,
      "Name": "x",
      "Tag": "x",
      "MessageID": "x",
      "Description": "x",
      "Details": "x",
      "Email": "x",
      "BouncedAt": "2026-01-01T00:00:00Z",
      "DumpAvailable": true,
      "Inactive": true,
      "CanActivate": true,
      "Subject": "x",
      "Content": "x"
    },
    "idField": "id"
  },
  {
    "entity": "bounce",
    "accessor": "Bounce",
    "op": "update",
    "method": "PUT",
    "path": "/bounces/{bounceid}/activate",
    "action": "activate",
    "args": [
      {
        "name": "id",
        "wire": "bounceid",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [
      {
        "name": "x_postmark_server_token",
        "wire": "X-Postmark-Server-Token",
        "value": "h1"
      }
    ],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": {
      "Message": "x",
      "Bounce": {
        "ID": "x",
        "Type": "x",
        "TypeCode": 1,
        "Name": "x",
        "Tag": "x",
        "MessageID": "x",
        "Description": "x",
        "Details": "x",
        "Email": "x",
        "BouncedAt": "2026-01-01T00:00:00Z",
        "DumpAvailable": true,
        "Inactive": true,
        "CanActivate": true,
        "Subject": "x",
        "Content": "x"
      }
    },
    "idField": "id"
  },
  {
    "entity": "bounce_dump",
    "accessor": "BounceDump",
    "op": "load",
    "method": "GET",
    "path": "/bounces/{bounceid}/dump",
    "args": [
      {
        "name": "id",
        "wire": "bounceid",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [
      {
        "name": "x_postmark_server_token",
        "wire": "X-Postmark-Server-Token",
        "value": "h1"
      }
    ],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": {
      "Body": "x"
    },
    "idField": "id"
  },
  {
    "entity": "bypass",
    "accessor": "Bypass",
    "op": "update",
    "method": "PUT",
    "path": "/messages/inbound/{messageid}/bypass",
    "args": [
      {
        "name": "inbound_id",
        "wire": "messageid",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [
      {
        "name": "x_postmark_server_token",
        "wire": "X-Postmark-Server-Token",
        "value": "h1"
      }
    ],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": {
      "ErrorCode": 1,
      "Message": "x"
    },
    "idField": "id"
  },
  {
    "entity": "delivery_stat",
    "accessor": "DeliveryStat",
    "op": "list",
    "method": "GET",
    "path": "/deliverystats",
    "args": [],
    "select": {},
    "headers": [
      {
        "name": "x_postmark_server_token",
        "wire": "X-Postmark-Server-Token",
        "value": "h1"
      }
    ],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": {
      "InactiveMails": 1,
      "Bounces": [
        {
          "Count": 1,
          "Name": "x",
          "Type": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "inbound",
    "accessor": "Inbound",
    "op": "list",
    "method": "GET",
    "path": "/messages/inbound",
    "args": [],
    "select": {
      "count": "v1",
      "fromdate": "v1",
      "fromemail": "v1",
      "mailboxhash": "v1",
      "offset": "v1",
      "recipient": "v1",
      "status": "v1",
      "subject": "v1",
      "tag": "v1",
      "todate": "v1"
    },
    "headers": [
      {
        "name": "x_postmark_server_token",
        "wire": "X-Postmark-Server-Token",
        "value": "h1"
      }
    ],
    "query": [
      "count",
      "offset",
      "recipient",
      "fromemail",
      "subject",
      "mailboxhash",
      "tag",
      "status",
      "todate",
      "fromdate"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "TotalCount": 1,
      "InboundMessages": [
        {
          "Attachments": [
            {
              "Content": "x",
              "ContentID": "x",
              "ContentType": "x",
              "Name": "x"
            }
          ],
          "Cc": "x",
          "CcFull": [
            {
              "Email": "x",
              "Name": "x"
            }
          ],
          "Date": "x",
          "From": "x",
          "FromFull": {
            "Email": "x",
            "Name": "x"
          },
          "FromName": "x",
          "MailboxHash": "x",
          "MessageID": "x",
          "OriginalRecipient": "x",
          "ReplyTo": "x",
          "Status": "x",
          "Subject": "x",
          "Tag": "x",
          "To": "x",
          "ToFull": [
            {
              "Email": "x",
              "Name": "x"
            }
          ]
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "inbound_message_full_detail",
    "accessor": "InboundMessageFullDetail",
    "op": "list",
    "method": "GET",
    "path": "/messages/inbound/{messageid}/details",
    "args": [
      {
        "name": "id",
        "wire": "messageid",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [
      {
        "name": "x_postmark_server_token",
        "wire": "X-Postmark-Server-Token",
        "value": "h1"
      }
    ],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": {
      "From": "x",
      "FromName": "x",
      "FromFull": {
        "Email": "x",
        "Name": "x"
      },
      "To": "x",
      "ToFull": [
        {
          "Email": "x",
          "Name": "x"
        }
      ],
      "Cc": "x",
      "CcFull": [
        {
          "Email": "x",
          "Name": "x"
        }
      ],
      "ReplyTo": "x",
      "OriginalRecipient": "x",
      "Subject": "x",
      "Date": "x",
      "MailboxHash": "x",
      "TextBody": "x",
      "HtmlBody": "x",
      "Tag": "x",
      "Headers": [
        {
          "Name": "x",
          "Value": "x"
        }
      ],
      "Attachments": [
        {
          "Content": "x",
          "ContentID": "x",
          "ContentType": "x",
          "Name": "x"
        }
      ],
      "MessageID": "x",
      "BlockedReason": "x",
      "Status": "x"
    },
    "idField": "id"
  },
  {
    "entity": "inboundrule",
    "accessor": "Inboundrule",
    "op": "create",
    "method": "POST",
    "path": "/triggers/inboundrules",
    "args": [],
    "select": {
      "body": "v1"
    },
    "headers": [
      {
        "name": "x_postmark_server_token",
        "wire": "X-Postmark-Server-Token",
        "value": "h1"
      }
    ],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": {
      "ID": 1,
      "Rule": "x"
    },
    "idField": "id"
  },
  {
    "entity": "inboundrule",
    "accessor": "Inboundrule",
    "op": "list",
    "method": "GET",
    "path": "/triggers/inboundrules",
    "args": [],
    "select": {
      "count": "v1",
      "offset": "v1"
    },
    "headers": [
      {
        "name": "x_postmark_server_token",
        "wire": "X-Postmark-Server-Token",
        "value": "h1"
      }
    ],
    "query": [
      "count",
      "offset"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "TotalCount": 1,
      "InboundRules": [
        {
          "ID": 1,
          "Rule": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "inboundrule",
    "accessor": "Inboundrule",
    "op": "remove",
    "method": "DELETE",
    "path": "/triggers/inboundrules/{triggerid}",
    "args": [
      {
        "name": "id",
        "wire": "triggerid",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [
      {
        "name": "x_postmark_server_token",
        "wire": "X-Postmark-Server-Token",
        "value": "h1"
      }
    ],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": {
      "ErrorCode": 1,
      "Message": "x"
    },
    "idField": "id"
  },
  {
    "entity": "message_click_search",
    "accessor": "MessageClickSearch",
    "op": "list",
    "method": "GET",
    "path": "/messages/outbound/clicks",
    "args": [],
    "select": {
      "city": "v1",
      "client_company": "v1",
      "client_family": "v1",
      "client_name": "v1",
      "count": "v1",
      "country": "v1",
      "offset": "v1",
      "os_company": "v1",
      "os_family": "v1",
      "os_name": "v1",
      "platform": "v1",
      "recipient": "v1",
      "region": "v1",
      "tag": "v1"
    },
    "headers": [
      {
        "name": "x_postmark_server_token",
        "wire": "X-Postmark-Server-Token",
        "value": "h1"
      }
    ],
    "query": [
      "count",
      "offset",
      "recipient",
      "tag",
      "client_name",
      "client_company",
      "client_family",
      "os_name",
      "os_family",
      "os_company",
      "platform",
      "country",
      "region",
      "city"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "TotalCount": 1,
      "Clicks": [
        {
          "ClickLocation": "x",
          "Client": {
            "Company": "x",
            "Family": "x",
            "Name": "x"
          },
          "Geo": {
            "City": "x",
            "Coords": "x",
            "Country": "x",
            "CountryISOCode": "x",
            "IP": "x",
            "Region": "x",
            "RegionISOCode": "x",
            "Zip": "x"
          },
          "MessageID": "x",
          "OS": {
            "Company": "x",
            "Family": "x",
            "Name": "x"
          },
          "OriginalLink": "x",
          "Platform": "x",
          "ReceivedAt": "2026-01-01T00:00:00Z",
          "Recipient": "x",
          "Tag": "x",
          "UserAgent": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "message_click_search",
    "accessor": "MessageClickSearch",
    "op": "load",
    "method": "GET",
    "path": "/messages/outbound/clicks/{messageid}",
    "args": [
      {
        "name": "messageid",
        "wire": "messageid",
        "value": "p1"
      }
    ],
    "select": {
      "count": "v1",
      "offset": "v1"
    },
    "headers": [
      {
        "name": "x_postmark_server_token",
        "wire": "X-Postmark-Server-Token",
        "value": "h1"
      }
    ],
    "query": [
      "count",
      "offset"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "TotalCount": 1,
      "Clicks": [
        {
          "ClickLocation": "x",
          "Client": {
            "Company": "x",
            "Family": "x",
            "Name": "x"
          },
          "Geo": {
            "City": "x",
            "Coords": "x",
            "Country": "x",
            "CountryISOCode": "x",
            "IP": "x",
            "Region": "x",
            "RegionISOCode": "x",
            "Zip": "x"
          },
          "MessageID": "x",
          "OS": {
            "Company": "x",
            "Family": "x",
            "Name": "x"
          },
          "OriginalLink": "x",
          "Platform": "x",
          "ReceivedAt": "2026-01-01T00:00:00Z",
          "Recipient": "x",
          "Tag": "x",
          "UserAgent": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "message_open_search",
    "accessor": "MessageOpenSearch",
    "op": "list",
    "method": "GET",
    "path": "/messages/outbound/opens",
    "args": [],
    "select": {
      "city": "v1",
      "client_company": "v1",
      "client_family": "v1",
      "client_name": "v1",
      "count": "v1",
      "country": "v1",
      "offset": "v1",
      "os_company": "v1",
      "os_family": "v1",
      "os_name": "v1",
      "platform": "v1",
      "recipient": "v1",
      "region": "v1",
      "tag": "v1"
    },
    "headers": [
      {
        "name": "x_postmark_server_token",
        "wire": "X-Postmark-Server-Token",
        "value": "h1"
      }
    ],
    "query": [
      "count",
      "offset",
      "recipient",
      "tag",
      "client_name",
      "client_company",
      "client_family",
      "os_name",
      "os_family",
      "os_company",
      "platform",
      "country",
      "region",
      "city"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "TotalCount": 1,
      "Opens": [
        {
          "Client": {
            "Company": "x",
            "Family": "x",
            "Name": "x"
          },
          "FirstOpen": true,
          "Geo": {
            "City": "x",
            "Coords": "x",
            "Country": "x",
            "CountryISOCode": "x",
            "IP": "x",
            "Region": "x",
            "RegionISOCode": "x",
            "Zip": "x"
          },
          "MessageID": "x",
          "OS": {
            "Company": "x",
            "Family": "x",
            "Name": "x"
          },
          "Platform": "x",
          "ReceivedAt": "2026-01-01T00:00:00Z",
          "Recipient": "x",
          "Tag": "x",
          "UserAgent": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "message_open_search",
    "accessor": "MessageOpenSearch",
    "op": "load",
    "method": "GET",
    "path": "/messages/outbound/opens/{messageid}",
    "args": [
      {
        "name": "messageid",
        "wire": "messageid",
        "value": "p1"
      }
    ],
    "select": {
      "count": "v1",
      "offset": "v1"
    },
    "headers": [
      {
        "name": "x_postmark_server_token",
        "wire": "X-Postmark-Server-Token",
        "value": "h1"
      }
    ],
    "query": [
      "count",
      "offset"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "TotalCount": 1,
      "Opens": [
        {
          "Client": {
            "Company": "x",
            "Family": "x",
            "Name": "x"
          },
          "FirstOpen": true,
          "Geo": {
            "City": "x",
            "Coords": "x",
            "Country": "x",
            "CountryISOCode": "x",
            "IP": "x",
            "Region": "x",
            "RegionISOCode": "x",
            "Zip": "x"
          },
          "MessageID": "x",
          "OS": {
            "Company": "x",
            "Family": "x",
            "Name": "x"
          },
          "Platform": "x",
          "ReceivedAt": "2026-01-01T00:00:00Z",
          "Recipient": "x",
          "Tag": "x",
          "UserAgent": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "outbound",
    "accessor": "Outbound",
    "op": "list",
    "method": "GET",
    "path": "/messages/outbound",
    "args": [],
    "select": {
      "count": "v1",
      "fromdate": "v1",
      "fromemail": "v1",
      "offset": "v1",
      "recipient": "v1",
      "status": "v1",
      "tag": "v1",
      "todate": "v1"
    },
    "headers": [
      {
        "name": "x_postmark_server_token",
        "wire": "X-Postmark-Server-Token",
        "value": "h1"
      }
    ],
    "query": [
      "count",
      "offset",
      "recipient",
      "fromemail",
      "tag",
      "status",
      "todate",
      "fromdate"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "TotalCount": 1,
      "Messages": [
        {
          "Attachments": [
            {
              "Content": "x",
              "ContentID": "x",
              "ContentType": "x",
              "Name": "x"
            }
          ],
          "Bcc": [
            {
              "Email": "x",
              "Name": "x"
            }
          ],
          "Cc": [
            {
              "Email": "x",
              "Name": "x"
            }
          ],
          "From": "x",
          "MessageID": "x",
          "ReceivedAt": "2026-01-01T00:00:00Z",
          "Recipients": [
            "x"
          ],
          "Status": "x",
          "Subject": "x",
          "Tag": "x",
          "To": [
            {
              "Email": "x",
              "Name": "x"
            }
          ],
          "TrackLinks": "None",
          "TrackOpens": true
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "outbound",
    "accessor": "Outbound",
    "op": "load",
    "method": "GET",
    "path": "/stats/outbound",
    "args": [],
    "select": {
      "fromdate": "v1",
      "tag": "v1",
      "todate": "v1"
    },
    "headers": [
      {
        "name": "x_postmark_server_token",
        "wire": "X-Postmark-Server-Token",
        "value": "h1"
      }
    ],
    "query": [
      "tag",
      "fromdate",
      "todate"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "Sent": 1,
      "Bounced": 1,
      "SMTPAPIErrors": 1,
      "BounceRate": 1,
      "SpamComplaints": 1,
      "SpamComplaintsRate": 1,
      "Opens": 1,
      "UniqueOpens": 1,
      "Tracked": 1,
      "WithOpenTracking": 1,
      "WithLinkTracking": 1,
      "TotalClicks": 1,
      "UniqueLinksClicked": 1,
      "TotalTrackedLinksSent": 1,
      "WithClientRecorded": 1,
      "WithPlatformRecorded": 1
    },
    "idField": "id"
  },
  {
    "entity": "outbound_message_detail",
    "accessor": "OutboundMessageDetail",
    "op": "list",
    "method": "GET",
    "path": "/messages/outbound/{messageid}/details",
    "args": [
      {
        "name": "id",
        "wire": "messageid",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [
      {
        "name": "x_postmark_server_token",
        "wire": "X-Postmark-Server-Token",
        "value": "h1"
      }
    ],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": {
      "TextBody": "x",
      "HtmlBody": "x",
      "Body": "x",
      "Tag": "x",
      "MessageID": "x",
      "To": [
        {
          "Email": "x",
          "Name": "x"
        }
      ],
      "Cc": [
        {
          "Email": "x",
          "Name": "x"
        }
      ],
      "Bcc": [
        {
          "Email": "x",
          "Name": "x"
        }
      ],
      "Recipients": [
        "x"
      ],
      "ReceivedAt": "2026-01-01T00:00:00Z",
      "From": "x",
      "Subject": "x",
      "Attachments": [
        {
          "Content": "x",
          "ContentID": "x",
          "ContentType": "x",
          "Name": "x"
        }
      ],
      "Status": "x",
      "TrackOpens": true,
      "TrackLinks": "None",
      "MessageEvents": [
        {
          "Details": {
            "BounceID": "x",
            "DeliveryMessage": "x",
            "DestinationIP": "x",
            "DestinationServer": "x",
            "Summary": "x"
          },
          "ReceivedAt": "2026-01-01T00:00:00Z",
          "Recipient": "x",
          "Type": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "outbound_message_dump",
    "accessor": "OutboundMessageDump",
    "op": "load",
    "method": "GET",
    "path": "/messages/outbound/{messageid}/dump",
    "args": [
      {
        "name": "id",
        "wire": "messageid",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [
      {
        "name": "x_postmark_server_token",
        "wire": "X-Postmark-Server-Token",
        "value": "h1"
      }
    ],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": {
      "Body": "x"
    },
    "idField": "id"
  },
  {
    "entity": "retry",
    "accessor": "Retry",
    "op": "update",
    "method": "PUT",
    "path": "/messages/inbound/{messageid}/retry",
    "args": [
      {
        "name": "inbound_id",
        "wire": "messageid",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [
      {
        "name": "x_postmark_server_token",
        "wire": "X-Postmark-Server-Token",
        "value": "h1"
      }
    ],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": {
      "ErrorCode": 1,
      "Message": "x"
    },
    "idField": "id"
  },
  {
    "entity": "sent_count",
    "accessor": "SentCount",
    "op": "list",
    "method": "GET",
    "path": "/stats/outbound/sends",
    "args": [],
    "select": {
      "fromdate": "v1",
      "tag": "v1",
      "todate": "v1"
    },
    "headers": [
      {
        "name": "x_postmark_server_token",
        "wire": "X-Postmark-Server-Token",
        "value": "h1"
      }
    ],
    "query": [
      "tag",
      "fromdate",
      "todate"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "Sent": 1,
      "Days": [
        {
          "Date": "x",
          "Sent": 1
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "server",
    "accessor": "Server",
    "op": "list",
    "method": "GET",
    "path": "/server",
    "args": [],
    "select": {},
    "headers": [
      {
        "name": "x_postmark_server_token",
        "wire": "X-Postmark-Server-Token",
        "value": "h1"
      }
    ],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": {
      "ID": 1,
      "Name": "x",
      "ApiTokens": [
        "x"
      ],
      "ServerLink": "x",
      "Color": "purple",
      "InboundAddress": "x",
      "RawEmailEnabled": true,
      "DeliveryHookUrl": "x",
      "SmtpApiActivated": true,
      "InboundHookUrl": "x",
      "BounceHookUrl": "x",
      "OpenHookUrl": "x",
      "PostFirstOpenOnly": true,
      "TrackOpens": true,
      "TrackLinks": "None",
      "ClickHookUrl": "x",
      "InboundDomain": "x",
      "InboundHash": "x",
      "InboundSpamThreshold": 1
    },
    "idField": "id"
  },
  {
    "entity": "server",
    "accessor": "Server",
    "op": "update",
    "method": "PUT",
    "path": "/server",
    "args": [],
    "select": {
      "body": "v1"
    },
    "headers": [
      {
        "name": "x_postmark_server_token",
        "wire": "X-Postmark-Server-Token",
        "value": "h1"
      }
    ],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": {
      "ID": 1,
      "Name": "x",
      "ApiTokens": [
        "x"
      ],
      "ServerLink": "x",
      "Color": "purple",
      "InboundAddress": "x",
      "RawEmailEnabled": true,
      "DeliveryHookUrl": "x",
      "SmtpApiActivated": true,
      "InboundHookUrl": "x",
      "BounceHookUrl": "x",
      "OpenHookUrl": "x",
      "PostFirstOpenOnly": true,
      "TrackOpens": true,
      "TrackLinks": "None",
      "ClickHookUrl": "x",
      "InboundDomain": "x",
      "InboundHash": "x",
      "InboundSpamThreshold": 1
    },
    "idField": "id"
  },
  {
    "entity": "stats_api",
    "accessor": "StatsApi",
    "op": "load",
    "method": "GET",
    "path": "/stats/outbound/clicks/browserfamilies",
    "args": [],
    "select": {
      "fromdate": "v1",
      "tag": "v1",
      "todate": "v1"
    },
    "headers": [
      {
        "name": "x_postmark_server_token",
        "wire": "X-Postmark-Server-Token",
        "value": "h1"
      }
    ],
    "query": [
      "tag",
      "fromdate",
      "todate"
    ],
    "auth": null,
    "status": 200,
    "sample": {},
    "idField": "id"
  },
  {
    "entity": "template",
    "accessor": "Template",
    "op": "create",
    "method": "POST",
    "path": "/templates",
    "args": [],
    "select": {
      "body": "v1"
    },
    "headers": [
      {
        "name": "x_postmark_server_token",
        "wire": "X-Postmark-Server-Token",
        "value": "h1"
      }
    ],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": {
      "Name": "x",
      "Alias": "x",
      "TemplateId": 1,
      "Active": true
    },
    "idField": "id"
  },
  {
    "entity": "template",
    "accessor": "Template",
    "op": "list",
    "method": "GET",
    "path": "/templates",
    "args": [],
    "select": {
      "count": "v1",
      "offset": "v1"
    },
    "headers": [
      {
        "name": "x_postmark_server_token",
        "wire": "X-Postmark-Server-Token",
        "value": "h1"
      }
    ],
    "query": [
      "Count",
      "Offset"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "TotalCount": 1,
      "Templates API": [
        {
          "Active": true,
          "Alias": "x",
          "Name": "x",
          "TemplateId": 1
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "template",
    "accessor": "Template",
    "op": "load",
    "method": "GET",
    "path": "/templates/{templateIdOrAlias}",
    "args": [
      {
        "name": "id",
        "wire": "templateIdOrAlias",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [
      {
        "name": "x_postmark_server_token",
        "wire": "X-Postmark-Server-Token",
        "value": "h1"
      }
    ],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": {
      "Name": "x",
      "Alias": "x",
      "TemplateID": 1,
      "HtmlBody": "x",
      "TextBody": "x",
      "AssociatedServerId": 1,
      "Subject": "x",
      "Active": true
    },
    "idField": "id"
  },
  {
    "entity": "template",
    "accessor": "Template",
    "op": "remove",
    "method": "DELETE",
    "path": "/templates/{templateIdOrAlias}",
    "args": [
      {
        "name": "id",
        "wire": "templateIdOrAlias",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [
      {
        "name": "x_postmark_server_token",
        "wire": "X-Postmark-Server-Token",
        "value": "h1"
      }
    ],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": {
      "Name": "x",
      "Alias": "x",
      "TemplateID": 1,
      "HtmlBody": "x",
      "TextBody": "x",
      "AssociatedServerId": 1,
      "Subject": "x",
      "Active": true
    },
    "idField": "id"
  },
  {
    "entity": "template",
    "accessor": "Template",
    "op": "update",
    "method": "PUT",
    "path": "/templates/{templateIdOrAlias}",
    "args": [
      {
        "name": "id",
        "wire": "templateIdOrAlias",
        "value": "p1"
      }
    ],
    "select": {
      "body": "v1"
    },
    "headers": [
      {
        "name": "x_postmark_server_token",
        "wire": "X-Postmark-Server-Token",
        "value": "h1"
      }
    ],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": {
      "Name": "x",
      "Alias": "x",
      "TemplateId": 1,
      "Active": true
    },
    "idField": "id"
  },
  {
    "entity": "template_validation",
    "accessor": "TemplateValidation",
    "op": "create",
    "method": "POST",
    "path": "/templates/validate",
    "args": [],
    "select": {
      "body": "v1"
    },
    "headers": [
      {
        "name": "x_postmark_server_token",
        "wire": "X-Postmark-Server-Token",
        "value": "h1"
      }
    ],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": {
      "AllContentIsValid": true,
      "TextBody": {
        "ContentIsValid": true,
        "ValidationErrors": [
          {
            "Message": "x",
            "Line": 1,
            "CharacterPosition": 1
          }
        ],
        "RenderedContent": "x"
      },
      "HtmlBody": {
        "ContentIsValid": true,
        "ValidationErrors": [
          {
            "Message": "x",
            "Line": 1,
            "CharacterPosition": 1
          }
        ],
        "RenderedContent": "x"
      },
      "Subject": {
        "ContentIsValid": true,
        "ValidationErrors": [
          {
            "Message": "x",
            "Line": 1,
            "CharacterPosition": 1
          }
        ],
        "RenderedContent": "x"
      },
      "SuggestedTemplateModel": {}
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
