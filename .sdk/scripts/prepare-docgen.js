// Prepare the docgen-managed project files after dependencies are installed.
// Keep this source file tracked: .sdk/build/ is generated and ignored.
require('@voxgig/docgen').prepareProject(require('node:path').resolve(__dirname, '../..'))
