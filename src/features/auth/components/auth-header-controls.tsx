import Link from "next/link";

import { HomeIcon } from "lucide-react";

import ModeToggle from "@/components/ui/mode-toggle";

const AuthHeaderControls = () => {
  return (
    <div className="flex place-items-center gap-2">
      <ModeToggle />
      <Link href={"/"}>
        <HomeIcon
          size={35}
          className="hover:bg-accent dark:bg-accent dark:hover:bg-border rounded-sm border-1 bg-gray-50 p-2 shadow-sm"
        />
      </Link>
    </div>
  );
};

export default AuthHeaderControls;
