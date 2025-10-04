import { EmailMessage, EmailResponse } from '@/types/email';
import { sendEmailViaAzure } from './providers/azure/azure-provider';
import { env } from '@/config/env';

type EmailProvider = 'azure' | 'postmark' | 'sendgrid';

type AzureEmailConfig = {
  tenantId: string;
  clientId: string;
  clientSecret: string;
  userEmail: string;
};

type PostmarkConfig = {
  apiKey: string;
};

type SendGridConfig = {
  apiKey: string;
};

type EmailConfig = {
  provider: Readonly<EmailProvider>;
  azure?: AzureEmailConfig;
  postmark?: PostmarkConfig;
  sendgrid?: SendGridConfig;
};

export const sendEmail = async (
  message: EmailMessage,
  config?: EmailConfig
): Promise<EmailResponse> => {
  console.log('EmailService: Sending email...');

  const emailConfig = config || getEmailConfigFromEnv();

  switch (emailConfig.provider) {
    case 'azure':
      if (!emailConfig.azure) {
        throw new Error('Azure configuration is required');
      }
      return sendEmailViaAzure(message, emailConfig.azure);

    default:
      throw new Error(`Unknown email provider: ${emailConfig.provider}`);
  }
};

export const getEmailConfigFromEnv = (): EmailConfig => {
  const provider = env.EMAIL_PROVIDER as EmailProvider;

  if (!provider) {
    throw new Error('EMAIL_PROVIDER environment variable is required');
  }

  const config: EmailConfig = {
    provider,
  };

  // Load config based on provider
  switch (provider) {
    case 'azure':
      const {
        AZURE_TENANT_ID,
        AZURE_CLIENT_ID,
        AZURE_CLIENT_SECRET,
        AZURE_USER_EMAIL,
      } = env;

      if (
        !AZURE_TENANT_ID ||
        !AZURE_CLIENT_ID ||
        !AZURE_CLIENT_SECRET ||
        !AZURE_USER_EMAIL
      ) {
        throw new Error(
          'Missing required Azure email configuration. Please set AZURE_TENANT_ID, AZURE_CLIENT_ID, AZURE_CLIENT_SECRET, and AZURE_USER_EMAIL environment variables.'
        );
      }

      config.azure = {
        tenantId: AZURE_TENANT_ID,
        clientId: AZURE_CLIENT_ID,
        clientSecret: AZURE_CLIENT_SECRET,
        userEmail: AZURE_USER_EMAIL,
      };
      break;

    default:
      throw new Error(`Unknown email provider: ${provider}`);
  }

  return config;
};
