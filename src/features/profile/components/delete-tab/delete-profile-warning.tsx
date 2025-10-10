import { AlertTriangle } from "lucide-react";

const DeleteProfileWarning = () => {
  return (
    <div className="bg-destructive/10 border-destructive/20 mb-6 rounded-lg border p-4">
      <div className="flex gap-3">
        <AlertTriangle className="text-destructive mt-0.5 h-5 w-5 flex-shrink-0" />
        <div>
          <h3 className="text-destructive mb-1 font-semibold">Warning</h3>
          <p className="text-muted-foreground text-sm">
            Deleting your account will permanently remove:
          </p>
          <ul className="text-muted-foreground mt-2 list-inside list-disc space-y-1 text-sm">
            <li>Your profile and personal information</li>
            <li>All your data and settings</li>
            <li>Access to all associated services</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DeleteProfileWarning;
