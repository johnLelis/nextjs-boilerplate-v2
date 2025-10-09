import { env } from '@/config/env';
import { sendEmail } from '@/services/email';
import { render, toPlainText } from '@react-email/render';
import WelcomeEmail from '@/emails/welcome-email';
import VerifyEmail from '@/emails/verify-email';
export const sendWelcomeEmail = async (userEmail: string, userName: string) => {
  const html = await render(
    <WelcomeEmail
      userName={userName}
      dashboardUrl="http://localhost:3000/dashboard"
    />
  );
  const text = toPlainText(html);
  const result = await sendEmail({
    from: { email: env.EMAIL_SENDER, name: 'pen • dev' },
    to: [{ email: userEmail, name: userName }],
    subject: 'Welcome!',
    html,
    text,
  });

  return result;
};
type VerifyEmailProps = {
  userName: string;
  verificationUrl: string;
  expirationTime: string;
  userEmail: string;
};
export const sendVerifyEmail = async ({
  userName,
  verificationUrl,
  expirationTime,
  userEmail,
}: VerifyEmailProps) => {
  const html = await render(
    <VerifyEmail
      userName={userName}
      verificationUrl={verificationUrl}
      expirationTime={expirationTime}
    />
  );

  const text = toPlainText(html);

  await sendEmail({
    from: { email: env.EMAIL_SENDER, name: 'pen • dev' },
    to: [{ email: userEmail, name: userName }],
    subject: 'Verify Your Email Address',
    html,
    text,
  });
};
