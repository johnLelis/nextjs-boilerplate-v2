"use client";

import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { DynamicForm, FormFieldConfig } from "@/components/ui/dynamic-form";
import { LoadingSwap } from "@/components/ui/loading-swap";
import AuthHeaderControls from "@/features/auth/components/auth-header-controls";
import { authClient } from "@/lib/auth/auth-client";
import {
  ResetPasswordInput,
  resetPasswordResolver,
} from "@/lib/validations/auth-validator";

const resetPasswordFields: FormFieldConfig<ResetPasswordInput>[] = [
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "••••••••",
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    placeholder: "••••••••",
  },
];

const ResetPasswordForm = () => {
  const router = useRouter();
  const form = useForm<ResetPasswordInput>({
    resolver: resetPasswordResolver,
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const { isSubmitting } = form.formState;

  const handleOnSubmit = async (data: ResetPasswordInput) => {
    const token = new URLSearchParams(window.location.search).get("token");
    if (!token) {
      toast.error("Invalid token. Please try again!");
    } else {
      await authClient.resetPassword({
        newPassword: data.password,
        token,
      });
      toast.success("Your password has been reset successfully!");
      router.push("/login");
    }
  };

  return (
    <div className="bg-card flex w-sm max-w-md flex-col gap-4 rounded-lg border p-8 shadow-lg">
      <AuthHeaderControls />
      <h1 className="text-card-foreground mb-2 text-center text-2xl font-semibold">
        Reset Password
      </h1>
      <DynamicForm
        form={form}
        fields={resetPasswordFields}
        onSubmit={handleOnSubmit}
        submitLabel="Submit"
        loadingComponent={
          <LoadingSwap isLoading={isSubmitting}>Submit</LoadingSwap>
        }
      />
    </div>
  );
};

export default ResetPasswordForm;
