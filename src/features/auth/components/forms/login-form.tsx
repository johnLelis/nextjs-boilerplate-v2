"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { DynamicForm, FormFieldConfig } from "@/components/ui/dynamic-form";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { Separator } from "@/components/ui/separator";
import { authClient } from "@/lib/auth/auth-client";
import { LoginInput, loginResolver } from "@/lib/validations/auth-validator";

import AuthHeaderControls from "../ui/auth-header-controls";
import { AuthRedirectMessage } from "../ui/auth-redirect-message";
import SocialAuthButtons from "../ui/social-auth-buttons";

const loginFields: FormFieldConfig<LoginInput>[] = [
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "you@example.com",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "••••••••",
  },
];

const LoginForm = () => {
  const form = useForm<LoginInput>({
    resolver: loginResolver,
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isSubmitting } = form.formState;
  const router = useRouter();
  const handleOnSubmit = async (data: LoginInput) => {
    // This is where you handle the form submission logic.
    // Options include:
    // 1. Call your backend API (e.g. POST /api/login or /api/register)
    //    const res = await fetch("/api/login", {
    //      method: "POST",
    //      headers: { "Content-Type": "application/json" },
    //      body: JSON.stringify(values),
    //    });
    //    const data = await res.json();
    //
    // 2. Handle authentication with a library (e.g. NextAuth, Supabase, Clerk).
    //
    // 3. Show success/error feedback:
    //    - Inline form error messages (form.setError)
    //    - Toast notifications (useToast from shadcn/ui)
    //
    // 4. Redirect or update state after success (e.g. router.push("/dashboard")).
    // await new Promise(resolve => {
    //   setTimeout(() => {
    //     resolve('Test');
    //   }, 2000);
    // });
    await authClient.signIn.email(
      {
        ...data,
        rememberMe: false,
      },
      {
        onSuccess: () => {
          router.push("/dashboard");
        },
        onError: (error) => {
          toast.error(
            error.error.message || "Failed to login. Please try again!"
          );
        },
      }
    );
  };

  return (
    <div className="bg-card flex w-sm max-w-md flex-col gap-4 rounded-lg border p-8 shadow-lg">
      <AuthHeaderControls />
      <h1 className="text-card-foreground mb-2 text-center text-2xl font-semibold">
        Login
      </h1>
      <DynamicForm
        form={form}
        fields={loginFields}
        onSubmit={handleOnSubmit}
        submitLabel="Login"
        loadingComponent={
          <LoadingSwap isLoading={isSubmitting}>Login</LoadingSwap>
        }
        footer={
          <div className="text-right">
            <Link
              className="text-sm transition-colors hover:underline"
              href="/forgot-password"
            >
              Forgot Password?
            </Link>
          </div>
        }
      />
      <Separator />
      <SocialAuthButtons />
      <AuthRedirectMessage
        message={"Don't have an account?"}
        href="/register"
        linkText="Register!"
      />
    </div>
  );
};

export default LoginForm;
