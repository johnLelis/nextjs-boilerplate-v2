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
import { LoadingSwap } from "@/components/ui/loading-swap";
import { authClient } from "@/lib/auth/auth-client";
import { usePasskeyStore } from "@/store/passkey-store";

type PasskeyDeleteModalProp = {
  loadPasskeys: () => Promise<void>;
};
const PasskeyDeleteModal = ({ loadPasskeys }: PasskeyDeleteModalProp) => {
  const {
    showDeleteModal,
    setShowDeleteModal,
    setSelectedPasskey,
    selectedPasskey,
    isLoading,
    setIsLoading,
  } = usePasskeyStore();

  const handleDeletePasskey = async () => {
    if (!selectedPasskey) return;

    setIsLoading(true);
    try {
      const { error } = await authClient.passkey.deletePasskey({
        id: selectedPasskey.id,
      });

      if (error) {
        toast.error(error.message || "Failed to remove passkey");
      } else {
        toast.success("Passkey removed successfully");
        setShowDeleteModal(false);
        setSelectedPasskey(null);
        await loadPasskeys();
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to remove passkey";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Remove Passkey</DialogTitle>
          <DialogDescription>
            {`Are you sure you want to remove "${selectedPasskey?.name || "this passkey"}"? You won't be able to use it to sign in anymore.`}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              setShowDeleteModal(false);
              setSelectedPasskey(null);
            }}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDeletePasskey}
            disabled={isLoading}
          >
            <LoadingSwap isLoading={isLoading}>Remove</LoadingSwap>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default PasskeyDeleteModal;
