module.exports = {
  root: true,
  "env": {
    "browser": true,
    "es6": true,
    "node": true,
    "jest": true
  },

  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/prettier',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "no-unused-vars": [
      "error",
      {
        "varsIgnorePattern": "^_",
        "argsIgnorePattern": "^_"
      }
    ],
    "no-shadow": [
      "error",
      {
        "hoist": "functions",
        "allow": [
          "req",
          "res",
          "err",
          "done"
        ]
      }
    ],
    "consistent-return": 0,
    "no-param-reassign": 0,
    "comma-dangle": 0,
    "quotes": ["error", "single", {
      "allowTemplateLiterals": true
    }],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  overrides: [{
    files: [
      '**/__tests__/*.{j,t}s?(x)',
      '**/tests/unit/**/*.spec.{j,t}s?(x)',
    ],
    env: {
      jest: true,
    },
  }],
};
