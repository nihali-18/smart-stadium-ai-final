import React, { useState, useMemo } from 'react';
import { Search, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { popularLanguages, countryLanguageMap } from '../data/languages';

const LanguagePopup = ({ onSelectLanguage, isEasyMode }) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLanguages = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return popularLanguages;

    // Check if the term matches a country
    const matchedCountry = Object.keys(countryLanguageMap).find(country => 
      country.includes(term) || term.includes(country)
    );

    if (matchedCountry) {
      const countryLangs = countryLanguageMap[matchedCountry];
      // Create ad-hoc language objects for country-specific languages that might not be in the popular list
      return countryLangs.map(langName => {
        const existingLang = popularLanguages.find(l => l.name.toLowerCase() === langName.toLowerCase());
        return existingLang || { code: langName.substring(0,2).toLowerCase(), name: langName, nativeName: langName };
      });
    }

    // Otherwise filter by language name
    return popularLanguages.filter(lang => 
      lang.name.toLowerCase().includes(term) || 
      lang.nativeName.toLowerCase().includes(term)
    );
  }, [searchTerm]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className={`glass w-full max-w-md p-6 rounded-3xl shadow-2xl animate-slide-up border border-slate-700/50 ${isEasyMode ? 'scale-110' : ''}`}>
        
        <div className="flex items-center gap-3 mb-6 justify-center">
          <Globe className="text-cyan-400 w-8 h-8" />
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
            {t('chooseLanguage', 'Choose Your Language')}
          </h2>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <Search className="w-5 h-5 text-slate-400" />
          </div>
          <input
            type="text"
            className="w-full pl-12 pr-4 py-4 bg-slate-800/80 border border-slate-600 rounded-2xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-slate-400 transition-all outline-none"
            placeholder={t('searchLanguage', 'Search your language or country...')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
          {filteredLanguages.length > 0 ? (
            filteredLanguages.map((lang, index) => (
              <button
                key={`${lang.code}-${index}`}
                onClick={() => onSelectLanguage(lang.code)}
                className="w-full flex items-center justify-between p-4 rounded-xl bg-slate-800/40 hover:bg-slate-700/60 border border-transparent hover:border-slate-600 transition-all group"
              >
                <span className="font-semibold text-lg text-slate-200 group-hover:text-cyan-300 transition-colors">
                  {lang.name}
                </span>
                <span className="text-sm text-slate-400 group-hover:text-slate-300">
                  {lang.nativeName}
                </span>
              </button>
            ))
          ) : (
            <div className="text-center py-6 text-slate-400">
              {t('noLanguagesFound', 'No languages found.')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LanguagePopup;
