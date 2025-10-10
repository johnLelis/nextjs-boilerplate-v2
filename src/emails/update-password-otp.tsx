import * as React from "react";
import {
  Body,
  Container,
  Head,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
  Row,
  Column,
} from "@react-email/components";

type UpdatePasswordOtpTemplateProps = {
  userName?: string;
  otpCode: string;
  supportEmail?: string;
  brandName?: string;
  brandColor?: string;
};

export const UpdatePasswordOtpEmail = ({
  userName = "User",
  otpCode,
  supportEmail = "support@example.com",
  brandName = "pen • dev",
  brandColor = "#0070f3",
}: UpdatePasswordOtpTemplateProps) => {
  const previewText = `Use this code to confirm your password change: ${otpCode}`;
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
              <Text className="text-2xl font-bold mb-4">
                Verify Your Password Change Request
              </Text>
              <Text className="mb-4">Hi {userName},</Text>
              <Text className="mb-4">
                We received a request to change your password. To confirm this
                action, please use the verification code below.
              </Text>

              <Section className="text-center my-[20px]">
                <Row align="center">
                  {digits.map((d, i) => (
                    <Column key={`${d}-${i}`} align="center">
                      <div className="inline-block min-w-[44px] px-[14px] py-[10px] rounded-lg bg-gray-100 border border-gray-200">
                        <Text className="m-0 p-0 text-[24px] font-bold text-gray-900 leading-[28px]">
                          {d}
                        </Text>
                      </div>
                    </Column>
                  ))}
                </Row>
              </Section>

              <Text className="mb-4">
                For your security, this code will expire in{" "}
                <strong>10 minutes</strong>. If you did not request this change,
                please ignore this email or contact our support team
                immediately.
              </Text>

              <Section className="bg-red-50 rounded p-4 my-6">
                <Text className="text-sm text-gray-700">
                  Do not share this code with anyone. Our team will never ask
                  for your verification code.
                </Text>
              </Section>

              <Text className="mb-4">
                If you continue to experience issues, you can reach us at{" "}
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
UpdatePasswordOtpEmail.PreviewProps = {
  userName: "John Doe",
  otpCode: "123456",
  supportEmail: "support@example.com",
  brandName: "pen • dev",
  brandColor: "#0070f3",
} as UpdatePasswordOtpTemplateProps;

export default UpdatePasswordOtpEmail;
