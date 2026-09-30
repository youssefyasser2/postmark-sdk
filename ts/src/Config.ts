
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'Postmark',
        slug: "postmark",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },

  }


  options = {
    base: "https://api.postmarkapp.com",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        bounce: {
        },
  
        bounce_dump: {
        },
  
        bypass: {
        },
  
        delivery_stat: {
        },
  
        dynamic: {
        },
  
        inbound: {
        },
  
        inbound_message_full_detail: {
        },
  
        inboundrule: {
        },
  
        message_click_search: {
        },
  
        message_open_search: {
        },
  
        outbound: {
        },
  
        outbound_message_detail: {
        },
  
        outbound_message_dump: {
        },
  
        retry: {
        },
  
        send_email: {
        },
  
        send_email_batch: {
        },
  
        sent_count: {
        },
  
        server: {
        },
  
        stats_api: {
        },
  
        template: {
        },
  
        template_validation: {
        },
  
    }
  }


  entity = {
    "bounce": {
      "fields": [
        {
          "name": "BouncedAt",
          "title": "Bounced At",
          "type": "`$STRING`",
          "format": "date-time"
        },
        {
          "name": "CanActivate",
          "title": "Can Activate",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "Content",
          "title": "Content",
          "type": "`$STRING`"
        },
        {
          "name": "Description",
          "title": "Description",
          "type": "`$STRING`"
        },
        {
          "name": "Details",
          "title": "Details",
          "type": "`$STRING`"
        },
        {
          "name": "DumpAvailable",
          "title": "Dump Available",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "Email",
          "title": "Email",
          "type": "`$STRING`",
          "format": "email"
        },
        {
          "name": "ID",
          "title": "Id",
          "type": "`$STRING`"
        },
        {
          "name": "Inactive",
          "title": "Inactive",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "MessageID",
          "title": "Message Id",
          "type": "`$STRING`"
        },
        {
          "name": "Name",
          "title": "Name",
          "type": "`$STRING`"
        },
        {
          "name": "Subject",
          "title": "Subject",
          "type": "`$STRING`"
        },
        {
          "name": "Tag",
          "title": "Tag",
          "type": "`$STRING`"
        },
        {
          "name": "Type",
          "title": "Type",
          "type": "`$STRING`"
        },
        {
          "name": "TypeCode",
          "title": "Type Code",
          "type": "`$INTEGER`"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "bounce",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/bounces",
              "segments": [
                {
                  "lit": "bounces"
                }
              ],
              "parts": [
                "bounces"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.Bounces`"
              },
              "args": {
                "header": [
                  {
                    "name": "x_postmark_server_token",
                    "orig": "X-Postmark-Server-Token",
                    "type": "`$ANY`",
                    "kind": "header",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "count",
                    "orig": "count",
                    "type": "`$ANY`",
                    "kind": "query",
                    "reqd": true
                  },
                  {
                    "name": "email_filter",
                    "orig": "emailFilter",
                    "type": "`$ANY`",
                    "kind": "query"
                  },
                  {
                    "name": "fromdate",
                    "orig": "fromdate",
                    "type": "`$ANY`",
                    "kind": "query"
                  },
                  {
                    "name": "inactive",
                    "orig": "inactive",
                    "type": "`$ANY`",
                    "kind": "query"
                  },
                  {
                    "name": "message_id",
                    "orig": "messageID",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "offset",
                    "orig": "offset",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "reqd": true
                  },
                  {
                    "name": "tag",
                    "orig": "tag",
                    "type": "`$ANY`",
                    "kind": "query"
                  },
                  {
                    "name": "todate",
                    "orig": "todate",
                    "type": "`$ANY`",
                    "kind": "query"
                  },
                  {
                    "name": "type",
                    "orig": "type",
                    "type": "`$ANY`",
                    "kind": "query"
                  }
                ]
              },
              "select": {
                "exist": [
                  "count",
                  "email_filter",
                  "fromdate",
                  "inactive",
                  "message_id",
                  "offset",
                  "tag",
                  "todate",
                  "type",
                  "x_postmark_server_token"
                ]
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/bounces/{bounceid}",
              "segments": [
                {
                  "lit": "bounces"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "bounces",
                "{id}"
              ],
              "rename": {
                "param": {
                  "bounceid": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "x_postmark_server_token",
                    "orig": "X-Postmark-Server-Token",
                    "type": "`$ANY`",
                    "kind": "header",
                    "reqd": true
                  }
                ],
                "params": [
                  {
                    "name": "id",
                    "orig": "bounceid",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id",
                  "x_postmark_server_token"
                ]
              }
            }
          ]
        },
        "update": {
          "input": "data",
          "name": "update",
          "points": [
            {
              "kind": "http",
              "method": "PUT",
              "orig": "/bounces/{bounceid}/activate",
              "segments": [
                {
                  "lit": "bounces"
                },
                {
                  "var": "id"
                },
                {
                  "lit": "activate"
                }
              ],
              "parts": [
                "bounces",
                "{id}",
                "activate"
              ],
              "rename": {
                "param": {
                  "bounceid": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.Bounce`"
              },
              "args": {
                "header": [
                  {
                    "name": "x_postmark_server_token",
                    "orig": "X-Postmark-Server-Token",
                    "type": "`$ANY`",
                    "kind": "header",
                    "reqd": true
                  }
                ],
                "params": [
                  {
                    "name": "id",
                    "orig": "bounceid",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "$action": "activate",
                "exist": [
                  "id",
                  "x_postmark_server_token"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "bounce_dump": {
      "fields": [
        {
          "name": "Body",
          "title": "Body",
          "type": "`$STRING`",
          "short": "Raw source of bounce."
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "bounce_dump",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/bounces/{bounceid}/dump",
              "segments": [
                {
                  "lit": "bounces"
                },
                {
                  "var": "id"
                },
                {
                  "lit": "dump"
                }
              ],
              "parts": [
                "bounces",
                "{id}",
                "dump"
              ],
              "rename": {
                "param": {
                  "bounceid": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "x_postmark_server_token",
                    "orig": "X-Postmark-Server-Token",
                    "type": "`$ANY`",
                    "kind": "header",
                    "reqd": true
                  }
                ],
                "params": [
                  {
                    "name": "id",
                    "orig": "bounceid",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id",
                  "x_postmark_server_token"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "bypass": {
      "fields": [
        {
          "name": "ErrorCode",
          "title": "Error Code",
          "type": "`$INTEGER`"
        },
        {
          "name": "Message",
          "title": "Message",
          "type": "`$STRING`"
        }
      ],
      "name": "bypass",
      "op": {
        "update": {
          "input": "data",
          "name": "update",
          "points": [
            {
              "kind": "http",
              "method": "PUT",
              "orig": "/messages/inbound/{messageid}/bypass",
              "segments": [
                {
                  "lit": "messages"
                },
                {
                  "lit": "inbound"
                },
                {
                  "var": "inbound_id"
                },
                {
                  "lit": "bypass"
                }
              ],
              "parts": [
                "messages",
                "inbound",
                "{inbound_id}",
                "bypass"
              ],
              "rename": {
                "param": {
                  "messageid": "inbound_id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "x_postmark_server_token",
                    "orig": "X-Postmark-Server-Token",
                    "type": "`$ANY`",
                    "kind": "header",
                    "reqd": true
                  }
                ],
                "params": [
                  {
                    "name": "inbound_id",
                    "orig": "messageid",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "inbound_id",
                  "x_postmark_server_token"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "$.main.kit.entity.inbound"
          ]
        ]
      }
    },
    "delivery_stat": {
      "fields": [
        {
          "name": "Count",
          "title": "Count",
          "type": "`$INTEGER`"
        },
        {
          "name": "Name",
          "title": "Name",
          "type": "`$STRING`"
        },
        {
          "name": "Type",
          "title": "Type",
          "type": "`$STRING`"
        }
      ],
      "name": "delivery_stat",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/deliverystats",
              "segments": [
                {
                  "lit": "deliverystats"
                }
              ],
              "parts": [
                "deliverystats"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.Bounces`"
              },
              "args": {
                "header": [
                  {
                    "name": "x_postmark_server_token",
                    "orig": "X-Postmark-Server-Token",
                    "type": "`$ANY`",
                    "kind": "header",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "x_postmark_server_token"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "dynamic": {
      "fields": [],
      "name": "dynamic",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/stats/outbound/clicks",
              "segments": [
                {
                  "lit": "stats"
                },
                {
                  "lit": "outbound"
                },
                {
                  "lit": "clicks"
                }
              ],
              "parts": [
                "stats",
                "outbound",
                "clicks"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "x_postmark_server_token",
                    "orig": "X-Postmark-Server-Token",
                    "type": "`$ANY`",
                    "kind": "header",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "fromdate",
                    "orig": "fromdate",
                    "type": "`$ANY`",
                    "kind": "query"
                  },
                  {
                    "name": "tag",
                    "orig": "tag",
                    "type": "`$ANY`",
                    "kind": "query"
                  },
                  {
                    "name": "todate",
                    "orig": "todate",
                    "type": "`$ANY`",
                    "kind": "query"
                  }
                ]
              },
              "select": {
                "exist": [
                  "fromdate",
                  "tag",
                  "todate",
                  "x_postmark_server_token"
                ]
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/stats/outbound/clicks/location",
              "segments": [
                {
                  "lit": "stats"
                },
                {
                  "lit": "outbound"
                },
                {
                  "lit": "clicks"
                },
                {
                  "lit": "location"
                }
              ],
              "parts": [
                "stats",
                "outbound",
                "clicks",
                "location"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "x_postmark_server_token",
                    "orig": "X-Postmark-Server-Token",
                    "type": "`$ANY`",
                    "kind": "header",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "fromdate",
                    "orig": "fromdate",
                    "type": "`$ANY`",
                    "kind": "query"
                  },
                  {
                    "name": "tag",
                    "orig": "tag",
                    "type": "`$ANY`",
                    "kind": "query"
                  },
                  {
                    "name": "todate",
                    "orig": "todate",
                    "type": "`$ANY`",
                    "kind": "query"
                  }
                ]
              },
              "select": {
                "exist": [
                  "fromdate",
                  "tag",
                  "todate",
                  "x_postmark_server_token"
                ]
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/stats/outbound/clicks/platforms",
              "segments": [
                {
                  "lit": "stats"
                },
                {
                  "lit": "outbound"
                },
                {
                  "lit": "clicks"
                },
                {
                  "lit": "platforms"
                }
              ],
              "parts": [
                "stats",
                "outbound",
                "clicks",
                "platforms"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "x_postmark_server_token",
                    "orig": "X-Postmark-Server-Token",
                    "type": "`$ANY`",
                    "kind": "header",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "fromdate",
                    "orig": "fromdate",
                    "type": "`$ANY`",
                    "kind": "query"
                  },
                  {
                    "name": "tag",
                    "orig": "tag",
                    "type": "`$ANY`",
                    "kind": "query"
                  },
                  {
                    "name": "todate",
                    "orig": "todate",
                    "type": "`$ANY`",
                    "kind": "query"
                  }
                ]
              },
              "select": {
                "exist": [
                  "fromdate",
                  "tag",
                  "todate",
                  "x_postmark_server_token"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "inbound": {
      "fields": [
        {
          "name": "Attachments",
          "title": "Attachments",
          "type": "`$ARRAY`"
        },
        {
          "name": "Cc",
          "title": "Cc",
          "type": "`$STRING`"
        },
        {
          "name": "CcFull",
          "title": "Cc Full",
          "type": "`$ARRAY`"
        },
        {
          "name": "Date",
          "title": "Date",
          "type": "`$STRING`"
        },
        {
          "name": "From",
          "title": "From",
          "type": "`$STRING`"
        },
        {
          "name": "FromFull",
          "title": "From Full",
          "type": "`$ANY`"
        },
        {
          "name": "FromName",
          "title": "From Name",
          "type": "`$STRING`"
        },
        {
          "name": "MailboxHash",
          "title": "Mailbox Hash",
          "type": "`$STRING`"
        },
        {
          "name": "MessageID",
          "title": "Message Id",
          "type": "`$STRING`"
        },
        {
          "name": "OriginalRecipient",
          "title": "Original Recipient",
          "type": "`$STRING`"
        },
        {
          "name": "ReplyTo",
          "title": "Reply To",
          "type": "`$STRING`"
        },
        {
          "name": "Status",
          "title": "Status",
          "type": "`$STRING`"
        },
        {
          "name": "Subject",
          "title": "Subject",
          "type": "`$STRING`"
        },
        {
          "name": "Tag",
          "title": "Tag",
          "type": "`$STRING`"
        },
        {
          "name": "To",
          "title": "To",
          "type": "`$STRING`"
        },
        {
          "name": "ToFull",
          "title": "To Full",
          "type": "`$ARRAY`"
        }
      ],
      "name": "inbound",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/messages/inbound",
              "segments": [
                {
                  "lit": "messages"
                },
                {
                  "lit": "inbound"
                }
              ],
              "parts": [
                "messages",
                "inbound"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.InboundMessages`"
              },
              "args": {
                "header": [
                  {
                    "name": "x_postmark_server_token",
                    "orig": "X-Postmark-Server-Token",
                    "type": "`$ANY`",
                    "kind": "header",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "count",
                    "orig": "count",
                    "type": "`$ANY`",
                    "kind": "query",
                    "reqd": true
                  },
                  {
                    "name": "fromdate",
                    "orig": "fromdate",
                    "type": "`$ANY`",
                    "kind": "query"
                  },
                  {
                    "name": "fromemail",
                    "orig": "fromemail",
                    "type": "`$ANY`",
                    "kind": "query"
                  },
                  {
                    "name": "mailboxhash",
                    "orig": "mailboxhash",
                    "type": "`$ANY`",
                    "kind": "query"
                  },
                  {
                    "name": "offset",
                    "orig": "offset",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "reqd": true
                  },
                  {
                    "name": "recipient",
                    "orig": "recipient",
                    "type": "`$ANY`",
                    "kind": "query"
                  },
                  {
                    "name": "status",
                    "orig": "status",
                    "type": "`$ANY`",
                    "kind": "query"
                  },
                  {
                    "name": "subject",
                    "orig": "subject",
                    "type": "`$ANY`",
                    "kind": "query"
                  },
                  {
                    "name": "tag",
                    "orig": "tag",
                    "type": "`$ANY`",
                    "kind": "query"
                  },
                  {
                    "name": "todate",
                    "orig": "todate",
                    "type": "`$ANY`",
                    "kind": "query"
                  }
                ]
              },
              "select": {
                "exist": [
                  "count",
                  "fromdate",
                  "fromemail",
                  "mailboxhash",
                  "offset",
                  "recipient",
                  "status",
                  "subject",
                  "tag",
                  "todate",
                  "x_postmark_server_token"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "inbound_message_full_detail": {
      "fields": [
        {
          "name": "Attachments",
          "title": "Attachments",
          "type": "`$ARRAY`"
        },
        {
          "name": "BlockedReason",
          "title": "Blocked Reason",
          "type": "`$STRING`"
        },
        {
          "name": "Cc",
          "title": "Cc",
          "type": "`$STRING`"
        },
        {
          "name": "CcFull",
          "title": "Cc Full",
          "type": "`$ARRAY`"
        },
        {
          "name": "Date",
          "title": "Date",
          "type": "`$STRING`"
        },
        {
          "name": "From",
          "title": "From",
          "type": "`$STRING`"
        },
        {
          "name": "FromFull",
          "title": "From Full",
          "type": "`$ANY`"
        },
        {
          "name": "FromName",
          "title": "From Name",
          "type": "`$STRING`"
        },
        {
          "name": "Headers",
          "title": "Headers",
          "type": "`$ARRAY`"
        },
        {
          "name": "HtmlBody",
          "title": "Html Body",
          "type": "`$STRING`"
        },
        {
          "name": "MailboxHash",
          "title": "Mailbox Hash",
          "type": "`$STRING`"
        },
        {
          "name": "MessageID",
          "title": "Message Id",
          "type": "`$STRING`"
        },
        {
          "name": "OriginalRecipient",
          "title": "Original Recipient",
          "type": "`$STRING`"
        },
        {
          "name": "ReplyTo",
          "title": "Reply To",
          "type": "`$STRING`"
        },
        {
          "name": "Status",
          "title": "Status",
          "type": "`$STRING`"
        },
        {
          "name": "Subject",
          "title": "Subject",
          "type": "`$STRING`"
        },
        {
          "name": "Tag",
          "title": "Tag",
          "type": "`$STRING`"
        },
        {
          "name": "TextBody",
          "title": "Text Body",
          "type": "`$STRING`"
        },
        {
          "name": "To",
          "title": "To",
          "type": "`$STRING`"
        },
        {
          "name": "ToFull",
          "title": "To Full",
          "type": "`$ARRAY`"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "inbound_message_full_detail",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/messages/inbound/{messageid}/details",
              "segments": [
                {
                  "lit": "messages"
                },
                {
                  "lit": "inbound"
                },
                {
                  "var": "id"
                },
                {
                  "lit": "details"
                }
              ],
              "parts": [
                "messages",
                "inbound",
                "{id}",
                "details"
              ],
              "rename": {
                "param": {
                  "messageid": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "x_postmark_server_token",
                    "orig": "X-Postmark-Server-Token",
                    "type": "`$ANY`",
                    "kind": "header",
                    "reqd": true
                  }
                ],
                "params": [
                  {
                    "name": "id",
                    "orig": "messageid",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id",
                  "x_postmark_server_token"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "inboundrule": {
      "fields": [
        {
          "name": "ID",
          "title": "Id",
          "type": "`$INTEGER`"
        },
        {
          "name": "Rule",
          "title": "Rule",
          "type": "`$STRING`",
          "format": "email"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "inboundrule",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/triggers/inboundrules",
              "segments": [
                {
                  "lit": "triggers"
                },
                {
                  "lit": "inboundrules"
                }
              ],
              "parts": [
                "triggers",
                "inboundrules"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "x_postmark_server_token",
                    "orig": "X-Postmark-Server-Token",
                    "type": "`$ANY`",
                    "kind": "header",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "body",
                    "orig": "body",
                    "type": "`$ANY`",
                    "kind": "query"
                  }
                ]
              },
              "select": {
                "exist": [
                  "body",
                  "x_postmark_server_token"
                ]
              }
            }
          ]
        },
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/triggers/inboundrules",
              "segments": [
                {
                  "lit": "triggers"
                },
                {
                  "lit": "inboundrules"
                }
              ],
              "parts": [
                "triggers",
                "inboundrules"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.InboundRules`"
              },
              "args": {
                "header": [
                  {
                    "name": "x_postmark_server_token",
                    "orig": "X-Postmark-Server-Token",
                    "type": "`$ANY`",
                    "kind": "header",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "count",
                    "orig": "count",
                    "type": "`$ANY`",
                    "kind": "query",
                    "reqd": true
                  },
                  {
                    "name": "offset",
                    "orig": "offset",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "count",
                  "offset",
                  "x_postmark_server_token"
                ]
              }
            }
          ]
        },
        "remove": {
          "input": "data",
          "name": "remove",
          "points": [
            {
              "kind": "http",
              "method": "DELETE",
              "orig": "/triggers/inboundrules/{triggerid}",
              "segments": [
                {
                  "lit": "triggers"
                },
                {
                  "lit": "inboundrules"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "triggers",
                "inboundrules",
                "{id}"
              ],
              "rename": {
                "param": {
                  "triggerid": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "x_postmark_server_token",
                    "orig": "X-Postmark-Server-Token",
                    "type": "`$ANY`",
                    "kind": "header",
                    "reqd": true
                  }
                ],
                "params": [
                  {
                    "name": "id",
                    "orig": "triggerid",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id",
                  "x_postmark_server_token"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "message_click_search": {
      "fields": [
        {
          "name": "ClickLocation",
          "title": "Click Location",
          "type": "`$STRING`"
        },
        {
          "name": "Clicks",
          "title": "Clicks",
          "type": "`$ARRAY`"
        },
        {
          "name": "Client",
          "title": "Client",
          "type": "`$ANY`"
        },
        {
          "name": "Geo",
          "title": "Geo",
          "type": "`$ANY`"
        },
        {
          "name": "MessageID",
          "title": "Message Id",
          "type": "`$STRING`"
        },
        {
          "name": "OS",
          "title": "Os",
          "type": "`$ANY`"
        },
        {
          "name": "OriginalLink",
          "title": "Original Link",
          "type": "`$STRING`"
        },
        {
          "name": "Platform",
          "title": "Platform",
          "type": "`$STRING`"
        },
        {
          "name": "ReceivedAt",
          "title": "Received At",
          "type": "`$STRING`",
          "format": "date-time"
        },
        {
          "name": "Recipient",
          "title": "Recipient",
          "type": "`$STRING`",
          "format": "email"
        },
        {
          "name": "Tag",
          "title": "Tag",
          "type": "`$STRING`"
        },
        {
          "name": "TotalCount",
          "title": "Total Count",
          "type": "`$INTEGER`"
        },
        {
          "name": "UserAgent",
          "title": "User Agent",
          "type": "`$STRING`"
        }
      ],
      "name": "message_click_search",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/messages/outbound/clicks",
              "segments": [
                {
                  "lit": "messages"
                },
                {
                  "lit": "outbound"
                },
                {
                  "lit": "clicks"
                }
              ],
              "parts": [
                "messages",
                "outbound",
                "clicks"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.Clicks`"
              },
              "args": {
                "header": [
                  {
                    "name": "x_postmark_server_token",
                    "orig": "X-Postmark-Server-Token",
                    "type": "`$ANY`",
                    "kind": "header",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "city",
                    "orig": "city",
                    "type": "`$ANY`",
                    "kind": "query"
                  },
                  {
                    "name": "client_company",
                    "orig": "client_company",
                    "type": "`$ANY`",
                    "kind": "query"
                  },
                  {
                    "name": "client_family",
                    "orig": "client_family",
                    "type": "`$ANY`",
                    "kind": "query"
                  },
                  {
                    "name": "client_name",
                    "orig": "client_name",
                    "type": "`$ANY`",
                    "kind": "query"
                  },
                  {
                    "name": "count",
                    "orig": "count",
                    "type": "`$ANY`",
                    "kind": "query",
                    "reqd": true
                  },
                  {
                    "name": "country",
                    "orig": "country",
                    "type": "`$ANY`",
                    "kind": "query"
                  },
                  {
                    "name": "offset",
                    "orig": "offset",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "reqd": true
                  },
                  {
                    "name": "os_company",
                    "orig": "os_company",
                    "type": "`$ANY`",
                    "kind": "query"
                  },
                  {
                    "name": "os_family",
                    "orig": "os_family",
                    "type": "`$ANY`",
                    "kind": "query"
                  },
                  {
                    "name": "os_name",
                    "orig": "os_name",
                    "type": "`$ANY`",
                    "kind": "query"
                  },
                  {
                    "name": "platform",
                    "orig": "platform",
                    "type": "`$ANY`",
                    "kind": "query"
                  },
                  {
                    "name": "recipient",
                    "orig": "recipient",
                    "type": "`$ANY`",
                    "kind": "query"
                  },
                  {
                    "name": "region",
                    "orig": "region",
                    "type": "`$ANY`",
                    "kind": "query"
                  },
                  {
                    "name": "tag",
                    "orig": "tag",
                    "type": "`$ANY`",
                    "kind": "query"
                  }
                ]
              },
              "select": {
                "exist": [
                  "city",
                  "client_company",
                  "client_family",
                  "client_name",
                  "count",
                  "country",
                  "offset",
                  "os_company",
                  "os_family",
                  "os_name",
                  "platform",
                  "recipient",
                  "region",
                  "tag",
                  "x_postmark_server_token"
                ]
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/messages/outbound/clicks/{messageid}",
              "segments": [
                {
                  "lit": "messages"
                },
                {
                  "lit": "outbound"
                },
                {
                  "lit": "clicks"
                },
                {
                  "var": "messageid"
                }
              ],
              "parts": [
                "messages",
                "outbound",
                "clicks",
                "{messageid}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "x_postmark_server_token",
                    "orig": "X-Postmark-Server-Token",
                    "type": "`$ANY`",
                    "kind": "header",
                    "reqd": true
                  }
                ],
                "params": [
                  {
                    "name": "messageid",
                    "orig": "messageid",
                    "type": "`$ANY`",
                    "kind": "param",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "count",
                    "orig": "count",
                    "type": "`$ANY`",
                    "kind": "query",
                    "reqd": true
                  },
                  {
                    "name": "offset",
                    "orig": "offset",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "count",
                  "messageid",
                  "offset",
                  "x_postmark_server_token"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "message_open_search": {
      "fields": [
        {
          "name": "Client",
          "title": "Client",
          "type": "`$ANY`"
        },
        {
          "name": "FirstOpen",
          "title": "First Open",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "Geo",
          "title": "Geo",
          "type": "`$ANY`"
        },
        {
          "name": "MessageID",
          "title": "Message Id",
          "type": "`$STRING`"
        },
        {
          "name": "OS",
          "title": "Os",
          "type": "`$ANY`"
        },
        {
          "name": "Opens",
          "title": "Opens",
          "type": "`$ARRAY`"
        },
        {
          "name": "Platform",
          "title": "Platform",
          "type": "`$STRING`"
        },
        {
          "name": "ReceivedAt",
          "title": "Received At",
          "type": "`$STRING`",
          "format": "date-time"
        },
        {
          "name": "Recipient",
          "title": "Recipient",
          "type": "`$STRING`",
          "format": "email"
        },
        {
          "name": "Tag",
          "title": "Tag",
          "type": "`$STRING`"
        },
        {
          "name": "TotalCount",
          "title": "Total Count",
          "type": "`$INTEGER`"
        },
        {
          "name": "UserAgent",
          "title": "User Agent",
          "type": "`$STRING`"
        }
      ],
      "name": "message_open_search",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/messages/outbound/opens",
              "segments": [
                {
                  "lit": "messages"
                },
                {
                  "lit": "outbound"
                },
                {
                  "lit": "opens"
                }
              ],
              "parts": [
                "messages",
                "outbound",
                "opens"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.Opens`"
              },
              "args": {
                "header": [
                  {
                    "name": "x_postmark_server_token",
                    "orig": "X-Postmark-Server-Token",
                    "type": "`$ANY`",
                    "kind": "header",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "city",
                    "orig": "city",
                    "type": "`$ANY`",
                    "kind": "query"
                  },
                  {
                    "name": "client_company",
                    "orig": "client_company",
                    "type": "`$ANY`",
                    "kind": "query"
                  },
                  {
                    "name": "client_family",
                    "orig": "client_family",
                    "type": "`$ANY`",
                    "kind": "query"
                  },
                  {
                    "name": "client_name",
                    "orig": "client_name",
                    "type": "`$ANY`",
                    "kind": "query"
                  },
                  {
                    "name": "count",
                    "orig": "count",
                    "type": "`$ANY`",
                    "kind": "query",
                    "reqd": true
                  },
                  {
                    "name": "country",
                    "orig": "country",
                    "type": "`$ANY`",
                    "kind": "query"
                  },
                  {
                    "name": "offset",
                    "orig": "offset",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "reqd": true
                  },
                  {
                    "name": "os_company",
                    "orig": "os_company",
                    "type": "`$ANY`",
                    "kind": "query"
                  },
                  {
                    "name": "os_family",
                    "orig": "os_family",
                    "type": "`$ANY`",
                    "kind": "query"
                  },
                  {
                    "name": "os_name",
                    "orig": "os_name",
                    "type": "`$ANY`",
                    "kind": "query"
                  },
                  {
                    "name": "platform",
                    "orig": "platform",
                    "type": "`$ANY`",
                    "kind": "query"
                  },
                  {
                    "name": "recipient",
                    "orig": "recipient",
                    "type": "`$ANY`",
                    "kind": "query"
                  },
                  {
                    "name": "region",
                    "orig": "region",
                    "type": "`$ANY`",
                    "kind": "query"
                  },
                  {
                    "name": "tag",
                    "orig": "tag",
                    "type": "`$ANY`",
                    "kind": "query"
                  }
                ]
              },
              "select": {
                "exist": [
                  "city",
                  "client_company",
                  "client_family",
                  "client_name",
                  "count",
                  "country",
                  "offset",
                  "os_company",
                  "os_family",
                  "os_name",
                  "platform",
                  "recipient",
                  "region",
                  "tag",
                  "x_postmark_server_token"
                ]
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/messages/outbound/opens/{messageid}",
              "segments": [
                {
                  "lit": "messages"
                },
                {
                  "lit": "outbound"
                },
                {
                  "lit": "opens"
                },
                {
                  "var": "messageid"
                }
              ],
              "parts": [
                "messages",
                "outbound",
                "opens",
                "{messageid}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "x_postmark_server_token",
                    "orig": "X-Postmark-Server-Token",
                    "type": "`$ANY`",
                    "kind": "header",
                    "reqd": true
                  }
                ],
                "params": [
                  {
                    "name": "messageid",
                    "orig": "messageid",
                    "type": "`$ANY`",
                    "kind": "param",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "count",
                    "orig": "count",
                    "type": "`$ANY`",
                    "kind": "query",
                    "reqd": true
                  },
                  {
                    "name": "offset",
                    "orig": "offset",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "count",
                  "messageid",
                  "offset",
                  "x_postmark_server_token"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "outbound": {
      "fields": [
        {
          "name": "Attachments",
          "title": "Attachments",
          "type": "`$ARRAY`"
        },
        {
          "name": "Bcc",
          "title": "Bcc",
          "type": "`$ARRAY`"
        },
        {
          "name": "BounceRate",
          "title": "Bounce Rate",
          "type": "`$INTEGER`"
        },
        {
          "name": "Bounced",
          "title": "Bounced",
          "type": "`$INTEGER`"
        },
        {
          "name": "Cc",
          "title": "Cc",
          "type": "`$ARRAY`"
        },
        {
          "name": "From",
          "title": "From",
          "type": "`$STRING`"
        },
        {
          "name": "MessageID",
          "title": "Message Id",
          "type": "`$STRING`"
        },
        {
          "name": "Opens",
          "title": "Opens",
          "type": "`$INTEGER`"
        },
        {
          "name": "ReceivedAt",
          "title": "Received At",
          "type": "`$STRING`",
          "format": "date-time"
        },
        {
          "name": "Recipients",
          "title": "Recipients",
          "type": "`$ARRAY`"
        },
        {
          "name": "SMTPAPIErrors",
          "title": "Smtpapi Errors",
          "type": "`$INTEGER`"
        },
        {
          "name": "Sent",
          "title": "Sent",
          "type": "`$INTEGER`"
        },
        {
          "name": "SpamComplaints",
          "title": "Spam Complaints",
          "type": "`$INTEGER`"
        },
        {
          "name": "SpamComplaintsRate",
          "title": "Spam Complaints Rate",
          "type": "`$INTEGER`"
        },
        {
          "name": "Status",
          "title": "Status",
          "type": "`$STRING`"
        },
        {
          "name": "Subject",
          "title": "Subject",
          "type": "`$STRING`"
        },
        {
          "name": "Tag",
          "title": "Tag",
          "type": "`$STRING`"
        },
        {
          "name": "To",
          "title": "To",
          "type": "`$ARRAY`"
        },
        {
          "name": "TotalClicks",
          "title": "Total Clicks",
          "type": "`$INTEGER`"
        },
        {
          "name": "TotalTrackedLinksSent",
          "title": "Total Tracked Links Sent",
          "type": "`$INTEGER`"
        },
        {
          "name": "TrackLinks",
          "title": "Track Links",
          "type": "`$STRING`"
        },
        {
          "name": "TrackOpens",
          "title": "Track Opens",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "Tracked",
          "title": "Tracked",
          "type": "`$INTEGER`"
        },
        {
          "name": "UniqueLinksClicked",
          "title": "Unique Links Clicked",
          "type": "`$INTEGER`"
        },
        {
          "name": "UniqueOpens",
          "title": "Unique Opens",
          "type": "`$INTEGER`"
        },
        {
          "name": "WithClientRecorded",
          "title": "With Client Recorded",
          "type": "`$INTEGER`"
        },
        {
          "name": "WithLinkTracking",
          "title": "With Link Tracking",
          "type": "`$INTEGER`"
        },
        {
          "name": "WithOpenTracking",
          "title": "With Open Tracking",
          "type": "`$INTEGER`"
        },
        {
          "name": "WithPlatformRecorded",
          "title": "With Platform Recorded",
          "type": "`$INTEGER`"
        }
      ],
      "name": "outbound",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/messages/outbound",
              "segments": [
                {
                  "lit": "messages"
                },
                {
                  "lit": "outbound"
                }
              ],
              "parts": [
                "messages",
                "outbound"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.Messages`"
              },
              "args": {
                "header": [
                  {
                    "name": "x_postmark_server_token",
                    "orig": "X-Postmark-Server-Token",
                    "type": "`$ANY`",
                    "kind": "header",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "count",
                    "orig": "count",
                    "type": "`$ANY`",
                    "kind": "query",
                    "reqd": true
                  },
                  {
                    "name": "fromdate",
                    "orig": "fromdate",
                    "type": "`$ANY`",
                    "kind": "query"
                  },
                  {
                    "name": "fromemail",
                    "orig": "fromemail",
                    "type": "`$ANY`",
                    "kind": "query"
                  },
                  {
                    "name": "offset",
                    "orig": "offset",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "reqd": true
                  },
                  {
                    "name": "recipient",
                    "orig": "recipient",
                    "type": "`$ANY`",
                    "kind": "query"
                  },
                  {
                    "name": "status",
                    "orig": "status",
                    "type": "`$ANY`",
                    "kind": "query"
                  },
                  {
                    "name": "tag",
                    "orig": "tag",
                    "type": "`$ANY`",
                    "kind": "query"
                  },
                  {
                    "name": "todate",
                    "orig": "todate",
                    "type": "`$ANY`",
                    "kind": "query"
                  }
                ]
              },
              "select": {
                "exist": [
                  "count",
                  "fromdate",
                  "fromemail",
                  "offset",
                  "recipient",
                  "status",
                  "tag",
                  "todate",
                  "x_postmark_server_token"
                ]
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/stats/outbound",
              "segments": [
                {
                  "lit": "stats"
                },
                {
                  "lit": "outbound"
                }
              ],
              "parts": [
                "stats",
                "outbound"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "x_postmark_server_token",
                    "orig": "X-Postmark-Server-Token",
                    "type": "`$ANY`",
                    "kind": "header",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "fromdate",
                    "orig": "fromdate",
                    "type": "`$ANY`",
                    "kind": "query"
                  },
                  {
                    "name": "tag",
                    "orig": "tag",
                    "type": "`$ANY`",
                    "kind": "query"
                  },
                  {
                    "name": "todate",
                    "orig": "todate",
                    "type": "`$ANY`",
                    "kind": "query"
                  }
                ]
              },
              "select": {
                "exist": [
                  "fromdate",
                  "tag",
                  "todate",
                  "x_postmark_server_token"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "outbound_message_detail": {
      "fields": [
        {
          "name": "Attachments",
          "title": "Attachments",
          "type": "`$ARRAY`"
        },
        {
          "name": "Bcc",
          "title": "Bcc",
          "type": "`$ARRAY`"
        },
        {
          "name": "Body",
          "title": "Body",
          "type": "`$STRING`"
        },
        {
          "name": "Cc",
          "title": "Cc",
          "type": "`$ARRAY`"
        },
        {
          "name": "From",
          "title": "From",
          "type": "`$STRING`"
        },
        {
          "name": "HtmlBody",
          "title": "Html Body",
          "type": "`$STRING`"
        },
        {
          "name": "MessageEvents",
          "title": "Message Events",
          "type": "`$ARRAY`"
        },
        {
          "name": "MessageID",
          "title": "Message Id",
          "type": "`$STRING`"
        },
        {
          "name": "ReceivedAt",
          "title": "Received At",
          "type": "`$STRING`",
          "format": "date-time"
        },
        {
          "name": "Recipients",
          "title": "Recipients",
          "type": "`$ARRAY`"
        },
        {
          "name": "Status",
          "title": "Status",
          "type": "`$STRING`"
        },
        {
          "name": "Subject",
          "title": "Subject",
          "type": "`$STRING`"
        },
        {
          "name": "Tag",
          "title": "Tag",
          "type": "`$STRING`"
        },
        {
          "name": "TextBody",
          "title": "Text Body",
          "type": "`$STRING`"
        },
        {
          "name": "To",
          "title": "To",
          "type": "`$ARRAY`"
        },
        {
          "name": "TrackLinks",
          "title": "Track Links",
          "type": "`$STRING`"
        },
        {
          "name": "TrackOpens",
          "title": "Track Opens",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "outbound_message_detail",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/messages/outbound/{messageid}/details",
              "segments": [
                {
                  "lit": "messages"
                },
                {
                  "lit": "outbound"
                },
                {
                  "var": "id"
                },
                {
                  "lit": "details"
                }
              ],
              "parts": [
                "messages",
                "outbound",
                "{id}",
                "details"
              ],
              "rename": {
                "param": {
                  "messageid": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "x_postmark_server_token",
                    "orig": "X-Postmark-Server-Token",
                    "type": "`$ANY`",
                    "kind": "header",
                    "reqd": true
                  }
                ],
                "params": [
                  {
                    "name": "id",
                    "orig": "messageid",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id",
                  "x_postmark_server_token"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "outbound_message_dump": {
      "fields": [
        {
          "name": "Body",
          "title": "Body",
          "type": "`$STRING`",
          "short": "Raw source of message."
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "outbound_message_dump",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/messages/outbound/{messageid}/dump",
              "segments": [
                {
                  "lit": "messages"
                },
                {
                  "lit": "outbound"
                },
                {
                  "var": "id"
                },
                {
                  "lit": "dump"
                }
              ],
              "parts": [
                "messages",
                "outbound",
                "{id}",
                "dump"
              ],
              "rename": {
                "param": {
                  "messageid": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "x_postmark_server_token",
                    "orig": "X-Postmark-Server-Token",
                    "type": "`$ANY`",
                    "kind": "header",
                    "reqd": true
                  }
                ],
                "params": [
                  {
                    "name": "id",
                    "orig": "messageid",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id",
                  "x_postmark_server_token"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "retry": {
      "fields": [
        {
          "name": "ErrorCode",
          "title": "Error Code",
          "type": "`$INTEGER`"
        },
        {
          "name": "Message",
          "title": "Message",
          "type": "`$STRING`"
        }
      ],
      "name": "retry",
      "op": {
        "update": {
          "input": "data",
          "name": "update",
          "points": [
            {
              "kind": "http",
              "method": "PUT",
              "orig": "/messages/inbound/{messageid}/retry",
              "segments": [
                {
                  "lit": "messages"
                },
                {
                  "lit": "inbound"
                },
                {
                  "var": "inbound_id"
                },
                {
                  "lit": "retry"
                }
              ],
              "parts": [
                "messages",
                "inbound",
                "{inbound_id}",
                "retry"
              ],
              "rename": {
                "param": {
                  "messageid": "inbound_id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "x_postmark_server_token",
                    "orig": "X-Postmark-Server-Token",
                    "type": "`$ANY`",
                    "kind": "header",
                    "reqd": true
                  }
                ],
                "params": [
                  {
                    "name": "inbound_id",
                    "orig": "messageid",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "inbound_id",
                  "x_postmark_server_token"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "$.main.kit.entity.inbound"
          ]
        ]
      }
    },
    "send_email": {
      "fields": [
        {
          "name": "ErrorCode",
          "title": "Error Code",
          "type": "`$INTEGER`"
        },
        {
          "name": "Message",
          "title": "Message",
          "type": "`$STRING`"
        },
        {
          "name": "MessageID",
          "title": "Message Id",
          "type": "`$STRING`"
        },
        {
          "name": "SubmittedAt",
          "title": "Submitted At",
          "type": "`$STRING`",
          "format": "date-time"
        },
        {
          "name": "To",
          "title": "To",
          "type": "`$STRING`"
        }
      ],
      "name": "send_email",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/email",
              "segments": [
                {
                  "lit": "email"
                }
              ],
              "parts": [
                "email"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata.body`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "x_postmark_server_token",
                    "orig": "X-Postmark-Server-Token",
                    "type": "`$ANY`",
                    "kind": "header",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "body",
                    "orig": "body",
                    "type": "`$ANY`",
                    "kind": "query"
                  }
                ]
              },
              "select": {
                "exist": [
                  "body",
                  "x_postmark_server_token"
                ]
              }
            },
            {
              "kind": "http",
              "method": "POST",
              "orig": "/email/withTemplate",
              "segments": [
                {
                  "lit": "email"
                },
                {
                  "lit": "withTemplate"
                }
              ],
              "parts": [
                "email",
                "withTemplate"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata.body`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "x_postmark_server_token",
                    "orig": "X-Postmark-Server-Token",
                    "type": "`$ANY`",
                    "kind": "header",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "body",
                    "orig": "body",
                    "type": "`$ANY`",
                    "kind": "query",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "body",
                  "x_postmark_server_token"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "send_email_batch": {
      "fields": [
        {
          "name": "ErrorCode",
          "title": "Error Code",
          "type": "`$INTEGER`"
        },
        {
          "name": "Message",
          "title": "Message",
          "type": "`$STRING`"
        },
        {
          "name": "MessageID",
          "title": "Message Id",
          "type": "`$STRING`"
        },
        {
          "name": "SubmittedAt",
          "title": "Submitted At",
          "type": "`$STRING`",
          "format": "date-time"
        },
        {
          "name": "To",
          "title": "To",
          "type": "`$STRING`"
        }
      ],
      "name": "send_email_batch",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/email/batch",
              "segments": [
                {
                  "lit": "email"
                },
                {
                  "lit": "batch"
                }
              ],
              "parts": [
                "email",
                "batch"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata.body`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "x_postmark_server_token",
                    "orig": "X-Postmark-Server-Token",
                    "type": "`$ANY`",
                    "kind": "header",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "body",
                    "orig": "body",
                    "type": "`$ARRAY`",
                    "kind": "query"
                  }
                ]
              },
              "select": {
                "exist": [
                  "body",
                  "x_postmark_server_token"
                ]
              }
            },
            {
              "kind": "http",
              "method": "POST",
              "orig": "/email/batchWithTemplates",
              "segments": [
                {
                  "lit": "email"
                },
                {
                  "lit": "batchWithTemplates"
                }
              ],
              "parts": [
                "email",
                "batchWithTemplates"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata.body`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "x_postmark_server_token",
                    "orig": "X-Postmark-Server-Token",
                    "type": "`$ANY`",
                    "kind": "header",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "body",
                    "orig": "body",
                    "type": "`$ANY`",
                    "kind": "query",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "body",
                  "x_postmark_server_token"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "sent_count": {
      "fields": [
        {
          "name": "Date",
          "title": "Date",
          "type": "`$STRING`"
        },
        {
          "name": "Sent",
          "title": "Sent",
          "type": "`$INTEGER`"
        }
      ],
      "name": "sent_count",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/stats/outbound/sends",
              "segments": [
                {
                  "lit": "stats"
                },
                {
                  "lit": "outbound"
                },
                {
                  "lit": "sends"
                }
              ],
              "parts": [
                "stats",
                "outbound",
                "sends"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.Days`"
              },
              "args": {
                "header": [
                  {
                    "name": "x_postmark_server_token",
                    "orig": "X-Postmark-Server-Token",
                    "type": "`$ANY`",
                    "kind": "header",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "fromdate",
                    "orig": "fromdate",
                    "type": "`$ANY`",
                    "kind": "query"
                  },
                  {
                    "name": "tag",
                    "orig": "tag",
                    "type": "`$ANY`",
                    "kind": "query"
                  },
                  {
                    "name": "todate",
                    "orig": "todate",
                    "type": "`$ANY`",
                    "kind": "query"
                  }
                ]
              },
              "select": {
                "exist": [
                  "fromdate",
                  "tag",
                  "todate",
                  "x_postmark_server_token"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "server": {
      "fields": [
        {
          "name": "ApiTokens",
          "title": "Api Tokens",
          "type": "`$ARRAY`"
        },
        {
          "name": "BounceHookUrl",
          "title": "Bounce Hook Url",
          "type": "`$STRING`"
        },
        {
          "name": "ClickHookUrl",
          "title": "Click Hook Url",
          "type": "`$STRING`"
        },
        {
          "name": "Color",
          "title": "Color",
          "type": "`$STRING`"
        },
        {
          "name": "DeliveryHookUrl",
          "title": "Delivery Hook Url",
          "type": "`$STRING`"
        },
        {
          "name": "ID",
          "title": "Id",
          "type": "`$INTEGER`"
        },
        {
          "name": "InboundAddress",
          "title": "Inbound Address",
          "type": "`$STRING`",
          "format": "email"
        },
        {
          "name": "InboundDomain",
          "title": "Inbound Domain",
          "type": "`$STRING`"
        },
        {
          "name": "InboundHash",
          "title": "Inbound Hash",
          "type": "`$STRING`"
        },
        {
          "name": "InboundHookUrl",
          "title": "Inbound Hook Url",
          "type": "`$STRING`"
        },
        {
          "name": "InboundSpamThreshold",
          "title": "Inbound Spam Threshold",
          "type": "`$INTEGER`"
        },
        {
          "name": "Name",
          "title": "Name",
          "type": "`$STRING`"
        },
        {
          "name": "OpenHookUrl",
          "title": "Open Hook Url",
          "type": "`$STRING`"
        },
        {
          "name": "PostFirstOpenOnly",
          "title": "Post First Open Only",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "RawEmailEnabled",
          "title": "Raw Email Enabled",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "ServerLink",
          "title": "Server Link",
          "type": "`$STRING`"
        },
        {
          "name": "SmtpApiActivated",
          "title": "Smtp Api Activated",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "TrackLinks",
          "title": "Track Links",
          "type": "`$STRING`"
        },
        {
          "name": "TrackOpens",
          "title": "Track Opens",
          "type": "`$BOOLEAN`"
        }
      ],
      "name": "server",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/server",
              "segments": [
                {
                  "lit": "server"
                }
              ],
              "parts": [
                "server"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.ApiTokens`"
              },
              "args": {
                "header": [
                  {
                    "name": "x_postmark_server_token",
                    "orig": "X-Postmark-Server-Token",
                    "type": "`$ANY`",
                    "kind": "header",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "x_postmark_server_token"
                ]
              }
            }
          ]
        },
        "update": {
          "input": "data",
          "name": "update",
          "points": [
            {
              "kind": "http",
              "method": "PUT",
              "orig": "/server",
              "segments": [
                {
                  "lit": "server"
                }
              ],
              "parts": [
                "server"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "x_postmark_server_token",
                    "orig": "X-Postmark-Server-Token",
                    "type": "`$ANY`",
                    "kind": "header",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "body",
                    "orig": "body",
                    "type": "`$ANY`",
                    "kind": "query"
                  }
                ]
              },
              "select": {
                "exist": [
                  "body",
                  "x_postmark_server_token"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "stats_api": {
      "fields": [
        {
          "name": "Date",
          "title": "Date",
          "type": "`$STRING`"
        },
        {
          "name": "Days",
          "title": "Days",
          "type": "`$ARRAY`"
        },
        {
          "name": "Desktop",
          "title": "Desktop",
          "type": "`$INTEGER`"
        },
        {
          "name": "HardBounce",
          "title": "Hard Bounce",
          "type": "`$INTEGER`"
        },
        {
          "name": "Mobile",
          "title": "Mobile",
          "type": "`$INTEGER`"
        },
        {
          "name": "Opens",
          "title": "Opens",
          "type": "`$INTEGER`"
        },
        {
          "name": "SMTPApiError",
          "title": "Smtp Api Error",
          "type": "`$INTEGER`"
        },
        {
          "name": "SoftBounce",
          "title": "Soft Bounce",
          "type": "`$INTEGER`"
        },
        {
          "name": "SpamComplaint",
          "title": "Spam Complaint",
          "type": "`$INTEGER`"
        },
        {
          "name": "Tracked",
          "title": "Tracked",
          "type": "`$INTEGER`"
        },
        {
          "name": "Transient",
          "title": "Transient",
          "type": "`$INTEGER`"
        },
        {
          "name": "Unique",
          "title": "Unique",
          "type": "`$INTEGER`"
        },
        {
          "name": "Unknown",
          "title": "Unknown",
          "type": "`$INTEGER`"
        },
        {
          "name": "WebMail",
          "title": "Web Mail",
          "type": "`$INTEGER`"
        }
      ],
      "name": "stats_api",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/stats/outbound/bounces",
              "segments": [
                {
                  "lit": "stats"
                },
                {
                  "lit": "outbound"
                },
                {
                  "lit": "bounces"
                }
              ],
              "parts": [
                "stats",
                "outbound",
                "bounces"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.Days`"
              },
              "args": {
                "header": [
                  {
                    "name": "x_postmark_server_token",
                    "orig": "X-Postmark-Server-Token",
                    "type": "`$ANY`",
                    "kind": "header",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "fromdate",
                    "orig": "fromdate",
                    "type": "`$ANY`",
                    "kind": "query"
                  },
                  {
                    "name": "tag",
                    "orig": "tag",
                    "type": "`$ANY`",
                    "kind": "query"
                  },
                  {
                    "name": "todate",
                    "orig": "todate",
                    "type": "`$ANY`",
                    "kind": "query"
                  }
                ]
              },
              "select": {
                "exist": [
                  "fromdate",
                  "tag",
                  "todate",
                  "x_postmark_server_token"
                ]
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/stats/outbound/opens",
              "segments": [
                {
                  "lit": "stats"
                },
                {
                  "lit": "outbound"
                },
                {
                  "lit": "opens"
                }
              ],
              "parts": [
                "stats",
                "outbound",
                "opens"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.Days`"
              },
              "args": {
                "header": [
                  {
                    "name": "x_postmark_server_token",
                    "orig": "X-Postmark-Server-Token",
                    "type": "`$ANY`",
                    "kind": "header",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "fromdate",
                    "orig": "fromdate",
                    "type": "`$ANY`",
                    "kind": "query"
                  },
                  {
                    "name": "tag",
                    "orig": "tag",
                    "type": "`$ANY`",
                    "kind": "query"
                  },
                  {
                    "name": "todate",
                    "orig": "todate",
                    "type": "`$ANY`",
                    "kind": "query"
                  }
                ]
              },
              "select": {
                "exist": [
                  "fromdate",
                  "tag",
                  "todate",
                  "x_postmark_server_token"
                ]
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/stats/outbound/opens/emailclients",
              "segments": [
                {
                  "lit": "stats"
                },
                {
                  "lit": "outbound"
                },
                {
                  "lit": "opens"
                },
                {
                  "lit": "emailclients"
                }
              ],
              "parts": [
                "stats",
                "outbound",
                "opens",
                "emailclients"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.Days`"
              },
              "args": {
                "header": [
                  {
                    "name": "x_postmark_server_token",
                    "orig": "X-Postmark-Server-Token",
                    "type": "`$ANY`",
                    "kind": "header",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "fromdate",
                    "orig": "fromdate",
                    "type": "`$ANY`",
                    "kind": "query"
                  },
                  {
                    "name": "tag",
                    "orig": "tag",
                    "type": "`$ANY`",
                    "kind": "query"
                  },
                  {
                    "name": "todate",
                    "orig": "todate",
                    "type": "`$ANY`",
                    "kind": "query"
                  }
                ]
              },
              "select": {
                "exist": [
                  "fromdate",
                  "tag",
                  "todate",
                  "x_postmark_server_token"
                ]
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/stats/outbound/opens/platforms",
              "segments": [
                {
                  "lit": "stats"
                },
                {
                  "lit": "outbound"
                },
                {
                  "lit": "opens"
                },
                {
                  "lit": "platforms"
                }
              ],
              "parts": [
                "stats",
                "outbound",
                "opens",
                "platforms"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.Days`"
              },
              "args": {
                "header": [
                  {
                    "name": "x_postmark_server_token",
                    "orig": "X-Postmark-Server-Token",
                    "type": "`$ANY`",
                    "kind": "header",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "fromdate",
                    "orig": "fromdate",
                    "type": "`$ANY`",
                    "kind": "query"
                  },
                  {
                    "name": "tag",
                    "orig": "tag",
                    "type": "`$ANY`",
                    "kind": "query"
                  },
                  {
                    "name": "todate",
                    "orig": "todate",
                    "type": "`$ANY`",
                    "kind": "query"
                  }
                ]
              },
              "select": {
                "exist": [
                  "fromdate",
                  "tag",
                  "todate",
                  "x_postmark_server_token"
                ]
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/stats/outbound/spam",
              "segments": [
                {
                  "lit": "stats"
                },
                {
                  "lit": "outbound"
                },
                {
                  "lit": "spam"
                }
              ],
              "parts": [
                "stats",
                "outbound",
                "spam"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.Days`"
              },
              "args": {
                "header": [
                  {
                    "name": "x_postmark_server_token",
                    "orig": "X-Postmark-Server-Token",
                    "type": "`$ANY`",
                    "kind": "header",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "fromdate",
                    "orig": "fromdate",
                    "type": "`$ANY`",
                    "kind": "query"
                  },
                  {
                    "name": "tag",
                    "orig": "tag",
                    "type": "`$ANY`",
                    "kind": "query"
                  },
                  {
                    "name": "todate",
                    "orig": "todate",
                    "type": "`$ANY`",
                    "kind": "query"
                  }
                ]
              },
              "select": {
                "exist": [
                  "fromdate",
                  "tag",
                  "todate",
                  "x_postmark_server_token"
                ]
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/stats/outbound/tracked",
              "segments": [
                {
                  "lit": "stats"
                },
                {
                  "lit": "outbound"
                },
                {
                  "lit": "tracked"
                }
              ],
              "parts": [
                "stats",
                "outbound",
                "tracked"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.Days`"
              },
              "args": {
                "header": [
                  {
                    "name": "x_postmark_server_token",
                    "orig": "X-Postmark-Server-Token",
                    "type": "`$ANY`",
                    "kind": "header",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "fromdate",
                    "orig": "fromdate",
                    "type": "`$ANY`",
                    "kind": "query"
                  },
                  {
                    "name": "tag",
                    "orig": "tag",
                    "type": "`$ANY`",
                    "kind": "query"
                  },
                  {
                    "name": "todate",
                    "orig": "todate",
                    "type": "`$ANY`",
                    "kind": "query"
                  }
                ]
              },
              "select": {
                "exist": [
                  "fromdate",
                  "tag",
                  "todate",
                  "x_postmark_server_token"
                ]
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/stats/outbound/clicks/browserfamilies",
              "segments": [
                {
                  "lit": "stats"
                },
                {
                  "lit": "outbound"
                },
                {
                  "lit": "clicks"
                },
                {
                  "lit": "browserfamilies"
                }
              ],
              "parts": [
                "stats",
                "outbound",
                "clicks",
                "browserfamilies"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "x_postmark_server_token",
                    "orig": "X-Postmark-Server-Token",
                    "type": "`$ANY`",
                    "kind": "header",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "fromdate",
                    "orig": "fromdate",
                    "type": "`$ANY`",
                    "kind": "query"
                  },
                  {
                    "name": "tag",
                    "orig": "tag",
                    "type": "`$ANY`",
                    "kind": "query"
                  },
                  {
                    "name": "todate",
                    "orig": "todate",
                    "type": "`$ANY`",
                    "kind": "query"
                  }
                ]
              },
              "select": {
                "exist": [
                  "fromdate",
                  "tag",
                  "todate",
                  "x_postmark_server_token"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "template": {
      "fields": [
        {
          "name": "Active",
          "title": "Active",
          "type": "`$BOOLEAN`",
          "short": "Indicates that this template may be used for sending email."
        },
        {
          "name": "Alias",
          "title": "Alias",
          "type": "`$STRING`",
          "short": "The user-supplied alias for this template."
        },
        {
          "name": "AssociatedServerId",
          "title": "Associated Server Id",
          "type": "`$INTEGER`",
          "short": "The ID of the Server with which this template is associated."
        },
        {
          "name": "HtmlBody",
          "title": "Html Body",
          "type": "`$STRING`",
          "short": "The content to use for the HtmlBody when this template is used to send email."
        },
        {
          "name": "Name",
          "title": "Name",
          "type": "`$STRING`",
          "short": "The display name for the template."
        },
        {
          "name": "Subject",
          "title": "Subject",
          "type": "`$STRING`",
          "short": "The content to use for the Subject when this template is used to send email."
        },
        {
          "name": "TemplateID",
          "title": "Template Id",
          "type": "`$INTEGER`",
          "short": "The ID associated with the template."
        },
        {
          "name": "TemplateId",
          "title": "Template Id",
          "type": "`$NUMBER`",
          "short": "The associated ID for this template.",
          "format": "int"
        },
        {
          "name": "TextBody",
          "title": "Text Body",
          "type": "`$STRING`",
          "short": "The content to use for the TextBody when this template is used to send email."
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "template",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/templates",
              "segments": [
                {
                  "lit": "templates"
                }
              ],
              "parts": [
                "templates"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "x_postmark_server_token",
                    "orig": "X-Postmark-Server-Token",
                    "type": "`$ANY`",
                    "kind": "header",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "body",
                    "orig": "body",
                    "type": "`$ANY`",
                    "kind": "query",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "body",
                  "x_postmark_server_token"
                ]
              }
            }
          ]
        },
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/templates",
              "segments": [
                {
                  "lit": "templates"
                }
              ],
              "parts": [
                "templates"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.Templates API`"
              },
              "args": {
                "header": [
                  {
                    "name": "x_postmark_server_token",
                    "orig": "X-Postmark-Server-Token",
                    "type": "`$ANY`",
                    "kind": "header",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "count",
                    "orig": "Count",
                    "type": "`$ANY`",
                    "kind": "query",
                    "reqd": true
                  },
                  {
                    "name": "offset",
                    "orig": "Offset",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "count",
                  "offset",
                  "x_postmark_server_token"
                ]
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/templates/{templateIdOrAlias}",
              "segments": [
                {
                  "lit": "templates"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "templates",
                "{id}"
              ],
              "rename": {
                "param": {
                  "templateIdOrAlias": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "x_postmark_server_token",
                    "orig": "X-Postmark-Server-Token",
                    "type": "`$ANY`",
                    "kind": "header",
                    "reqd": true
                  }
                ],
                "params": [
                  {
                    "name": "id",
                    "orig": "templateIdOrAlias",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id",
                  "x_postmark_server_token"
                ]
              }
            }
          ]
        },
        "remove": {
          "input": "data",
          "name": "remove",
          "points": [
            {
              "kind": "http",
              "method": "DELETE",
              "orig": "/templates/{templateIdOrAlias}",
              "segments": [
                {
                  "lit": "templates"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "templates",
                "{id}"
              ],
              "rename": {
                "param": {
                  "templateIdOrAlias": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "x_postmark_server_token",
                    "orig": "X-Postmark-Server-Token",
                    "type": "`$ANY`",
                    "kind": "header",
                    "reqd": true
                  }
                ],
                "params": [
                  {
                    "name": "id",
                    "orig": "templateIdOrAlias",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id",
                  "x_postmark_server_token"
                ]
              }
            }
          ]
        },
        "update": {
          "input": "data",
          "name": "update",
          "points": [
            {
              "kind": "http",
              "method": "PUT",
              "orig": "/templates/{templateIdOrAlias}",
              "segments": [
                {
                  "lit": "templates"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "templates",
                "{id}"
              ],
              "rename": {
                "param": {
                  "templateIdOrAlias": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "x_postmark_server_token",
                    "orig": "X-Postmark-Server-Token",
                    "type": "`$ANY`",
                    "kind": "header",
                    "reqd": true
                  }
                ],
                "params": [
                  {
                    "name": "id",
                    "orig": "templateIdOrAlias",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "body",
                    "orig": "body",
                    "type": "`$ANY`",
                    "kind": "query",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "body",
                  "id",
                  "x_postmark_server_token"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "template_validation": {
      "fields": [
        {
          "name": "AllContentIsValid",
          "title": "All Content Is Valid",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "HtmlBody",
          "title": "Html Body",
          "type": "`$ANY`"
        },
        {
          "name": "Subject",
          "title": "Subject",
          "type": "`$ANY`"
        },
        {
          "name": "SuggestedTemplateModel",
          "title": "Suggested Template Model",
          "type": "`$OBJECT`"
        },
        {
          "name": "TextBody",
          "title": "Text Body",
          "type": "`$ANY`"
        }
      ],
      "name": "template_validation",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/templates/validate",
              "segments": [
                {
                  "lit": "templates"
                },
                {
                  "lit": "validate"
                }
              ],
              "parts": [
                "templates",
                "validate"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "x_postmark_server_token",
                    "orig": "X-Postmark-Server-Token",
                    "type": "`$ANY`",
                    "kind": "header",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "body",
                    "orig": "body",
                    "type": "`$ANY`",
                    "kind": "query"
                  }
                ]
              },
              "select": {
                "exist": [
                  "body",
                  "x_postmark_server_token"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

