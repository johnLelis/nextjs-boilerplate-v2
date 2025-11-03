"use client";

import { useEffect, useState } from "react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

type Passkey = Awaited<
  ReturnType<typeof authClient.passkey.listUserPasskeys>
>["data"];

type AddPasskeyResponse = NonNullable<
  Awaited<ReturnType<typeof authClient.passkey.addPasskey>>
>["data"];
export const PasskeysManagement = () => {
  const { data: session } = authClient.useSession();
  const [passkeys, setPasskeys] = useState<Passkey[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingList, setIsLoadingList] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [passkeyName, setPasskeyName] = useState<AddPasskeyResponse | string>(
    ""
  );
  const [selectedPasskey, setSelectedPasskey] = useState<
    NonNullable<typeof passkeys>[number] | null
  >(null);

  const loadPasskeys = async () => {
    try {
      const { data, error } = await authClient.passkey.listUserPasskeys();
      if (error) {
        console.error("Failed to load passkeys", error);
      } else {
        setPasskeys(data || []);
      }
    } catch (error) {
      console.error("Failed to load passkeys", error);
    } finally {
      setIsLoadingList(false);
    }
  };

  useEffect(() => {
    if (session?.user) {
      loadPasskeys();
    }
  }, [session]);

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

  if (isLoadingList) {
    return (
      <Card className="w-md">
        <CardHeader>
          <CardTitle>Passkeys</CardTitle>
          <CardDescription>
            Use passkeys for passwordless authentication with biometrics or
            security keys
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">Loading passkeys...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-md">
      <CardHeader>
        <CardTitle>Passkeys</CardTitle>
        <CardDescription>
          Use passkeys for passwordless authentication with biometrics or
          security keys
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {passkeys.length === 0 ? (
          <div className="space-y-4">
            <p className="text-muted-foreground text-sm">
              No passkeys configured. Add a passkey to enable secure,
              passwordless sign-in.
            </p>
            <Button onClick={() => setShowAddModal(true)} disabled={isLoading}>
              <LoadingSwap isLoading={isLoading}>Add Passkey</LoadingSwap>
            </Button>
          </div>
        ) : (
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
                    variant="ghost"
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
        )}

        {/* Add Passkey Modal */}
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

        {/* Delete Passkey Modal */}
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
      </CardContent>
    </Card>
  );
};
