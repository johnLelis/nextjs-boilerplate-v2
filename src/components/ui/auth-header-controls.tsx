import Link from 'next/link';
import ModeToggle from './mode-toggle';
import { HomeIcon } from 'lucide-react';

const AuthHeaderControls = () => {
  return (
    <div className="flex place-items-center gap-2">
      <ModeToggle />
      <Link href={'/'}>
        <HomeIcon />
      </Link>
    </div>
  );
};

export default AuthHeaderControls;
