import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  {
    ignores: ['dist/**', 'node_modules/**', 'docs/.vuepress/dist/**']
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        console: 'readonly'
      }
    },
    rules: {
      'no-irregular-whitespace': 'off',
      'no-constant-condition': 'off',
      'prefer-const': 'off',
      'no-redeclare': 'off',
      'no-undef': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-unused-expressions': 'off'
    }
  },
  {
    files: ['**/*.ts'],
    rules: {
      'no-undef': 'off',
      'no-irregular-whitespace': 'off',
      '@typescript-eslint/no-unused-vars': 'off'
    }
  }
];
