module.exports = {
  preset: 'ts-jest',
  coverageDirectory: 'target/coverage',
  coverageReporters: ['json', 'lcov', 'text', 'clover', 'cobertura'],
  testEnvironment: 'jsdom',
  collectCoverage: true,
  coveragePathIgnorePatterns : ['__tests__/*'],
  testRegex: '__tests__/[^.]+\\.test\\.tsx',
  'moduleNameMapper' : {
    '\\.css' : '<rootDir>/__tests__/mocks/styleMock.js'
  },
  'reporters' : ['default', 'jest-junit']
};
