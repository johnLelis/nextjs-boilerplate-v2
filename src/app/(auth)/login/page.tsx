import LoginForm from '@/features/auth/components/login-form';
import { checkAuthRedirect } from '@/lib/middlewares/check-auth-redirect';

const LoginPage = async () => {
  await checkAuthRedirect();
  return <LoginForm />;
};

export default LoginPage;
