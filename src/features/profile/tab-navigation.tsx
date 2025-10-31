"use client";

import type { Dispatch, ElementType, FC, SetStateAction } from "react";

import { Link2, Monitor, Shield, Trash2, User } from "lucide-react";

type Tab = {
  readonly id: string;
  readonly label: string;
  readonly icon: ElementType;
  readonly destructive?: boolean;
};

const tabs: Readonly<Tab[]> = [
  { id: "profile", label: "Profile", icon: User },
  { id: "security", label: "Security", icon: Shield },
  { id: "sessions", label: "Sessions", icon: Monitor },
  { id: "accounts", label: "Accounts", icon: Link2 },
  { id: "delete", label: "Delete Account", icon: Trash2, destructive: true },
];

interface TabNavigationProps {
  activeTab: Tab["id"];
  setActiveTab: Dispatch<SetStateAction<Tab["id"]>>;
}

export const TabNavigation: FC<TabNavigationProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const getTabClassNames = (tab: Tab, isActive: boolean): string => {
    if (isActive) {
      return "border-primary text-primary";
    }
    if (tab.destructive) {
      return "text-destructive hover:text-destructive/80 border-transparent";
    }
    return "text-muted-foreground hover:text-foreground border-transparent";
  };

  return (
    <div className="border-b">
      <div className="flex overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          const tabClass = getTabClassNames(tab, isActive);

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 border-b-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors ${tabClass}`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
