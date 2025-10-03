import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '@/drizzle/db';
import { nextCookies } from 'better-auth/next-js';
import { env } from '@/config/env';
import { sendEmail } from '@/services/email';

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url, token }) => {
      await sendEmail({
        to: [{ email: user.email }],
        subject: 'Reset your password',
        text: `Click the link to reset your password: ${new URL(
          `${url}?token=${token}`
        )}`,
        from: { email: env.AZURE_USER_EMAIL },
      });
    },
  },
  emailVerification: {
    autoSignInAfterVerification: true,
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url }) => {
      await sendEmail({
        to: [{ email: user.email }],
        subject: 'Verify your email address',
        text: `Click the link to verify your email: ${url}`,
        from: { email: env.AZURE_USER_EMAIL },
      });
    },
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5, //5mins
    },
  },
  plugins: [nextCookies()],
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
    provider: 'pg',
  }),
});
