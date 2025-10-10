import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth/auth";
import { checkArcjet } from "./check-arcjet";

export const authMiddleware = async (request: NextRequest) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
};

export const handleArcjet = async (request: Request) => {
  const decision = await checkArcjet(request);
  if (!decision.isDenied()) return null;

  const { reason } = decision;

  if (reason.isRateLimit()) {
    return jsonError("Too Many Requests", reason, 429);
  }

  if (reason.isBot()) {
    return jsonError("No bots allowed", reason, 403);
  }

  if (reason.isEmail()) {
    const message = getEmailErrorMessage(reason.emailTypes);
    return jsonError("BadRequest", message, 400);
  }

  return jsonError("Forbidden", reason, 403);
};

const getEmailErrorMessage = (types: string[]): string => {
  if (types.includes("INVALID")) return "Email address format is invalid";
  if (types.includes("DISPOSABLE"))
    return "Disposable email addresses are not allowed";
  if (types.includes("NO_MX_RECORDS")) return "Email domain is not valid";
  return "Invalid email";
};

const jsonError = (error: string, reason: unknown, status: number) =>
  NextResponse.json({ error, message: reason }, { status });
