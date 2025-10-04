'use client';
import { Button } from '@/components/ui/button';
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
import {
  ResetPasswordInput,
  resetPasswordResolver,
} from '@/lib/validations/auth-validator';
import { LoadingSwap } from '@/components/ui/loading-swap';
import { authClient } from '@/lib/auth-client';
import AuthHeaderControls from '@/components/features/auth/auth-header-controls';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

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
  // await checkAuthRedirect();
  return (
    <div className="w-sm max-w-md rounded-lg border bg-card p-8 shadow-lg flex flex-col gap-4">
      <AuthHeaderControls />
      <h1 className="mb-2 text-center text-2xl font-semibold text-card-foreground">
        Reset Password
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleOnSubmit)}
          className="space-y-4"
        >
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
            <LoadingSwap isLoading={isSubmitting}>Submit</LoadingSwap>
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ResetPasswordForm;
