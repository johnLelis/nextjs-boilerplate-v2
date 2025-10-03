import { EmailMessage, EmailResponse, AzureEmailConfig } from '@/types/email';
import { sendEmailViaAzure } from './azure-provider';
import { env } from '@/config/env';
export const sendEmail = async (
  message: EmailMessage,
  config?: AzureEmailConfig
): Promise<EmailResponse> => {
  console.log('EmailService: Sending email...');

  const emailConfig = config || getEmailConfigFromEnv();

  return sendEmailViaAzure(message, emailConfig);
};

export const getEmailConfigFromEnv = (): AzureEmailConfig => {
  const tenantId = env.AZURE_TENANT_ID;
  const clientId = env.AZURE_CLIENT_ID;
  const clientSecret = env.AZURE_CLIENT_SECRET;
  const userEmail = env.AZURE_USER_EMAIL;

  if (!tenantId || !clientId || !clientSecret || !userEmail) {
    throw new Error(
      'Missing required Azure email configuration. Please set AZURE_TENANT_ID, AZURE_CLIENT_ID, AZURE_CLIENT_SECRET, and AZURE_USER_EMAIL environment variables.'
    );
  }

  return {
    tenantId,
    clientId,
    clientSecret,
    userEmail,
  };
};
