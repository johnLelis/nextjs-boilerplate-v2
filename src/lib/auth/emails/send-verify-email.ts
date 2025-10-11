import VerifyEmail from "@/emails/verify-email";
import { renderAndSendEmail } from "@/lib/utils/render-and-send-email";
import { VerifyEmailProps } from "@/types/email";

export const sendVerifyEmail = async ({
  userName,
  verificationUrl,
  expirationTime,
  userEmail,
}: VerifyEmailProps) => {
  await renderAndSendEmail({
    Component: VerifyEmail,
    props: {
      userName,
      verificationUrl,
      expirationTime,
    },
    to: [{ email: userEmail, name: userName }],
    subject: "Verify Your Email Address",
  });
};
