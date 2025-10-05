import { User } from '@/types/user';
import Image from 'next/image';

const UserAvatar = ({ user }: { user: User }) => {
  if (user.image) {
    return (
      <Image
        src={user.image}
        alt={user.name ?? 'User avatar'}
        width={24}
        height={24}
        className="rounded-full "
      />
    );
  }

  const initial = user.name?.[0]?.toUpperCase() ?? '?';

  return (
    <div className="h-6 w-6  rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold">
      {initial}
    </div>
  );
};

export default UserAvatar;
