"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { LogOut } from "lucide-react";
import { toast } from "sonner";

import { authClient } from "@/lib/auth/auth-client";

const Logout = () => {
  const router = useRouter();
  const [isDisabled, setIsDisabled] = useState(false);
  const handleOnClick = () => {
    setIsDisabled(true);
    const toastId = toast.warning("Are you sure you want to logout?", {
      description: "You’ll be signed out and redirected to the landing page.",
      action: {
        label: "Confirm Logout",
        onClick: async () => {
          await authClient.signOut({
            fetchOptions: {
              onSuccess: () => {
                router.push("/");
              },
            },
          });
        },
      },
      cancel: {
        label: "Cancel",
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
        className="disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Logout"
      >
        <LogOut />
      </button>
    </div>
  );
};

export default Logout;
