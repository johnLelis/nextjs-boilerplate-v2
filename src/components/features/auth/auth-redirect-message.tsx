'use client';
import Link from 'next/link';

type AuthRedirectMessageProps = {
  message: string;
  linkText: string;
  href: string;
};

export const AuthRedirectMessage = ({
  message,
  linkText,
  href,
}: AuthRedirectMessageProps) => {
  return (
    <div className="flex gap-2 font-light text-sm">
      <p>{message}</p>
      <Link href={href} className="text-blue-400 hover:underline">
        {linkText}
      </Link>
    </div>
  );
};
