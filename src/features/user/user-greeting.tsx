"use client";

import Link from "next/link";

import { User } from "better-auth/types";

import { authClient } from "@/lib/auth/auth-client";

import UserAvatar from "./user-avatar";

const UserGreeting = () => {
  const { data } = authClient.useSession();
  const user: User | undefined = data?.user;
  if (!user) return null;

  return (
    <Link href={"/profile"}>
      <div className="flex place-items-center gap-1">
        <UserAvatar user={user} />
        <p className="text-sm">
          <span className="font-semibold text-blue-500">{user.name}</span>
        </p>
      </div>
    </Link>
  );
};

export default UserGreeting;
