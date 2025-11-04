"use client";

import { useCallback, useEffect } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { authClient } from "@/lib/auth/auth-client";
import { usePasskeyStore } from "@/store/passkey-store";

import PasskeyCardHeader from "./passkey-card-header";
import PasskeyDeleteModal from "./passkey-delete-modal";
import PasskeysEmptyState from "./passkey-empty-state";
import PasskeyList from "./passkey-list";
import PasskeyLoadingCard from "./passkey-loading-card";
import PasskeyModal from "./passkey-modal";

export const PasskeysManagement = () => {
  const { data: session } = authClient.useSession();
  const { setPasskeys, setIsLoadingList, isLoadingList, passkeys } =
    usePasskeyStore();

  const loadPasskeys = useCallback(async () => {
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
  }, [setPasskeys, setIsLoadingList]);

  useEffect(() => {
    if (session?.user) {
      loadPasskeys();
    }
  }, [session, loadPasskeys]);

  if (isLoadingList) {
    return <PasskeyLoadingCard />;
  }

  return (
    <Card className="w-md">
      <PasskeyCardHeader />
      <CardContent className="space-y-4">
        {passkeys.length === 0 ? <PasskeysEmptyState /> : <PasskeyList />}
        <PasskeyModal loadPasskeys={loadPasskeys} />
        <PasskeyDeleteModal loadPasskeys={loadPasskeys} />
      </CardContent>
    </Card>
  );
};
