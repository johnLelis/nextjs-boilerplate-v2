import type { Passkey } from "better-auth/plugins/passkey";
import { create } from "zustand";

import { authClient } from "@/lib/auth/auth-client";

type AddPasskeyResponse = NonNullable<
  Awaited<ReturnType<typeof authClient.passkey.addPasskey>>
>["data"];

type PasskeyStore = {
  // Data
  passkeys: Passkey[];
  passkeyName: AddPasskeyResponse | string;
  selectedPasskey: Passkey | null;

  // Loading states
  isLoading: boolean;
  isLoadingList: boolean;

  // UI states
  showAddModal: boolean;
  showDeleteModal: boolean;

  // Actions
  setPasskeys: (_data: Passkey[]) => void;
  setPasskeyName: (_name: AddPasskeyResponse | string) => void;
  setSelectedPasskey: (_passkey: Passkey | null) => void;
  setIsLoading: (_loading: boolean) => void;
  setIsLoadingList: (_loading: boolean) => void;
  setShowAddModal: (_open: boolean) => void;
  setShowDeleteModal: (_open: boolean) => void;
  resetModals: () => void;
};

export const usePasskeyStore = create<PasskeyStore>((set) => ({
  // Initial state
  passkeys: [],
  passkeyName: "",
  selectedPasskey: null,

  isLoading: false,
  isLoadingList: true,

  showAddModal: false,
  showDeleteModal: false,

  // Actions
  setPasskeys: (data) => set({ passkeys: data }),
  setPasskeyName: (name) => set({ passkeyName: name }),
  setSelectedPasskey: (passkey) => set({ selectedPasskey: passkey }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setIsLoadingList: (loading) => set({ isLoadingList: loading }),
  setShowAddModal: (open) => set({ showAddModal: open }),
  setShowDeleteModal: (open) => set({ showDeleteModal: open }),
  resetModals: () =>
    set({
      showAddModal: false,
      showDeleteModal: false,
      selectedPasskey: null,
      passkeyName: "",
    }),
}));
