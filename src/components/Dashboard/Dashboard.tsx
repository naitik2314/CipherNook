import React, { useState } from 'react';
import { Sidebar } from '../Layout/Sidebar';
import { Header } from '../Layout/Header';
import { PasswordVault } from './PasswordVault';
import { PasswordGenerator } from '../Tools/PasswordGenerator';
import { SettingsPage } from '../Settings/SettingsPage';
interface DashboardProps {
  onLogout: () => void;
}
export const Dashboard: React.FC<DashboardProps> = ({
  onLogout
}) => {
  const [activeView, setActiveView] = useState<'vault' | 'generator' | 'settings'>('vault');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  return <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-900">
      <Sidebar activeView={activeView} setActiveView={setActiveView} activeCategory={activeCategory} setActiveCategory={setActiveCategory} onLogout={onLogout} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} activeView={activeView} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {activeView === 'vault' && <PasswordVault searchTerm={searchTerm} activeCategory={activeCategory} />}
          {activeView === 'generator' && <PasswordGenerator />}
          {activeView === 'settings' && <SettingsPage />}
        </main>
      </div>
    </div>;
};