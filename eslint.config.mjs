import { FlatCompat } from "@eslint/eslintrc";
import prettier from "eslint-config-prettier";
import boundaries from "eslint-plugin-boundaries";
import checkFile from "eslint-plugin-check-file";
import reactHooks from "eslint-plugin-react-hooks";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: {
      "react-hooks": reactHooks,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
    },
  },
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  // Boundaries plugin config
  {
    plugins: {
      boundaries,
    },
    settings: {
      "boundaries/include": ["src/**/*"],
      "boundaries/elements": [
        {
          mode: "full",
          type: "shared",
          pattern: [
            "src/components/**/*",
            "src/data/**/*",
            "src/drizzle/**/*",
            "src/hooks/**/*",
            "src/lib/**/*",
            "src/server/**/*",
            "src/types/**/*",
            "src/config/**/*",
            "src/services/**/*",
            "src/styles/**/*",
            "src/emails/**/*",
          ],
        },
        {
          mode: "full",
          type: "feature",
          capture: ["feature-name"],
          pattern: ["src/features/*/**/*"],
        },
        {
          mode: "full",
          type: "app",
          capture: ["_", "file-name"],
          pattern: ["src/app/**/*"],
        },
        {
          mode: "full",
          type: "never-import",
          pattern: ["src/*", "src/tasks/**/*"],
        },
      ],
    },
    rules: {
      "prefer-arrow-callback": ["error"],
      "prefer-template": ["error"],
      "boundaries/no-unknown": ["error"],
      "no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      quotes: ["error", "double"],
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "error",
      "no-var": "error",
      "prefer-const": "error",
      "boundaries/no-unknown-files": ["error"],
      "boundaries/element-types": [
        "error",
        {
          default: "disallow",
          rules: [
            {
              from: ["shared"],
              allow: ["shared"],
            },
            {
              from: ["feature"],
              allow: [
                "shared",
                ["feature", { "feature-name": "${from.feature-name}" }],
              ],
            },
            {
              from: ["app", "never-import"],
              allow: ["shared", "feature"],
            },
            {
              from: ["app"],
              allow: [["app", { "file-name": "*.css" }]],
            },
          ],
        },
      ],
    },
  },
  {
    // optional: add this processor to files which not processed by other processors but still require linting
    files: ["**/*.yaml", "**/*.webp"],
    processor: "check-file/eslint-processor-check-file",
  },
  {
    files: ["src/**/*.*"],
    ignores: [
      "package.json",
      "package-lock.json",
      ".prettierrc.json",
      "components.json",
      "**/*.css",
    ],
    plugins: {
      "check-file": checkFile,
    },
    rules: {
      "check-file/filename-naming-convention": [
        "error",
        {
          "**/*.{ts,tsx,js,mjs,cjs,yaml,yml,json}": "KEBAB_CASE",
        },
        {
          // ignore the middle extensions of the filename to support filename like bable.config.js or smoke.spec.ts
          ignoreMiddleExtensions: true,
        },
      ],
      "check-file/folder-naming-convention": [
        "error",
        {
          // all folders within src (except __tests__)should be named in kebab-case
          "src/**/!(__tests__)": "KEBAB_CASE",
        },
      ],
    },
  },
  prettier,
];

export default eslintConfig;
