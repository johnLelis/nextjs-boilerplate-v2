import { createBaseTemplate } from './base';

type WelcomeEmailProps = {
  userName: string;
  dashboardUrl?: URL | string;
  supportUrl?: string;
  brandName?: string;
  brandColor?: string;
};

export const createWelcomeEmail = ({
  userName,
  dashboardUrl,
  supportUrl = '#',
  brandName = 'PenStack',
  brandColor = '#0070f3',
}: WelcomeEmailProps): { html: string; text: string } => {
  const html = createBaseTemplate({
    title: 'Welcome to ' + brandName,
    preheader: `Welcome aboard! We're excited to have you with us.`,
    brandName,
    brandColor,
    children: `
      <h1 class="email-title">Welcome to ${brandName}! 🎉</h1>
      <p class="email-text">Hi ${userName},</p>
      <p class="email-text">
        We're thrilled to have you on board! Your account has been successfully created and you're all set to get started.
      </p>
      ${
        dashboardUrl
          ? `
      <div style="text-align: center;">
        <a href="${dashboardUrl}" class="email-button">Get Started</a>
      </div>
      `
          : ''
      }
      <hr class="email-divider" />
      <h2 style="font-size: 20px; font-weight: 600; color: #111827; margin-bottom: 16px;">
        What's Next?
      </h2>
      <p class="email-text">Here are some things you can do to make the most of your account:</p>
      <ul style="font-size: 16px; color: #4b5563; margin-left: 20px; margin-bottom: 24px; line-height: 1.8;">
        <li style="margin-bottom: 8px;">Complete your profile to personalize your experience</li>
        <li style="margin-bottom: 8px;">Explore our features and discover what's possible</li>
        <li style="margin-bottom: 8px;">Check out our help center for guides and tutorials</li>
        <li style="margin-bottom: 8px;">Connect with our community and share your feedback</li>
      </ul>
      <div class="info-box">
        <p class="info-box-text">
          <strong>Need help getting started?</strong> Our support team is here to help! 
          <a href="${supportUrl}" style="color: #1e40af; text-decoration: underline;">Contact us</a> anytime.
        </p>
      </div>
      <hr class="email-divider" />
      <p class="email-text">
        We're committed to providing you with the best experience possible. If you have any questions or feedback, 
        don't hesitate to reach out.
      </p>
      <p class="email-text" style="margin-top: 24px;">
        Thanks for choosing ${brandName}!
      </p>
      <p class="email-text" style="font-weight: 600;">
        The ${brandName} Team
      </p>
    `,
  });

  const text = `
Welcome to ${brandName}! 🎉

Hi ${userName},

We're thrilled to have you on board! Your account has been successfully created and you're all set to get started.

${dashboardUrl ? `Get started here: ${dashboardUrl}\n` : ''}
---

WHAT'S NEXT?

Here are some things you can do to make the most of your account:

- Complete your profile to personalize your experience
- Explore our features and discover what's possible

NEED HELP?
Our support team is here to help! Contact us anytime: ${supportUrl}

---

We're committed to providing you with the best experience possible. If you have any questions or feedback, don't hesitate to reach out.

Thanks for choosing ${brandName}!

The ${brandName} Team
  `.trim();

  return { html, text };
};
