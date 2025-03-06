module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
    moduleNameMapper: {
        '^src/(.*)$': '<rootDir>/src/$1' // Adjust the moduleNameMapper
    }
};