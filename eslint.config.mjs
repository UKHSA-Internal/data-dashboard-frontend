import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import tanstackQuery from '@tanstack/eslint-plugin-query'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import unusedImports from 'eslint-plugin-unused-imports'
import playwright from 'eslint-plugin-playwright'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default [
  {
    ignores: [
      '**/.lintstagedrc.js',
      '.next/**',
      'node_modules/**',
      'out/**',
      'build/**',
      'dist/**',
      'coverage/**',
      '.turbo/**',
      'eslint.config.mjs',
      'pnpm-lock.yaml',
      'package-lock.json',
      'yarn.lock',
      'playwright.config.ts',
      'playwright-report/**',
      '.unlighthouse/**',
    ],
  },

  ...compat.extends(
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:tailwindcss/recommended',
    'plugin:jsx-a11y/recommended',
    'next',
    'next/core-web-vitals',
    'prettier'
  ),

  {
    plugins: {
      'simple-import-sort': simpleImportSort,
      'unused-imports': unusedImports,
      '@tanstack/query': tanstackQuery,
    },

    rules: {
      // Your original rules
      'no-restricted-imports': [
        'error',
        {
          name: '@radix-ui/react-dialog',
          message:
            'Please avoid using the @radix-ui/react-dialog package and use our built in Dialog component directly',
        },
        {
          name: '@radix-ui/react-tabs',
          message: 'Please avoid using the @radix-ui/react-tabs package and use our built in Tabs component directly',
        },
        {
          name: '@unleash/nextjs',
          message: 'Please use our feature flag utilities in @app/utils/flags.utils.ts.',
        },
        {
          name: '@testing-library/react',
          message: 'Please import @testing-library/react modules from @/config/test-utils.',
        },
      ],
      'import/no-anonymous-default-export': 'off',
      'import/no-named-as-default': 'off',

      // Make id-length less strict - allow more short names
      'id-length': [
        'error',
        {
          min: 2,
          exceptions: ['i', 'j', 'k', 'x', 'y', 'z', '_', 'e', 'a', 'b', 't', 'id'],
          properties: 'never',
          exceptionPatterns: ['^[a-z]$'], // Allow single letter variables
        },
      ],

      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'unused-imports/no-unused-imports': 'error',
      'react/display-name': 'off',
      'tailwindcss/no-custom-classname': [
        'warn',
        {
          whitelist: ['govuk\\-.*', 'ukhsa\\-.*'],
        },
      ],

      // Fix the main error sources
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-this-alias': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/triple-slash-reference': 'off',

      // Import rules
      'import/namespace': 'off',
      'import/default': 'off',
      'import/no-named-as-default-member': 'off',
      'import/named': 'off',

      // Let TypeScript and Next.js handle these
      'no-undef': 'off',
      'import/no-unresolved': 'off',
    },
  },

  {
    files: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'no-magic-numbers': 'off',
      'id-length': 'off', // Allow short variable names in tests
    },
  },

  // Playwright-specific configuration
  {
    files: ['**/*.spec.ts', 'e2e/**/*.ts', 'tests/**/*.ts'],
    plugins: {
      playwright,
    },
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'off',
      'react-hooks/rules-of-hooks': 'off', // Playwright's 'use' conflicts with React hooks
      'playwright/no-skipped-test': 'warn',
      'playwright/no-networkidle': 'warn',
      'playwright/no-eval': 'error',
      'playwright/no-conditional-in-test': 'warn',
    },
  },
]
