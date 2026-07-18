import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Building, ShieldCheck, AlertCircle, Eye, CheckCircle2 } from 'lucide-react';

const initialFacilities = [
  { id: 'FAC-01', name: 'North Gate Entrance', type: 'Entry Point', status: 'Operational', lastInspected: '09:00 AM', issues: 0 },
  { id: 'FAC-02', name: 'East Stand Washrooms', type: 'Restroom', status: 'Needs Attention', lastInspected: '08:30 AM', issues: 2 },
  { id: 'FAC-03', name: 'Food Court A', type: 'Concession', status: 'Operational', lastInspected: '10:15 AM', issues: 0 },
  { id: 'FAC-04', name: 'VIP Lounge', type: 'Lounge', status: 'Maintenance', lastInspected: '07:45 AM', issues: 1 },
];

export default function FacilityStatus() {
  const { t } = useTranslation();
  const [facilities, setFacilities] = useState(initialFacilities);
  const [selectedFacility, setSelectedFacility] = useState(null);

  const markInspected = (id) => {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setFacilities(prev => prev.map(f => f.id === id ? { ...f, status: 'Operational', issues: 0, lastInspected: timeString } : f));
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Operational': return 'bg-green-600 text-white';
      case 'Needs Attention': return 'bg-yellow-500 text-white';
      case 'Maintenance': return 'bg-orange-500 text-white';
      default: return 'bg-slate-600 text-white';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t('ground.facility.title', 'Facility Status')}</h1>
        <p className="text-gray-400 mt-1">{t('ground.facility.subtitle', 'Monitor and update stadium facility conditions.')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {facilities.map(facility => (
          <div key={facility.id} className="bg-slate-800 rounded-xl p-5 shadow-lg border border-slate-700">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-slate-700">
                  <Building className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{t(`ground.facility.name.${facility.id}`, facility.name)}</h3>
                  <p className="text-sm text-gray-400">{t(`ground.facility.type.${facility.id}`, facility.type)}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(facility.status)}`}>
                {t(`ground.facility.status.${facility.status.replace(/\s+/g, '')}`, facility.status)}
              </span>
            </div>

            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">{t('ground.facility.lastInspected', 'Last Inspected')}:</span>
                <span>{facility.lastInspected}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">{t('ground.facility.issues', 'Reported Issues')}:</span>
                <span className={facility.issues > 0 ? 'text-red-400 font-medium' : 'text-green-400'}>
                  {facility.issues}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setSelectedFacility(facility)}
                className="flex-1 flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg transition-colors"
              >
                <Eye size={18} />
                {t('common.viewDetails', 'View Details')}
              </button>
              <button
                onClick={() => markInspected(facility.id)}
                className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors"
              >
                <ShieldCheck size={18} />
                {t('ground.facility.markInspected', 'Mark Inspected')}
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedFacility && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 rounded-2xl shadow-2xl w-full max-w-md p-6 border border-slate-700">
            <div className="flex items-center gap-3 mb-6">
              <Building className="w-8 h-8 text-blue-400" />
              <h2 className="text-2xl font-bold">{t('ground.facility.details', 'Facility Details')}</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 block">{t('ground.facility.name', 'Facility Name')}</label>
                <div className="font-medium text-lg">{t(`ground.facility.name.${selectedFacility.id}`, selectedFacility.name)}</div>
              </div>
              
              <div>
                <label className="text-sm text-gray-400 block">{t('ground.facility.type', 'Type')}</label>
                <div>{t(`ground.facility.type.${selectedFacility.id}`, selectedFacility.type)}</div>
              </div>

              <div>
                <label className="text-sm text-gray-400 block">{t('ground.facility.statusLabel', 'Current Status')}</label>
                <div className="mt-1">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedFacility.status)}`}>
                    {t(`ground.facility.status.${selectedFacility.status.replace(/\s+/g, '')}`, selectedFacility.status)}
                  </span>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400 block">{t('ground.facility.lastInspected', 'Last Inspected')}</label>
                <div>{selectedFacility.lastInspected}</div>
              </div>

              <div>
                <label className="text-sm text-gray-400 block">{t('ground.facility.issues', 'Reported Issues')}</label>
                <div className={selectedFacility.issues > 0 ? 'text-red-400 font-medium' : 'text-green-400'}>
                  {selectedFacility.issues} {selectedFacility.issues === 1 ? t('ground.facility.issue', 'issue') : t('ground.facility.issuesPlural', 'issues')}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={() => setSelectedFacility(null)}
                className="bg-slate-700 hover:bg-slate-600 px-5 py-2 rounded-lg transition-colors"
              >
                {t('common.close', 'Close')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
