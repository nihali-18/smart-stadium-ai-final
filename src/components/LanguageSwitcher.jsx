import React, { useState, useRef, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { popularLanguages } from '../data/languages';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLanguageChange = (code) => {
    i18n.changeLanguage(code);
    localStorage.setItem('hasSelectedLanguage', 'true');
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLang = popularLanguages.find(l => l.code === i18n.language) || popularLanguages[0];

  return (
    <div className="fixed top-6 right-6 z-50" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-slate-800/80 hover:bg-slate-700 border border-slate-600 rounded-full shadow-lg backdrop-blur-sm transition-all text-white"
        aria-label="Change language"
      >
        <Globe className="w-5 h-5 text-cyan-400" />
        <span className="hidden sm:inline font-medium">{currentLang.nativeName}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-600 rounded-2xl shadow-xl overflow-hidden max-h-64 overflow-y-auto custom-scrollbar animate-fade-in">
          {popularLanguages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full text-left px-4 py-3 hover:bg-slate-700 transition-colors flex items-center justify-between ${i18n.language === lang.code ? 'bg-slate-700/50 text-cyan-400' : 'text-slate-200'}`}
            >
              <span>{lang.nativeName}</span>
              <span className="text-xs opacity-60">{lang.code.toUpperCase()}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
