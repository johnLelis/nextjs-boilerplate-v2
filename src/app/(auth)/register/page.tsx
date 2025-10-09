import RegisterForm from '@/features/auth/register-form';
import { checkAuthRedirect } from '@/lib/middlewares/check-auth-redirect';

const RegisterPage = async () => {
  await checkAuthRedirect();
  return <RegisterForm />;
};

export default RegisterPage;
