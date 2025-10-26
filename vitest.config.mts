import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths({ ignoreConfigErrors: true }), react()],
  test: {
    globals: true, //use describe/it/expect without imports
    environment: "jsdom", // simulate the browser environment
    setupFiles: "./vitest.setup.ts", // load custom setup (jest-dom, cleanup, etc.)
    css: true, // allow CSS imports in tests
    coverage: {
      reporter: ["text", "json", "html"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/**/*.d.ts",
        "src/**/__tests__/**",
        "src/**/*.test.{ts,tsx}",
        "src/**/*.spec.{ts,tsx}",
        "src/**/mocks/**",
      ],
    },
  },
});
