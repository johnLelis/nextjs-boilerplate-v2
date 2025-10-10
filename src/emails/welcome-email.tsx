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

type WelcomeEmailProps = {
  userName: string;
  dashboardUrl?: string;
  supportUrl?: string;
  brandName?: string;
  brandColor?: string;
};

export const WelcomeEmail = ({
  userName,
  dashboardUrl,
  supportUrl = "#",
  brandName = "pen • dev",
  brandColor = "#0070f3",
}: WelcomeEmailProps) => {
  const previewText = `Welcome aboard! ${`We're`} excited to have you with us.`;

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
                Welcome to {brandName}! 🎉
              </Text>
              <Text className="mb-4">Hi {userName},</Text>
              <Text className="mb-4">
                {`We're`} thrilled to have you on board! Your account has been
                successfully created and {`you're`} all set to get started.
              </Text>
              {dashboardUrl && (
                <Section className="text-center my-6">
                  <Link
                    href={dashboardUrl}
                    className="inline-block rounded bg-blue-600 px-6 py-3 text-white font-semibold no-underline"
                  >
                    Get Started
                  </Link>
                </Section>
              )}
              <hr className="my-6 border-gray-200" />
              <Text className="text-xl font-semibold text-gray-900 mb-4">
                {`What's`} Next?
              </Text>
              <Text className="mb-4">
                Here are some things you can do to make the most of your
                account:
              </Text>
              <ul className="text-base text-gray-600 ml-5 mb-6 list-disc leading-7">
                <li>Complete your profile to personalize your experience</li>
                <li>Explore our features and discover {`what's`} possible</li>
                <li>Check out our help center for guides and tutorials</li>
                <li>Connect with our community and share your feedback</li>
              </ul>
              <Section className="bg-gray-100 rounded p-4 my-6">
                <Text className="text-sm text-gray-700">
                  <strong>Need help getting started?</strong> Our support team
                  is here to help!{" "}
                  <Link href={supportUrl} className="text-blue-700 underline">
                    Contact us
                  </Link>{" "}
                  anytime.
                </Text>
              </Section>
              <hr className="my-6 border-gray-200" />
              <Text className="mb-4">
                {`We're`} committed to providing you with the best experience
                possible. If you have any questions or feedback, {`don't`}
                hesitate to reach out.
              </Text>
              <Text className="mt-6">Thanks for choosing {brandName}!</Text>
              <Text className="font-semibold">The {brandName} Team</Text>
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
WelcomeEmail.PreviewProps = {
  userName: "John Doe",
  dashboardUrl: "https://example.com/dashboard",
  supportUrl: "https://example.com/support",
  brandName: "pen • dev",
  brandColor: "#0070f3",
} as WelcomeEmailProps;

export default WelcomeEmail;
