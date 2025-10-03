import { UserGreetingProps } from '@/types/user';
import UserAvatar from './user-avatar';

const UserGreeting = ({ user }: UserGreetingProps) => {
  if (!user) return null;

  return (
    <div className="flex gap-1 place-items-center">
      <UserAvatar user={user} />
      <p className="text-sm">
        Hello <span className="font-semibold text-blue-500">{user.name}</span>
      </p>
    </div>
  );
};

export default UserGreeting;
