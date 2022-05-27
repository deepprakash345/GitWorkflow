/*
 *
 *  Copyright 2022 Adobe. All rights reserved.
 *  This file is licensed to you under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License. You may obtain a copy
 *   of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software distributed under
 *   the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 *  OF ANY KIND, either express or implied. See the License for the specific language
 *  governing permissions and limitations under the License.
 *
 */

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
