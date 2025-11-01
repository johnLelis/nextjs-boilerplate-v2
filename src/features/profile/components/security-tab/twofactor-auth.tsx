import { useState } from "react";

import QRCode from "react-qr-code";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { authClient } from "@/lib/auth/auth-client";

export const TwoFactorAuth = () => {
  const { data } = authClient.useSession();
  const isTwoFactorEnabled = data?.user.twoFactorEnabled;

  const [isLoading, setIsLoading] = useState(false);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [setupSecret, setSetupSecret] = useState<string | null>(null);
  const [backupCodes, setBackupCodes] = useState<string[] | null>(null);
  const [verificationCode, setVerificationCode] = useState("");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDisableModal, setShowDisableModal] = useState(false);
  const [password, setPassword] = useState("");

  const handleEnable2FA = () => {
    setIsLoading(true);
    authClient.twoFactor
      .enable({
        password,
      })
      .then((response) => {
        if (response.data) {
          const uri = response.data.totpURI;
          setQrCode(uri);
          // Extract secret from URI (format: otpauth://totp/...?secret=XXXXX&...)
          const secretRegex = /secret=([^&]+)/;
          const secretMatch = secretRegex.exec(uri);
          if (secretMatch) {
            setSetupSecret(secretMatch[1]);
          }
          setBackupCodes(response.data.backupCodes);
        }
      })
      .catch((error) => {
        toast.error(error.message || "Failed to enable 2FA");
      })
      .finally(() => {
        setIsLoading(false);
        setShowPasswordModal(false);
      });
  };

  const handleVerify2FA = () => {
    setIsLoading(true);
    authClient.twoFactor
      .verifyTotp({
        code: verificationCode,
      })
      .then(() => {
        toast.success("Two-factor authentication enabled successfully");

        setQrCode(null);
        setSetupSecret(null);
        setVerificationCode("");
      })
      .catch((error) => {
        toast.error(error.message || "Invalid verification code");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleDisable2FA = () => {
    setIsLoading(true);
    authClient.twoFactor
      .disable({
        password,
      })
      .then(() => {
        toast.success("Two-factor authentication disabled");
        setShowDisableModal(false);
        setBackupCodes(null);
      })
      .catch((error) => {
        toast.error(error.message || "Failed to disable 2FA");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  return (
    <Card className="w-md">
      <CardHeader>
        <CardTitle>Two-Factor Authentication</CardTitle>
        <CardDescription>
          Add an extra layer of security to your account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isTwoFactorEnabled && !qrCode && (
          <div className="space-y-4">
            <p className="text-muted-foreground text-sm">
              Two-factor authentication is currently disabled. Enable it to
              protect your account with an additional security layer.
            </p>
            <Button
              onClick={() => setShowPasswordModal(true)}
              disabled={isLoading}
            >
              <LoadingSwap isLoading={isLoading}>Enable 2FA</LoadingSwap>
            </Button>
          </div>
        )}

        {qrCode && !isTwoFactorEnabled && (
          <div className="space-y-4">
            <div className="flex flex-col items-center space-y-4">
              <p className="text-muted-foreground text-sm">
                Scan this QR code with your authenticator app:
              </p>
              <div className="rounded-lg border bg-white p-4">
                <QRCode value={qrCode} size={200} />
              </div>
            </div>

            {setupSecret && (
              <div className="space-y-2">
                <Label>Or enter this key manually</Label>
                <div className="flex gap-2">
                  <code className="bg-muted flex-1 rounded-md border p-3 font-mono text-sm break-all">
                    {setupSecret}
                  </code>
                  <Button
                    variant="outline"
                    size="icon"
                    className="shrink-0"
                    onClick={() => copyToClipboard(setupSecret)}
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                    </svg>
                  </Button>
                </div>
              </div>
            )}

            {backupCodes && (
              <div className="space-y-2">
                <Label>Backup Codes</Label>
                <p className="text-muted-foreground text-sm">
                  Save these codes in a safe place. You can use them to access
                  your account if you lose your device.
                </p>
                <div className="bg-muted grid grid-cols-2 gap-2 rounded-md border p-4">
                  {backupCodes.map((code) => (
                    <code key={code} className="font-mono text-sm">
                      {code}
                    </code>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(backupCodes.join("\n"))}
                >
                  Copy All Codes
                </Button>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="verification-code">Verification Code</Label>
              <Input
                id="verification-code"
                placeholder="Enter 6-digit code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                maxLength={6}
              />
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleVerify2FA}
                disabled={isLoading || verificationCode.length !== 6}
              >
                <LoadingSwap isLoading={isLoading}>Verify & Enable</LoadingSwap>
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setQrCode(null);
                  setSetupSecret(null);
                  setBackupCodes(null);
                  setVerificationCode("");
                }}
                disabled={isLoading}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {isTwoFactorEnabled && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500">
                <svg
                  className="h-5 w-5 text-white"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <p className="text-sm font-medium text-green-900 dark:text-green-100">
                2FA is enabled
              </p>
            </div>

            <Button
              variant="destructive"
              onClick={() => setShowDisableModal(true)}
              disabled={isLoading}
            >
              <LoadingSwap isLoading={isLoading}>Disable 2FA</LoadingSwap>
            </Button>
          </div>
        )}

        {/* Enable 2FA Password Modal */}
        <Dialog open={showPasswordModal} onOpenChange={setShowPasswordModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Your Password</DialogTitle>
              <DialogDescription>
                Please enter your password to enable two-factor authentication.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-2">
              <Label htmlFor="enable-password">Password</Label>
              <Input
                id="enable-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && password) {
                    handleEnable2FA();
                  }
                }}
              />
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setShowPasswordModal(false);
                  setPassword("");
                }}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                onClick={handleEnable2FA}
                disabled={isLoading || !password}
              >
                <LoadingSwap isLoading={isLoading}>Continue</LoadingSwap>
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Disable 2FA Password Modal */}
        <Dialog open={showDisableModal} onOpenChange={setShowDisableModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Disable Two-Factor Authentication</DialogTitle>
              <DialogDescription>
                Please enter your password to disable two-factor authentication.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-2">
              <Label htmlFor="disable-password">Password</Label>
              <Input
                id="disable-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && password) {
                    handleDisable2FA();
                  }
                }}
              />
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setShowDisableModal(false);
                  setPassword("");
                }}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDisable2FA}
                disabled={isLoading || !password}
              >
                <LoadingSwap isLoading={isLoading}>Disable</LoadingSwap>
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};
