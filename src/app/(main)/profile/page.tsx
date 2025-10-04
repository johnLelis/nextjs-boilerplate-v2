'use client';
import { useState } from 'react';
import Profile from '@/components/features/profile/profile';
import ProfileHeader from '@/components/features/profile/profile-header';
import { TabNavigation } from '@/components/features/profile/tab-navigation';
import ProfileSecurity from '@/components/features/profile/profile-security';
import ProfileSession from '@/components/features/profile/profile-session';
import ProfileAccounts from '@/components/features/profile/profile-accounts';
import ProfileDelete from '@/components/features/profile/profile-delete';

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
