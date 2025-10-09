import { createBaseTemplate } from './base';

type VerifyEmailProps = {
  userName?: string;
  verificationUrl: string;
  expirationTime?: string;
  brandName?: string;
  brandColor?: string;
};

export const createVerifyEmail = ({
  userName,
  verificationUrl,
  expirationTime = '24 hours',
  brandName = 'pen • dev',
  brandColor = '#0070f3',
}: VerifyEmailProps): { html: string; text: string } => {
  const greeting = userName ? `Hi ${userName}` : 'Hi there';

  const html = createBaseTemplate({
    title: 'Verify Your Email Address',
    preheader: 'Verify your email to activate your account',
    brandName,
    brandColor,
    children: `
      <h1 class="email-title">Verify Your Email Address</h1>
      <p class="email-text">${greeting},</p>
      <p class="email-text">
        Thanks for signing up! To complete your registration and start using your account, please verify your email address by clicking the button below:
      </p>
      <div style="text-align: center;">
        <a href="${verificationUrl}" class="email-button">Verify Email Address</a>
      </div>
      <div class="info-box">
        <p class="info-box-text">
          <strong>This link will expire in ${expirationTime}.</strong> After that, you'll need to request a new verification email.
        </p>
      </div>
      <p class="email-text">
        Or copy and paste this link into your browser:
      </p>
      <p class="email-text">
        <a href="${verificationUrl}" class="email-link">${verificationUrl}</a>
      </p>
      <hr class="email-divider" />
      <div class="security-notice">
        <p class="security-notice-text">
          <strong>Didn't create an account?</strong> If you didn't sign up for ${brandName}, you can safely ignore this email.
        </p>
      </div>
      <p class="email-text" style="font-size: 14px; color: #6b7280; margin-top: 24px;">
        We're excited to have you on board! If you have any questions, feel free to reach out to our support team.
      </p>
    `,
  });

  const text = `
Verify Your Email Address

${greeting},

Thanks for signing up! To complete your registration and start using your account, please verify your email address.

Click the link below to verify:
${verificationUrl}

This link will expire in ${expirationTime}.

IMPORTANT:
If you didn't create an account with ${brandName}, you can safely ignore this email.

We're excited to have you on board!

---
${brandName}
  `.trim();

  return { html, text };
};
