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
} from "@react-email/components";

type VerifyEmailProps = {
  userName?: string;
  verificationUrl: URL | string;
  expirationTime?: string;
  brandName?: string;
  brandColor?: string;
};

export const VerifyEmail = ({
  userName,
  verificationUrl,
  expirationTime = "24 hours",
  brandName = "pen • dev",
  brandColor = "#0070f3",
}: VerifyEmailProps) => {
  const greeting = userName ? `Hi ${userName}` : "Hi there";
  const previewText = "Verify your email to activate your account";

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
                Verify Your Email Address
              </Text>
              <Text className="mb-4">{greeting},</Text>
              <Text className="mb-4">
                Thanks for signing up! To complete your registration and start
                using your account, please verify your email address by clicking
                the button below:
              </Text>
              <Section className="my-6 text-center">
                <Link
                  href={verificationUrl.toString()}
                  className="inline-block rounded bg-blue-600 px-6 py-3 font-semibold text-white no-underline"
                >
                  Verify Email Address
                </Link>
              </Section>
              <Section className="my-6 rounded bg-gray-100 p-4">
                <Text className="text-sm text-gray-700">
                  <strong>This link will expire in {expirationTime}.</strong>{" "}
                  After that, {"you'll"} need to request a new verification
                  email.
                </Text>
              </Section>
              <Text className="mb-2">
                Or copy and paste this link into your browser:
              </Text>
              <Link
                href={verificationUrl.toString()}
                className="break-all text-blue-600"
              >
                {verificationUrl.toString()}
              </Link>
              <hr className="my-6 border-gray-200" />
              <Section className="rounded bg-red-50 p-4">
                <Text className="text-sm text-gray-700">
                  <strong>{"Didn't"} create an account?</strong> If you{" "}
                  {"didn't"} sign up for {brandName}, you can safely ignore this
                  email.
                </Text>
              </Section>
              <Text className="mt-6 text-sm text-gray-500">
                {"We're"} excited to have you on board! If you have any
                questions, feel free to reach out to our support team.
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

VerifyEmail.PreviewProps = {
  userName: "John Doe",
  verificationUrl: "https://example.com/verify?token=123",
  expirationTime: "24 hours",
  brandName: "pen • dev",
  brandColor: "#0070f3",
} as VerifyEmailProps;

export default VerifyEmail;
