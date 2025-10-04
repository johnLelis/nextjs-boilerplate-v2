import { authClient } from '@/lib/auth/auth-client';
import { useMemo } from 'react';

export const useUser = () => {
  const { data: session, ...rest } = authClient.useSession();
  const user = useMemo(() => session?.user ?? null, [session?.user]);
  return { user, session, ...rest };
};
