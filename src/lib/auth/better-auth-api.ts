"use server";

import { headers } from "next/headers";

import { auth } from "./auth";

export const getLinkedAccounts = async () => {
  const accounts = await auth.api.listUserAccounts({
    headers: await headers(),
  });
  const nonCredentialAccounts = accounts.filter(
    (a) => a.providerId !== "credential"
  );
  return nonCredentialAccounts;
};
