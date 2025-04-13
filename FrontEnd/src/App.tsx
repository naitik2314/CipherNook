import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LoginScreen } from './components/Auth/LoginScreen';
import { Dashboard } from './components/Dashboard/Dashboard';
import { SetMasterPassword } from './components/Auth/SetMasterPassword.tsx';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMasterPasswordSet, setIsMasterPasswordSet] = useState(false);

  useEffect(() => {
    const checkMasterPassword = async () => {
      try {
        const response = await axios.get('http://localhost:8000/check_master_password');
        setIsMasterPasswordSet(response.data.isSet);
      } catch (error) {
        console.error('Error checking master password:', error);
      }
    };
    checkMasterPassword();
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return <div className="w-full min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-white">
      {!isMasterPasswordSet ? <SetMasterPassword onSet={() => setIsMasterPasswordSet(true)} /> : !isAuthenticated ? <LoginScreen onLogin={handleLogin} /> : <Dashboard onLogout={handleLogout} />}
    </div>;
}