'use client';
import { useForm } from 'react-hook-form';

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
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

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleOnSubmit)}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isSubmitting} className="w-full">
            <LoadingSwap isLoading={isSubmitting}>Register</LoadingSwap>
          </Button>
        </form>
      </Form>
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
