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
  ForgotPasswordInput,
  forgotPasswordResolver,
} from '@/lib/validations/auth-validator';
import { LoadingSwap } from '@/components/ui/loading-swap';
import { authClient } from '@/lib/auth-client';
import AuthHeaderControls from '@/components/features/auth/auth-header-controls';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

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
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleOnSubmit)}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => {
              return (
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
              );
            }}
          />

          <Button type="submit" disabled={isSubmitting} className="w-full">
            <LoadingSwap isLoading={isSubmitting}>Submit</LoadingSwap>
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ForgotPasswordForm;
