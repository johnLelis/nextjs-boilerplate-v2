import { WithChildren } from '@/types/common';

const AuthLayout = ({ children }: WithChildren) => {
  return (
    <div className="flex h-screen flex-col justify-center items-center">
      {children}
    </div>
  );
};

export default AuthLayout;
