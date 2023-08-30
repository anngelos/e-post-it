module.exports = {
  moduleFileExtensions: ['js', 'json', 'vue'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  rootDir: 'test',
  testRegex: '.*\\.spec\\.js$', // Para arquivos de teste .spec.js
  transform: {
    '.*\\.(vue)$': 'vue3-jest',
  },
  collectCoverageFrom: ['**/*.js'], // Arquivos JavaScript para cobertura
  coverageDirectory: '<rootDir>/coverage',
  modulePathIgnorePatterns: ['<rootDir>/dist/'], // Se você tiver uma pasta de distribuição que deve ser ignorada
};