# SDK Generator DX Log

Evaluation start: Wed Sep 30 17:59:43 EEST 2026.

## Step 0 — Environment check

- Timestamp: Wed Sep 30 17:59:59 EEST 2026; elapsed: 16 seconds.
- Commands: `date`; `node -v`; `npm -v`; `git --version`; `python3 --version`.
- Result: warning. All required tools are present: Node v22.20.0, npm 10.9.3, git 2.34.1, Python 3.10.12. Initial sandbox execution failed before command start with exact text: `error building bubblewrap command: mountinfo path is not absolute`; rerun outside the sandbox succeeded.
- Docs escape: yes — runner escalation was required to execute the checks; no generator documentation was needed.
- DX verdict: Tool availability was clear, but the execution environment required an unexpected runner workaround.

## Step 1 — Inspect the spec

- Timestamp: Wed Sep 30 18:02:31 EEST 2026; elapsed: 168 seconds.
- Commands: `sed -n '1,10p' server.yml`; `rg -n '^paths:|^  /|^    (get|post|put|delete|patch|head|options|trace):' server.yml`; `rg -c '^  /' server.yml`; `rg -c '^    (get|post|put|delete|patch|head|options|trace):' server.yml`; `npx @voxgig/create-sdkgen --help`.
- Spec head: `swagger: '2.0'`; this is Swagger 2.0, not OpenAPI 3.x. It contains 38 paths and 43 operations.
- Result: warning. The local scaffold help succeeded but npm emitted exact `EBADENGINE Unsupported engine` warnings because the installed Node is v22.20.0 while current dependencies require `node: '>=24'`. The help output documents `-d/--def`, `-t/--target`, `-f/--feature`, `-o/--folder`, and `--no-install`.
- Docs escape: yes. The cited GitHub `AGENTS.md` was consulted because the task requires official command/compatibility authority; it says OpenAPI 3 and Node 24 or later. The voxgig.com page and sdkgen tutorial were not retrievable through the browser tool. No conversion was attempted yet because the scaffolder has not rejected the Swagger 2.0 input.
- DX verdict: Spec inspection is straightforward, but the spec/toolchain format requirement and Node-version mismatch are already visible risks.

## Step 2 — Scaffold

- Timestamp: Wed Sep 30 18:05:27 EEST 2026; elapsed: 344 seconds.
- Command: `cd /home/youssef/Desktop && npx @voxgig/create-sdkgen postmark -d postmark-sdk/server.yml -t ts,py -f test`.
- Result: success with warnings; exit code 0. The scaffold created `.sdk/` and model files including `target/ts.aontu`, `target/py.aontu`, and `feature/test.aontu`. At this stage it did not create root `ts/`, `py/`, root `README.md`, or `AGENTS.md`; the current AGENTS instructions say target source and repository files appear on generate. Npm installed 101 packages and reported `2 moderate severity vulnerabilities`.
- Exact warning text (trimmed): `npm warn EBADENGINE Unsupported engine`; `required: { node: '>=24' }`; `current: { node: 'v22.20.0', npm: '10.9.3' }`.
- Docs escape: yes — generated `.sdk/package.json` was inspected to confirm the documented `generate` script, and generated `AGENTS.md` was not present yet. No manual edit was made to generated language directories because they did not exist.
- DX verdict: The command and flags worked, but the scaffold’s success masked an unsupported Node major version and did not create the README/AGENTS/target outputs until a later generate step.
- Log maintenance note: the first attempt to append this entry failed with exact text `patch: **** malformed patch at line 14:`; the hunk count was corrected and the entry was then applied.

