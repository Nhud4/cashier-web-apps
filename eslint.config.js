import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import reactPlugin from 'eslint-plugin-react'
import { defineConfig, globalIgnores } from 'eslint/config'
import simpleImportSort from "eslint-plugin-simple-import-sort";
import sortKeysFix from "eslint-plugin-sort-keys-fix";
import unusedImports from "eslint-plugin-unused-imports";
import prettier from 'eslint-config-prettier'

export default defineConfig([
  prettier,
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      react: reactPlugin,
      "simple-import-sort": simpleImportSort,
      "sort-keys-fix": sortKeysFix,
      "unused-imports": unusedImports,
    },
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      "no-console": "error",
      "no-unused-vars": "off",
      
      'react-refresh/only-export-components': "off",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/jsx-sort-props": "error",

      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "unused-imports/no-unused-imports": "error",
      "sort-keys-fix/sort-keys-fix": "warn",

      "@typescript-eslint/no-unused-vars": [
      "error",
        {
          "argsIgnorePattern": "^_",
          "varsIgnorePattern": "^_",
          "caughtErrorsIgnorePattern": "^_"
        }
      ],
    }
  },
])
