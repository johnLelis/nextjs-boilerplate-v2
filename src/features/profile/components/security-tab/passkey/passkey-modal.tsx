"use client";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { authClient } from "@/lib/auth/auth-client";
import { usePasskeyStore } from "@/store/passkey-store";

type PasskeyModalProp = {
  loadPasskeys: () => Promise<void>;
};
const PasskeyModal = ({ loadPasskeys }: PasskeyModalProp) => {
  const {
    showAddModal,
    setShowAddModal,
    passkeyName,
    setPasskeyName,
    setIsLoading,
    isLoading,
  } = usePasskeyStore();

  const handleAddPasskey = async () => {
    setIsLoading(true);
    try {
      const res = await authClient.passkey.addPasskey({
        name: passkeyName?.trim() || undefined,
      });

      if (res?.error) {
        toast.error(res.error.message || "Failed to add passkey");
      } else {
        toast.success("Passkey added successfully");
        setShowAddModal(false);
        setPasskeyName("");
        await loadPasskeys();
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to add passkey";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Passkey</DialogTitle>
          <DialogDescription>
            Give your passkey a name to help you identify it later. If left
            empty, it will use your email address.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <Label htmlFor="passkey-name">Passkey Name (Optional)</Label>
          <Input
            id="passkey-name"
            placeholder="e.g., MacBook Touch ID, YubiKey"
            value={passkeyName ?? ""}
            onChange={(e) => setPasskeyName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddPasskey();
              }
            }}
          />
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              setShowAddModal(false);
              setPasskeyName("");
            }}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button onClick={handleAddPasskey} disabled={isLoading}>
            <LoadingSwap isLoading={isLoading}>Add Passkey</LoadingSwap>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default PasskeyModal;
