"use client";

import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { DynamicForm, FormFieldConfig } from "@/components/ui/dynamic-form";
import { LoadingSwap } from "@/components/ui/loading-swap";
import AuthHeaderControls from "@/features/auth/components/ui/auth-header-controls";
import { authClient } from "@/lib/auth/auth-client";
import {
  ForgotPasswordInput,
  forgotPasswordResolver,
} from "@/lib/validations/auth-validator";

const forgotPasswordFields: FormFieldConfig<ForgotPasswordInput>[] = [
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "you@example.com",
  },
];
const ForgotPasswordForm = () => {
  const router = useRouter();

  const form = useForm<ForgotPasswordInput>({
    resolver: forgotPasswordResolver,
    defaultValues: {
      email: "",
    },
  });

  const { isSubmitting } = form.formState;

  const handleOnSubmit = async (data: ForgotPasswordInput) => {
    const email = data.email;
    await authClient.requestPasswordReset({
      email,
      redirectTo: "/reset-password",
    });
    toast.success(`Password reset url has been sent to ${email}!`);
    router.push("/");
  };

  return (
    <div className="bg-card flex w-sm max-w-md flex-col gap-4 rounded-lg border p-8 shadow-lg">
      <AuthHeaderControls />
      <h1 className="text-card-foreground mb-2 text-center text-2xl font-semibold">
        Forgot Password
      </h1>
      <DynamicForm
        form={form}
        fields={forgotPasswordFields}
        onSubmit={handleOnSubmit}
        submitLabel="Submit"
        loadingComponent={
          <LoadingSwap isLoading={isSubmitting}>Submit</LoadingSwap>
        }
      />
    </div>
  );
};

export default ForgotPasswordForm;
