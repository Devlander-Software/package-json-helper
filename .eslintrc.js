/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: path.join(__dirname, 'tsconfig.eslint.json'),
    tsconfigRootDir: "./",
    include: ["src/**/*.ts", "__tests__/**/*.ts", "__tests__/**/*.test.ts", "bootstrap.cjs", "src/pkg-helper", "jest.config.ts"],
  },
  ignorePatterns: ["node_modules/", "dist/", "coverage/", "bootstrap.cjs"],
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended",
    "plugin:jest/recommended",
    'plugin:@typescript-eslint/recommended',
    'plugin:promise/recommended',
    'prettier',
  ],
  plugins: ["prettier", "@typescript-eslint", "promise", "jest", "prefer-arrow-functions", 'import', 'jest', 'testing-library', 'prettier', 'unused-imports'],
  rules: {
    "prettier/prettier": "warn", // Use the "warn" severity

    "arrow-body-style": "off",
    "prefer-arrow-callback": "off",
    "prefer-const": "warn",
    "no-var": "warn",
    "no-throw-literal": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "no-unreachable": "warn",
    "no-prototype-builtins": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
    ],
    "@typescript-eslint/no-non-null-assertion": "off",
    "promise/always-return": "warn",
    "promise/no-return-wrap": "warn",
    "promise/param-names": "warn",
    "promise/catch-or-return": ["warn", { allowFinally: true }],
    "promise/no-native": "off",
    "promise/no-nesting": "warn",
    "promise/no-promise-in-callback": "warn",
    "promise/no-callback-in-promise": "warn",
    "promise/avoid-new": "off",
    "promise/no-new-statics": "warn",
    "promise/no-return-in-finally": "warn",
    "promise/valid-params": "warn",
    "jest/no-disabled-tests": "off",
    "jest/no-commented-out-tests": "off",
    "@typescript-eslint/consistent-type-imports": [
      'error',
      {
        prefer: 'type-imports',
      },
    ],
  },
  settings: {
    'import/resolver': {
      // If you're using custom module resolution, configure it here
    },
  },
  overrides: [
    // ... your existing overrides ...
  ],
  globals: {
    SwaggerEditor: true,
    JSX: true,
    window: true
  },
};
