/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css|less|scss|sss|styl)$": "<rootDir>/node_modules/jest-css-modules",
  },
  transform: {
    "^.+\\.[tj]s$": "ts-jest",
  },
};
