import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Wrench, Plus, CheckCircle, Eye, AlertTriangle } from 'lucide-react';

const initialRequests = [
  { id: 'REQ-001', title: 'Broken Seat', location: 'Section B, Row 14, Seat 5', priority: 'Low', status: 'Pending', description: 'Seat is detached from base.', date: '2026-07-18' },
  { id: 'REQ-002', title: 'Water Leak', location: 'West Stand Restroom', priority: 'High', status: 'In Progress', description: 'Sink pipe leaking continuously.', date: '2026-07-17' },
  { id: 'REQ-003', title: 'Flickering Lights', location: 'Entrance Gate 3', priority: 'Medium', status: 'Completed', description: 'Hallway lights are flickering.', date: '2026-07-18' },
];

export default function MaintenanceRequests() {
  const { t } = useTranslation();
  const [requests, setRequests] = useState(initialRequests);
  const [selectedRequest, setSelectedRequest] = useState(null);
  
  const [formData, setFormData] = useState({ title: '', location: '', priority: 'Low', description: '' });
  const [errors, setErrors] = useState({});

  const markCompleted = (id) => {
    setRequests(prev => prev.map(req => req.id === id ? { ...req, status: 'Completed' } : req));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = t('ground.maintenance.errorTitle', 'Title is required');
    if (!formData.location.trim()) newErrors.location = t('ground.maintenance.errorLocation', 'Location is required');
    if (!formData.description.trim()) newErrors.description = t('ground.maintenance.errorDescription', 'Description is required');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const newRequest = {
        id: `REQ-00${requests.length + 1}`,
        ...formData,
        status: 'Pending',
        date: new Date().toISOString().split('T')[0]
      };
      setRequests([newRequest, ...requests]);
      setFormData({ title: '', location: '', priority: 'Low', description: '' });
      setErrors({});
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return 'text-red-400 bg-red-400/10 border-red-400/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'Low': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Completed': return 'text-green-400';
      case 'In Progress': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="p-6 space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">{t('ground.maintenance.title', 'Maintenance Requests')}</h1>
        <p className="text-gray-400 mt-1">{t('ground.maintenance.subtitle', 'Submit and track maintenance requests.')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Form Section */}
        <div className="lg:col-span-1">
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-lg">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Plus className="w-5 h-5 text-blue-400" />
              {t('ground.maintenance.newRequest', 'New Request')}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">{t('ground.maintenance.reqTitle', 'Title')}</label>
                <input 
                  type="text" 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className={`w-full bg-slate-900 border ${errors.title ? 'border-red-500' : 'border-slate-700'} rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors text-white`}
                  placeholder={t('ground.maintenance.placeholderTitle', 'e.g. Broken Seat')}
                />
                {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">{t('ground.maintenance.location', 'Location')}</label>
                <input 
                  type="text" 
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className={`w-full bg-slate-900 border ${errors.location ? 'border-red-500' : 'border-slate-700'} rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors text-white`}
                  placeholder={t('ground.maintenance.placeholderLocation', 'e.g. Section B')}
                />
                {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">{t('ground.maintenance.priority', 'Priority')}</label>
                <select 
                  value={formData.priority}
                  onChange={(e) => setFormData({...formData, priority: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors text-white"
                >
                  <option value="Low">{t('ground.maintenance.priorityLow', 'Low')}</option>
                  <option value="Medium">{t('ground.maintenance.priorityMedium', 'Medium')}</option>
                  <option value="High">{t('ground.maintenance.priorityHigh', 'High')}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">{t('ground.maintenance.description', 'Description')}</label>
                <textarea 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className={`w-full bg-slate-900 border ${errors.description ? 'border-red-500' : 'border-slate-700'} rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors text-white h-32 resize-none`}
                  placeholder={t('ground.maintenance.placeholderDesc', 'Describe the issue in detail...')}
                />
                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
              </div>

              <button 
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2 mt-2 shadow-lg shadow-blue-500/20"
              >
                {t('ground.maintenance.submitBtn', 'Submit Request')}
              </button>
            </form>
          </div>
        </div>

        {/* List Section */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold mb-4">{t('ground.maintenance.previousRequests', 'Previous Requests')}</h2>
          
          <div className="grid gap-4">
            {requests.map(request => (
              <div key={request.id} className="bg-slate-800 rounded-xl p-5 border border-slate-700 shadow-lg flex flex-col sm:flex-row justify-between gap-4 transition-all hover:border-slate-600">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg text-white">{t(`ground.maintenance.title.${request.id}`, request.title)}</h3>
                    <span className={`px-2 py-0.5 rounded text-xs border bg-slate-900 ${getPriorityColor(request.priority)}`}>
                      {t(`ground.maintenance.prio.${request.priority}`, request.priority)}
                    </span>
                  </div>
                  <div className="text-sm text-gray-400 mb-2 flex items-center gap-2">
                    <span>{t(`ground.maintenance.loc.${request.id}`, request.location)}</span>
                    <span className="text-gray-600">•</span>
                    <span>{request.date}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-400">{t('ground.maintenance.statusLabel', 'Status')}:</span>{' '}
                    <span className={`font-medium ${getStatusColor(request.status)}`}>
                      {t(`ground.maintenance.stat.${request.status.replace(/\s+/g, '')}`, request.status)}
                    </span>
                  </div>
                </div>

                <div className="flex sm:flex-col gap-2 items-end justify-center">
                  <button
                    onClick={() => setSelectedRequest(request)}
                    className="w-full sm:w-auto bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors text-white"
                  >
                    <Eye size={16} />
                    {t('common.viewDetails', 'View Details')}
                  </button>
                  
                  {request.status !== 'Completed' && (
                    <button
                      onClick={() => markCompleted(request.id)}
                      className="w-full sm:w-auto bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors text-white shadow-lg shadow-green-500/20"
                    >
                      <CheckCircle size={16} />
                      {t('ground.maintenance.markCompleted', 'Mark Completed')}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Details Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 rounded-2xl shadow-2xl w-full max-w-lg p-6 border border-slate-700 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Wrench className="w-6 h-6 text-blue-400" />
                </div>
                <h2 className="text-xl font-bold text-white">{t('ground.maintenance.reqDetails', 'Request Details')}</h2>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs border bg-slate-800 ${getPriorityColor(selectedRequest.priority)}`}>
                {t(`ground.maintenance.prio.${selectedRequest.priority}`, selectedRequest.priority)}
              </span>
            </div>

            <div className="space-y-5">
              <div>
                <label className="text-sm text-gray-400 block mb-1">{t('ground.maintenance.reqTitle', 'Title')}</label>
                <div className="font-medium text-lg text-white">{t(`ground.maintenance.title.${selectedRequest.id}`, selectedRequest.title)}</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 block mb-1">{t('ground.maintenance.location', 'Location')}</label>
                  <div className="text-slate-200">{t(`ground.maintenance.loc.${selectedRequest.id}`, selectedRequest.location)}</div>
                </div>
                <div>
                  <label className="text-sm text-gray-400 block mb-1">{t('ground.maintenance.date', 'Date Submitted')}</label>
                  <div className="text-slate-200">{selectedRequest.date}</div>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400 block mb-1">{t('ground.maintenance.statusLabel', 'Status')}</label>
                <div className={`font-medium ${getStatusColor(selectedRequest.status)}`}>
                  {t(`ground.maintenance.stat.${selectedRequest.status.replace(/\s+/g, '')}`, selectedRequest.status)}
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400 block mb-1">{t('ground.maintenance.description', 'Description')}</label>
                <div className="mt-1 p-4 bg-slate-800 rounded-xl text-sm text-slate-300 border border-slate-700 leading-relaxed">
                  {t(`ground.maintenance.desc.${selectedRequest.id}`, selectedRequest.description)}
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-8 pt-4 border-t border-slate-800">
              <button
                onClick={() => setSelectedRequest(null)}
                className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-2 rounded-lg transition-colors border border-slate-700"
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
