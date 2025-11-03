"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { authClient } from "@/lib/auth/auth-client";

const PasskeyLoginButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handlePasskeyLogin = async () => {
    try {
      setIsLoading(true);
      await authClient.signIn.passkey(
        {},
        {
          onSuccess: () => {
            toast.success("Successfully signed in with passkey!");
            router.push("/dashboard");
          },
          onError: (error) => {
            toast.error(error.error.message || "Passkey login failed.");
          },
        }
      );
    } catch (err) {
      toast.error("An unexpected error occurred during passkey login.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      className="w-full"
      disabled={isLoading}
      onClick={handlePasskeyLogin}
    >
      <LoadingSwap isLoading={isLoading}>Sign in with Passkey</LoadingSwap>
    </Button>
  );
};

export default PasskeyLoginButton;
