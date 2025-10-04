'use server';
import { env } from '@/config/env';
import { createWelcomeEmail } from '@/lib/email-templates';
import { sendEmail } from '@/services/email';

export const sendWelcomeEmail = async (userEmail: string, userName: string) => {
  const { html, text } = createWelcomeEmail({
    userName,
    dashboardUrl: new URL('http://localhost:3000/dashboard'),
  });
  const result = await sendEmail({
    from: { email: env.AZURE_USER_EMAIL, name: 'PenStack' },
    to: [{ email: userEmail, name: userName }],
    subject: 'Welcome!',
    html,
    text,
  });

  return result;
};
