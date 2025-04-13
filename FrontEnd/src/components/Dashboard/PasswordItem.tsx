import React, { useState } from 'react';
import { StarIcon, CopyIcon, EyeIcon, EyeOffIcon, GlobeIcon, CreditCardIcon, SmartphoneIcon, WifiIcon, HomeIcon, KeyIcon } from 'lucide-react';
interface PasswordItemProps {
  password: {
    id: string;
    title: string;
    username: string;
    website?: string;
    category: string;
    password: string;
    strength: 'weak' | 'medium' | 'strong';
    favorite: boolean;
  };
  onToggleFavorite: () => void;
}
export const PasswordItem: React.FC<PasswordItemProps> = ({
  password,
  onToggleFavorite
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [showCopiedMessage, setShowCopiedMessage] = useState<string | null>(null);
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'websites':
        return <GlobeIcon size={16} className="text-blue-500" />;
      case 'finance':
        return <CreditCardIcon size={16} className="text-green-500" />;
      case 'apps':
        return <SmartphoneIcon size={16} className="text-purple-500" />;
      case 'wifi':
        return <WifiIcon size={16} className="text-red-500" />;
      case 'personal':
        return <HomeIcon size={16} className="text-amber-500" />;
      default:
        return <KeyIcon size={16} className="text-slate-500" />;
    }
  };
  const getStrengthColor = (strength: string) => {
    switch (strength) {
      case 'weak':
        return 'text-red-500 bg-red-100 dark:bg-red-900/30';
      case 'medium':
        return 'text-amber-500 bg-amber-100 dark:bg-amber-900/30';
      case 'strong':
        return 'text-green-500 bg-green-100 dark:bg-green-900/30';
      default:
        return 'text-slate-500 bg-slate-100 dark:bg-slate-700';
    }
  };
  const handleCopy = (type: string, value: string) => {
    navigator.clipboard.writeText(value).then(() => {
      setShowCopiedMessage(type);
      setTimeout(() => setShowCopiedMessage(null), 1500);
    });
  };
  return <li className="px-4 py-4 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-150">
      <div className="flex items-center justify-between">
        <div className="flex items-center min-w-0 space-x-3">
          <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700">
            {getCategoryIcon(password.category)}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center space-x-2">
              <h3 className="text-sm font-medium text-slate-900 truncate dark:text-white">
                {password.title}
              </h3>
              <button onClick={onToggleFavorite} className={`p-1 rounded-full ${password.favorite ? 'text-amber-400' : 'text-slate-300 hover:text-amber-400'}`}>
                <StarIcon size={14} fill={password.favorite ? 'currentColor' : 'none'} />
              </button>
            </div>
            <div className="mt-1 flex items-center">
              <span className="text-xs text-slate-500 dark:text-slate-400 truncate">
                {password.username}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStrengthColor(password.strength || 'weak')}`}>
            {(password.strength || 'weak').charAt(0).toUpperCase() + (password.strength || 'weak').slice(1)}
          </div>
          <div className="flex space-x-2">
            <button onClick={() => setIsPasswordVisible(!isPasswordVisible)} className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300" title={isPasswordVisible ? 'Hide password' : 'Show password'}>
              {isPasswordVisible ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
            </button>
            <button onClick={() => handleCopy('password', password.password)} className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 relative" title="Copy password">
              <CopyIcon size={16} />
              {showCopiedMessage === 'password' && <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs bg-slate-800 text-white rounded">
                  Copied!
                </span>}
            </button>
          </div>
        </div>
      </div>
      {isPasswordVisible && <div className="mt-2 pl-10 pr-4">
          <div className="p-2 bg-slate-100 rounded text-sm font-mono dark:bg-slate-700 dark:text-white">
            {password.password}
          </div>
        </div>}
    </li>;
};