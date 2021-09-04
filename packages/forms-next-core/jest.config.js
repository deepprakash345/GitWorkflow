module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  coveragePathIgnorePatterns : ['__tests__/*'],
  testRegex: '__tests__/[^.]+\\.test\\.ts',
  setupFiles: ['./__tests__/setupTests.js'],
  'reporters' : ['default', 'jest-junit']
};
