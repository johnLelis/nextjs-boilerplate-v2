import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ModeToggle from '../ui/mode-toggle';

const Navbar = async () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-8">
        <div className="flex items-center gap-8 justify-between">
          <Link href="/" className="text-xl font-bold">
            MyApp
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/dashboard" className="text-sm font-medium">
              Dashboard
            </Link>
            <Link href="/about" className="text-sm font-medium">
              About
            </Link>
          </nav>
        </div>

        {/* Right side: actions */}
        <div className="flex items-center gap-6">
          <ModeToggle />
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost">
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Sign Up</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
