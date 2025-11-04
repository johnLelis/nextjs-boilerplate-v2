"use client";

import { Button } from "@/components/ui/button";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { usePasskeyStore } from "@/store/passkey-store";

const PasskeysEmptyState = () => {
  const { setShowAddModal, isLoading } = usePasskeyStore();
  return (
    <div className="space-y-4">
      <p className="text-muted-foreground text-sm">
        No passkeys configured. Add a passkey to enable secure, passwordless
        sign-in.
      </p>
      <Button onClick={() => setShowAddModal(true)} disabled={isLoading}>
        <LoadingSwap isLoading={isLoading}>Add Passkey</LoadingSwap>
      </Button>
    </div>
  );
};

export default PasskeysEmptyState;
