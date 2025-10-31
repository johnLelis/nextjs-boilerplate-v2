import { env } from "@/config/env";
import { EmailMessage, EmailResponse } from "@/types/email";

import { sendEmailViaAzure } from "./providers/azure/azure-provider";

type EmailProvider = "azure" | "postmark" | "sendgrid";

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
  const emailConfig = config || getEmailConfigFromEnv();

  if (emailConfig.provider === "azure") {
    if (!emailConfig.azure) {
      throw new Error("Azure configuration is required");
    }
    return sendEmailViaAzure(message, emailConfig.azure);
  }

  throw new Error(`Unknown email provider: ${emailConfig.provider}`);
};

export const getEmailConfigFromEnv = (): EmailConfig => {
  const provider = env.EMAIL_PROVIDER as EmailProvider;

  if (!provider) {
    throw new Error("EMAIL_PROVIDER environment variable is required");
  }

  if (provider === "azure") {
    const {
      AZURE_TENANT_ID,
      AZURE_CLIENT_ID,
      AZURE_CLIENT_SECRET,
      EMAIL_SENDER,
    } = env;

    if (
      !AZURE_TENANT_ID ||
      !AZURE_CLIENT_ID ||
      !AZURE_CLIENT_SECRET ||
      !EMAIL_SENDER
    ) {
      throw new Error(
        "Missing required Azure email configuration. Please set AZURE_TENANT_ID, AZURE_CLIENT_ID, AZURE_CLIENT_SECRET, and EMAIL_SENDER environment variables."
      );
    }

    return {
      provider,
      azure: {
        tenantId: AZURE_TENANT_ID,
        clientId: AZURE_CLIENT_ID,
        clientSecret: AZURE_CLIENT_SECRET,
        userEmail: EMAIL_SENDER,
      },
    };
  }

  throw new Error(`Unknown email provider: ${provider}`);
};
