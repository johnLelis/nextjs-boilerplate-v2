const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex h-screen flex-col justify-center items-center">
        {children}
      </div>
    </>
  );
};

export default AuthLayout;
