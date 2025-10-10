"use client";

import type { Route } from "next";
import Link from "next/link";

type AuthRedirectMessageProps = {
  message: string;
  linkText: string;
  href: Route;
};

export const AuthRedirectMessage = ({
  message,
  linkText,
  href,
}: AuthRedirectMessageProps) => {
  return (
    <div className="flex gap-2 text-sm font-light">
      <p>{message}</p>
      <Link href={href} className="text-blue-400 hover:underline">
        {linkText}
      </Link>
    </div>
  );
};
