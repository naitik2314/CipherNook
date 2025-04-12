import React, { useState } from 'react';
import { LoginScreen } from './components/Auth/LoginScreen';
import { Dashboard } from './components/Dashboard/Dashboard';
export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const handleLogin = () => {
    setIsAuthenticated(true);
  };
  const handleLogout = () => {
    setIsAuthenticated(false);
  };
  return <div className="w-full min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-white">
      {!isAuthenticated ? <LoginScreen onLogin={handleLogin} /> : <Dashboard onLogout={handleLogout} />}
    </div>;
}