import React, { useState } from 'react';
import { ArrowLeft, Users, AlertTriangle, CheckCircle, Activity, ChevronRight, X, Clock } from 'lucide-react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const mockZonesData = [
  {
    id: 'gateA',
    name: 'Gate A',
    density: 85,
    estimatedPeople: 1200,
    riskLevel: 'Orange',
    status: 'highCongestion',
    fallbackStatus: 'High congestion',
    suggestion: 'redirectGateC',
    fallbackSuggestion: 'Redirect visitors to Gate C',
    lastUpdated: '15:24'
  },
  {
    id: 'gateB',
    name: 'Gate B',
    density: 40,
    estimatedPeople: 450,
    riskLevel: 'Green',
    status: 'areaUnderControl',
    fallbackStatus: 'Area under control',
    suggestion: 'none',
    fallbackSuggestion: 'No action required',
    lastUpdated: '15:25'
  },
  {
    id: 'gateC',
    name: 'Gate C',
    density: 65,
    estimatedPeople: 850,
    riskLevel: 'Yellow',
    status: 'moderateTraffic',
    fallbackStatus: 'Moderate traffic',
    suggestion: 'moveVolunteersGateC',
    fallbackSuggestion: 'Move volunteers to Gate C if density increases',
    lastUpdated: '15:22'
  },
  {
    id: 'northStand',
    name: 'North Stand',
    density: 95,
    estimatedPeople: 5500,
    riskLevel: 'Red',
    status: 'medicalAssistanceReq',
    fallbackStatus: 'Medical assistance required',
    suggestion: 'dispatchMedicalNorth',
    fallbackSuggestion: 'Dispatch medical team to North Stand Sector 4',
    lastUpdated: '15:26'
  },
  {
    id: 'southStand',
    name: 'South Stand',
    density: 50,
    estimatedPeople: 2800,
    riskLevel: 'Green',
    status: 'areaUnderControl',
    fallbackStatus: 'Area under control',
    suggestion: 'none',
    fallbackSuggestion: 'No action required',
    lastUpdated: '15:20'
  },
  {
    id: 'eastStand',
    name: 'East Stand',
    density: 75,
    estimatedPeople: 4200,
    riskLevel: 'Orange',
    status: 'highCongestion',
    fallbackStatus: 'High congestion near food court',
    suggestion: 'manageQueueEast',
    fallbackSuggestion: 'Deploy queue management team to East Stand',
    lastUpdated: '15:23'
  },
  {
    id: 'westStand',
    name: 'West Stand',
    density: 60,
    estimatedPeople: 3100,
    riskLevel: 'Yellow',
    status: 'moderateTraffic',
    fallbackStatus: 'Moderate traffic',
    suggestion: 'monitorVIP',
    fallbackSuggestion: 'Monitor VIP entrance flow',
    lastUpdated: '15:25'
  }
];

