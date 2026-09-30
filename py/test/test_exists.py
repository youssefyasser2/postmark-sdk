# Postmark SDK exists test

import pytest
from postmark_sdk import PostmarkSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = PostmarkSDK.test(None, None)
        assert testsdk is not None
