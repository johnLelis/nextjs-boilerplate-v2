import WelcomeEmail from "@/emails/welcome-email";
import { renderAndSendEmail } from "@/lib/utils/render-and-send-email";

export const sendWelcomeEmail = async (userEmail: string, userName: string) => {
  await renderAndSendEmail({
    Component: WelcomeEmail,
    props: { userName, dashboardUrl: "http://localhost:3000/dashboard" },
    to: [{ email: userEmail, name: userName }],
    subject: "Welcome!",
  });
};
