import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth/auth";

export const checkAuthRedirect = async (redirectTo: string = "/dashboard") => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect(redirectTo);
  }

  return session;
};
