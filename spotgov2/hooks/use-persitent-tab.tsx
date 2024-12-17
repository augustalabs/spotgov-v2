import { useEffect, useState } from "react";

export function usePersistentTab({
  defaultTab,
  storageKey,
}: {
  defaultTab: string;
  storageKey: string;
}) {
  const [activeTab, setActiveTab] = useState<string | null>(null);

  useEffect(() => {
    const savedTab = localStorage.getItem(storageKey);
    setActiveTab(savedTab || defaultTab);
  }, [defaultTab, storageKey]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    localStorage.setItem(storageKey, tab);
  };

  return { activeTab, handleTabChange };
}
