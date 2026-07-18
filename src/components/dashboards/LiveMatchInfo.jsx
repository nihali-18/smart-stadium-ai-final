import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, RefreshCw, Activity, Calendar, Clock, MapPin, Cloud, Users, Car } from 'lucide-react';
import { getSharedMatchData } from '../../data/matchData';

const LiveMatchInfo = () => {
  const navigate = useNavigate();
  const { isEasyMode } = useOutletContext();
  const { t } = useTranslation();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const sharedData = getSharedMatchData(t);
  const matchData = {
    ...sharedData,
    time: sharedData.liveTime
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  return (
    <div className={`min-h-screen flex flex-col p-6 bg-slate-900 animate-fade-in ${isEasyMode ? 'text-lg' : 'text-base'}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4 pt-16 sm:pt-0 pr-0 md:pr-48">
        <div className="flex items-center gap-4 flex-wrap">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center justify-center p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-700 transition-colors shrink-0"
            aria-label={t('back', 'Back')}
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className={`font-bold text-white ${isEasyMode ? 'text-3xl' : 'text-2xl'}`}>
            {t('liveMatchInfoTitle', 'Live Match Info')}
          </h2>
        </div>
        <button 
          onClick={handleRefresh}
          className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors border border-slate-700 w-full sm:w-auto shrink-0 ${isRefreshing ? 'opacity-75 cursor-not-allowed' : ''}`}
          disabled={isRefreshing}
        >
          <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>{t('refresh', 'Refresh')}</span>
        </button>
      </div>

      <div className="max-w-4xl mx-auto w-full space-y-6 pb-20">
        <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl p-6 border border-slate-700 shadow-xl">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 w-full mb-4">
              <div className="flex-1 text-center sm:text-right">
                <h3 className={`font-bold text-white ${isEasyMode ? 'text-2xl' : 'text-xl'}`}>{matchData.homeTeam}</h3>
              </div>
              <div className="flex flex-col items-center my-2 sm:my-0">
                <span className={`font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 ${isEasyMode ? 'text-6xl' : 'text-5xl'}`}>
                  {matchData.score}
                </span>
                <span className="text-emerald-400 font-semibold mt-2 animate-pulse flex items-center gap-2">
                  <Activity className="w-4 h-4" /> {matchData.status} • {matchData.time}
                </span>
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className={`font-bold text-white ${isEasyMode ? 'text-2xl' : 'text-xl'}`}>{matchData.awayTeam}</h3>
              </div>
            </div>
            <div className="text-slate-400 flex items-center justify-center gap-2 mt-2">
              <MapPin className="w-4 h-4" />
              <span>{matchData.venue}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
            <h3 className={`font-bold text-white mb-4 ${isEasyMode ? 'text-xl' : 'text-lg'}`}>{t('matchTimeline', 'Match Timeline')}</h3>
            <div className="space-y-4">
              {matchData.timeline.map((event, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <span className="text-cyan-400 font-mono font-bold w-10 shrink-0">{event.time}</span>
                  <div className="flex items-start gap-2 text-slate-200">
                    <span className="shrink-0">
                      {event.type === 'goal' && '⚽'}
                      {event.type === 'yellow' && '🟨'}
                      {event.type === 'red' && '🟥'}
                      {event.type === 'sub' && '🔄'}
                    </span>
                    <span>{event.event} - {event.team}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 flex flex-col justify-center">
            <h3 className={`font-bold text-white mb-4 ${isEasyMode ? 'text-xl' : 'text-lg'}`}>{t('matchStatistics', 'Match Statistics')}</h3>
            <div className="space-y-4 w-full">
              {Object.entries(matchData.stats).map(([key, stat]) => {
                const total = stat.home + stat.away;
                const homePercent = total > 0 ? (stat.home / total) * 100 : 50;

                return (
                  <div key={key} className="space-y-1 w-full">
                    <div className="flex justify-between text-sm text-slate-300">
                      <span className="font-semibold">{stat.home}</span>
                      <span className="text-slate-400 text-xs text-center flex-1 mx-2">{stat.label}</span>
                      <span className="font-semibold">{stat.away}</span>
                    </div>
                    <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden flex">
                      <div className="bg-blue-500 h-full" style={{ width: `${homePercent}%` }}></div>
                      <div className="bg-cyan-500 h-full" style={{ width: `${100 - homePercent}%` }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
            <h3 className={`font-bold text-white mb-4 flex items-center gap-2 ${isEasyMode ? 'text-xl' : 'text-lg'}`}>
              <Calendar className="w-5 h-5 text-blue-400 shrink-0" />
              {t('upcomingMatchesTitle', 'Upcoming Matches')}
            </h3>
            <div className="space-y-4">
              {matchData.upcomingMatches.map((match, idx) => (
                <div key={idx} className="flex flex-col p-3 rounded-xl bg-slate-700/30 border border-slate-700/50">
                  <span className="text-cyan-400 font-semibold text-sm">{match.day}</span>
                  <span className="text-white font-medium my-1">{match.match}</span>
                  <div className="flex items-center gap-1 text-slate-400 text-sm">
                    <Clock className="w-4 h-4 shrink-0" />
                    <span>{match.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
            <h3 className={`font-bold text-white mb-4 ${isEasyMode ? 'text-xl' : 'text-lg'}`}>{t('fanInformationTitle', 'Fan Information')}</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-slate-300">
                <div className="p-2 bg-slate-700 rounded-lg shrink-0"><Clock className="w-5 h-5 text-emerald-400" /></div>
                <span className="mt-1">{matchData.fanInfo.gateOpens}</span>
              </div>
              <div className="flex items-start gap-3 text-slate-300">
                <div className="p-2 bg-slate-700 rounded-lg shrink-0"><Cloud className="w-5 h-5 text-blue-400" /></div>
                <span className="mt-1">{matchData.fanInfo.weather}</span>
              </div>
              <div className="flex items-start gap-3 text-slate-300">
                <div className="p-2 bg-slate-700 rounded-lg shrink-0"><Users className="w-5 h-5 text-amber-400" /></div>
                <span className="mt-1">{matchData.fanInfo.expectedAttendance}</span>
              </div>
              <div className="flex items-start gap-3 text-slate-300">
                <div className="p-2 bg-slate-700 rounded-lg shrink-0"><Car className="w-5 h-5 text-rose-400" /></div>
                <span className="mt-1">{matchData.fanInfo.parkingAvailability}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveMatchInfo;
