import RegisterForm from '@/components/features/auth/register-form';
import { checkAuthRedirect } from '@/lib/auth/check-auth-redirect';

const RegisterPage = async () => {
  await checkAuthRedirect();
  return <RegisterForm />;
};

export default RegisterPage;
