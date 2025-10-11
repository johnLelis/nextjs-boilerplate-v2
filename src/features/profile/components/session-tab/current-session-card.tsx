import { Session } from "better-auth/types";
import { Monitor } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate } from "@/lib/utils/date-formatter";
import { parseUserAgent } from "@/lib/utils/parse-user-agent";

const CurrentSessionCard = ({
  currentSession,
}: {
  currentSession: Session;
}) => {
  return (
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
                  {parseUserAgent(currentSession?.userAgent).browser},{" "}
                  {parseUserAgent(currentSession?.userAgent).os}
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
  );
};

export default CurrentSessionCard;
