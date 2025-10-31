import { defineConfig } from "drizzle-kit";

import { env } from "@/config/env";

export default defineConfig({
  out: "./src/drizzle/migrations",
  schema: "./src/drizzle/*",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});
