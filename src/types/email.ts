export type EmailAddress = {
  email: string;
  name?: string;
};

export type EmailAttachment = {
  filename: string;
  content: string | Buffer;
  contentType?: string;
};

export type EmailMessage = {
  from: EmailAddress;
  to: EmailAddress[];
  cc?: EmailAddress[];
  bcc?: EmailAddress[];
  subject: string;
  html?: string;
  text?: string;
  attachments?: EmailAttachment[];
};

export type EmailResponse = {
  success: boolean;
  messageId?: string;
  error?: string;
};

export type AzureEmailConfig = {
  tenantId: string;
  clientId: string;
  clientSecret: string;
  userEmail: string;
};
