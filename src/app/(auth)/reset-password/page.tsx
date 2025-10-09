import ResetPasswordForm from '@/features/auth/reset-password-form';
import { checkAuthRedirect } from '@/lib/middlewares/check-auth-redirect';

const ResetPasswordPage = async () => {
  await checkAuthRedirect();
  return <ResetPasswordForm />;
};

export default ResetPasswordPage;
