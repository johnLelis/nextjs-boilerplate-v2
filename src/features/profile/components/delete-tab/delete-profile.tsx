"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { authClient } from "@/lib/auth/auth-client";
import { DynamicDialog } from "@/components/ui/dynamic-dialog";
import DeleteHeader from "./delete-header";
import DeleteProfileWarning from "./delete-profile-warning";
import { useRouter } from "next/navigation";

const DeleteProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const router = useRouter();
  const handleDelete = async () => {
    try {
      await authClient.deleteUser();
      toast.success(`Account deleted successfully.`);
      setIsOpen(false);
      setConfirmText("");
      router.push("/");
    } catch (error) {
      console.error("Failed to delete account:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to delete account. Please try again."
      );
      throw error;
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-2xl">
        <DeleteHeader />
        <DeleteProfileWarning />
        <DynamicDialog
          trigger={<Button variant="destructive">Delete Account</Button>}
          title="Are you absolutely sure?"
          description="This action cannot be undone. This will permanently delete your account and remove all your data from our servers."
          open={isOpen}
          onOpenChange={(open) => {
            setIsOpen(open);
            if (!open) setConfirmText("");
          }}
          buttons={[
            {
              label: "Delete Account",
              variant: "destructive",
              onClick: handleDelete,
              disabled: confirmText !== "delete",
              loadingLabel: "Deleting...",
            },
          ]}
        >
          <div>
            <Label htmlFor="confirm" className="text-sm font-medium">
              Type <span className="font-bold text-destructive">delete</span> to
              confirm
            </Label>
            <Input
              id="confirm"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder={`Type "delete" here`}
              className="mt-2"
            />
          </div>
        </DynamicDialog>
      </div>
    </div>
  );
};

export default DeleteProfile;
