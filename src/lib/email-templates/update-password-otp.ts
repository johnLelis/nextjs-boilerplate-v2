import { createBaseTemplate } from './base';

type UpdatePasswordOtpTemplateProps = {
  userName?: string;
  otpCode: string;
  supportEmail?: string;
  brandName?: string;
  brandColor?: string;
};

export const createUpdatePasswordOtp = ({
  userName = 'User',
  otpCode,
  supportEmail = 'support@example.com',
  brandName,
  brandColor,
}: UpdatePasswordOtpTemplateProps): { html: string; text: string } => {
  const html = createBaseTemplate({
    title: 'Verify Your Password Change Request',
    preheader: `Use this code to confirm your password change: ${otpCode}`,
    brandName,
    brandColor,
    children: `
      <h1 class="email-title">Verify Your Password Change Request</h1>
      <p class="email-text">Hi ${userName},</p>
      <p class="email-text">
        We received a request to change your password. To confirm this action,
        please use the verification code below.
      </p>

      <div style="text-align: center; margin: 32px 0;">
        <div style="
          display: inline-block;
          background-color: #f3f4f6;
          border-radius: 8px;
          padding: 16px 32px;
          font-size: 28px;
          font-weight: 700;
          letter-spacing: 6px;
          color: #111827;
        ">
          ${otpCode}
        </div>
      </div>

      <p class="email-text">
        For your security, this code will expire in <strong>10 minutes</strong>.
        If you did not request this change, please ignore this email or contact
        our support team immediately.
      </p>

      <div class="security-notice">
        <p class="security-notice-text">
          Do not share this code with anyone. Our team will never ask for your
          verification code.
        </p>
      </div>

      <p class="email-text">
        If you continue to experience issues, you can reach us at
        <a href="mailto:${supportEmail}" class="email-link">${supportEmail}</a>.
      </p>
    `,
  });

  const text = `
Verify Your Password Change Request

Hi ${userName},

We received a request to change your password. To confirm this action, please use the verification code below:

${otpCode}

This code will expire in 10 minutes.

Do not share this code with anyone. Our team will never ask for your verification code.

If you didn’t request this change, please ignore this email or contact our support team immediately:
${supportEmail}
  `.trim();

  return { html, text };
};
