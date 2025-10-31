import { type Dispatch, type SetStateAction, useState } from "react";

import { Session } from "better-auth/types";
import { Loader2, Monitor, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authClient } from "@/lib/auth/auth-client";
import { formatDate } from "@/lib/utils/date-formatter";
import { parseUserAgent } from "@/lib/utils/parse-user-agent";

type OtherSessionProp = {
  otherSessions: Session[];
  setSessions: Dispatch<SetStateAction<Session[]>>;
};

const OtherSessionsCard = ({
  otherSessions,
  setSessions,
}: OtherSessionProp) => {
  const [deletingToken, setDeletingToken] = useState<string | null>(null);

  const handleConfirmRevoke = (
    sessionToken: string,
    toastId: string | number
  ) => {
    authClient.revokeSession(
      { token: sessionToken },
      {
        onSuccess: () => handleRevokeSuccess(sessionToken),
        onError: () => handleRevokeFailure(toastId),
      }
    );
  };

  const handleRevokeSuccess = (sessionToken: string) => {
    setSessions((prev) => prev.filter((s) => s.token !== sessionToken));
    toast.success("Session revoked successfully");
  };

  const handleRevokeFailure = (toastId: string | number) => {
    toast.error("Failed to revoke session");
    toast.dismiss(toastId);
  };

  const handleCancelRevoke = (toastId: string | number) => {
    toast.dismiss(toastId);
  };

  const handleRevokeSession = async (sessionToken: string) => {
    setDeletingToken(sessionToken);

    try {
      const toastId = toast.warning(
        "Are you sure you want to revoke this session?",
        {
          action: {
            label: "Revoke Session",
            onClick: () => handleConfirmRevoke(sessionToken, toastId),
          },
          cancel: {
            label: "Cancel",
            onClick: () => handleCancelRevoke(toastId),
          },
          onAutoClose: () => setDeletingToken(null),
        }
      );
    } catch (error) {
      toast.error("Failed to revoke session");
      console.error(error);
      setDeletingToken(null);
    }
  };
  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold">Other Active Sessions</h2>
      <div className="space-y-3">
        {otherSessions.map((otherSession) => {
          const { browser, os } = parseUserAgent(otherSession.userAgent);
          return (
            <Card key={otherSession.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-muted rounded-lg p-2">
                      <Monitor className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-base">
                        {browser}, {os}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {otherSession.ipAddress || "IP not available"}
                      </CardDescription>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                    onClick={() => handleRevokeSession(otherSession.token)}
                    disabled={deletingToken === otherSession.token}
                  >
                    {deletingToken === otherSession.token ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-muted-foreground space-y-1 text-sm">
                  <p>Created: {formatDate(otherSession.createdAt)}</p>
                  <p>Expires: {formatDate(otherSession.expiresAt)}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default OtherSessionsCard;
