import { FlatCompat } from "@eslint/eslintrc";
import prettier from "eslint-config-prettier";
import boundaries from "eslint-plugin-boundaries";
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
      prettier,
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
            "src/actions/**/*",
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
      quotes: ["error", "double"],
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
];

export default eslintConfig;
