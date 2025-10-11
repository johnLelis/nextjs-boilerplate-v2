import { User } from "./user";

// ============ Core Email Types ============
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

// ============ Provider Types ============
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

// ============ Template Props ============
export type ChangeEmailVerificationProps = {
  userName?: string;
  newEmail: string;
  verificationUrl: string;
  expirationTime?: string;
  brandName?: string;
  brandColor?: string;
};

export type ChangeEmailVerificationRequest = Omit<
  ChangeEmailVerificationProps,
  "userName"
> & {
  user: User;
};

export type ResetEmailProps = {
  user: User;
  resetUrl: URL;
  expirationTime: string;
};

export type VerifyEmailProps = {
  userName: string;
  verificationUrl: URL | string;
  expirationTime: string;
  userEmail: string;
};
