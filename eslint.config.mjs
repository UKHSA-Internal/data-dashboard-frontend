import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import tanstackQuery from '@tanstack/eslint-plugin-query'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import unusedImports from 'eslint-plugin-unused-imports'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default tseslint.config(
  // Global ignores
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
    ],
  },

  // Base configs
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // Extended configs via compat
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:tailwindcss/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier'
  ),

  // Main configuration
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
      'unused-imports': unusedImports,
      '@tanstack/query': tanstackQuery,
    },

    rules: {
      '@typescript-eslint/no-require-imports': 'off',
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
      'no-prototype-builtins': 'off',

      'id-length': [
        'error',
        {
          exceptions: ['i', 'j', '_', 'e', 'z', 't'],
          properties: 'never',
        },
      ],

      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'unused-imports/no-unused-imports': 'error',
      'react/display-name': 'off',
      'no-useless-escape': 'off',
      'no-case-declarations': 'off',

      'tailwindcss/no-custom-classname': [
        'warn',
        {
          whitelist: ['govuk\\-.*', 'ukhsa\\-.*'],
        },
      ],
    },
  },

  // Test file specific rules
  {
    files: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'no-magic-numbers': 'off',
      '@typescript-eslint/no-require-imports': 'off',
    },
  }
)
