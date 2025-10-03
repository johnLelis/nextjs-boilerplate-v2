import Image from 'next/image';
type UserProps = {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } | null;
};
const UserGreeting = ({ user }: UserProps) => {
  return (
    <div className="flex gap-1 place-items-center">
      {user?.image ? (
        <Image
          src={user.image}
          alt={user.name ?? 'User avatar'}
          width={24}
          height={24}
          className="rounded-full"
        />
      ) : (
        <div className="h-6 w-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold">
          {user?.name?.[0] ?? '?'}
        </div>
      )}
      <p className="text-sm">
        Hello{' '}
        <span className="font-semibold text-blue-500">
          {user?.name ?? 'Guest'}
        </span>
        !
      </p>
    </div>
  );
};

export default UserGreeting;
