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
import ModeToggle from '@/components/ui/mode-toggle';
import { LoginInput, loginResolver } from '@/lib/validations/auth';

const LoginForm = () => {
  const form = useForm<LoginInput>({
    resolver: loginResolver,
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleOnSubmit = async (values: LoginInput) => {
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

    console.log(values); // For now, just logging the submitted values
  };

  return (
    <div className="w-sm max-w-md rounded-lg border bg-card p-8 shadow-lg">
      <ModeToggle />
      <h1 className="mb-6 text-center text-2xl font-semibold text-card-foreground">
        Login
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleOnSubmit)}
          className="space-y-4"
        >
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

          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
