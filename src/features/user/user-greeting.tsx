"use client";

import Link from "next/link";

import { useUser } from "@/hooks/useUser";

import UserAvatar from "./user-avatar";

const UserGreeting = () => {
  const { user } = useUser();
  if (!user) return null;

  return (
    <Link href={"/profile"}>
      <div className="flex gap-1 place-items-center">
        <UserAvatar user={user} />
        <p className="text-sm">
          <span className="font-semibold text-blue-500">{user.name}</span>
        </p>
      </div>
    </Link>
  );
};

export default UserGreeting;
