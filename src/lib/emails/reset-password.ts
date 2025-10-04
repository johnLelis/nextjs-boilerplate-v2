import { createBaseTemplate } from './base-template';

type ResetPasswordEmailProps = {
  userName?: string;
  resetUrl: string;
  expirationTime?: string;
  brandName?: string;
  brandColor?: string;
};

export const createResetPasswordEmail = ({
  userName,
  resetUrl,
  expirationTime = '1 hour',
  brandName = 'Your Company',
  brandColor = '#0070f3',
}: ResetPasswordEmailProps): { html: string; text: string } => {
  const greeting = userName ? `Hi ${userName}` : 'Hi there';

  const html = createBaseTemplate({
    title: 'Reset Your Password',
    preheader: 'Reset your password to regain access to your account',
    brandName,
    brandColor,
    children: `
      <h1 class="email-title">Reset Your Password</h1>
      <p class="email-text">${greeting},</p>
      <p class="email-text">
        We received a request to reset the password for your account. Click the button below to create a new password:
      </p>
      <div style="text-align: center;">
        <a href="${resetUrl}" class="email-button">Reset Password</a>
      </div>
      <div class="info-box">
        <p class="info-box-text">
          <strong>This link will expire in ${expirationTime}.</strong> If you need more time, you can request a new password reset.
        </p>
      </div>
      <p class="email-text">
        Or copy and paste this link into your browser:
      </p>
      <p class="email-text">
        <a href="${resetUrl}" class="email-link">${resetUrl}</a>
      </p>
      <hr class="email-divider" />
      <div class="security-notice">
        <p class="security-notice-text">
          <strong>Didn't request this?</strong> If you didn't ask to reset your password, you can safely ignore this email. Your password will remain unchanged.
        </p>
      </div>
      <p class="email-text" style="font-size: 14px; color: #6b7280;">
        For security reasons, we recommend that you:
      </p>
      <ul style="font-size: 14px; color: #6b7280; margin-left: 20px; margin-bottom: 16px;">
        <li>Use a strong, unique password</li>
        <li>Enable two-factor authentication if available</li>
        <li>Never share your password with anyone</li>
      </ul>
    `,
  });

  const text = `
Reset Your Password

${greeting},

We received a request to reset the password for your account.

Click the link below to create a new password:
${resetUrl}

This link will expire in ${expirationTime}.

SECURITY NOTICE:
If you didn't request this password reset, you can safely ignore this email. Your password will remain unchanged.

For security reasons, we recommend that you:
- Use a strong, unique password
- Enable two-factor authentication if available
- Never share your password with anyone

---
${brandName}
  `.trim();

  return { html, text };
};
