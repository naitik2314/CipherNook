import React, { useState } from 'react';
import { EyeIcon, EyeOffIcon, FingerprintIcon } from 'lucide-react';
interface LoginScreenProps {
  onLogin: () => void;
}
export const LoginScreen: React.FC<LoginScreenProps> = ({
  onLogin
}) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd validate the master password here
    if (password.length > 0) {
      onLogin();
    }
  };
  return <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-blue-50 to-slate-100 dark:from-slate-900 dark:to-blue-950">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-lg dark:bg-slate-800">
        <div className="flex flex-col items-center">
          <div className="p-3 bg-blue-100 rounded-full dark:bg-blue-900">
            <div size={40} className="text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="mt-6 text-3xl font-bold text-center text-slate-800 dark:text-white">
            CipherNook
          </h1>
          <p className="mt-2 text-center text-slate-600 dark:text-slate-300">
            Your secure, offline password manager
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm">
            <div className="relative">
              <input id="master-password" name="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" required value={password} onChange={e => setPassword(e.target.value)} className="relative block w-full px-4 py-3 text-slate-900 placeholder-slate-400 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white" placeholder="Master Password" />
              <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOffIcon className="h-5 w-5 text-slate-400" /> : <EyeIcon className="h-5 w-5 text-slate-400" />}
              </button>
            </div>
          </div>
          <div>
            <button type="submit" className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200">
              Unlock Vault
            </button>
          </div>
          <div className="flex items-center justify-center">
            <div className="text-sm">
              <button type="button" className="flex items-center text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300" onClick={onLogin} // For demo purposes
            >
                <FingerprintIcon className="mr-2 h-5 w-5" />
                Use Biometrics
              </button>
            </div>
          </div>
        </form>
        <div className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
          <p>All data is stored locally. No cloud sync.</p>
          <p className="mt-1">Your security is our priority.</p>
        </div>
      </div>
    </div>;
};