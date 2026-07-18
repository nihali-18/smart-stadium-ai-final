import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import stadiumBg from '../assets/stadium.png';

const LandingPage = () => {
  const navigate = useNavigate();
  const { isEasyMode } = useOutletContext();
  const { t } = useTranslation();

  const onGetStarted = () => {
    navigate('/role');
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center animate-fade-in overflow-hidden">
      
      {/* Header Navigation */}
      <header className="absolute top-0 left-0 right-0 z-40 p-6 flex justify-between items-center bg-gradient-to-b from-slate-900/80 to-transparent">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 shadow-lg shadow-cyan-500/20" />
          <span className="text-xl font-bold text-white tracking-tight">{t('header.logo', 'Smart Stadium AI')}</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 text-slate-300 font-medium mr-40">
          <button onClick={() => navigate('/')} className="hover:text-cyan-400 transition-colors">{t('header.home', 'Home')}</button>
          <button onClick={() => navigate('/about')} className="hover:text-cyan-400 transition-colors">{t('header.about', 'About Project')}</button>
        </nav>
      </header>
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${stadiumBg})`,
          filter: 'brightness(0.6)'
        }}
      />
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl w-full">
        <h1 className={`font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-300 drop-shadow-lg mb-6 ${isEasyMode ? 'text-7xl md:text-9xl' : 'text-5xl md:text-7xl'}`}>
          {t('projectTitle')}
        </h1>
        
        <p className={`text-slate-200 mb-10 max-w-2xl mx-auto drop-shadow-md ${isEasyMode ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'}`}>
          {t('projectSubtitle')}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onGetStarted}
            className={`group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 font-bold text-white shadow-xl transition-all hover:scale-105 hover:shadow-cyan-500/25 ${isEasyMode ? 'px-10 py-5 text-2xl' : 'px-8 py-4 text-lg'}`}
          >
            <span className="relative z-10 flex items-center gap-2">
              {t('landing.getStarted', t('getStarted', 'Get Started'))}
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 z-0 bg-gradient-to-r from-cyan-500 to-purple-500 opacity-0 transition-opacity group-hover:opacity-100" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
