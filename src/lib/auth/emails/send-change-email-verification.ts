import ChangeEmailVerification, {
  ChangeEmailVerificationProps,
} from "@/emails/change-email-verification";
import { renderAndSendEmail } from "@/lib/utils/render-and-send-email";
import { User } from "@/types/user";

type ChangeEmailVerificationRequest = Omit<
  ChangeEmailVerificationProps,
  "userName"
> & {
  user: User;
};
export const sendChangeEmailVerification = async ({
  user,
  newEmail,
  verificationUrl,
  expirationTime,
}: ChangeEmailVerificationRequest) => {
  await renderAndSendEmail({
    Component: ChangeEmailVerification,
    props: {
      userName: user.name,
      verificationUrl,
      expirationTime,
      newEmail,
    },
    to: [{ email: user.email, name: user.name }],
    subject: "Verify Your New Email Address",
  });
};
