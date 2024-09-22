import globals from "globals"
import pluginJs from "@eslint/js"
import tseslint from "typescript-eslint"
import perfectionist from 'eslint-plugin-perfectionist'
import prettierPlugin from 'eslint-plugin-prettier'
import parser from '@typescript-eslint/parser'


export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  {
    languageOptions: {
      parser,
      sourceType: 'module',
      ecmaVersion: 'latest',
      globals: globals.node,
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
        ecmaFeatures: {
          impliedStrict: true,
          experimentalObjectRestSpread: true,
        },
      },
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      perfectionist,
      prettier: prettierPlugin,
    }
  },
  {
    rules: {
      'prettier/prettier': [0, {}, { usePrettierrc: true }],
    },
  },
  {
    rules: {
      'no-async-promise-executor': 0,
    },
  },
  {
    rules: {
      '@typescript-eslint/ban-ts-comment': 0,
      '@typescript-eslint/no-explicit-any': 0,
    },
  },
  {
    rules: {
      'perfectionist/sort-object-types': [1, { type: 'line-length' }],
      'perfectionist/sort-named-imports': [1, { type: 'line-length' }],
      'perfectionist/sort-array-includes': [1, { type: 'line-length' }],
      'perfectionist/sort-exports': [1, { order: 'desc', type: 'line-length' }],
      'perfectionist/sort-named-exports': [1, { order: 'asc', type: 'line-length' }],
      'perfectionist/sort-interfaces': [1, { type: 'line-length', partitionByNewLine: true }],
      'perfectionist/sort-union-types': [1, { order: 'desc', type: 'line-length', groups: ['unknown', 'nullish'] }],
      'perfectionist/sort-jsx-props': [1, { ignoreCase: false, type: 'line-length', groups: ['unknown', 'multiline'] }],
      'perfectionist/sort-imports': [1, { order: 'desc', type: 'line-length', groups: ['external', 'internal', 'unknown'] }],
      'perfectionist/sort-objects': [
        1,
        {
          ignoreCase: false,
          type: 'line-length',
          partitionByComment: true,
          partitionByNewLine: true,
          ignorePattern: ['*Service'],
        },
      ],
    },
  },
]