import {
  Body,
  Column,
  Container,
  Head,
  Html,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

type OtpEmailTemplateProps = {
  userName?: string;
  otpCode: string;
  purpose?: string; // e.g. "password reset", "login verification", "email confirmation"
  supportEmail?: string;
  brandName?: string;
  brandColor?: string;
  expireMinutes?: number;
};

export const OtpEmailTemplate = ({
  userName = "User",
  otpCode,
  purpose = "account verification",
  supportEmail = "support@example.com",
  brandName = "pen • dev",
  brandColor = "#0070f3",
  expireMinutes = 10,
}: OtpEmailTemplateProps) => {
  const formattedPurpose =
    purpose.charAt(0).toUpperCase() + purpose.slice(1).toLowerCase();
  const previewText = `Use this code to complete your ${purpose}: ${otpCode}`;
  const digits = otpCode.split("");

  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-gray-50 font-sans">
          <Preview>{previewText}</Preview>

          <Container className="mx-auto my-10 max-w-[600px] rounded-lg bg-white shadow-sm">
            {/* Header */}
            <Section
              className="rounded-t-lg px-10 py-10 text-center"
              style={{
                background: `linear-gradient(135deg, ${brandColor} 0%, ${brandColor}CC 100%)`,
              }}
            >
              <Text className="m-0 text-2xl font-bold tracking-tight text-white">
                {brandName}
              </Text>
            </Section>

            {/* Body */}
            <Section className="px-10 py-10">
              <Text className="mb-4 text-2xl font-bold">
                {formattedPurpose} Code
              </Text>
              <Text className="mb-4">Hi {userName},</Text>
              <Text className="mb-4">
                Here’s your one-time code to complete your{" "}
                <strong>{purpose}</strong> process. Enter it in the app or
                website to continue.
              </Text>

              <Section className="my-8 text-center">
                <Row align="center" className="justify-center">
                  {digits.map((d, i) => (
                    <Column key={`${d}-${i}`} align="center">
                      <div
                        className={`mx-[6px] inline-flex h-[56px] w-[48px] items-center justify-center rounded-lg border-2 border-transparent bg-gray-50 bg-gradient-to-br text-[28px] font-semibold text-gray-900 shadow-[0_2px_4px_rgba(0,0,0,0.06)] from-[${brandColor}] to-[${brandColor}99] bg-clip-border`}
                      >
                        {d}
                      </div>
                    </Column>
                  ))}
                </Row>
              </Section>

              <Text className="mb-4 text-gray-700">
                This code will expire in{" "}
                <strong>{expireMinutes} minutes</strong>. If you didn’t request
                this, you can safely ignore this email.
              </Text>

              <Section className="my-6 rounded-md border border-yellow-200 bg-yellow-50 p-4">
                <Text className="text-sm text-gray-700">
                  ⚠️ For your security, never share this code with anyone —
                  including our support team.
                </Text>
              </Section>

              <Text className="mt-6 text-gray-700">
                Need help? Contact us at{" "}
                <Link
                  href={`mailto:${supportEmail}`}
                  className="text-blue-600 underline"
                >
                  {supportEmail}
                </Link>
                .
              </Text>
            </Section>

            {/* Footer */}
            <Section className="rounded-b-lg bg-gray-50 px-10 py-8 text-center">
              <Text className="m-0 text-sm text-gray-500">
                © {new Date().getFullYear()} {brandName}. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

// Preview props for local dev
OtpEmailTemplate.PreviewProps = {
  userName: "John Doe",
  otpCode: "482193",
  purpose: "email verification",
  supportEmail: "support@pendev.com",
  brandName: "pen • dev",
  brandColor: "#0070f3",
} as OtpEmailTemplateProps;

export default OtpEmailTemplate;
