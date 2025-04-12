import React, { useEffect, useState } from 'react';
import { RefreshCwIcon, CopyIcon, CheckIcon, XIcon } from 'lucide-react';
export const PasswordGenerator: React.FC = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);
  const [strength, setStrength] = useState<'weak' | 'medium' | 'strong'>('medium');
  // Generate password when options change
  useEffect(() => {
    generatePassword();
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);
  // Calculate password strength
  useEffect(() => {
    calculateStrength();
  }, [password]);
  const generatePassword = () => {
    let charset = '';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    // Ensure at least one character set is selected
    if (charset === '') {
      setIncludeLowercase(true);
      charset = 'abcdefghijklmnopqrstuvwxyz';
    }
    let newPassword = '';
    for (let i = 0; i < length; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(newPassword);
  };
  const calculateStrength = () => {
    // Simple strength calculation based on length and character types
    let score = 0;
    if (password.length >= 12) score += 2;else if (password.length >= 8) score += 1;
    if (includeUppercase) score += 1;
    if (includeLowercase) score += 1;
    if (includeNumbers) score += 1;
    if (includeSymbols) score += 1;
    if (score >= 5) setStrength('strong');else if (score >= 3) setStrength('medium');else setStrength('weak');
  };
  const copyToClipboard = () => {
    navigator.clipboard.writeText(password).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  const getStrengthColor = () => {
    switch (strength) {
      case 'weak':
        return 'text-red-500';
      case 'medium':
        return 'text-amber-500';
      case 'strong':
        return 'text-green-500';
      default:
        return 'text-slate-500';
    }
  };
  return <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md dark:bg-slate-800">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-6">
            Password Generator
          </h2>
          <div className="flex items-center space-x-2 p-4 bg-slate-50 border border-slate-200 rounded-lg mb-6 dark:bg-slate-700 dark:border-slate-600">
            <div className="flex-1 font-mono text-lg break-all dark:text-white">
              {password}
            </div>
            <div className="flex space-x-2">
              <button onClick={generatePassword} className="p-2 text-slate-500 hover:text-slate-700 rounded-md hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-300 dark:hover:bg-slate-600">
                <RefreshCwIcon size={18} />
              </button>
              <button onClick={copyToClipboard} className="p-2 text-slate-500 hover:text-slate-700 rounded-md hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-300 dark:hover:bg-slate-600">
                {copied ? <CheckIcon size={18} className="text-green-500" /> : <CopyIcon size={18} />}
              </button>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="length" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Password Length: {length}
                </label>
                <span className={`text-xs font-medium ${getStrengthColor()}`}>
                  {strength.toUpperCase()}
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-xs text-slate-500">8</span>
                <input id="length" type="range" min="8" max="32" value={length} onChange={e => setLength(parseInt(e.target.value))} className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700" />
                <span className="text-xs text-slate-500">32</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <input id="uppercase" type="checkbox" checked={includeUppercase} onChange={() => setIncludeUppercase(!includeUppercase)} className="h-4 w-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 dark:border-slate-600 dark:focus:ring-blue-400" />
                <label htmlFor="uppercase" className="ml-2 text-sm text-slate-700 dark:text-slate-300">
                  Include Uppercase (A-Z)
                </label>
              </div>
              <div className="flex items-center">
                <input id="lowercase" type="checkbox" checked={includeLowercase} onChange={() => setIncludeLowercase(!includeLowercase)} className="h-4 w-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 dark:border-slate-600 dark:focus:ring-blue-400" />
                <label htmlFor="lowercase" className="ml-2 text-sm text-slate-700 dark:text-slate-300">
                  Include Lowercase (a-z)
                </label>
              </div>
              <div className="flex items-center">
                <input id="numbers" type="checkbox" checked={includeNumbers} onChange={() => setIncludeNumbers(!includeNumbers)} className="h-4 w-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 dark:border-slate-600 dark:focus:ring-blue-400" />
                <label htmlFor="numbers" className="ml-2 text-sm text-slate-700 dark:text-slate-300">
                  Include Numbers (0-9)
                </label>
              </div>
              <div className="flex items-center">
                <input id="symbols" type="checkbox" checked={includeSymbols} onChange={() => setIncludeSymbols(!includeSymbols)} className="h-4 w-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 dark:border-slate-600 dark:focus:ring-blue-400" />
                <label htmlFor="symbols" className="ml-2 text-sm text-slate-700 dark:text-slate-300">
                  Include Symbols (!@#$%^&*)
                </label>
              </div>
            </div>
            <button onClick={generatePassword} className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200">
              Generate New Password
            </button>
          </div>
        </div>
      </div>
      <div className="mt-6 bg-white rounded-lg shadow-md p-6 dark:bg-slate-800">
        <h3 className="text-lg font-medium text-slate-800 dark:text-white mb-4">
          Password Tips
        </h3>
        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
          <li className="flex items-start">
            <CheckIcon size={16} className="text-green-500 mr-2 mt-0.5" />
            Use a unique password for each account
          </li>
          <li className="flex items-start">
            <CheckIcon size={16} className="text-green-500 mr-2 mt-0.5" />
            Longer passwords are generally more secure
          </li>
          <li className="flex items-start">
            <CheckIcon size={16} className="text-green-500 mr-2 mt-0.5" />
            Mix character types for stronger security
          </li>
          <li className="flex items-start">
            <XIcon size={16} className="text-red-500 mr-2 mt-0.5" />
            Avoid using personal information in your passwords
          </li>
          <li className="flex items-start">
            <XIcon size={16} className="text-red-500 mr-2 mt-0.5" />
            Don't reuse passwords across different sites
          </li>
        </ul>
      </div>
    </div>;
};