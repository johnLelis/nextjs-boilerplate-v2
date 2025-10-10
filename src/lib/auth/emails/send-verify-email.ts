import VerifyEmail from "@/emails/verify-email";
import { renderAndSendEmail } from "@/lib/utils/render-and-send-email";

type VerifyEmailProps = {
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
