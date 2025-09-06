import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.browser },
  },
  tseslint.configs.recommended,
  globalIgnores([
    'node_modules/*',
    'assets/*',
    'coverage/*',
    'yarn.lock',
    'LICENSE',
    '.gitignore',
    '.npmignore',
    '.prettierrc.js',
    'yarnrc.yml',
    'jest.config.js',
    'babel.config.js',
  ]),
]);
