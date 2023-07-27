// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

const customJestConfig = {
  setupFiles: ['<rootDir>/config/jest/jest.env.js'],
  setupFilesAfterEnv: ['<rootDir>/config/jest/jest.setup.js'],
  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you soon)
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/styles/(.*)$': '<rootDir>/src/styles/$1',
    '^@/pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@/api/(.*)$': '<rootDir>/src/api/$1',
    '^@/config/(.*)$': '<rootDir>/src/config/$1',
    '^@/lib/(.*)$': '<rootDir>/src/lib/$1',
    '^@/utils/(.*)$': '<rootDir>/src/utils/$1',
    // Needed to get react markdown & dependencies to work with react-raw, see:
    // https://stackoverflow.com/questions/70916761/next-js-and-jest-syntaxerror-cannot-use-import-statement-outside-a-module
    'react-markdown': '<rootDir>/node_modules/react-markdown/react-markdown.min.js',
    'parse5/lib/parser/index.js': '<rootDir>/node_modules/hast-util-raw/node_modules/parse5/lib/parser/index.js',
  },
  testEnvironment: 'jest-environment-jsdom',
  modulePathIgnorePatterns: ['cypress'],
  reporters: ['default', 'jest-junit'],
  coverageReporters: ['json-summary', 'text'],
  coveragePathIgnorePatterns: ['node_modules', '<rootDir>/src/api/models', '<rootDir>/src/api/msw/index.ts'],
  coverageThreshold: {
    global: {
      lines: 97,
      functions: 95,
      branches: 80,
      statements: 96,
    },
  },
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
// module.exports = createJestConfig(customJestConfig)
module.exports = async () => ({
  ...(await createJestConfig(customJestConfig)()),
  transformIgnorePatterns: [
    'node_modules/(?!(ky-universal|ky|rehype-slug|github-slugger|hast-util-has-property|hast-util-to-string|hast-util-heading-rank|rehype-raw|hast-util-raw|unist-util-position|unist-util-visit|unist-util-visit-parents|unist-util-is|hast-util-from-parse5|hastscript|property-information|hast-util-parse-selector|space-separated-tokens|comma-separated-tokens|vfile-location|web-namespaces|hast-util-to-parse5|zwitch|html-void-elements)/)',
  ],
})
