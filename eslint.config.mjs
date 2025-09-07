import { defineConfig, globalIgnores } from 'eslint/config';
import markdown from '@eslint/markdown';
import ts from 'typescript-eslint';
import yml from 'eslint-plugin-yml';
import json from '@eslint/json';

export default defineConfig([
  {
    files: ['**/*.{ts,tsx}'],
    plugins: { ts },
    extends: [ts.configs.recommended],
  },
  {
    files: ['**/*.md'],
    plugins: { markdown },
    processor: 'markdown/markdown',
  },
  {
    files: ['**/*.yml'],
    plugins: { yml },
    extends: [yml.configs['flat/recommended']],
  },
  {
    files: ['**/*.json'],
    plugins: { json },
    language: 'json/jsonc',
  },
  globalIgnores([
    'node_modules/*',
    'assets/*',
    'coverage/*',
    'example/node_modules/*',
    'example/.expo/*',
    'example/.yarn/*',
    '.expo/*',
    '.yarn/*',
    'yarn.lock',
    'LICENSE',
    '.gitignore',
    '.npmignore',
    '.yarnrc.yml',
  ]),
]);
