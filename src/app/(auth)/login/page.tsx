// 'use client';

import LoginForm from '@/components/features/auth/login-form';
import { checkAuthRedirect } from '@/lib/middlewares/check-auth-redirect';

const LoginPage = async () => {
  await checkAuthRedirect();
  return <LoginForm />;
};

export default LoginPage;
