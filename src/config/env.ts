import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  //Database
  DATABASE_URL: z.url(),
  DB_HOST: z.string().min(1),
  DB_PORT: z.string().default("5432"),
  DB_PASSWORD: z.string().min(1),
  DB_USER: z.string().min(1),
  DB_NAME: z.string().min(1),

  //Better Auth
  BETTER_AUTH_SECRET: z.string().min(1),
  BETTER_AUTH_URL: z.url(),

  //Arcjet
  ARCJET_KEY: z.string().min(30).optional(),
  ARCJET_ENV: z
    .enum(["development", "production"])
    .default("development")
    .optional(),
  ENABLE_ARCJET: z.string().default("false").optional(),

  //Social Providers
  GITHUB_CLIENT_ID: z.string().optional(),
  GITHUB_CLIENT_SECRET: z.string().optional(),
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),

  //Azure
  AZURE_TENANT_ID: z.string().optional(),
  AZURE_CLIENT_ID: z.string().optional(),
  AZURE_CLIENT_SECRET: z.string().optional(),

  //Email Provider
  EMAIL_SENDER: z.string(),
  EMAIL_PROVIDER: z.string().optional().default("azure"),

  // Optional vars with defaults
  PORT: z.string().default("3000"),
});

const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
  const flattened = parsed.error.message;
  console.error("❌ Invalid environment variables:", flattened);
  throw new Error("Invalid environment variables");
}

const parsedData = {
  ...parsed.data,
} as const;
export const env = parsedData;
