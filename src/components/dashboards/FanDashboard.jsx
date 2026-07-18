import React from 'react';
import { MessageSquare, Activity, Map, Coffee, Ticket, AlertTriangle, Navigation, User, ArrowLeft, Star } from 'lucide-react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const FanDashboard = () => {
  const navigate = useNavigate();
  const { isEasyMode } = useOutletContext();
  const { t } = useTranslation();

  const widgets = [
    { id: 'chat', title: t('aiChatAssistant', 'AI Chat Assistant'), icon: MessageSquare, color: 'from-blue-500 to-cyan-500' },
    { id: 'match', title: t('liveMatchInfo', 'Live Match Info'), icon: Activity, color: 'from-green-500 to-emerald-500' },
    { id: 'map', title: t('stadiumMap', 'Stadium Map'), icon: Map, color: 'from-purple-500 to-pink-500' },
    { id: 'ticket', title: t('ticketInfo', 'Ticket Info'), icon: Ticket, color: 'from-indigo-500 to-blue-600' },
    { id: 'nav', title: t('navigation', 'Navigation'), icon: Navigation, color: 'from-teal-400 to-emerald-400' },
    { id: 'feedback', title: t('fan.feedback', 'Fan Feedback'), icon: Star, color: 'from-yellow-400 to-orange-500' }
  ];

  return (
    <div className="min-h-screen flex flex-col p-6 bg-slate-900 animate-fade-in relative">
      <div className="flex items-center mb-8 gap-4 pt-4 px-4 md:px-8">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className={`font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 ${isEasyMode ? 'text-5xl md:text-6xl' : 'text-3xl md:text-4xl'}`}>
          {t('fanDashboard', 'Fan Dashboard')}
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto w-full px-4 md:px-8">
        {widgets.map((widget, index) => {
          const Icon = widget.icon;
          return (
            <button
              key={widget.id}
              onClick={() => navigate(`/dashboard/fan/${widget.id}`)}
              className="group relative flex flex-col items-center p-6 md:p-8 rounded-3xl bg-slate-800/50 border border-slate-700 hover:border-slate-500 hover:bg-slate-700/50 transition-all duration-300 animate-slide-up focus:outline-none hover:scale-105"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className={`mb-4 p-4 rounded-2xl bg-gradient-to-br ${widget.color} shadow-lg shadow-${widget.color.split('-')[1]}/20`}>
                <Icon className={`text-white ${isEasyMode ? 'w-12 h-12' : 'w-8 h-8'}`} />
              </div>
              <h3 className={`font-bold text-white text-center ${isEasyMode ? 'text-2xl' : 'text-lg'}`}>
                {widget.title}
              </h3>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FanDashboard;
