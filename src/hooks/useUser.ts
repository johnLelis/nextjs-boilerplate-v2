import { authClient } from '@/lib/auth-client';

export const useUser = () => {
  const { data: session, ...rest } = authClient.useSession();
  return { user: session?.user ?? null, session, ...rest };
};
