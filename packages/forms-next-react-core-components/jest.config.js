module.exports = {
  preset: 'ts-jest',
  coverageDirectory: 'target/coverage',
  coverageReporters: ['json', 'lcov', 'text', 'clover', 'cobertura'],
  testEnvironment: 'jsdom',
  collectCoverage: false,
  coveragePathIgnorePatterns : ['__tests__/*'],
  testRegex: '__tests__/[^.]+\\.test\\.tsx',
  'moduleNameMapper' : {
    '\\.css' : '<rootDir>/__tests__/mocks/styleMock.js',
    // Mock static file imports and assets which Jest can’t handle
    // stylesheets use the package identity-obj-proxy
    '@spectrum-css/.*': 'identity-obj-proxy'
  },
  'reporters' : ['default', 'jest-junit']
};
