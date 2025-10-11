"use client";

import { useEffect, useState } from "react";

import type { Session } from "better-auth/types";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { authClient } from "@/lib/auth/auth-client";

import CurrentSessionCard from "./current-session-card";
import OtherSessionsCard from "./other-sessions-card";

const ProfileSessionManager = () => {
  const { data } = authClient.useSession();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  const session: Session | null = data && data.session;
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

  const currentSession = session;
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
      {currentSession && <CurrentSessionCard currentSession={currentSession} />}
      {otherSessions.length > 0 && (
        <OtherSessionsCard
          otherSessions={otherSessions}
          setSessions={setSessions}
        />
      )}
    </div>
  );
};

export default ProfileSessionManager;
