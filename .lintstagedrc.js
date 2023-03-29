const path = require('path')

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames.map((f) => path.relative(process.cwd(), f)).join(' --file ')}`

const buildPrettierCommand = (filenames) =>
  `npx prettier --write ${filenames.map((f) => path.relative(process.cwd(), f)).join(' ')}`

module.exports = {
  // Type check TypeScript files
  '**/*.(ts|tsx)': () => 'npx tsc --noEmit',

  '*.{js,jsx,ts,tsx}': [buildEslintCommand, buildPrettierCommand],

  // Prettify only Markdown and JSON files
  '**/*.(md|json)': [buildPrettierCommand],
}
