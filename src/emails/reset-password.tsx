import * as React from 'react';
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
} from '@react-email/components';

type ResetPasswordEmailProps = {
  userName?: string;
  resetUrl: URL | string;
  expirationTime?: string;
  brandName?: string;
  brandColor?: string;
};

export const ResetPasswordEmail = ({
  userName,
  resetUrl,
  expirationTime = '1 hour',
  brandName = 'pen • dev',
  brandColor = '#0070f3',
}: ResetPasswordEmailProps) => {
  const greeting = userName ? `Hi ${userName}` : 'Hi there';
  const previewText = 'Reset your password to regain access to your account';

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
                Reset Your Password
              </Text>
              <Text className="mb-4">{greeting},</Text>
              <Text className="mb-4">
                We received a request to reset the password for your account.
                Click the button below to create a new password:
              </Text>
              <Section className="text-center my-6">
                <Link
                  href={resetUrl.toString()}
                  className="inline-block rounded bg-blue-600 px-6 py-3 text-white font-semibold no-underline"
                >
                  Reset Password
                </Link>
              </Section>
              <Section className="bg-gray-100 rounded p-4 my-6">
                <Text className="text-sm text-gray-700">
                  <strong>This link will expire in {expirationTime}.</strong> If
                  you need more time, you can request a new password reset.
                </Text>
              </Section>
              <Text className="mb-2">
                Or copy and paste this link into your browser:
              </Text>
              <Link
                href={resetUrl.toString()}
                className="text-blue-600 break-all"
              >
                {resetUrl.toString()}
              </Link>
              <hr className="my-6 border-gray-200" />
              <Section className="bg-red-50 rounded p-4">
                <Text className="text-sm text-gray-700">
                  <strong>{`Didn't`} request this?</strong> If you {`didn't`}{' '}
                  ask to reset your password, you can safely ignore this email.
                  Your password will remain unchanged.
                </Text>
              </Section>
              <Text className="text-sm text-gray-500 mt-6">
                For security reasons, we recommend that you:
              </Text>
              <ul className="text-sm text-gray-500 ml-5 mb-4 list-disc">
                <li>Use a strong, unique password</li>
                <li>Enable two-factor authentication if available</li>
                <li>Never share your password with anyone</li>
              </ul>
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
ResetPasswordEmail.PreviewProps = {
  userName: 'John Doe',
  resetUrl: 'https://example.com/reset?token=123',
  expirationTime: '1 hour',
  brandName: 'pen • dev',
  brandColor: '#0070f3',
} as ResetPasswordEmailProps;

export default ResetPasswordEmail;
