import { authClient } from '@/lib/auth/auth-client';
import { useMemo } from 'react';

export const useUser = () => {
  const { data: session, isPending, error, ...rest } = authClient.useSession();

  const user = useMemo(() => session?.user ?? null, [session?.user]);
  const isLoading = isPending;

  return {
    user,
    session,
    isLoading,
    isPending,
    error,
    ...rest,
  };
};
