"use client";

import { useEffect, useState } from "react";

import type { Session } from "better-auth/types";
import dayjs from "dayjs";
import { Loader2, Monitor, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUser } from "@/hooks/use-user";
import { authClient } from "@/lib/auth/auth-client";

const ProfileSessionManager = () => {
  const { session } = useUser();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingToken, setDeletingToken] = useState<string | null>(null);

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    setLoading(true);
    try {
      const result = await authClient.listSessions();

      if (result.error) {
        toast.error("Failed to load sessions");
        return;
      }

      setSessions(result.data);
    } catch (error) {
      toast.error("An error occurred");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRevokeSession = async (sessionToken: string) => {
    setDeletingToken(sessionToken);
    try {
      const toastId = toast.warning(
        "Are you sure you want to revoke this session?",
        {
          action: {
            label: "Revoke Session",
            onClick: async () => {
              await authClient.revokeSession(
                { token: sessionToken },
                {
                  onSuccess: () => {
                    setSessions((prev) =>
                      prev.filter((s) => s.token !== sessionToken)
                    );
                    toast.success("Session revoked successfully");
                  },
                  onError: () => {
                    toast.error("Failed to revoke session");
                    toast.dismiss(toastId);
                  },
                }
              );
            },
          },
          cancel: {
            label: "Cancel",
            onClick: () => {
              toast.dismiss(toastId);
            },
          },
          onAutoClose() {
            setDeletingToken(null);
          },
        }
      );
    } catch (error) {
      toast.error("Failed to revoke session");
      console.error(error);
      setDeletingToken(null);
    }
  };

  const formatDate = (date: Date | string) => {
    return dayjs(date).format("MMM D, YYYY h:mm A");
  };

  const parseUserAgent = (userAgent?: string | null) => {
    if (!userAgent) return { browser: "Unknown", os: "Unknown" };

    const browser = userAgent.includes("Chrome")
      ? "Chrome"
      : userAgent.includes("Firefox")
        ? "Firefox"
        : userAgent.includes("Safari")
          ? "Safari"
          : "Unknown";

    const os = userAgent.includes("Windows")
      ? "Windows"
      : userAgent.includes("Mac")
        ? "macOS"
        : userAgent.includes("Linux")
          ? "Linux"
          : "Unknown";

    return { browser, os };
  };

  const currentSession = session?.session;
  const otherSessions = sessions.filter((s) => s.id !== currentSession?.id);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="text-muted-foreground h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-10">
      {currentSession && (
        <div>
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-muted rounded-lg p-2">
                    <Monitor className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-base">
                      {parseUserAgent(currentSession.userAgent).browser},{" "}
                      {parseUserAgent(currentSession.userAgent).os}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {currentSession.ipAddress || "IP not available"}
                    </CardDescription>
                  </div>
                </div>
                <Badge variant="secondary">Current Session</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-muted-foreground space-y-1 text-sm">
                <p>Created: {formatDate(currentSession.createdAt)}</p>
                <p>Expires: {formatDate(currentSession.expiresAt)}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {otherSessions.length > 0 && (
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
      )}

      {sessions.length === 0 && (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground">No active sessions found</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProfileSessionManager;
