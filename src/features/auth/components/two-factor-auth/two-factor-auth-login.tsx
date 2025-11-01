"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
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

const TwoFactorAuthLogin = () => {
  const router = useRouter();

  const [twoFactorCode, setTwoFactorCode] = useState("");
  const [showModal, setShowModal] = useState(true);
  const [is2FALoading, setIs2FALoading] = useState(false);
  const [trustDevice, setTrustDevice] = useState(false);

  const isBackupCode = (code: string) => {
    // Check if it matches backup code format: XXXXX-XXXXX (11chars with dash)
    return /^[A-Za-z0-9]{5}-[A-Za-z0-9]{5}$/.test(code);
  };

  const handleVerify2FA = async () => {
    if (twoFactorCode.length !== 6) {
      toast.error("Please enter a valid 6-digit code");
      return;
    }

    setIs2FALoading(true);

    authClient.twoFactor
      .verifyTotp({
        code: twoFactorCode,
        trustDevice,
      })
      .then(({ error }) => {
        if (error) {
          toast.error(error.message || "Invalid verification code");
        } else {
          toast.success("Login successful!");
          router.push("/dashboard");
        }
      })
      .finally(() => {
        setIs2FALoading(false);
      });
  };

  const handleUseBackupCode = async () => {
    if (!twoFactorCode) {
      toast.error("Please enter a backup code");
      return;
    }

    setIs2FALoading(true);

    authClient.twoFactor
      .verifyBackupCode({
        code: twoFactorCode,
        trustDevice,
      })
      .then(({ error }) => {
        if (error) {
          toast.error(error.message || "Invalid backup code");
        } else {
          toast.success("Login successful!");
          router.push("/dashboard");
        }
      })
      .finally(() => {
        setIs2FALoading(false);
      });
  };
  return (
    <Dialog
      open={showModal}
      onOpenChange={() => {
        setShowModal(false);
        router.push("/login");
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Two-Factor Authentication</DialogTitle>
          <DialogDescription>
            Enter the 6-digit code from your authenticator app or use a backup
            code.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="2fa-code">Verification Code</Label>
            <Input
              id="2fa-code"
              placeholder="000000 or XXXXX-XXXXX"
              value={twoFactorCode}
              onChange={(e) => {
                const value = e.target.value.toUpperCase();

                const isValid =
                  /^\d*$/.test(value) ||
                  /^[A-Z0-9]{0,5}-?[A-Z0-9]{0,5}$/.test(value);

                if (isValid) {
                  setTwoFactorCode(value);
                }
              }}
              maxLength={11}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (
                    twoFactorCode.length === 6 &&
                    /^\d{6}$/.test(twoFactorCode)
                  ) {
                    handleVerify2FA();
                  } else if (isBackupCode(twoFactorCode)) {
                    handleUseBackupCode();
                  }
                }
              }}
              autoFocus
            />
          </div>

          <div className="flex items-center space-x-2">
            <Input
              type="checkbox"
              id="trust-device"
              checked={trustDevice}
              onChange={(e) => setTrustDevice(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300"
            ></Input>
            <Label
              htmlFor="trust-device"
              className="cursor-pointer text-sm font-normal"
            >
              Trust this device for 60 days
            </Label>
          </div>
        </div>

        <DialogFooter className="flex-col gap-2 sm:flex-col">
          <Button
            onClick={handleVerify2FA}
            disabled={
              is2FALoading ||
              twoFactorCode.length !== 6 ||
              !/^\d{6}$/.test(twoFactorCode)
            }
            className="w-full"
          >
            <LoadingSwap isLoading={is2FALoading}>Verify</LoadingSwap>
          </Button>
          <Button
            variant="outline"
            onClick={handleUseBackupCode}
            disabled={is2FALoading || !isBackupCode(twoFactorCode)}
            className="w-full"
          >
            Use Backup Code
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              setTwoFactorCode("");
              setTrustDevice(false);
              setShowModal(false);
              router.push("/login");
            }}
            disabled={is2FALoading}
            className="w-full"
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default TwoFactorAuthLogin;
