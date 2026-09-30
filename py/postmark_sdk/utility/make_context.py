# Postmark SDK utility: make_context

from postmark_sdk.core.context import PostmarkContext


def make_context_util(ctxmap, basectx):
    return PostmarkContext(ctxmap, basectx)
