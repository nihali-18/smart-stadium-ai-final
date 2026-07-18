import React from 'react';
import { useParams, useNavigate, useOutletContext, useLocation } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const FeaturePlaceholder = () => {
  const { featureId } = useParams();
  const navigate = useNavigate();
  const { isEasyMode } = useOutletContext();
  const { t } = useTranslation();
  const location = useLocation();
  const isFanRoute = location.pathname.startsWith('/dashboard/fan');
  const appliedEasyMode = isFanRoute && isEasyMode;

  const featureTitles = {
    chat: t('aiChatAssistant', 'AI Chat Assistant'),
    match: t('liveMatchInfo', 'Live Match Info'),
    map: t('stadiumMap', 'Stadium Map'),
    food: t('foodOrdering', 'Food Ordering'),
    ticket: t('ticketInfo', 'Ticket Info'),
    nav: t('navigation', 'Navigation'),
    tasks: t('assignedTasks', 'Assigned Tasks'),
    scanner: t('qrTicketScanner', 'QR Ticket Scanner'),
    incident: t('incidentReporting', 'Incident Reporting'),
    crowd: t('crowdManagement', 'Crowd Management'),
    lost: t('lostAndFound', 'Lost & Found'),
    analytics: t('liveCrowdAnalytics', 'Live Crowd Analytics'),
    volunteers: t('volunteerManagement', 'Volunteer Management'),
    announcements: t('announcements', 'Announcements'),
    reports: t('reportsAndAnalytics', 'Reports & Analytics'),
    settings: t('settings', 'Settings'),
  };

  const isVolunteerRoute = location.pathname.startsWith('/dashboard/volunteer');
  const isOrganizerRoute = location.pathname.startsWith('/dashboard/organizer');

  let title = featureId ? (featureId.charAt(0).toUpperCase() + featureId.slice(1).replace(/-/g, ' ')) : 'Feature';
  
  if (featureId) {
    if (featureId === 'profile') {
      title = isVolunteerRoute ? t('volunteerProfile', 'Volunteer Profile') : t('profile', 'Profile');
    } else if (featureId === 'emergency') {
      title = isOrganizerRoute ? t('emergencyControl', 'Emergency Control') : t('emergencyHelp', 'Emergency Help');
    } else if (featureId === 'match' && isOrganizerRoute) {
      title = t('matchControl', 'Match Control');
    } else {
      title = featureTitles[featureId] || title;
    }
  }

  return (
    <div className="min-h-screen flex flex-col p-6 bg-slate-900 animate-fade-in relative items-center justify-center">
      <button 
        onClick={() => navigate(-1)}
        className="absolute top-8 left-8 flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className={appliedEasyMode ? 'text-xl' : 'text-base'}>{t('back', 'Back')}</span>
      </button>

      <div className="flex flex-col items-center gap-6 max-w-lg text-center bg-slate-800/50 p-12 rounded-3xl border border-slate-700 shadow-xl">
        <div className="p-6 rounded-full bg-slate-700/50">
          <Clock className={`text-slate-400 ${appliedEasyMode ? 'w-24 h-24' : 'w-16 h-16'}`} />
        </div>
        <h2 className={`font-bold text-white ${appliedEasyMode ? 'text-5xl' : 'text-3xl'}`}>
          {title}
        </h2>
        <p className={`text-slate-400 ${appliedEasyMode ? 'text-2xl' : 'text-lg'}`}>
          {t('underDevelopment', 'This feature is currently under development. Please check back later.')}
        </p>
        <button
          onClick={() => navigate(-1)}
          className={`mt-4 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold hover:scale-105 transition-all duration-300 ${appliedEasyMode ? 'text-2xl' : 'text-lg'}`}
        >
          {t('returnToDashboard', 'Return to Dashboard')}
        </button>
      </div>
    </div>
  );
};

export default FeaturePlaceholder;
