
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true, // Add Jest support
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:jest/recommended', // Jest support
    'plugin:promise/recommended',
    'prettier',
  ],
  plugins: [
    '@typescript-eslint',
    'sort-imports-es6-autofix',
    'jest',
    'prettier',
    'unused-imports',
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-call': 'warn',
    'prettier/prettier': [
      'warn',
      {
        semi: false,
        usePrettierrc: false,
        singleQuote: true, // Add other Prettier options as needed
      },
    ],
    // ... add other rules here as needed
  },
  overrides: [
    {
      files: [
        '**/*.styles.ts',
        '**/*.stories.tsx',
        '**/*.test.tsx',
        '**/*.spec.tsx',
        '**/*.component.tsx',
      ],
      rules: {
        camelcase: 'off',
        '@typescript-eslint/naming-convention': 'off',
      },
    },
    {
      files: ['**/*.ts', '**/*.tsx'],
      excludedFiles: [
        '**/*.styles.ts',
        '**/*.stories.tsx',
        '**/*.test.tsx',
        '**/*.spec.tsx',
        '**/*.component.tsx',
      ],
      rules: {
        camelcase: ['error', { properties: 'always' }],
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: 'variable',
            format: ['camelCase', 'PascalCase'],
            leadingUnderscore: 'allow',
            trailingUnderscore: 'allow',
          },
          {
            selector: 'function',
            format: ['camelCase', 'PascalCase'],
          },
          {
            selector: 'typeLike',
            format: ['PascalCase'],
          },
        ],
      },
    },
  ],
};

