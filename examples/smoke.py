"""Live smoke test for the generated Python SDK.

Run from the repository root with:
    POSTMARK_SERVER_TOKEN=POSTMARK_API_TEST PYTHONPATH=py python3 examples/smoke.py
"""

import json
import os
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "py"))

from postmark_sdk import PostmarkSDK


token = os.environ.get("POSTMARK_SERVER_TOKEN")
if not token:
    raise RuntimeError("POSTMARK_SERVER_TOKEN is required")
if token != "POSTMARK_API_TEST":
    raise RuntimeError("Refusing to run: POSTMARK_SERVER_TOKEN must be POSTMARK_API_TEST")


def safe_json(value):
    text = json.dumps(value, indent=2, default=str)
    return text.replace(token, "[REDACTED]")


def main():
    client = PostmarkSDK({
        "headers": {
            "X-Postmark-Server-Token": token,
        },
    })

    result = client.SendEmail().create({
        "body": {
            "From": "postmark-sdk-smoke-sender@example.invalid",
            "To": "postmark-sdk-smoke-recipient@example.invalid",
            "Subject": "Postmark SDK smoke test — no delivery expected",
            "TextBody": "Synthetic smoke-test content from the unofficial Postmark SDK.",
            "Tag": "postmark-sdk-smoke",
        },
    })

    response = result.data_get() if hasattr(result, "data_get") else result
    print(safe_json({"ok": True, "response": response}))


if __name__ == "__main__":
    try:
        main()
    except Exception as error:
        print(safe_json({"ok": False, "error": error}))
        raise

