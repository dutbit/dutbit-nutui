/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    'standard',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier',
  ],
  parserOptions: { ecmaVersion: 'latest' },
  rules: {
    'prettier/prettier': 'off',
    'vue/multi-word-component-names': 'off',
    'no-tabs': 'error',
    'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    camelcase: ['error', { allow: ['^_?[a-z][a-z0-9]*([A-Z][a-z0-9]*)*(_[a-z][a-z0-9]*([A-Z][a-z0-9]*)*)*$'] }],
    curly: ['error', 'multi'],
  },
}
