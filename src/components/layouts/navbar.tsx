"use client";

import Link from "next/link";

import ModeToggle from "../ui/mode-toggle";

type NavbarProps = {
  greeting: React.ReactNode;
  logout: React.ReactNode;
};

const Navbar = ({ greeting, logout }: NavbarProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-8">
        <div className="flex items-center gap-8 justify-between">
          <Link href="/" className="text-xl font-bold">
            NextJs
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

        <div className="flex items-center gap-6">
          <ModeToggle />
          {greeting}
          <div className="flex items-center gap-2">{logout}</div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
