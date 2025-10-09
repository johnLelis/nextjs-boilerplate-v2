import ForgotPasswordForm from '@/features/auth/forgot-password-form';
import { checkAuthRedirect } from '@/lib/middlewares/check-auth-redirect';
const ForgotPasswordPage = async () => {
  await checkAuthRedirect();
  return <ForgotPasswordForm />;
};

export default ForgotPasswordPage;
