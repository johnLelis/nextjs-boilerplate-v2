"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import dayjs from "dayjs";
import { CheckCircle2, Link2, LinkIcon, Trash2, XCircle } from "lucide-react";
import { toast } from "sonner";

import {
  SUPPORTED_OAUTH_PROVIDERS,
  SUPPORTED_OAUTH_PROVIDERS_DETAILS,
  SupportOAuthProvider,
} from "@/components/config/o-auth-providers";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authClient } from "@/lib/auth/auth-client";

export type LinkedAccount = {
  id: string;
  providerId: string;
  createdAt: Date;
  updatedAt: Date;
  accountId: string;
  scopes: string[];
};

type LinkedAccounts = LinkedAccount[];

type Unlink = Pick<LinkedAccount, "providerId" | "accountId">;

const ProfileLinkedAccounts = ({
  linkedAccounts,
}: {
  linkedAccounts: LinkedAccounts;
}) => {
  const router = useRouter();
  const [isDisabled, setIsDisabled] = useState(false);
  const formatDate = (date: Date): string => {
    return dayjs(date).format("MMM D, YYYY");
  };

  const isProviderLinked = (provider: SupportOAuthProvider) => {
    return linkedAccounts.find((account) => account.providerId === provider);
  };

  const handleOnLink = async (provider: SupportOAuthProvider) => {
    await authClient.linkSocial({
      provider,
      callbackURL: "/dashboard",
    });
    router.refresh();
  };

  const handleOnUnlink = async ({ accountId, providerId }: Unlink) => {
    setIsDisabled(true);
    if (linkedAccounts.length === 0) {
      return Promise.resolve({ error: { message: "Account not found" } });
    }

    const toastId = toast.warning(
      `Are you sure you want to unlink ${providerId}?`,
      {
        action: {
          label: "Unlink ",
          onClick: async () => {
            await authClient.unlinkAccount(
              {
                accountId,
                providerId,
              },
              {
                onSuccess: () => {
                  toast.success(
                    `${providerId.charAt(0).toUpperCase()}${providerId.slice(1)} successfully unlinked!`
                  );
                  router.refresh();
                },
                onError: () => {
                  toast.error(
                    `${providerId.charAt(0).toUpperCase()}${providerId.slice(1)} unlinking failed! Please try again.`
                  );
                  setIsDisabled(false);
                },
              }
            );
          },
        },
        cancel: {
          label: "Cancel",
          onClick: () => {
            toast.dismiss(toastId);
            setIsDisabled(false);
          },
        },
        onAutoClose() {
          setIsDisabled(false);
        },
      }
    );
  };

  return (
    <div className="flex justify-center p-6">
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
        <CardContent className="space-y-4">
          {SUPPORTED_OAUTH_PROVIDERS.map((provider) => {
            const linkedAccount = isProviderLinked(provider);
            const providerDetails = SUPPORTED_OAUTH_PROVIDERS_DETAILS[provider];
            const Icon = providerDetails.Icon;

            return (
              <div
                key={provider}
                className="hover:bg-accent/50 flex items-center justify-between rounded-lg border p-4 transition-colors"
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{providerDetails.name}</span>
                    {linkedAccount ? (
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
                  {linkedAccount && (
                    <span className="text-muted-foreground text-sm">
                      Linked {formatDate(linkedAccount.createdAt)}
                      {linkedAccount.scopes.length > 0 && (
                        <span className="ml-2">
                          • {linkedAccount.scopes.length} scope
                          {linkedAccount.scopes.length !== 1 ? "s" : ""}
                        </span>
                      )}
                    </span>
                  )}
                </div>

                <div>
                  {linkedAccount ? (
                    <Button
                      variant="destructive"
                      size="sm"
                      disabled={isDisabled}
                      onClick={() =>
                        handleOnUnlink({
                          accountId: linkedAccount.accountId,
                          providerId: provider,
                        })
                      }
                    >
                      <Trash2 className="h-4 w-4" />
                      Unlink
                    </Button>
                  ) : (
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleOnLink(provider)}
                    >
                      <LinkIcon className="h-4 w-4" />
                      Link
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileLinkedAccounts;
