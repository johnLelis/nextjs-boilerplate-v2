"use client";

import Link from "next/link";

import { useUser } from "@/hooks/use-user";

import UserAvatar from "./user-avatar";

const UserGreeting = () => {
  const { user } = useUser();
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
