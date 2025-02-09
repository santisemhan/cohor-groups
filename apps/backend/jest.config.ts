import type { Config } from "jest"

const config: Config = {
  coverageReporters: ["cobertura", "html"],
  preset: "ts-jest",
  reporters: [
    "default",
    [
      "jest-junit",
      {
        outputDirectory: ".",
        outputName: "junit.xml"
      }
    ]
  ],
  testEnvironment: "node",
  testPathIgnorePatterns: ["<rootDir>/.build/", "<rootDir>/node_modules/", "<rootDir>/.serverless/"],
  verbose: true,
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"]
}

export default config
