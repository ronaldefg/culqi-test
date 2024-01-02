module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    testMatch: [
        '<rootDir>/src/**/*.test.ts', // Buscar archivos de prueba en la carpeta src y sus subcarpetas
    ],
};