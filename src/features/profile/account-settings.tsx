"use client";

import { useState } from "react";

import DeleteProfile from "./components/delete-tab/delete-profile";
import ProfileLinkedAccounts from "./components/linked-accounts-tab/profile-linked-accounts";
import Profile from "./components/profile-tab/profile";
import ProfileHeader from "./components/profile-tab/profile-header";
import ProfileSecurity from "./components/security-tab/profile-security";
import ProfileSessionManager from "./components/session-tab/profile-session";
import { TabNavigation } from "./tab-navigation";

export type LinkedAccounts = {
  id: string;
  providerId: string;
  createdAt: Date;
  updatedAt: Date;
  accountId: string;
  scopes: string[];
}[];

const AccountSettings = ({
  linkedAccounts,
}: {
  linkedAccounts: LinkedAccounts;
}) => {
  const [activeTab, setActiveTab] = useState("profile");
  const tabComponents: Record<string, React.ReactNode> = {
    profile: <Profile />,
    security: <ProfileSecurity />,
    sessions: <ProfileSessionManager />,
    accounts: <ProfileLinkedAccounts linkedAccounts={linkedAccounts} />,
    delete: <DeleteProfile />,
  };

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto max-w-3xl">
        <ProfileHeader />
        <div className="bg-card rounded-lg border shadow-sm">
          <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
          {tabComponents[activeTab]}
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
