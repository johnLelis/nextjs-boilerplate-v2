'use client';
import { authClient } from '@/lib/auth-client';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

const Logout = () => {
  const router = useRouter();
  const [isDisabled, setIsDisabled] = useState(false);
  const handleOnClick = () => {
    setIsDisabled(true);
    const toastId = toast.warning('Are you sure you want to logout?', {
      description: 'You’ll be signed out and redirected to the landing page.',
      action: {
        label: 'Confirm Logout',
        onClick: async () => {
          await authClient.signOut({
            fetchOptions: {
              onSuccess: () => {
                router.push('/login');
              },
            },
          });
        },
      },
      cancel: {
        label: 'Cancel',
        onClick: () => {
          toast.dismiss(toastId);
          setIsDisabled(false);
        },
      },
      onAutoClose() {
        setIsDisabled(false);
      },
    });
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={handleOnClick}
        disabled={isDisabled}
        className="disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none"
        aria-label="Logout"
      >
        <LogOut />
      </button>
    </div>
  );
};

export default Logout;
