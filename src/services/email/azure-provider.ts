import { EmailMessage, EmailResponse, AzureEmailConfig } from '@/types/email';
import { getAccessToken } from '@/services/token-service';

export const sendEmailViaAzure = async (
  message: EmailMessage,
  config: AzureEmailConfig
): Promise<EmailResponse> => {
  try {
    console.log('Sending email via MS Graph...');

    const accessToken = await getAccessToken(
      {
        tenantId: config.tenantId,
        clientId: config.clientId,
        clientSecret: config.clientSecret,
      },
      ['https://graph.microsoft.com/.default']
    );

    const response = await fetch(
      `https://graph.microsoft.com/v1.0/users/${config.userEmail}/sendMail`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: {
            subject: message.subject,
            body: {
              contentType: message.html ? 'HTML' : 'Text',
              content: message.html || message.text,
            },
            toRecipients: message.to.map(t => ({
              emailAddress: {
                address: t.email,
                name: t.name,
              },
            })),
            ccRecipients: message.cc?.map(c => ({
              emailAddress: {
                address: c.email,
                name: c.name,
              },
            })),
            bccRecipients: message.bcc?.map(b => ({
              emailAddress: {
                address: b.email,
                name: b.name,
              },
            })),
            from: {
              emailAddress: {
                address: message.from.email,
                name: message.from.name,
              },
            },
          },
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Failed to send email');
    }

    console.log('Email sent successfully via MS Graph');

    return {
      success: true,
      messageId: response.headers.get('request-id') || undefined,
    };
  } catch (error) {
    console.error('MS Graph error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};
