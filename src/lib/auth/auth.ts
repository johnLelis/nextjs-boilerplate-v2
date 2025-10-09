import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '@/drizzle/db';
import { nextCookies } from 'better-auth/next-js';
import { env } from '@/config/env';
import { sendEmail } from '@/services/email';
import { createAuthMiddleware } from 'better-auth/api';
import {
  createChangeEmailVerification,
  createResetPasswordEmail,
} from '@/lib/email-templates';
import { sendVerifyEmail, sendWelcomeEmail } from '@/actions/email';
import { emailOTPClient } from 'better-auth/client/plugins';

export const auth = betterAuth({
  user: {
    changeEmail: {
      expiresIn: 3600,
      enabled: true,
      sendChangeEmailVerification: async ({ user, newEmail, url }) => {
        const { html, text } = createChangeEmailVerification({
          userName: user.name,
          newEmail,
          verificationUrl: url,
          expirationTime: '1 hour',
        });

        await sendEmail({
          from: { email: env.EMAIL_SENDER, name: 'pen • dev' },
          to: [{ email: user.email, name: user.name }],
          subject: 'Verify Your New Email Address',
          html,
          text,
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
      const { html, text } = createResetPasswordEmail({
        userName: user.name,
        resetUrl: new URL(`${url}?token=${token}`),
        expirationTime: '5 minutes',
        brandColor: '#0070f3',
      });
      await sendEmail({
        to: [{ email: user.email, name: user.name }],
        subject: 'Reset your password',
        text,
        html,
        from: { email: env.EMAIL_SENDER, name: 'pen • dev' },
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
        expirationTime: '1 hour',
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
    provider: 'pg',
  }),
  hooks: {
    after: createAuthMiddleware(async ctx => {
      const newSession = ctx.context.newSession;
      if (ctx.path.startsWith('/verify-email') && newSession) {
        const userEmail = newSession.user.email;
        const userName = newSession.user.name;
        await sendWelcomeEmail(userEmail, userName);
      }
    }),
  },
});
