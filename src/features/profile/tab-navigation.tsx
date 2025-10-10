"use client";

import React from "react";

import { Link2, Monitor, Shield, Trash2, User } from "lucide-react";

type Tab = {
  readonly id: string;
  readonly label: string;
  readonly icon: React.ElementType;
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
  setActiveTab: (id: Tab["id"]) => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  setActiveTab,
}) => (
  <div className="border-b">
    <div className="flex overflow-x-auto">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 border-b-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? "border-primary text-primary"
                : tab.destructive
                  ? "text-destructive hover:text-destructive/80 border-transparent"
                  : "text-muted-foreground hover:text-foreground border-transparent"
            }`}
          >
            <Icon className="h-4 w-4" />
            {tab.label}
          </button>
        );
      })}
    </div>
  </div>
);
