type BaseTemplateProps = {
  title: string;
  preheader: string;
  children: string;
  brandName?: string;
  brandColor?: string;
};

export const createBaseTemplate = ({
  title,
  preheader,
  children,
  brandName = 'NextJs Boilerplate',
  brandColor = '#0070f3',
}: BaseTemplateProps): string => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>${title}</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #1f2937;
      background-color: #f9fafb;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    .email-wrapper {
      width: 100%;
      background-color: #f9fafb;
      padding: 40px 0;
    }
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    }
    .email-header {
      background: linear-gradient(135deg, ${brandColor} 0%, ${adjustBrightness(
    brandColor,
    -20
  )} 100%);
      padding: 40px 40px 32px;
      text-align: center;
    }
    .email-logo {
      font-size: 24px;
      font-weight: 700;
      color: #ffffff;
      text-decoration: none;
      letter-spacing: -0.5px;
    }
    .email-body {
      padding: 40px;
    }
    .email-title {
      font-size: 24px;
      font-weight: 600;
      color: #111827;
      margin-bottom: 16px;
      line-height: 1.3;
    }
    .email-text {
      font-size: 16px;
      color: #4b5563;
      margin-bottom: 16px;
      line-height: 1.6;
    }
    .email-button {
      display: inline-block;
      padding: 14px 32px;
      background-color: ${brandColor};
      color: #ffffff;
      text-decoration: none;
      border-radius: 6px;
      font-weight: 600;
      font-size: 16px;
      margin: 24px 0;
      transition: background-color 0.2s;
    }
    .email-button:hover {
      background-color: ${adjustBrightness(brandColor, -10)};
    }
    .email-link {
      color: ${brandColor};
      text-decoration: none;
      word-break: break-all;
    }
    .email-divider {
      border: 0;
      border-top: 1px solid #e5e7eb;
      margin: 32px 0;
    }
    .email-footer {
      padding: 32px 40px;
      background-color: #f9fafb;
      text-align: center;
    }
    .email-footer-text {
      font-size: 14px;
      color: #6b7280;
      margin-bottom: 8px;
    }
    .email-footer-links {
      margin-top: 16px;
    }
    .email-footer-link {
      color: #6b7280;
      text-decoration: none;
      font-size: 14px;
      margin: 0 8px;
    }
    .email-footer-link:hover {
      color: #4b5563;
      text-decoration: underline;
    }
    .security-notice {
      background-color: #fef3c7;
      border-left: 4px solid #f59e0b;
      padding: 16px;
      margin: 24px 0;
      border-radius: 4px;
    }
    .security-notice-text {
      font-size: 14px;
      color: #92400e;
      margin: 0;
    }
    .info-box {
      background-color: #eff6ff;
      border-left: 4px solid #3b82f6;
      padding: 16px;
      margin: 24px 0;
      border-radius: 4px;
    }
    .info-box-text {
      font-size: 14px;
      color: #1e40af;
      margin: 0;
    }
    @media only screen and (max-width: 600px) {
      .email-header,
      .email-body,
      .email-footer {
        padding: 24px !important;
      }
      .email-title {
        font-size: 20px;
      }
      .email-button {
        display: block;
        width: 100%;
        text-align: center;
      }
    }
  </style>
</head>
<body>
  <div style="display: none; max-height: 0; overflow: hidden;">${preheader}</div>
  <div class="email-wrapper">
    <div class="email-container">
      <div class="email-header">
        <div class="email-logo">${brandName}</div>
      </div>
      <div class="email-body">
        ${children}
      </div>
      <div class="email-footer">
        <p class="email-footer-text">${brandName} • Keeping your account secure</p>
        <p class="email-footer-text">
          This email was sent to you because a request was made for your account.
        </p>
        <div class="email-footer-links">
          <a href="#" class="email-footer-link">Help Center</a>
          <a href="#" class="email-footer-link">Privacy Policy</a>
          <a href="#" class="email-footer-link">Contact Us</a>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
  `.trim();
};

const adjustBrightness = (color: string, percent: number): string => {
  const num = parseInt(color.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = ((num >> 8) & 0x00ff) + amt;
  const B = (num & 0x0000ff) + amt;
  return (
    '#' +
    (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)
  );
};
