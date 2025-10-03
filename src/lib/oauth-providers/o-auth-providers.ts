import {
  GoogleIcon,
  GitHubIcon,
} from '@/components/features/auth/o-auth-icons';
import { ComponentProps, ElementType } from 'react';

export const SUPPORTED_OAUTH_PROVIDERS = ['google', 'github'] as const;
export type SupportOAuthProvider = (typeof SUPPORTED_OAUTH_PROVIDERS)[number];
export const SUPPORTED_OAUTH_PROVIDERS_DETAILS: Record<
  SupportOAuthProvider,
  { name: string; Icon: ElementType<ComponentProps<'svg'>> }
> = {
  google: { name: 'Google', Icon: GoogleIcon },
  github: { name: 'Github', Icon: GitHubIcon },
};
