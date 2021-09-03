module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  coveragePathIgnorePatterns : ['src/__tests__/*'],
  testRegex: 'src/__tests__/[^.]+\\.test\\.ts',
  setupFiles: ['./src/__tests__/setupTests.js'],
  'reporters' : ['default', 'jest-junit']
};
