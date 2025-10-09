'use client';
import { useForm } from 'react-hook-form';
import {
  RegisterInput,
  registerResolver,
} from '@/lib/validations/auth-validator';
import { LoadingSwap } from '@/components/ui/loading-swap';
import { authClient } from '@/lib/auth/auth-client';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Separator } from '@/components/ui/separator';
import SocialAuthButtons from './social-auth-buttons';
import AuthHeaderControls from './auth-header-controls';
import { AuthRedirectMessage } from './auth-redirect-message';
import { DynamicForm, FormFieldConfig } from '@/components/ui/dynamic-form';

const registerFields: FormFieldConfig<RegisterInput>[] = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    placeholder: 'Your name',
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'you@example.com',
  },
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
const RegisterForm = () => {
  const router = useRouter();
  const form = useForm<RegisterInput>({
    resolver: registerResolver,
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
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
        callbackURL: '/login',
      },
      {
        onError: error => {
          toast.error(error.error.message || 'Failed to sign up!');
        },
        onSuccess: () => {
          toast.success(`A verification email has been sent to ${data.email}.`);
          router.push('/login');
        },
      }
    );
  };

  return (
    <div className="w-sm max-w-md rounded-lg border bg-card p-8 shadow-lg flex flex-col gap-4">
      <AuthHeaderControls />
      <h1 className="mb-2 text-center text-2xl font-semibold text-card-foreground">
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
