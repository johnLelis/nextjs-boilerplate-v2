import ResetPasswordEmail from "@/emails/reset-password";
import { renderAndSendEmail } from "@/lib/utils/render-and-send-email";
import { ResetEmailProps } from "@/types/email";

export const sendResetEmailPassword = async ({
  user,
  resetUrl,
  expirationTime,
}: ResetEmailProps) => {
  await renderAndSendEmail({
    Component: ResetPasswordEmail,
    props: {
      userName: user.name,
      resetUrl,
      expirationTime,
    },
    to: [{ email: user.email, name: user.name }],
    subject: "Verify Your New Email Address",
  });
};
