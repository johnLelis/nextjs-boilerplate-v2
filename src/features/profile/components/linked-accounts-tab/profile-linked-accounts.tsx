import { CheckCircle2, Link2, XCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { LinkedAccounts } from "../../account-settings";

const ProfileLinkedAccounts = ({
  linkedAccounts,
}: {
  linkedAccounts: LinkedAccounts;
}) => {
  return (
    <div className="flex-center p-6">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Link2 className="text-muted-foreground h-5 w-5" />
            <CardTitle>Linked Accounts</CardTitle>
          </div>
          <CardDescription>
            Manage your connected social accounts for easy sign-in
          </CardDescription>
        </CardHeader>
      </Card>
      <CardContent className="space-y-4">
        {linkedAccounts.length > 0 &&
          linkedAccounts.map((account) => {
            return (
              <div
                key={account.id}
                className="hover:bg-accent/50 flex items-center justify-between rounded-lg border p-4 transition-colors"
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">
                      {/* {getProviderName(account.provider)} */}
                    </span>
                    {account ? (
                      <Badge
                        variant="outline"
                        className="gap-1 border-green-500/50 text-green-600 dark:text-green-400"
                      >
                        <CheckCircle2 className="h-3 w-3" />
                        Connected
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="border-muted-foreground/50 text-muted-foreground gap-1"
                      >
                        <XCircle className="h-3 w-3" />
                        Not connected
                      </Badge>
                    )}
                  </div>
                  {/* {account.isLinked && (
                  <span className="text-muted-foreground text-sm">
                    {account.email || account.username}
                    {account.linkedAt &&
                      ` • Linked ${new Date(account.linkedAt).toLocaleDateString()}`}
                  </span>
                )} */}
                </div>
              </div>
            );
          })}
      </CardContent>
    </div>
  );
};

export default ProfileLinkedAccounts;
