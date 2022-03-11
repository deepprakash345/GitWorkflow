module.exports = {
  preset: 'ts-jest',
  coverageDirectory: 'target/coverage',
  coverageReporters: ['json', 'lcov', 'text', 'clover', 'cobertura'],
  testEnvironment: 'jsdom',
  collectCoverage: false,
  coveragePathIgnorePatterns: ['__tests__/*'],
  testRegex: '__tests__/[^.]+\\.test\\.tsx',
  'moduleNameMapper': {
    '\\.css': 'identity-obj-proxy',
    '@spectrum-css/.*': 'identity-obj-proxy'
  },
  'reporters': ['default', 'jest-junit']
};
