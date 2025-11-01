"use client";

import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { DynamicForm, FormFieldConfig } from "@/components/ui/dynamic-form";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { Separator } from "@/components/ui/separator";
import { authClient } from "@/lib/auth/auth-client";
import {
  RegisterInput,
  registerResolver,
} from "@/lib/validations/auth-validator";

import AuthHeaderControls from "../ui/auth-header-controls";
import { AuthRedirectMessage } from "../ui/auth-redirect-message";
import SocialAuthButtons from "../ui/social-auth-buttons";

const registerFields: FormFieldConfig<RegisterInput>[] = [
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "Your name",
    autoComplete: "name",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "you@example.com",
    autoComplete: "email",
  },
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
const RegisterForm = () => {
  const router = useRouter();
  const form = useForm<RegisterInput>({
    resolver: registerResolver,
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { isSubmitting } = form.formState;

  const handleOnSubmit = async (data: RegisterInput) => {
    await authClient.signUp.email(
      {
        ...data,
        /**
         * A URL to redirect to after the user verifies their email (optional)
         */
        callbackURL: "/login",
      },
      {
        onError: (error) => {
          toast.error(error.error.message || "Failed to sign up!");
        },
        onSuccess: () => {
          toast.success(`A verification email has been sent to ${data.email}.`);
          router.push("/login");
        },
      }
    );
  };

  return (
    <div className="bg-card flex w-sm max-w-md flex-col gap-4 rounded-lg border p-8 shadow-lg">
      <AuthHeaderControls />
      <h1 className="text-card-foreground mb-2 text-center text-2xl font-semibold">
        Register
      </h1>
      <DynamicForm
        form={form}
        fields={registerFields}
        onSubmit={handleOnSubmit}
        submitLabel="Register"
        loadingComponent={
          <LoadingSwap isLoading={isSubmitting}>Register</LoadingSwap>
        }
      />
      <Separator />
      <SocialAuthButtons />
      <AuthRedirectMessage
        message="Have an account?"
        href="/login"
        linkText="Login!"
      />
    </div>
  );
};

export default RegisterForm;
