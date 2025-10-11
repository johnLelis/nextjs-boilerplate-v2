import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { DynamicForm } from "@/components/ui/dynamic-form";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { authClient } from "@/lib/auth/auth-client";
import {
  ChangePasswordInput,
  changePasswordResolver,
} from "@/lib/validations/auth-validator";

const ProfileSecurity = () => {
  const defaultValues = {
    newPassword: "",
    currentPassword: "",
    confirmPassword: "",
    revokeOtherSessions: false,
  };
  const form = useForm({
    resolver: changePasswordResolver,
    defaultValues,
  });
  const { isSubmitting } = form.formState;

  const onSubmit = async (data: ChangePasswordInput) => {
    await authClient.changePassword(data, {
      onError: (error) => {
        if (error.error?.code === "INVALID_PASSWORD") {
          toast.error("Your current password is incorrect.");
        } else {
          toast.error(error.error.message || "Failed to change password");
        }
      },
      onSuccess: () => {
        toast.success("Password changed successfully");
        form.reset();
      },
    });
  };
  return (
    <div className="flex justify-center p-6">
      <DynamicForm
        form={form}
        fields={[
          {
            name: "currentPassword",
            label: "Current Password",
            type: "password",
          },
          {
            name: "newPassword",
            label: "New Password",
            type: "password",
          },
          {
            name: "confirmPassword",
            label: "Confirm New Password",
            type: "password",
          },
          {
            name: "revokeOtherSessions",
            label: "Log out other sessions",
            type: "checkbox",
          },
        ]}
        onSubmit={onSubmit}
        submitLabel="Change Password"
        loadingComponent={
          <LoadingSwap isLoading={isSubmitting}>Change Password</LoadingSwap>
        }
        className="flex w-md flex-col space-y-4"
        buttonsClassName="w-fit self-end"
      />
    </div>
  );
};

export default ProfileSecurity;
