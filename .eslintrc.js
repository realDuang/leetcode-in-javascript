module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true
  },
  extends: [
    'alloy',
    'alloy/typescript'
  ],
  rules: {
    'no-var': 0,
    'no-unused-vars': 0,
    'max-params': 0,
    'no-irregular-whitespace': 0,
    'no-param-reassign': 0,
    '@typescript-eslint/explicit-member-accessibility': 'no-public'
  }
};
