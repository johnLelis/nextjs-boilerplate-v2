import { render, toPlainText } from "@react-email/render";

import { env } from "@/config/env";
import {
  ChangeEmailVerification,
  ChangeEmailVerificationProps,
} from "@/emails/change-email-verification";
import ResetPasswordEmail from "@/emails/reset-password";
import VerifyEmail from "@/emails/verify-email";
import WelcomeEmail from "@/emails/welcome-email";
import { sendEmail } from "@/services/email";
import { User } from "@/types/user";

export const sendWelcomeEmail = async (userEmail: string, userName: string) => {
  const html = await render(
    <WelcomeEmail
      userName={userName}
      dashboardUrl="http://localhost:3000/dashboard"
    />
  );
  const text = toPlainText(html);
  const result = await sendEmail({
    from: { email: env.EMAIL_SENDER, name: "pen • dev" },
    to: [{ email: userEmail, name: userName }],
    subject: "Welcome!",
    html,
    text,
  });

  return result;
};
type EmailProps = {
  userName: string;
  verificationUrl: URL | string;
  expirationTime: string;
  userEmail: string;
};
export const sendVerifyEmail = async ({
  userName,
  verificationUrl,
  expirationTime,
  userEmail,
}: EmailProps) => {
  const html = await render(
    <VerifyEmail
      userName={userName}
      verificationUrl={verificationUrl.toString()}
      expirationTime={expirationTime}
    />
  );

  const text = toPlainText(html);

  await sendEmail({
    from: { email: env.EMAIL_SENDER, name: "pen • dev" },
    to: [{ email: userEmail, name: userName }],
    subject: "Verify Your Email Address",
    html,
    text,
  });
};

type CommonEmailProps = Omit<ChangeEmailVerificationProps, "userName"> & {
  user: User;
};
export const sendChangeEmailVerification = async ({
  user,
  newEmail,
  verificationUrl,
  expirationTime,
}: CommonEmailProps) => {
  const html = await render(
    <ChangeEmailVerification
      userName={user.name}
      verificationUrl={verificationUrl}
      expirationTime={expirationTime}
      newEmail={newEmail}
    />
  );

  const text = toPlainText(html);

  await sendEmail({
    from: { email: env.EMAIL_SENDER, name: "pen • dev" },
    to: [{ email: user.email, name: user.name }],
    subject: "Verify Your New Email Address",
    html,
    text,
  });
};

type ResetEmailProps = {
  user: User;
  resetUrl: URL;
  expirationTime: string;
};
export const sendResetEmailPassword = async ({
  user,
  resetUrl,
  expirationTime,
}: ResetEmailProps) => {
  const html = await render(
    <ResetPasswordEmail
      userName={user.name}
      resetUrl={resetUrl}
      expirationTime={expirationTime}
    />
  );

  const text = toPlainText(html);

  await sendEmail({
    from: { email: env.EMAIL_SENDER, name: "pen • dev" },
    to: [{ email: user.email, name: user.name }],
    subject: "Verify Your New Email Address",
    html,
    text,
  });
};
