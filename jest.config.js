module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/no-babel',
  testMatch: ['**/test/**/*.test.js'],
  transformIgnorePatterns: ["<rootDir>/node_modules/(?!vee-validate/dist/rules)"],
  setupFiles: ['./test/setup.js']
}
