import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Info, CheckCircle2 } from 'lucide-react';
import { useNavigate, useOutletContext } from 'react-router-dom';

export default function About() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  // Safe extraction in case it's rendered outside of Outlet with context
  const context = useOutletContext();
  const isEasyMode = context?.isEasyMode || false;

  return (
    <div className={`min-h-screen p-6 bg-slate-900 animate-fade-in flex flex-col items-center pt-20 pb-20 ${isEasyMode ? 'text-xl' : 'text-base'}`}>
      <div className="w-full max-w-4xl relative">
        <button 
          onClick={() => navigate(-1)} 
          className="absolute -top-12 left-0 flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
          <span className="hidden sm:inline">{t('common.back', 'Back')}</span>
        </button>

        <div className="bg-slate-800/50 border border-slate-700 p-8 md:p-12 rounded-3xl shadow-2xl backdrop-blur-sm text-center">
          
          <div className="mb-8">
            <h1 className={`font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-blue-500 drop-shadow-lg mb-4 ${isEasyMode ? 'text-6xl md:text-7xl' : 'text-4xl md:text-6xl'}`}>
              {t('about.projectName', 'Smart Stadium AI')}
            </h1>
            <p className={`text-blue-200 italic font-medium ${isEasyMode ? 'text-2xl' : 'text-xl'}`}>
              "{t('about.tagline', 'Making Every Match Smarter, Safer and More Accessible.')}"
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-12">
            <p className={`text-slate-300 leading-relaxed ${isEasyMode ? 'text-2xl' : 'text-lg'}`}>
              {t('about.description', 'Smart Stadium AI is an AI-powered stadium management platform helping Fans, Volunteers, Organizers and Ground Staff.')}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-700/50">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <CheckCircle2 className="text-cyan-400" />
                  {t('about.featuresTitle', 'Major Features')}
                </h2>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />{t('about.feature1', 'AI Chat Assistant')}</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />{t('about.feature2', 'Ticket Information')}</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />{t('about.feature3', 'Live Match Information')}</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />{t('about.feature4', 'Stadium Map')}</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />{t('about.feature5', 'Volunteer Dashboard')}</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />{t('about.feature6', 'Organizer Dashboard')}</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />{t('about.feature7', 'Ground Staff Dashboard')}</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />{t('about.feature8', 'Multi-language Support')}</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />{t('about.feature9', 'Easy Mode Accessibility')}</li>
                </ul>
              </div>

              <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-700/50 h-fit">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <Info className="text-blue-400" />
                  {t('about.techStackTitle', 'Technology Stack')}
                </h2>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400" />{t('about.tech1', 'React')}</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400" />{t('about.tech2', 'Tailwind CSS')}</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400" />{t('about.tech3', 'Lucide React')}</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400" />{t('about.tech4', 'Google Gemini API')}</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400" />{t('about.tech5', 'Firebase Ready Architecture')}</li>
                </ul>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-700/50">
              <span className="inline-block px-4 py-2 bg-slate-900 rounded-full text-slate-400 font-medium mb-3 border border-slate-700">
                {t('about.version', 'Version 1.0')}
              </span>
              <p className="text-blue-400 font-bold tracking-wide uppercase text-sm mt-2">
                {t('about.prototype', 'Prototype for Google AI Challenge')}
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
