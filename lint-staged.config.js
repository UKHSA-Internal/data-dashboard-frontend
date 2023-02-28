module.exports = {
  // Type check TypeScript files
  '**/*.(ts|tsx)': () => 'npx run tsc --noEmit',

  // Lint then format TypeScript and JavaScript files
  '**/*.(ts|tsx|js)': (filenames) => [
    `npx run eslint --fix ${filenames.join(' ')}`,
    `npx run prettier --write ${filenames.join(' ')}`,
  ],

  // Format MarkDown and JSON
  '**/*.(md|json)': (filenames) =>
    `npx run prettier --write ${filenames.join(' ')}`,
}
