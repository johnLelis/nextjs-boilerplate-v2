import RegisterForm from "@/features/auth/components/forms/register-form";
import { checkAuthRedirect } from "@/lib/middlewares/check-auth-redirect";

const RegisterPage = async () => {
  await checkAuthRedirect();
  return <RegisterForm />;
};

export default RegisterPage;
