'use client';
import { useState } from 'react';
import Profile from '@/features/profile/profile';
import ProfileHeader from '@/features/profile/components/profile-header';
import { TabNavigation } from '@/features/profile/components/tab-navigation';
import ProfileSecurity from '@/features/profile/components/profile-security';
import ProfileSession from '@/features/profile/components/profile-session';
import ProfileAccounts from '@/features/profile/components/profile-accounts';
import ProfileDelete from '@/features/profile/delete/profile-delete';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const tabComponents: Record<string, React.ReactNode> = {
    profile: <Profile />,
    security: <ProfileSecurity />,
    sessions: <ProfileSession />,
    accounts: <ProfileAccounts />,
    delete: <ProfileDelete />,
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-3xl mx-auto">
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