const CrowdManagement = () => {
  const navigate = useNavigate();
  const { isEasyMode } = useOutletContext();
  const { t } = useTranslation();

  const [zones] = useState(mockZonesData);
  const [selectedZone, setSelectedZone] = useState(null);

  const getRiskColor = (riskLevel) => {
    switch(riskLevel) {
      case 'Green': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
      case 'Yellow': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'Orange': return 'text-orange-400 bg-orange-400/10 border-orange-400/20';
      case 'Red': return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
    }
  };

  const getRiskBgColor = (riskLevel) => {
    switch(riskLevel) {
      case 'Green': return 'bg-emerald-500';
      case 'Yellow': return 'bg-yellow-500';
      case 'Orange': return 'bg-orange-500';
      case 'Red': return 'bg-red-500';
      default: return 'bg-slate-500';
    }
  };

  const getRiskIcon = (riskLevel) => {
    switch(riskLevel) {
      case 'Green': return <CheckCircle className="w-4 h-4" />;
      case 'Yellow': return <Activity className="w-4 h-4" />;
      case 'Orange': return <AlertTriangle className="w-4 h-4" />;
      case 'Red': return <AlertTriangle className="w-4 h-4 animate-pulse" />;
      default: return null;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col p-6 bg-slate-900 animate-fade-in relative pb-20 ${isEasyMode ? 'text-lg' : 'text-base'}`}>
      {/* Header */}
      <div className="flex items-center gap-4 mb-8 pt-4 md:pt-0">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center justify-center p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-700 transition-colors shrink-0"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className={`font-bold text-white ${isEasyMode ? 'text-4xl' : 'text-3xl'}`}>
          {t('crowdManagement', 'Crowd Management')}
        </h2>
      </div>

      <div className="max-w-6xl mx-auto w-full flex flex-col lg:flex-row gap-6">
        
        {/* Zone List */}
        <div className="flex-1 space-y-4">
          {zones.map(zone => (
            <button 
              key={zone.id} 
              onClick={() => setSelectedZone(zone)}
              className={`w-full text-left bg-slate-800/50 hover:bg-slate-800 rounded-2xl p-5 border transition-all duration-300 ${selectedZone?.id === zone.id ? 'border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'border-slate-700 hover:border-slate-500'}`}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${getRiskColor(zone.riskLevel)}`}>
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className={`font-bold text-white ${isEasyMode ? 'text-2xl' : 'text-xl'}`}>
                      {t(zone.id, zone.name)}
                    </h3>
                    <p className="text-slate-400 text-sm">
                      {t('estimatedPeople', 'Est. People')}: <span className="text-slate-200 font-semibold">{zone.estimatedPeople.toLocaleString()}</span>
                    </p>
                  </div>
                </div>
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold ${getRiskColor(zone.riskLevel)}`}>
                  {getRiskIcon(zone.riskLevel)}
                  <span>{t(`risk${zone.riskLevel}`, zone.riskLevel)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">{t('crowdDensity', 'Crowd Density')}</span>
                  <span className="text-white font-mono">{zone.density}%</span>
                </div>
                <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${getRiskBgColor(zone.riskLevel)} transition-all duration-1000`} 
                    style={{ width: `${zone.density}%` }}
                  />
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Selected Zone Details (Desktop side panel, Mobile Modal) */}
        {selectedZone && (
          <div className="hidden lg:block w-full lg:w-1/3 shrink-0 sticky top-6 self-start">
            <div className="bg-slate-800 rounded-3xl border border-slate-700 p-6 shadow-2xl animate-fade-in">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className={`font-bold text-white ${isEasyMode ? 'text-3xl' : 'text-2xl'}`}>
                    {t(selectedZone.id, selectedZone.name)}
                  </h3>
                  <div className="flex items-center gap-2 text-slate-400 text-sm mt-1">
                    <Clock className="w-4 h-4" />
                    <span>{t('lastUpdated', 'Last Updated')}: {selectedZone.lastUpdated}</span>
                  </div>
                </div>
                <div className={`p-2 rounded-xl ${getRiskColor(selectedZone.riskLevel)}`}>
                  {getRiskIcon(selectedZone.riskLevel)}
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-slate-900/50 rounded-2xl p-4 border border-slate-700/50">
                  <p className="text-slate-500 text-sm mb-1">{t('currentStatus', 'Current Status')}</p>
                  <p className="text-white font-medium text-lg">{t(selectedZone.status, selectedZone.fallbackStatus)}</p>
                </div>
                
                <div className="bg-slate-900/50 rounded-2xl p-4 border border-slate-700/50">
                  <p className="text-slate-500 text-sm mb-1">{t('currentCrowd', 'Current Crowd')}</p>
                  <p className="text-white font-medium text-lg">{selectedZone.estimatedPeople.toLocaleString()} {t('people', 'people')}</p>
                </div>

                <div className="bg-slate-900/50 rounded-2xl p-4 border border-slate-700/50">
                  <p className="text-slate-500 text-sm mb-1">{t('riskLevel', 'Risk Level')}</p>
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-semibold ${getRiskColor(selectedZone.riskLevel)}`}>
                    {getRiskIcon(selectedZone.riskLevel)}
                    <span>{t(`risk${selectedZone.riskLevel}`, selectedZone.riskLevel)}</span>
                  </div>
                </div>

                <div className={`rounded-2xl p-4 border ${selectedZone.riskLevel === 'Green' ? 'bg-slate-900/50 border-slate-700/50' : 'bg-indigo-900/20 border-indigo-500/30'}`}>
                  <p className="text-indigo-300 text-sm mb-2 font-semibold flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    {t('suggestedAction', 'Suggested Action')}
                  </p>
                  <p className="text-white leading-relaxed">
                    {t(selectedZone.suggestion, selectedZone.fallbackSuggestion)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Mobile Modal for Zone Details */}
      {selectedZone && (
        <div className="lg:hidden fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-800 rounded-3xl w-full max-w-lg border border-slate-700 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-slide-up sm:animate-fade-in">
            <div className="p-6 border-b border-slate-700 flex items-start justify-between bg-slate-800/80 sticky top-0">
              <div>
                <h3 className={`font-bold text-white ${isEasyMode ? 'text-3xl' : 'text-2xl'}`}>
                  {t(selectedZone.id, selectedZone.name)}
                </h3>
                <div className="flex items-center gap-2 text-slate-400 text-sm mt-1">
                  <Clock className="w-4 h-4" />
                  <span>{t('lastUpdated', 'Last Updated')}: {selectedZone.lastUpdated}</span>
                </div>
              </div>
              <button 
                onClick={() => setSelectedZone(null)}
                className="p-2 bg-slate-700 hover:bg-slate-600 text-white rounded-full transition-colors shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-4">
              <div className="bg-slate-900/50 rounded-2xl p-4 border border-slate-700/50">
                <p className="text-slate-500 text-sm mb-1">{t('currentStatus', 'Current Status')}</p>
                <p className="text-white font-medium text-lg">{t(selectedZone.status, selectedZone.fallbackStatus)}</p>
              </div>
              
              <div className="bg-slate-900/50 rounded-2xl p-4 border border-slate-700/50 flex justify-between items-center">
                <div>
                  <p className="text-slate-500 text-sm mb-1">{t('currentCrowd', 'Current Crowd')}</p>
                  <p className="text-white font-medium text-lg">{selectedZone.estimatedPeople.toLocaleString()} {t('people', 'people')}</p>
                </div>
                <div className="text-right">
                  <p className="text-slate-500 text-sm mb-1">{t('riskLevel', 'Risk Level')}</p>
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-semibold ${getRiskColor(selectedZone.riskLevel)}`}>
                    {getRiskIcon(selectedZone.riskLevel)}
                    <span>{t(`risk${selectedZone.riskLevel}`, selectedZone.riskLevel)}</span>
                  </div>
                </div>
              </div>

              <div className={`rounded-2xl p-4 border ${selectedZone.riskLevel === 'Green' ? 'bg-slate-900/50 border-slate-700/50' : 'bg-indigo-900/20 border-indigo-500/30'}`}>
                <p className="text-indigo-300 text-sm mb-2 font-semibold flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  {t('suggestedAction', 'Suggested Action')}
                </p>
                <p className="text-white leading-relaxed">
                  {t(selectedZone.suggestion, selectedZone.fallbackSuggestion)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default CrowdManagement;
