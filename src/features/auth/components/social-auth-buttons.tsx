"use client";
import { Button } from "@/components/ui/button";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { authClient } from "@/lib/auth/auth-client";
import {
  SUPPORTED_OAUTH_PROVIDERS,
  SUPPORTED_OAUTH_PROVIDERS_DETAILS,
} from "@/features/auth/config/o-auth-providers";
import { useState } from "react";
const SocialAuthButtons = () => {
  const [submittingProvider, setSubmittingProvider] = useState<string | null>(
    null
  );

  return (
    <div className="grid grid-cols-2 gap-3">
      {SUPPORTED_OAUTH_PROVIDERS.map((provider) => {
        const isLoading = submittingProvider === provider;
        const Icon = SUPPORTED_OAUTH_PROVIDERS_DETAILS[provider].Icon;
        const name = SUPPORTED_OAUTH_PROVIDERS_DETAILS[provider].name;
        return (
          <Button
            variant={"outline"}
            key={provider}
            onClick={() => {
              setSubmittingProvider(provider);
              authClient.signIn.social({
                provider,
                callbackURL: "/dashboard",
                errorCallbackURL: "/login",
                fetchOptions: {
                  onSuccess: () => {
                    setSubmittingProvider(null);
                  },
                },
              });
            }}
            disabled={!!submittingProvider}
          >
            <LoadingSwap
              isLoading={isLoading}
              className="flex gap-1 place-items-center"
            >
              <Icon />
              {name}
            </LoadingSwap>
          </Button>
        );
      })}
    </div>
  );
};

export default SocialAuthButtons;
