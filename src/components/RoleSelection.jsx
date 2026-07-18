import React from 'react';
import { Users, HeartHandshake, ShieldCheck, ArrowLeft, Briefcase } from 'lucide-react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const RoleSelection = () => {
  const navigate = useNavigate();
  const { isEasyMode } = useOutletContext();
  const { t } = useTranslation();

  const onSelectRole = (role) => {
    if (role === 'fan') {
      navigate('/fan-experience');
    } else if (role === 'volunteer') {
      navigate('/login/volunteer');
    } else if (role === 'organizer') {
      navigate('/login/organizer');
    } else if (role === 'staff') {
      navigate('/login/staff');
    }
  };

  const onBack = () => {
    navigate(-1);
  };

  const roles = [
    { id: 'fan', title: t('roleFan'), icon: Users, color: 'from-blue-500 to-cyan-400' },
    { id: 'volunteer', title: t('roleVolunteer'), icon: HeartHandshake, color: 'from-purple-500 to-pink-500' },
    { id: 'organizer', title: t('roleOrganizer'), icon: ShieldCheck, color: 'from-orange-500 to-yellow-500' },
    { id: 'staff', title: t('roleStaff', 'On-Ground Staff'), icon: Briefcase, color: 'from-indigo-500 to-cyan-500' }
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

      <div className="w-full max-w-5xl">
        <h2 className={`font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 ${isEasyMode ? 'text-5xl md:text-6xl' : 'text-3xl md:text-5xl'}`}>
          {t('selectRole')}
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {roles.map((role, index) => {
            const Icon = role.icon;
            return (
              <button
                key={role.id}
                onClick={() => onSelectRole(role.id)}
                className="group relative p-1 rounded-3xl overflow-hidden animate-slide-up hover:scale-105 transition-all duration-300 focus:outline-none"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Gradient Border */}
                <div className={`absolute inset-0 bg-gradient-to-br ${role.color} opacity-40 group-hover:opacity-100 transition-opacity`} />
                
                {/* Card Content */}
                <div className="relative h-full bg-slate-900/90 backdrop-blur-xl rounded-[22px] p-8 md:p-12 flex flex-col items-center justify-center gap-6 border border-white/10 group-hover:bg-slate-800/90 transition-colors">
                  <div className={`p-4 rounded-full bg-gradient-to-br ${role.color} bg-opacity-20`}>
                    <Icon className={`text-white ${isEasyMode ? 'w-24 h-24' : 'w-16 h-16'} drop-shadow-md`} />
                  </div>
                  <h3 className={`font-bold text-white ${isEasyMode ? 'text-4xl' : 'text-2xl'}`}>
                    {role.title}
                  </h3>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
