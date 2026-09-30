

import {
  cmp,
  Deploy,
  PublishWorkflow,
  ReadmeTop,
  AgentGuideTop,
  Security,
  Changelog,
} from '@voxgig/sdkgen'


import { ProjectLicense } from './ProjectLicense'

const Top = cmp(function Top(props: any) {
  ReadmeTop({})

  // Agent onboarding guides at the project root: AGENTS.md + a thin CLAUDE.md,
  // populated with the real target / feature / entity lists. Emitted outside
  // any target Folder (same placement rule as ReadmeTop / Deploy).
  AgentGuideTop({})

  ProjectLicense({})
  Security({})
  Changelog({})

  // Root deployment Makefile: per-target `make deploy-<t>` (publish with
  // credentials injected by the aql key vault) plus an all-targets
  // `make deploy-dry` rehearsal.
  Deploy({})

  PublishWorkflow({})
})


export {
  Top
}

