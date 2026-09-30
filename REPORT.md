# Postmark SDK DX Report

## 1. Summary

API chosen: Postmark’s public API from the checked-in Swagger 2.0 definition. Outcome: TypeScript and Python SDKs were generated, the send-email body was corrected in the project-owned model guide, both test-token smoke calls succeeded, and final offline suites were green. This is an UNOFFICIAL SDK, not affiliated with or endorsed by Postmark.

## 2. Timeline

| Stage | Approx. elapsed |
| --- | ---: |
| Environment, spec inspection, scaffold, baseline | 8 min |
| Generation, offline tests, entity review, preflight | 14 min |
| Auth/body diagnosis, model fix, regeneration | 28 min |
| TypeScript and Python live smokes | 17 min |
| Documentation, doctor, final regeneration/tests | 20 min |
| Total elapsed | about 1 h 20 min |

Evaluation timestamps ran from 17:59:43 to 19:18:22 EEST on 2026-09-30. Total human time: Not verified; active work and waiting time were not separately timed.

## 3. What worked well

- The scaffold generated 21 entities from 38 paths and 43 operations; all 43 spec operations were retained.
- Offline validation was strong: TypeScript 303 passed, 0 failed, 1 skipped; Python 267 passed, 86 skipped, 0 failed.
- Both live test-token smokes returned Postmark’s exact `ErrorCode: 0`, `Message: Test job accepted`, a MessageID, timestamp, and the fake `.invalid` recipient.
- The source spec is preserved at `.sdk/def/server.yml`, and the project overlay keeps README project content durable across regeneration.

## 4. Problems and bugs

1. Node/tooling mismatch. Reproduction: run the scaffold under Node v22.20.0 while dependencies require Node >=24; npm emitted `EBADENGINE Unsupported engine`. Resolution: generation/tests ran; upgrading to the documented floor remains recommended.

2. Postmark body shape. Reproduction: an offline capture initially emitted `{"body": {...}}` for `SendEmail().create({ body: {...} })` instead of a root-level email object. Resolution: `.sdk/model/guide/guide.aontu` now transforms `reqdata.body` for all four send paths; regenerated captures and live smokes verified the fix.

3. Auth ergonomics. The API models `X-Postmark-Server-Token` as a required operation header, not a generic `apikey` security scheme. The generic `options.apikey` path targets Authorization. Resolution: smoke scripts pass the environment token through client `headers`; offline capture verified the Postmark header.

4. Script defects. The first TS smoke failed before networking with `SyntaxError [ERR_INVALID_TYPESCRIPT_SYNTAX]: Expected ',', got '<eof>'`; the first Python run exited 0 without output because its `__main__` block was missing. Both were fixed and rerun successfully.

5. Generator warnings. Every generation reports missing `ReadmeFeatures_*` and `AgentGuide_*` components for both targets. Generation/tests are green, but cause and impact are Not verified.

## 5. Documentation gaps or inconsistencies

The generator documentation discusses OpenAPI 3 and Node 24+, while this project consumed Swagger 2.0 under Node 22 with warnings. The generated README initially did not explain the Postmark header or source installation; those are now supplied through the project model overlay. No `docs/AGENTS.md` exists. No CLI, REPL, or MCP surface was scaffolded. Non-sending live operations, CI, package publication, and GitHub hosting are Not verified.

## 6. Quality of generated output

Coverage is complete, but heuristic grouping produces broad entities such as `StatsApi` and `Outbound`, and `Inboundrule` is awkward. Several response fields are `$ANY`/`$ARRAY`; date-time values are strings. TypeScript is readable and strongly integrated with the generated pipeline; Python is readable but more verbose and uses `data_get()`/exceptions versus TypeScript’s entity `data()`/result behavior. Python skips 86 feature-corpus cases. Production type accuracy beyond the exercised send path is Not verified.

## 7. Suggestions for improving the generator

Support Swagger body-parameter normalization without a custom transform; model arbitrary required header credentials as named headers rather than generic `apikey`; expose a durable project README extension point; explain or eliminate the missing-component warnings; and improve heuristic entity naming/grouping with explicit overrides.

## 8. Next steps for production

Upgrade and pin the supported Node toolchain, resolve the four generator warnings, review every request/response shape against Postmark’s current documentation, add live-safe coverage for each endpoint family, add CI across supported Node/Python versions, package-install tests, retry/timeout/security review, and a maintained release process. Real-recipient delivery, non-sending live operations, CI, publishing, and public-repository setup are Not verified.

## 9. AI assistance

AI assistance was used to inspect repository/generator guides, trace auth/body behavior, write smoke scripts, apply project-owned model/component/docs changes, run tests, interpret failures, maintain `DX_LOG.md`, and draft this report. Live calls used only the user-specified test token; no token was read from a file or written to project artifacts.
