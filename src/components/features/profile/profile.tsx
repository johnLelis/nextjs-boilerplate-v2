import { useForm } from 'react-hook-form';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  updateProfileResolver,
  UpdateProfileInput,
} from '@/lib/validations/auth-validator';
const Profile = () => {
  const form = useForm<UpdateProfileInput>({
    resolver: updateProfileResolver,
    defaultValues: {
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
  });

  const onSubmit = async (data: UpdateProfileInput) => {
    console.log('Form submitted:', data);
  };
  return (
    <div className="p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Profile Picture */}
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center text-primary-foreground text-2xl font-bold">
              JD
            </div>
            <div>
              <Button type="button" variant="default" size="sm">
                Change Photo
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="ml-2"
              >
                Remove
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                JPG, GIF or PNG. Max size of 2MB.
              </p>
            </div>
          </div>

          {/* Form Fields */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input {...field} />
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
                  <Input type="email" {...field} />
                </FormControl>
                <FormDescription>
                  {`We'll send a verification email to your new email address.`}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="secondary"
              onClick={() => form.reset()}
            >
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Profile;
