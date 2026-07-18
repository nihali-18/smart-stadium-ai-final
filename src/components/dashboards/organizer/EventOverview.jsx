import React, { useState } from 'react';
import { ArrowLeft, RefreshCw, Activity, Users, Ticket, CheckCircle, ShieldAlert, Sun, Car, X, Calendar, MapPin, Clock } from 'lucide-react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getSharedMatchData } from '../../../data/matchData';

const EventOverview = () => {
  const navigate = useNavigate();
  const { isEasyMode } = useOutletContext();
  const { t } = useTranslation();

  const sharedData = getSharedMatchData(t);
  const matchData = {
    ...sharedData,
    date: sharedData.matchDate,
    time: sharedData.matchTime,
    stadium: sharedData.venue
  };

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Mock Stats State
  const [stats, setStats] = useState({
    totalVisitors: 42500,
    ticketsSold: 45000,
    availableSeats: 5000,
    activeVolunteers: 120,
    activeIncidents: 3,
    status: 'Live',
    weather: 'Clear, 22°C',
    parking: '75% Full',
    gatesOpen: '16:00'
  });

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setStats(prev => ({
        ...prev,
        totalVisitors: prev.totalVisitors + Math.floor(Math.random() * 100),
        activeIncidents: Math.max(0, prev.activeIncidents + (Math.random() > 0.5 ? 1 : -1)),
        parking: `${Math.min(100, parseInt(prev.parking) + Math.floor(Math.random() * 5))}% Full`
      }));
      setIsRefreshing(false);
    }, 1000);
  };

  return (
    <div className={`min-h-screen flex flex-col p-6 bg-slate-900 animate-fade-in relative pb-20 ${isEasyMode ? 'text-lg' : 'text-base'}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pt-4 md:pt-0 pr-16 md:pr-40">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center justify-center p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-700 transition-colors shrink-0"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className={`font-bold text-white ${isEasyMode ? 'text-4xl' : 'text-3xl'}`}>
            {t('matchControl', 'Match Control')}
          </h2>
        </div>
        <button 
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors border border-slate-700"
        >
          <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin text-blue-400' : 'text-slate-400'}`} />
          <span className="hidden sm:inline">{t('refreshData', 'Refresh Data')}</span>
        </button>
      </div>

      <div className="max-w-6xl mx-auto w-full space-y-6">
        
        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700 flex flex-col items-center text-center">
            <Users className="w-6 h-6 text-blue-400 mb-2" />
            <p className="text-slate-400 text-sm mb-1">{t('totalVisitors', 'Total Visitors')}</p>
            <p className={`font-bold text-white ${isEasyMode ? 'text-2xl' : 'text-xl'}`}>{stats.totalVisitors.toLocaleString()}</p>
          </div>
          <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700 flex flex-col items-center text-center">
            <Ticket className="w-6 h-6 text-emerald-400 mb-2" />
            <p className="text-slate-400 text-sm mb-1">{t('ticketsSold', 'Tickets Sold')}</p>
            <p className={`font-bold text-white ${isEasyMode ? 'text-2xl' : 'text-xl'}`}>{stats.ticketsSold.toLocaleString()}</p>
          </div>
          <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700 flex flex-col items-center text-center">
            <CheckCircle className="w-6 h-6 text-indigo-400 mb-2" />
            <p className="text-slate-400 text-sm mb-1">{t('availableSeats', 'Available Seats')}</p>
            <p className={`font-bold text-white ${isEasyMode ? 'text-2xl' : 'text-xl'}`}>{stats.availableSeats.toLocaleString()}</p>
          </div>
          <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700 flex flex-col items-center text-center">
            <Activity className="w-6 h-6 text-yellow-400 mb-2" />
            <p className="text-slate-400 text-sm mb-1">{t('activeVolunteers', 'Active Volunteers')}</p>
            <p className={`font-bold text-white ${isEasyMode ? 'text-2xl' : 'text-xl'}`}>{stats.activeVolunteers}</p>
          </div>
          <div className="bg-slate-800/50 p-4 rounded-2xl border border-red-500/30 flex flex-col items-center text-center">
            <ShieldAlert className="w-6 h-6 text-red-400 mb-2" />
            <p className="text-red-400 text-sm mb-1">{t('activeIncidents', 'Active Incidents')}</p>
            <p className={`font-bold text-white ${isEasyMode ? 'text-2xl' : 'text-xl'}`}>{stats.activeIncidents}</p>
          </div>
          <div className="bg-slate-800/50 p-4 rounded-2xl border border-emerald-500/30 flex flex-col items-center text-center">
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse mb-3 mt-1"></div>
            <p className="text-emerald-400 text-sm mb-1">{t('eventStatus', 'Event Status')}</p>
            <p className={`font-bold text-white ${isEasyMode ? 'text-2xl' : 'text-xl'}`}>{t(`status${stats.status}`, stats.status)}</p>
          </div>
        </div>

        {/* Event Details Card */}
        <div className="bg-slate-800/80 rounded-3xl p-6 md:p-8 border border-slate-700 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-semibold mb-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                {t('matchInProgress', 'Match In Progress')}
              </div>
              <h3 className={`font-bold text-white mb-2 ${isEasyMode ? 'text-4xl' : 'text-3xl'}`}>
                {t(matchData.homeTeam.replace(/\s+/g, ''), matchData.homeTeam)} vs {t(matchData.awayTeam.replace(/\s+/g, ''), matchData.awayTeam)}
              </h3>
              <p className="text-slate-400">{t('matchName', 'UEFA Champions League Final')}</p>
            </div>
            
            <button 
              onClick={() => setShowModal(true)}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-colors font-bold whitespace-nowrap"
            >
              {t('viewEventDetails', 'View Event Details')}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50 flex items-start gap-3">
              <Calendar className="w-5 h-5 text-indigo-400 shrink-0" />
              <div>
                <p className="text-slate-500 text-xs">{t('matchDate', 'Match Date')}</p>
                <p className="text-slate-200 font-medium">{matchData.date}</p>
              </div>
            </div>
            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50 flex items-start gap-3">
              <Clock className="w-5 h-5 text-indigo-400 shrink-0" />
              <div>
                <p className="text-slate-500 text-xs">{t('matchTime', 'Match Time')}</p>
                <p className="text-slate-200 font-medium">{matchData.time}</p>
              </div>
            </div>
            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50 flex items-start gap-3">
              <MapPin className="w-5 h-5 text-indigo-400 shrink-0" />
              <div>
                <p className="text-slate-500 text-xs">{t('venue', 'Venue')}</p>
                <p className="text-slate-200 font-medium">{t(matchData.stadium.replace(/\s+/g, ''), matchData.stadium)}</p>
              </div>
            </div>
            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50 flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 shrink-0" />
              <div>
                <p className="text-slate-500 text-xs">{t('weather', 'Weather')}</p>
                <p className="text-slate-200 font-medium">{t('weatherClear', 'Clear')}, 22°C</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Detailed Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-800 rounded-3xl w-full max-w-2xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-slate-700 flex items-center justify-between bg-slate-800/80 sticky top-0">
              <h3 className={`font-bold text-white ${isEasyMode ? 'text-3xl' : 'text-2xl'}`}>
                {t('eventDetails', 'Event Details')}
              </h3>
              <button 
                onClick={() => setShowModal(false)}
                className="p-2 bg-slate-700 hover:bg-slate-600 text-white rounded-full transition-colors shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
                  <p className="text-slate-500 text-sm mb-1">{t('matchName', 'Match Name')}</p>
                  <p className="text-white font-medium text-lg">{t('matchNameFull', 'UEFA Champions League Final')}</p>
                </div>
                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
                  <p className="text-slate-500 text-sm mb-1">{t('teams', 'Teams')}</p>
                  <p className="text-white font-medium text-lg">{t(matchData.homeTeam.replace(/\s+/g, ''), matchData.homeTeam)} vs {t(matchData.awayTeam.replace(/\s+/g, ''), matchData.awayTeam)}</p>
                </div>
                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
                  <p className="text-slate-500 text-sm mb-1">{t('gatesOpen', 'Gates Open')}</p>
                  <p className="text-white font-medium text-lg">{stats.gatesOpen}</p>
                </div>
                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
                  <p className="text-slate-500 text-sm mb-1">{t('parkingStatus', 'Parking Status')}</p>
                  <p className="text-white font-medium text-lg flex items-center gap-2">
                    <Car className="w-4 h-4 text-indigo-400" />
                    {stats.parking}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default EventOverview;
