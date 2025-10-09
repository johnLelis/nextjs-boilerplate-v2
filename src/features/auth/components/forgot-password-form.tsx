'use client';
import { useForm } from 'react-hook-form';
import {
  ForgotPasswordInput,
  forgotPasswordResolver,
} from '@/lib/validations/auth-validator';
import { LoadingSwap } from '@/components/ui/loading-swap';
import { authClient } from '@/lib/auth/auth-client';
import AuthHeaderControls from '@/features/auth/components/auth-header-controls';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { DynamicForm, FormFieldConfig } from '@/components/ui/dynamic-form';
const forgotPasswordFields: FormFieldConfig<ForgotPasswordInput>[] = [
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'you@example.com',
  },
];
const ForgotPasswordForm = () => {
  const router = useRouter();

  const form = useForm<ForgotPasswordInput>({
    resolver: forgotPasswordResolver,
    defaultValues: {
      email: '',
    },
  });

  const { isSubmitting } = form.formState;

  const handleOnSubmit = async (data: ForgotPasswordInput) => {
    const email = data.email;
    await authClient.requestPasswordReset({
      email,
      redirectTo: '/reset-password',
    });
    toast.success(`Password reset url has been sent to ${email}!`);
    router.push('/');
  };

  return (
    <div className="w-sm max-w-md rounded-lg border bg-card p-8 shadow-lg flex flex-col gap-4">
      <AuthHeaderControls />
      <h1 className="mb-2 text-center text-2xl font-semibold text-card-foreground">
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
