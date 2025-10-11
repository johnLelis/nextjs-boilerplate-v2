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
} from "@react-email/components";

import { ChangeEmailVerificationProps } from "@/types/email";

export const ChangeEmailVerification = ({
  userName,
  newEmail,
  verificationUrl,
  expirationTime = "24 hours",
  brandName = "pen • dev",
  brandColor = "#0070f3",
}: ChangeEmailVerificationProps) => {
  const greeting = userName ? `Hi ${userName}` : "Hi there";
  const previewText = "Confirm your new email address to complete the change";

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
                Verify Your New Email Address
              </Text>
              <Text className="mb-4">{greeting},</Text>
              <Text className="mb-4">
                You recently requested to change your email address to{" "}
                <strong>{newEmail}</strong>. To complete this change, please
                verify your new email address by clicking the button below:
              </Text>
              <Section className="my-6 text-center">
                <Link
                  href={verificationUrl}
                  className="inline-block rounded bg-blue-600 px-6 py-3 font-semibold text-white no-underline"
                >
                  Verify New Email
                </Link>
              </Section>
              <Section className="my-6 rounded bg-gray-100 p-4">
                <Text className="text-sm text-gray-700">
                  <strong>This link will expire in {expirationTime}.</strong>{" "}
                  After verification, this will become your new login email
                  address.
                </Text>
              </Section>
              <Text className="mb-2">
                Or copy and paste this link into your browser:
              </Text>
              <Link href={verificationUrl} className="break-all text-blue-600">
                {verificationUrl}
              </Link>
              <hr className="my-6 border-gray-200" />
              <Section className="rounded bg-red-50 p-4">
                <Text className="text-sm text-gray-700">
                  <strong>{"Didn't"} request this change?</strong> If you{" "}
                  {"didn't"} request to change your email address, please ignore
                  this email and your account will remain unchanged. We
                  recommend changing your password immediately if you believe
                  your account may be compromised.
                </Text>
              </Section>
              <Text className="mt-6 text-sm text-gray-500">
                <strong>Important:</strong> Your current email address will
                remain active until you verify this new address.
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
ChangeEmailVerification.PreviewProps = {
  userName: "John Doe",
  newEmail: "new.email@example.com",
  verificationUrl: "https://example.com/verify-change?token=123",
  expirationTime: "24 hours",
  brandName: "pen • dev",
  brandColor: "#0070f3",
} as ChangeEmailVerificationProps;

export default ChangeEmailVerification;
