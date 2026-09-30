// Live smoke test for the generated TypeScript SDK.
// Run from the repository root with:
//   POSTMARK_SERVER_TOKEN=POSTMARK_API_TEST node --experimental-strip-types examples/smoke.ts

const { PostmarkSDK } = require('../ts/dist/PostmarkSDK.js')

const token = process.env.POSTMARK_SERVER_TOKEN
if (!token) {
  throw new Error('POSTMARK_SERVER_TOKEN is required')
}
if (token !== 'POSTMARK_API_TEST') {
  throw new Error('Refusing to run: POSTMARK_SERVER_TOKEN must be POSTMARK_API_TEST')
}

function safeJson(value) {
  const text = JSON.stringify(value, (_key, item) => {
    if (item instanceof Error) {
      return { name: item.name, message: item.message, stack: item.stack }
    }
    return item
  }, 2)
  return text && token ? text.split(token).join('[REDACTED]') : text
}

async function main() {
  const client = new PostmarkSDK({
    headers: {
      'X-Postmark-Server-Token': token,
    },
  })

  const result = await client.SendEmail().create({
    body: {
      From: 'postmark-sdk-smoke-sender@example.invalid',
      To: 'postmark-sdk-smoke-recipient@example.invalid',
      Subject: 'Postmark SDK smoke test — no delivery expected',
      TextBody: 'Synthetic smoke-test content from the unofficial Postmark SDK.',
      Tag: 'postmark-sdk-smoke',
    },
  })

  const response = result && typeof result.data === 'function' ? result.data() : result
  console.log(safeJson({ ok: true, response }))
}

main().catch((error) => {
  console.error(safeJson({ ok: false, error }))
})
