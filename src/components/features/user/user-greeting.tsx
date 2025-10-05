'use client';
import { UserGreetingProps } from '@/types/user';
import UserAvatar from './user-avatar';
import Link from 'next/link';

const UserGreeting = ({ user }: UserGreetingProps) => {
  if (!user) return null;

  return (
    <Link href={'/profile'}>
      <div className="flex gap-1 place-items-center">
        <UserAvatar user={user} />
        <p className="text-sm">
          Hello <span className="font-semibold text-blue-500">{user.name}</span>
        </p>
      </div>
    </Link>
  );
};

export default UserGreeting;
