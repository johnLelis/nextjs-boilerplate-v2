'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { DynamicForm, FormFieldConfig } from '@/components/ui/dynamic-form';
import {
  updateProfileResolver,
  UpdateProfileInput,
} from '@/lib/validations/auth-validator';
import { useUser } from '@/hooks/useUser';
import { LoadingSwap } from '@/components/ui/loading-swap';
import ProfileAvatar from './profile-avatar';
import { authClient } from '@/lib/auth/auth-client';
import { toast } from 'sonner';

const Profile = () => {
  const { user } = useUser();

  const form = useForm<UpdateProfileInput>({
    resolver: updateProfileResolver,
    defaultValues: {
      name: '',
      email: '',
    },
  });

  const { isDirty, isSubmitting } = form.formState;

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name || '',
        email: user.email || '',
      });
    }
  }, [user, form]);

  const profileFields: FormFieldConfig<UpdateProfileInput>[] = [
    {
      name: 'name',
      label: 'Full Name',
      type: 'text',
      placeholder: 'John Doe',
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'you@example.com',
      description: "We'll send a verification email to your new email address.",
    },
  ];

  const onSubmit = async (data: UpdateProfileInput): Promise<void> => {
    console.log('Form submitted:', data);

    try {
      const updates = [];
      if (data.name && data.name !== user?.name) {
        updates.push(authClient.updateUser({ name: data.name }));
      }
      if (data.email && data.email !== user?.email) {
        console.log(data.email);
        updates.push(
          authClient.changeEmail({
            newEmail: data.email,
            callbackURL: '/dashboard',
          })
        );
      }

      await Promise.all(updates);
      form.reset();
      toast.success(
        'We’ve sent a verification link to your new email. Please check your inbox to confirm the change.'
      );
    } catch (error) {
      console.error('❌ Failed to update profile:', error);
      const message =
        error instanceof Error
          ? error.message
          : 'An unexpected error occurred while updating your profile.';

      toast.error(message);
    }
  };

  return (
    <div className="p-6">
      <div className="space-y-6">
        <ProfileAvatar user={user} />
        <DynamicForm
          form={form}
          fields={profileFields}
          onSubmit={onSubmit}
          submitLabel="Save Changes"
          buttons={
            isDirty
              ? [
                  {
                    label: 'Cancel',
                    type: 'button',
                    variant: 'secondary',
                    onClick: () => {
                      form.reset({
                        name: user?.name || '',
                        email: user?.email || '',
                      });
                    },
                  },
                  {
                    label: 'Save Changes',
                    type: 'submit',
                    variant: 'default',
                    className: 'text-white',
                    loadingComponent: (
                      <LoadingSwap isLoading={isSubmitting}>
                        Saving...
                      </LoadingSwap>
                    ),
                  },
                ]
              : undefined
          }
          buttonsClassName={
            isDirty ? 'flex justify-end gap-3 pt-4 border-t' : 'hidden'
          }
        />
      </div>
    </div>
  );
};

export default Profile;
