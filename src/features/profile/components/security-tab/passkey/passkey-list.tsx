"use client";

import { Button } from "@/components/ui/button";
import { usePasskeyStore } from "@/store/passkey-store";

const PasskeyList = () => {
  const {
    passkeys,
    setSelectedPasskey,
    setShowDeleteModal,
    setShowAddModal,
    isLoading,
  } = usePasskeyStore();
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {passkeys.map((passkey) => (
          <div
            key={passkey.id}
            className="flex items-center justify-between rounded-lg border p-4"
          >
            <div className="space-y-1">
              <p className="text-sm font-medium">
                {passkey.name || "Unnamed Passkey"}
              </p>
              <div className="text-muted-foreground flex items-center gap-2 text-xs">
                <span>
                  Added {new Date(passkey.createdAt).toLocaleDateString()}
                </span>
                <span>•</span>
                <span className="capitalize">{passkey.deviceType}</span>
              </div>
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                setSelectedPasskey(passkey);
                setShowDeleteModal(true);
              }}
            >
              Remove
            </Button>
          </div>
        ))}
      </div>
      <Button
        variant="outline"
        onClick={() => setShowAddModal(true)}
        disabled={isLoading}
      >
        Add Another Passkey
      </Button>
    </div>
  );
};
export default PasskeyList;
