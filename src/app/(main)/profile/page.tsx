"use client";

import { useState } from "react";

import DeleteProfile from "@/features/profile/components/delete-tab/delete-profile";
import ProfileAccounts from "@/features/profile/components/linked-accounts-tab/profile-accounts";
import Profile from "@/features/profile/components/profile-tab/profile";
import ProfileHeader from "@/features/profile/components/profile-tab/profile-header";
import ProfileSecurity from "@/features/profile/components/security-tab/profile-security";
import ProfileSessionManager from "@/features/profile/components/session-tab/profile-session";
import { TabNavigation } from "@/features/profile/tab-navigation";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const tabComponents: Record<string, React.ReactNode> = {
    profile: <Profile />,
    security: <ProfileSecurity />,
    sessions: <ProfileSessionManager />,
    accounts: <ProfileAccounts />,
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

export default ProfilePage;
