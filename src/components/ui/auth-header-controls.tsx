import Link from 'next/link';
import ModeToggle from './mode-toggle';
import { HomeIcon } from 'lucide-react';

const AuthHeaderControls = () => {
  return (
    <div className="flex place-items-center gap-2">
      <ModeToggle />
      <Link href={'/'}>
        <HomeIcon
          size={35}
          className="shadow-sm border-1 rounded-sm p-2 bg-gray-50 hover:bg-accent dark:bg-accent"
        />
      </Link>
    </div>
  );
};

export default AuthHeaderControls;
