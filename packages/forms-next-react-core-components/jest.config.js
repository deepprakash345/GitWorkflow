module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  collectCoverage: true,
  coveragePathIgnorePatterns : ['src/__tests__/*'],
  testRegex: 'src/__tests__/[^.]+\\.test\\.tsx',
  'moduleNameMapper' : {
    '\\.css' : '<rootDir>/src/__tests__/mocks/styleMock.js'
  }
};
