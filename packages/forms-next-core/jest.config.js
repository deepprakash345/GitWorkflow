module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  coveragePathIgnorePatterns : ['src/__tests__/*'],
  testRegex: 'src/__tests__/[^.]+\\.test\\.ts'
};
