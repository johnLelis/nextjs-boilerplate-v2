import type { Route } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth/auth";

export const checkAuthRedirect = async (redirectTo: Route = "/dashboard") => {
  let session;

  try {
    session = await auth.api.getSession({
      headers: await headers(),
    });
  } catch (error) {
    console.error(
      "Failed to fetch user session data. Verify that the database connection is active."
    );
    console.error(error);
    return null;
  }

  if (session?.user) {
    redirect(redirectTo);
  }

  return session;
};
