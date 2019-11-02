module.exports = {
  displayName: 'hello-books-vue',
  preset: '@vue/cli-plugin-unit-jest',
  collectCoverage: true,
  verbose: true,
  collectCoverageFrom: [
    'src/**/*.{js,vue}',
    '!src/main.js'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest'
  },
  snapshotSerializers: [
    '<rootDir>/node_modules/jest-serializer-vue'
  ]
};
