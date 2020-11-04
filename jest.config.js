'use strict';

module.exports = {
  transform: {
    '^(?!.*\\.(d\\.ts)$).+\\.(js|ts)$': 'ts-jest',
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|mjs)$'],
  moduleFileExtensions: ['ts', 'js'],
  testRegex: '.*\\.test\\.ts$',
  coverageDirectory: '<rootDir>/coverage',
  collectCoverageFrom: ['**/*.ts', '!**/*.d.ts'],
  clearMocks: true,
  restoreMocks: true,
};
