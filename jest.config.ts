import type {Config} from 'jest'
import nextJest from 'next/jest'

const createJestConfig = nextJest({dir: './'})

const config: Config = {
  roots: ['<rootDir>/src'],
  preset: 'ts-jest',
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  collectCoverageFrom: ['src/**/*.{js,ts,jsx,tsx}'],
  coverageThreshold: {
    global: {
      lines: 100,
      statements: 100,
      branches: 100,
      functions: 100
    }
  }
}

export default createJestConfig(config)
