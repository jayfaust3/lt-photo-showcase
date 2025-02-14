module.exports = {
    // The root directory that Jest should scan for tests and modules within
    rootDir: '.',
  
    // Automatically clear mock calls, instances, contexts, and results before every test
    clearMocks: true,
  
    // Specify which file extensions Jest will recognize as test files
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
  
    // The glob patterns Jest uses to detect test files
    testMatch: [
      '**/__tests__/**/*.[jt]s?(x)',  // Look for test files inside __tests__ folder
      '**/?(*.)+(spec|test).[tj]s?(x)' // Or files with .spec.js or .test.js
    ],
  
    // The test environment that will be used for testing
    testEnvironment: 'jsdom', // Can also be 'jsdom' for browser-like tests
  
    // Transform files before running tests (e.g., transpile TypeScript or JSX)
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'ts-jest', // Use ts-jest for JS/TS/JSX/TSX files
    },
  
    // Collect coverage information from the specified files
    collectCoverage: true,
    collectCoverageFrom: [
      'src/**/*.{js,jsx,ts,tsx}',  // Collect coverage from all JS/TS files inside src folder
      '!src/**/*.d.ts'              // Exclude TypeScript declaration files
    ],
  
    // Coverage threshold: specify minimum coverage levels for statements, branches, functions, and lines
    coverageThreshold: {
      global: {
        statements: 80,
        branches: 75,
        functions: 80,
        lines: 80
      }
    },
  
    // A setup file that will be run before each test suite
    setupFiles: ['./jest.setup.js'],
  };