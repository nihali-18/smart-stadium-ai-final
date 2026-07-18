import React from 'react';
import { BarChart3, Users, Settings, Megaphone, ShieldAlert, FileText, Activity, LogOut } from 'lucide-react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const OrganizerDashboard = () => {
  const navigate = useNavigate();
  const { setAuthState } = useOutletContext();
  const { t } = useTranslation();

  const handleLogout = () => {
    setAuthState({ role: null, isAuthenticated: false });
    navigate('/login/organizer', { replace: true });
  };

  const widgets = [
    { id: 'analytics', title: t('liveCrowdAnalytics', 'Live Crowd Analytics'), icon: BarChart3, color: 'from-blue-500 to-indigo-600' },
    { id: 'volunteers', title: t('volunteerManagement', 'Volunteer Management'), icon: Users, color: 'from-emerald-500 to-green-600' },
    { id: 'match', title: t('matchControl', 'Match Control'), icon: Activity, color: 'from-purple-500 to-fuchsia-600' },
    { id: 'announcements', title: t('announcements', 'Announcements'), icon: Megaphone, color: 'from-orange-500 to-red-500' }
  ];

  return (
    <div className="min-h-screen flex flex-col p-6 bg-slate-900 animate-fade-in relative">
      <div className="flex items-center justify-between mb-8 gap-4 pt-4 pl-4 pr-24 md:pl-8 md:pr-48">
        <h2 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 text-3xl md:text-4xl">
          {t('organizerCommandCenter', 'Organizer Command Center')}
        </h2>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 text-slate-400 hover:text-red-400 transition-colors"
        >
          <LogOut className="w-6 h-6" />
          <span className="hidden sm:inline">{t('logout', 'Logout')}</span>
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto w-full px-4 md:px-8">
        {widgets.map((widget, index) => {
          const Icon = widget.icon;
          return (
            <button
              key={widget.id}
              onClick={() => navigate(`/dashboard/organizer/${widget.id}`)}
              className={`group relative flex flex-col items-center p-6 md:p-8 rounded-3xl bg-slate-800/50 border border-slate-700 hover:border-slate-500 hover:bg-slate-700/50 transition-all duration-300 animate-slide-up focus:outline-none hover:scale-105 ${widget.id === 'analytics' ? 'col-span-2 row-span-2 justify-center' : ''}`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className={`mb-4 p-4 rounded-2xl bg-gradient-to-br ${widget.color} shadow-lg shadow-${widget.color.split('-')[1]}/20`}>
                <Icon className={`text-white ${widget.id === 'analytics' ? 'w-16 h-16' : 'w-8 h-8'}`} />
              </div>
              <h3 className={`font-bold text-white text-center ${widget.id === 'analytics' ? 'text-3xl' : 'text-lg'}`}>
                {widget.title}
              </h3>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default OrganizerDashboard;
