import React from 'react';
import { Smartphone, Glasses, ArrowLeft } from 'lucide-react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const FanExperience = () => {
  const navigate = useNavigate();
  const { isEasyMode, setIsEasyMode } = useOutletContext();
  const { t } = useTranslation();

  const onSelectMode = (modeId) => {
    if (modeId === 'easy') {
      setIsEasyMode(true);
    } else {
      setIsEasyMode(false);
    }
    navigate('/dashboard/fan');
  };

  const onBack = () => {
    navigate(-1);
  };

  const modes = [
    {
      id: 'standard',
      title: t('standardMode'),
      description: t('standardDesc'),
      icon: Smartphone,
      color: 'from-cyan-500 to-blue-500'
    },
    {
      id: 'easy',
      title: t('easyMode'),
      description: t('easyDesc'),
      icon: Glasses,
      color: 'from-green-400 to-emerald-600'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-900 animate-fade-in relative">
      <button 
        onClick={onBack}
        className="absolute top-8 left-8 flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className={isEasyMode ? 'text-xl' : 'text-base'}>{t('back')}</span>
      </button>

      <div className="w-full max-w-4xl">
        <h2 className={`font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 ${isEasyMode ? 'text-5xl md:text-6xl' : 'text-3xl md:text-5xl'}`}>
          {t('chooseExperience')}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {modes.map((mode, index) => {
            const Icon = mode.icon;
            return (
              <button
                key={mode.id}
                onClick={() => onSelectMode(mode.id)}
                className="group relative flex flex-col items-center p-8 md:p-12 rounded-3xl bg-slate-800/50 border border-slate-700 hover:border-slate-500 hover:bg-slate-700/50 transition-all duration-300 animate-slide-up focus:outline-none"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`mb-6 p-5 rounded-2xl bg-gradient-to-br ${mode.color} shadow-lg shadow-${mode.color.split('-')[1]}/20`}>
                  <Icon className="w-12 h-12 text-white" />
                </div>
                
                <h3 className={`font-bold text-white mb-4 ${isEasyMode ? 'text-4xl' : 'text-2xl'}`}>
                  {mode.title}
                </h3>
                <p className={`text-slate-400 text-center ${isEasyMode ? 'text-2xl' : 'text-base'}`}>
                  {mode.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FanExperience;
