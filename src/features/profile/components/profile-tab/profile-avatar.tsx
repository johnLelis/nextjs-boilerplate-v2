import { Button } from "@/components/ui/button";
import { UserGreetingProps } from "@/types/user";

const ProfileAvatar = ({ user }: UserGreetingProps) => {
  return (
    <div className="flex items-center gap-6">
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center text-2xl font-bold">
        {getInitials(user?.name)}
      </div>
      <div>
        <Button
          className="text-white"
          type="button"
          variant="default"
          size="sm"
        >
          Change Photo
        </Button>
        <Button type="button" variant="secondary" size="sm" className="ml-2">
          Remove
        </Button>
        <p className="text-xs text-muted-foreground mt-2">
          JPG, GIF or PNG. Max size of 2MB.
        </p>
      </div>
    </div>
  );
};

const getInitials = (name?: string | null) => {
  if (!name) return "?";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export default ProfileAvatar;
