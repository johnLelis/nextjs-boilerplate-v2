'use client';
import { useForm } from 'react-hook-form';
import {
  ResetPasswordInput,
  resetPasswordResolver,
} from '@/lib/validations/auth-validator';
import { LoadingSwap } from '@/components/ui/loading-swap';
import { authClient } from '@/lib/auth/auth-client';
import AuthHeaderControls from '@/components/features/auth/auth-header-controls';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { DynamicForm, FormFieldConfig } from '@/components/ui/dynamic-form';

const resetPasswordFields: FormFieldConfig<ResetPasswordInput>[] = [
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: '••••••••',
  },
  {
    name: 'confirmPassword',
    label: 'Confirm Password',
    type: 'password',
    placeholder: '••••••••',
  },
];

const ResetPasswordForm = () => {
  const router = useRouter();
  const form = useForm<ResetPasswordInput>({
    resolver: resetPasswordResolver,
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const { isSubmitting } = form.formState;

  const handleOnSubmit = async (data: ResetPasswordInput) => {
    const token = new URLSearchParams(window.location.search).get('token');
    if (!token) {
      toast.error('Invalid token. Please try again!');
    } else {
      await authClient.resetPassword({
        newPassword: data.password,
        token,
      });
      toast.success('Your password has been reset successfully!');
      router.push('/login');
    }
  };

  return (
    <div className="w-sm max-w-md rounded-lg border bg-card p-8 shadow-lg flex flex-col gap-4">
      <AuthHeaderControls />
      <h1 className="mb-2 text-center text-2xl font-semibold text-card-foreground">
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
