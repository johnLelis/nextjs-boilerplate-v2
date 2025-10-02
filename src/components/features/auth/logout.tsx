'use client';
import { authClient } from '@/lib/auth-client';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const Logout = () => {
  const router = useRouter();
  const handleOnClick = () => {
    toast.warning('Are you sure you want to logout?', {
      description: 'You’ll be signed out and redirected to the landing page.',
      action: {
        label: 'Confirm Logout',
        onClick: async () => {
          await authClient.signOut();
          router.push('/');
        },
      },
      cancel: {
        label: 'Cancel',
        onClick: () => toast.dismiss(),
      },
    });
  };

  return (
    <div className="flex items-center gap-2">
      <LogOut onClick={handleOnClick} />
    </div>
  );
};

export default Logout;
