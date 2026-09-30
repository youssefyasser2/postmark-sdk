
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { PostmarkSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = PostmarkSDK.test()
    equal(testsdk instanceof PostmarkSDK, true,
      'PostmarkSDK.test() must return a client synchronously')
  })

})
