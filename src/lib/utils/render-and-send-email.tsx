import { render, toPlainText } from "@react-email/render";

import { env } from "@/config/env";
import { sendEmail } from "@/services/email";

type RecipientsProps = { email: string; name: string };

export async function renderAndSendEmail<T extends object>({
  Component,
  props,
  to,
  subject,
}: {
  Component: React.ComponentType<T>;
  props: T;
  to: RecipientsProps[];
  subject: string;
}) {
  const html = await render(<Component {...props} />);
  const text = toPlainText(html);

  return sendEmail({
    from: { email: env.EMAIL_SENDER, name: "pen • dev" },
    to,
    subject,
    html,
    text,
  });
}
