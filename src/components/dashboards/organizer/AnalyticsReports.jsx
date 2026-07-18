import React, { useState } from 'react';
import { ArrowLeft, BarChart3, Download, RefreshCw, Users, Ticket, DollarSign, ShieldAlert, Activity, CheckCircle } from 'lucide-react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const AnalyticsReports = () => {
  const navigate = useNavigate();
  const { isEasyMode } = useOutletContext();
  const { t } = useTranslation();

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  // Mock Analytics State
  const [stats, setStats] = useState({
    attendance: 42500,
    checkIns: 38200,
    revenue: 2125000,
    incidents: 12,
    efficiency: 94,
    crowdStatus: 'Optimal',
    zones: [
      { name: 'North Stand', current: 12000, capacity: 15000 },
      { name: 'South Stand', current: 14500, capacity: 15000 },
      { name: 'East Stand', current: 9000, capacity: 10000 },
      { name: 'West Stand', current: 7000, capacity: 10000 }
    ],
    incidentsBreakdown: [
      { type: 'Medical', count: 3, color: 'bg-red-500' },
      { type: 'Security', count: 2, color: 'bg-orange-500' },
      { type: 'Equipment', count: 5, color: 'bg-yellow-500' },
      { type: 'Other', count: 2, color: 'bg-slate-500' }
    ]
  });

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setStats(prev => ({
        ...prev,
        attendance: prev.attendance + Math.floor(Math.random() * 50),
        checkIns: prev.checkIns + Math.floor(Math.random() * 100),
        efficiency: Math.min(100, Math.max(80, prev.efficiency + (Math.random() > 0.5 ? 1 : -1))),
        zones: prev.zones.map(z => ({
          ...z,
          current: Math.min(z.capacity, z.current + Math.floor(Math.random() * 20))
        }))
      }));
      setIsRefreshing(false);
    }, 1000);
  };

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className={`min-h-screen flex flex-col p-6 bg-slate-900 animate-fade-in relative pb-20 ${isEasyMode ? 'text-lg' : 'text-base'}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pt-4 md:pt-0 flex-wrap gap-4 pr-16 md:pr-40">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center justify-center p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-700 transition-colors shrink-0"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className={`font-bold text-white ${isEasyMode ? 'text-4xl' : 'text-3xl'}`}>
            {t('reportsAndAnalytics', 'Reports & Analytics')}
          </h2>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors border border-slate-700"
          >
            <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin text-blue-400' : 'text-slate-400'}`} />
            <span className="hidden sm:inline">{t('refreshAnalytics', 'Refresh Analytics')}</span>
          </button>
          <button 
            onClick={handleExport}
            disabled={isExporting}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors shadow-lg shadow-blue-500/20"
          >
            {isExporting ? (
              <RefreshCw className="w-5 h-5 animate-spin" />
            ) : (
              <Download className="w-5 h-5" />
            )}
            <span className="hidden sm:inline">{t('exportReport', 'Export Report')}</span>
          </button>
        </div>
      </div>

      {exportSuccess && (
        <div className="max-w-6xl mx-auto w-full mb-6 p-4 bg-emerald-500/20 border border-emerald-500/50 rounded-xl flex items-center gap-3 animate-fade-in">
          <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
          <p className="text-emerald-400 font-medium">{t('reportExportSuccess', 'Report successfully generated and downloaded.')}</p>
        </div>
      )}

      <div className="max-w-6xl mx-auto w-full space-y-6">
        
        {/* Top Summary Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700 flex flex-col justify-center">
            <div className="flex items-center justify-between mb-2">
              <p className="text-slate-400 text-sm">{t('attendance', 'Attendance')}</p>
              <Users className="w-4 h-4 text-blue-400" />
            </div>
            <p className={`font-bold text-white ${isEasyMode ? 'text-2xl' : 'text-xl'}`}>{stats.attendance.toLocaleString()}</p>
          </div>
          
          <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700 flex flex-col justify-center">
            <div className="flex items-center justify-between mb-2">
              <p className="text-slate-400 text-sm">{t('checkedIn', 'Checked In')}</p>
              <Ticket className="w-4 h-4 text-emerald-400" />
            </div>
            <p className={`font-bold text-white ${isEasyMode ? 'text-2xl' : 'text-xl'}`}>{stats.checkIns.toLocaleString()}</p>
          </div>

          <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700 flex flex-col justify-center">
            <div className="flex items-center justify-between mb-2">
              <p className="text-slate-400 text-sm">{t('mockRevenue', 'Revenue (Mock)')}</p>
              <DollarSign className="w-4 h-4 text-green-400" />
            </div>
            <p className={`font-bold text-white ${isEasyMode ? 'text-2xl' : 'text-xl'}`}>${(stats.revenue / 1000).toFixed(1)}k</p>
          </div>

          <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700 flex flex-col justify-center">
            <div className="flex items-center justify-between mb-2">
              <p className="text-slate-400 text-sm">{t('incidents', 'Incidents')}</p>
              <ShieldAlert className="w-4 h-4 text-red-400" />
            </div>
            <p className={`font-bold text-white ${isEasyMode ? 'text-2xl' : 'text-xl'}`}>{stats.incidents}</p>
          </div>

          <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700 flex flex-col justify-center">
            <div className="flex items-center justify-between mb-2">
              <p className="text-slate-400 text-sm">{t('efficiency', 'Efficiency')}</p>
              <Activity className="w-4 h-4 text-indigo-400" />
            </div>
            <p className={`font-bold text-white ${isEasyMode ? 'text-2xl' : 'text-xl'}`}>{stats.efficiency}%</p>
          </div>

          <div className="bg-slate-800/50 p-4 rounded-2xl border border-emerald-500/30 flex flex-col justify-center">
            <div className="flex items-center justify-between mb-2">
              <p className="text-emerald-400 text-sm">{t('crowdStatus', 'Crowd Status')}</p>
              <CheckCircle className="w-4 h-4 text-emerald-400" />
            </div>
            <p className={`font-bold text-white ${isEasyMode ? 'text-2xl' : 'text-xl'}`}>{t(`status${stats.crowdStatus}`, stats.crowdStatus)}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Zone-wise Attendance Chart (Mock) */}
          <div className="bg-slate-800/80 rounded-3xl p-6 border border-slate-700 flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-500/20 rounded-xl">
                <BarChart3 className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className={`font-bold text-white ${isEasyMode ? 'text-2xl' : 'text-xl'}`}>
                {t('zoneWiseAttendance', 'Zone-wise Attendance')}
              </h3>
            </div>
            
            <div className="space-y-5 flex-1 flex flex-col justify-center">
              {stats.zones.map(zone => {
                const percentage = Math.round((zone.current / zone.capacity) * 100);
                let barColor = 'bg-blue-500';
                if (percentage > 90) barColor = 'bg-red-500';
                else if (percentage > 75) barColor = 'bg-orange-500';
                else if (percentage > 50) barColor = 'bg-yellow-500';

                return (
                  <div key={zone.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-300 font-medium">{t(zone.name.replace(/\s+/g, ''), zone.name)}</span>
                      <span className="text-slate-400">{zone.current.toLocaleString()} / {zone.capacity.toLocaleString()} ({percentage}%)</span>
                    </div>
                    <div className="w-full h-3 bg-slate-700/50 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${barColor} transition-all duration-1000 rounded-full`} 
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Incident Breakdown Chart (Mock) */}
          <div className="bg-slate-800/80 rounded-3xl p-6 border border-slate-700 flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-500/20 rounded-xl">
                <ShieldAlert className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className={`font-bold text-white ${isEasyMode ? 'text-2xl' : 'text-xl'}`}>
                {t('incidentStatistics', 'Incident Statistics')}
              </h3>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 flex-1">
              {/* Mock Donut Chart using CSS */}
              <div className="relative w-48 h-48 rounded-full flex items-center justify-center bg-slate-700 border-[16px] border-slate-700" 
                   style={{
                     background: `conic-gradient(
                       #ef4444 0% ${stats.incidentsBreakdown[0].count * (100/12)}%, 
                       #f97316 ${stats.incidentsBreakdown[0].count * (100/12)}% ${(stats.incidentsBreakdown[0].count + stats.incidentsBreakdown[1].count) * (100/12)}%, 
                       #eab308 ${(stats.incidentsBreakdown[0].count + stats.incidentsBreakdown[1].count) * (100/12)}% ${(stats.incidentsBreakdown[0].count + stats.incidentsBreakdown[1].count + stats.incidentsBreakdown[2].count) * (100/12)}%, 
                       #64748b ${(stats.incidentsBreakdown[0].count + stats.incidentsBreakdown[1].count + stats.incidentsBreakdown[2].count) * (100/12)}% 100%
                     )`
                   }}>
                <div className="w-32 h-32 bg-slate-800 rounded-full flex flex-col items-center justify-center border-4 border-slate-800/80">
                  <span className={`font-bold text-white ${isEasyMode ? 'text-4xl' : 'text-3xl'}`}>{stats.incidents}</span>
                  <span className="text-slate-400 text-xs text-center">{t('totalIncidents', 'Total Incidents')}</span>
                </div>
              </div>

              {/* Legend */}
              <div className="space-y-4 w-full sm:w-auto">
                {stats.incidentsBreakdown.map(inc => (
                  <div key={inc.type} className="flex items-center justify-between gap-6">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${inc.color}`}></div>
                      <span className="text-slate-300">{t(`incType${inc.type}`, inc.type)}</span>
                    </div>
                    <span className="text-white font-bold">{inc.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AnalyticsReports;
