import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";

type TablerIconType = typeof IconBrandGoogle;

export const SUPPORTED_OAUTH_PROVIDERS = ["google", "github"] as const;
export type SupportOAuthProvider = (typeof SUPPORTED_OAUTH_PROVIDERS)[number];
export const SUPPORTED_OAUTH_PROVIDERS_DETAILS: Record<
  SupportOAuthProvider,
  { name: string; Icon: TablerIconType }
> = {
  google: { name: "Google", Icon: IconBrandGoogle },
  github: { name: "Github", Icon: IconBrandGithub },
};
