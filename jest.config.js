module.exports = {
    verbose: true,
    testEnvironment: 'node',
    forceExit: true,
    testMatch: ['**/tests/**/*.test.js'],
    testPathIgnorePatterns: ['/node_modules/'],
    maxWorkers: 1
}