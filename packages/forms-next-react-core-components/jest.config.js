module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  collectCoverage: true,
  coveragePathIgnorePatterns : ['__tests__/*'],
  testRegex: '__tests__/[^.]+\\.test\\.tsx',
  'moduleNameMapper' : {
    '\\.css' : '<rootDir>/__tests__/mocks/styleMock.js'
  },
  'reporters' : ['default', 'jest-junit']
};
