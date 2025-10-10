import Image from "next/image";

import { User } from "@/types/user";

const UserAvatar = ({ user }: { user: User }) => {
  if (user.image) {
    return (
      <Image
        src={user.image}
        alt={user.name ?? "User avatar"}
        width={24}
        height={24}
        className="rounded-full"
      />
    );
  }

  const initial = user.name?.[0]?.toUpperCase() ?? "?";

  return (
    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
      {initial}
    </div>
  );
};

export default UserAvatar;
