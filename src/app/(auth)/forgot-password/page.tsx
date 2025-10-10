import ForgotPasswordForm from "@/features/auth/components/forgot-password-form";
import { checkAuthRedirect } from "@/lib/middlewares/check-auth-redirect";

const ForgotPasswordPage = async () => {
  await checkAuthRedirect();
  return <ForgotPasswordForm />;
};

export default ForgotPasswordPage;
