import { DynamicForm } from '@/components/ui/dynamic-form';
import { authClient } from '@/lib/auth/auth-client';
import {
  ChangePasswordInput,
  changePasswordResolver,
} from '@/lib/validations/auth-validator';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const ProfileSecurity = () => {
  const form = useForm({
    resolver: changePasswordResolver,
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: ChangePasswordInput) => {
    await authClient.changePassword({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
      revokeOtherSessions: true,
    });
    toast.success('Password changed successfully');
    form.reset();
  };
  return (
    <div className="p-6 flex justify-center">
      <DynamicForm
        form={form}
        fields={[
          {
            name: 'newPassword',
            label: 'New Password',
            type: 'password',
          },
          {
            name: 'confirmPassword',
            label: 'Confirm New Password',
            type: 'password',
          },
        ]}
        onSubmit={onSubmit}
        submitLabel="Change Password"
        className="w-md flex flex-col space-y-4"
        buttonsClassName="w-fit self-end"
      />
    </div>
  );
};

export default ProfileSecurity;
