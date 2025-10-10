import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { createAuthMiddleware } from "better-auth/api";
import { emailOTPClient } from "better-auth/client/plugins";
import { nextCookies } from "better-auth/next-js";

import { env } from "@/config/env";
import { db } from "@/drizzle/db";

import {
  sendChangeEmailVerification,
  sendResetEmailPassword,
  sendVerifyEmail,
  sendWelcomeEmail,
} from "./emails";

export const auth = betterAuth({
  user: {
    changeEmail: {
      expiresIn: 3600,
      enabled: true,
      sendChangeEmailVerification: async ({ user, newEmail, url }) => {
        await sendChangeEmailVerification({
          user,
          newEmail,
          verificationUrl: url,
          expirationTime: "1 hour",
        });
      },
    },
    // You can extend the user schema with custom fields (e.g., firstName, lastName)
    // Uncomment and modify the example below to add additional fields to user profiles.
    // additionalFields: {
    //   firstName: { type: 'string' },
    //   lastName: { type: 'string' },
    // },
    deleteUser: {
      enabled: true,
    },
  },
  emailAndPassword: {
    resetPasswordTokenExpiresIn: 300,
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url, token }) => {
      await sendResetEmailPassword({
        user,
        resetUrl: new URL(`${url}?token=${token}`),
        expirationTime: "5 minutes",
      });
    },
  },
  emailVerification: {
    autoSignInAfterVerification: true,
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url }) => {
      await sendVerifyEmail({
        userName: user.name,
        verificationUrl: url,
        expirationTime: "1 hour",
        userEmail: user.email,
      });
    },

    expiresIn: 3600,
  },

  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5, //5mins
    },
    freshAge: 60 * 5,
    expiresIn: 15 * 60,
    preserveSessionInDatabase: false,
  },
  plugins: [nextCookies(), emailOTPClient()],
  socialProviders: {
    github: {
      clientId: env.GITHUB_CLIENT_ID as string,
      clientSecret: env.GITHUB_CLIENT_SECRET as string,
    },
    google: {
      clientId: env.GOOGLE_CLIENT_ID as string,
      clientSecret: env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      const newSession = ctx.context.newSession;
      if (ctx.path.startsWith("/verify-email") && newSession) {
        const userEmail = newSession.user.email;
        const userName = newSession.user.name;
        await sendWelcomeEmail(userEmail, userName);
      }
    }),
  },
});
