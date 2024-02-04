import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.test.ts?$': 'ts-jest', // Ensure this matches both .ts and .tsx files
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  
  // Explicitly define the root directory and test patterns to avoid including .d.ts files
  roots: ['<rootDir>'],
  testMatch: [
    '**/src/__tests__/**/*.test.ts', // Matches any files in __tests__ directories with .test.ts extension
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/', // Ignore tests from the dist directory
    '/typings/', // Ignore tests from the typings directory
  ],
  testEnvironment: 'node',

  globals: {
    'ts-jest': {
      babelConfig: true,
      diagnostics: {
        warnOnly: true, // Change to false if you want to treat TypeScript errors as failures
      },
      tsconfig: 'tsconfig.jest.json' // Specify your Jest-specific tsconfig if needed
    }
  },

  // Optional: Setup files after env setup (useful for global mocks)
  setupFilesAfterEnv: ['<rootDir>/setup-tests.ts'],

};

export default config;
