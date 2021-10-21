module.exports = {
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      compiler: 'ttypescript'
    }
  },
  coverageDirectory: 'target/coverage',
  coverageReporters: ['json', 'lcov', 'text', 'clover', 'cobertura'],
  testEnvironment: 'node',
  collectCoverage: false,
  coveragePathIgnorePatterns : ['__tests__/*'],
  testRegex: '__tests__/[^.]+\\.test\\.ts',
  setupFiles: ['./__tests__/setupTests.js'],
  'reporters' : ['default', 'jest-junit']
};
