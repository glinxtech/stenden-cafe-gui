'use strict';

module.exports = {
  root: true,
  extends: 'airbnb',
  parser: '@babel/eslint-parser',
  env: {
    browser: true,
  },
  rules: {
    'arrow-parens': [2, 'as-needed'],
    'prefer-destructuring': 0,
    'react/jsx-props-no-spreading': 0,
    'react/jsx-no-bind': 0,
    'react/jsx-one-expression-per-line': 0,
  },
  overrides: [
    {
      files: [
        '.eslintrc.js',
        '*.config.js',
      ],
      parserOptions: {
        sourceType: 'script',
      },
      env: {
        browser: false,
        node: true,
      },
      rules: {
        strict: [2, 'global'],
        'import/no-extraneous-dependencies': [2, { devDependencies: true }],
      },
    },
  ],
};
