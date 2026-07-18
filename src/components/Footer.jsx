import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();
  
  return (
    <footer className="bg-slate-950 border-t border-slate-800 py-10 px-6 text-center text-slate-400 relative z-20">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <div>
          <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
            {t('footer.title', 'Smart Stadium AI')}
          </h3>
          <p className="text-blue-200 mt-2 font-medium">{t('footer.tagline', 'Making Every Match Smarter, Safer & More Accessible.')}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm md:text-base">
          <div className="space-y-2 md:text-right md:border-r border-slate-800 md:pr-8">
            <p className="text-slate-500 uppercase tracking-wider text-xs font-semibold mb-3">{t('footer.builtBy', 'Built by:')}</p>
            <p className="font-bold text-white text-lg">Nihali Naik</p>
          </div>

          <div className="space-y-2 md:text-left md:pl-8">
            <p className="text-slate-500 uppercase tracking-wider text-xs font-semibold mb-3">{t('footer.poweredBy', 'Powered by:')}</p>
            <ul className="space-y-1 font-medium text-slate-300">
              <li>Google Gemini</li>
              <li>React</li>
              <li>Tailwind CSS</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800/50 flex flex-col md:flex-row justify-center items-center gap-4 text-sm text-slate-500">
          <p className="font-medium bg-slate-800/50 px-3 py-1 rounded-full">{t('footer.version', 'Version 1.0')}</p>
          <p className="hidden md:block">•</p>
          <p>{t('footer.copyright', '© 2026 Smart Stadium AI. All Rights Reserved.')}</p>
        </div>
      </div>
    </footer>
  );
}
