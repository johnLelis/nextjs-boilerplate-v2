import { createBaseTemplate } from './base';

type ChangeEmailVerificationProps = {
  userName?: string;
  newEmail: string;
  verificationUrl: string;
  expirationTime?: string;
  brandName?: string;
  brandColor?: string;
};

export const createChangeEmailVerification = ({
  userName,
  newEmail,
  verificationUrl,
  expirationTime = '24 hours',
  brandName = 'pen • dev',
  brandColor = '#0070f3',
}: ChangeEmailVerificationProps): { html: string; text: string } => {
  const greeting = userName ? `Hi ${userName}` : 'Hi there';

  const html = createBaseTemplate({
    title: 'Verify Your New Email Address',
    preheader: 'Confirm your new email address to complete the change',
    brandName,
    brandColor,
    children: `
      <h1 class="email-title">Verify Your New Email Address</h1>
      <p class="email-text">${greeting},</p>
      <p class="email-text">
        You recently requested to change your email address to <strong>${newEmail}</strong>. 
        To complete this change, please verify your new email address by clicking the button below:
      </p>
      <div style="text-align: center;">
        <a href="${verificationUrl}" class="email-button">Verify New Email</a>
      </div>
      <div class="info-box">
        <p class="info-box-text">
          <strong>This link will expire in ${expirationTime}.</strong> After verification, this will become your new login email address.
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
          <strong>Didn't request this change?</strong> If you didn't request to change your email address, 
          please ignore this email and your account will remain unchanged. We recommend changing your password 
          immediately if you believe your account may be compromised.
        </p>
      </div>
      <p class="email-text" style="font-size: 14px; color: #6b7280; margin-top: 24px;">
        <strong>Important:</strong> Your current email address will remain active until you verify this new address.
      </p>
    `,
  });

  const text = `
Verify Your New Email Address

${greeting},

You recently requested to change your email address to ${newEmail}.

To complete this change, please verify your new email address by clicking the link below:
${verificationUrl}

This link will expire in ${expirationTime}. After verification, this will become your new login email address.

SECURITY NOTICE:
If you didn't request this change, please ignore this email and your account will remain unchanged. We recommend changing your password immediately if you believe your account may be compromised.

IMPORTANT: Your current email address will remain active until you verify this new address.

---
${brandName}
  `.trim();

  return { html, text };
};
