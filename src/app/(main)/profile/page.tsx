import AccountSettings from "@/features/profile/account-settings";
import { getLinkedAccounts } from "@/lib/auth/better-auth-api";

const ProfilePage = async () => {
  const linkedAccounts = await getLinkedAccounts();
  return (
    <>
      <AccountSettings linkedAccounts={linkedAccounts} />
    </>
  );
};

export default ProfilePage;
