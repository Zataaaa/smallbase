import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['test/**/*.test.js'],
    reporters: ['default', 'junit'],
    outputFile: { junit: 'coverage/junit.xml' },
    coverage: {
      provider: 'v8',
      include: ['src/**/*.js'],
      reporter: ['text', 'html', 'lcov', 'json-summary', 'cobertura'],
      reportsDirectory: 'coverage',
      thresholds: { lines: 80, functions: 80, branches: 80, statements: 80 }
    }
  }
});
