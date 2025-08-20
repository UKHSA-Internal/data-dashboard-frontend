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
    '^@/api/(.*)$': '<rootDir>/src/api/$1',
    '^@/config/(.*)$': '<rootDir>/src/config/$1',
    '^@/lib/(.*)$': '<rootDir>/src/lib/$1',
    '^@/app/(.*)$': '<rootDir>/src/app/$1',
    '^@/auth': '<rootDir>/src/auth',
    // Needed to get react markdown & dependencies to work with react-raw, see:
    // https://stackoverflow.com/questions/70916761/next-js-and-jest-syntaxerror-cannot-use-import-statement-outside-a-module
    'react-markdown': '<rootDir>/node_modules/react-markdown/react-markdown.min.js',
    'parse5/lib/parser/index.js': '<rootDir>/node_modules/hast-util-raw/node_modules/parse5/lib/parser/index.js',
  },
  testEnvironment: 'jest-environment-jsdom',
  modulePathIgnorePatterns: ['e2e'],
  reporters: ['default', 'jest-junit'],
  coverageReporters: ['json-summary', 'text'],
  coveragePathIgnorePatterns: [
    'node_modules',
    '<rootDir>/src/api/utils/api.utils.ts',
    '<rootDir>/src/api/models',
    '<rootDir>/src/middleware.ts',
    '<rootDir>/src/mock-server',
  ],
  coverageThreshold: {
    global: {
      // statements: 93.8,
      // branches: 85,
      // lines: 95,
      // functions: 96,

      // Will update back up as part of CDD-2370
      statements: 80,
      branches: 80,
      lines: 92,
      functions: 87,
    },
  },
  watchPathIgnorePatterns: ['node_modules'],
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
// module.exports = createJestConfig(customJestConfig)
module.exports = async () => ({
  ...(await createJestConfig(customJestConfig)()),
  transformIgnorePatterns: [
    'node_modules/(?!(@react-leaflet|react-leaflet|rehype-slug|github-slugger|hast-util-has-property|hast-util-to-string|hast-util-heading-rank|rehype-raw|hast-util-raw|unist-util-position|unist-util-visit|unist-util-visit-parents|unist-util-is|hast-util-from-parse5|hastscript|property-information|hast-util-parse-selector|space-separated-tokens|comma-separated-tokens|vfile-location|web-namespaces|hast-util-to-parse5|zwitch|html-void-elements|next-auth|@auth/core|@panva/hkdf|jose|preact-render-to-string|preact|oauth4webapi|react-leaflet-custom-control)/)',
  ],
})
