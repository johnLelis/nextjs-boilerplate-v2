import { AlertTriangle } from 'lucide-react';

const DeleteAccountWarning = () => {
  return (
    <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-6">
      <div className="flex gap-3">
        <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-semibold text-destructive mb-1">Warning</h3>
          <p className="text-sm text-muted-foreground">
            Deleting your account will permanently remove:
          </p>
          <ul className="text-sm text-muted-foreground mt-2 space-y-1 list-disc list-inside">
            <li>Your profile and personal information</li>
            <li>All your data and settings</li>
            <li>Access to all associated services</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountWarning;
