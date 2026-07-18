import React, { useState } from 'react';
import { ArrowLeft, AlertOctagon, CheckCircle, Clock, MapPin, User, FileText, Send, X, ShieldAlert } from 'lucide-react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const mockIncidentsData = [
  {
    id: 'INC-2001',
    type: 'Medical Emergency',
    description: 'spectatorFainted',
    fallbackDesc: 'Spectator fainted in section 402, requires immediate medical attention.',
    location: 'North Stand',
    priority: 'High',
    reporterName: 'John Doe',
    time: '14:45',
    status: 'Open'
  },
  {
    id: 'INC-2002',
    type: 'Lost Child',
    description: 'lostChildDesc',
    fallbackDesc: 'A 5-year old boy wearing a red shirt, separated from parents.',
    location: 'Gate B',
    priority: 'High',
    reporterName: 'Sarah Connor',
    time: '15:10',
    status: 'Resolved'
  },
  {
    id: 'INC-2003',
    type: 'Equipment Damage',
    description: 'brokenTurnstileDesc',
    fallbackDesc: 'Turnstile 4 is jammed and not scanning tickets.',
    location: 'Gate A',
    priority: 'Medium',
    reporterName: 'Mike Johnson',
    time: '13:20',
    status: 'Open'
  }
];

const incidentTypes = [
  'Medical Emergency',
  'Lost Child',
  'Security Issue',
  'Fire',
  'Crowd Issue',
  'Equipment Damage',
  'Other'
];

const IncidentReporting = () => {
  const navigate = useNavigate();
  const { isEasyMode } = useOutletContext();
  const { t } = useTranslation();

  const [incidents, setIncidents] = useState(mockIncidentsData);
  const [selectedIncident, setSelectedIncident] = useState(null);
  
  // Form State
  const [formData, setFormData] = useState({
    type: '',
    description: '',
    location: '',
    priority: 'Medium',
    reporterName: '',
    time: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Summary Metrics
  const totalIncidents = incidents.length;
  const openIncidents = incidents.filter(i => i.status === 'Open').length;
  const resolvedIncidents = incidents.filter(i => i.status === 'Resolved').length;
  const highPriorityIncidents = incidents.filter(i => i.priority === 'High' && i.status === 'Open').length;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleClearForm = () => {
    setFormData({
      type: '',
      description: '',
      location: '',
      priority: 'Medium',
      reporterName: '',
      time: ''
    });
    setFormErrors({});
    setSubmitSuccess(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate
    const errors = {};
    if (!formData.type) errors.type = t('errTypeRequired', 'Incident type is required');
    if (!formData.description.trim()) errors.description = t('errDescRequired', 'Description is required');
    if (!formData.location.trim()) errors.location = t('errLocationRequired', 'Location is required');
    if (!formData.reporterName.trim()) errors.reporterName = t('errNameRequired', 'Reporter name is required');
    if (!formData.time.trim()) errors.time = t('errTimeRequired', 'Time is required');

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Submit
    const newIncident = {
      id: `INC-${Math.floor(2000 + Math.random() * 9000)}`,
      type: formData.type,
      description: formData.description, // User typed text, not a key, but stored identically
      fallbackDesc: formData.description,
      location: formData.location,
      priority: formData.priority,
      reporterName: formData.reporterName,
      time: formData.time,
      status: 'Open'
    };

    setIncidents([newIncident, ...incidents]);
    setSubmitSuccess(true);
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      setSubmitSuccess(false);
      handleClearForm();
    }, 3000);
  };

  const handleMarkResolved = (id) => {
    setIncidents(incidents.map(inc => 
      inc.id === id ? { ...inc, status: 'Resolved' } : inc
    ));
    if (selectedIncident && selectedIncident.id === id) {
      setSelectedIncident(null);
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return 'text-red-400 bg-red-400/10 border-red-400/20';
      case 'Medium': return 'text-orange-400 bg-orange-400/10 border-orange-400/20';
      case 'Low': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      default: return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Open': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'Resolved': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
      default: return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
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
          {t('incidentReporting', 'Incident Reporting')}
        </h2>
      </div>

      <div className="max-w-6xl mx-auto w-full space-y-8">
        
        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700">
            <p className="text-slate-400 mb-1">{t('totalIncidents', 'Total Incidents')}</p>
            <p className={`font-bold text-white ${isEasyMode ? 'text-4xl' : 'text-3xl'}`}>{totalIncidents}</p>
          </div>
          <div className="bg-slate-800/50 p-4 rounded-2xl border border-yellow-500/30">
            <p className="text-yellow-400 mb-1">{t('open', 'Open')}</p>
            <p className={`font-bold text-white ${isEasyMode ? 'text-4xl' : 'text-3xl'}`}>{openIncidents}</p>
          </div>
          <div className="bg-slate-800/50 p-4 rounded-2xl border border-emerald-500/30">
            <p className="text-emerald-400 mb-1">{t('resolved', 'Resolved')}</p>
            <p className={`font-bold text-white ${isEasyMode ? 'text-4xl' : 'text-3xl'}`}>{resolvedIncidents}</p>
          </div>
          <div className="bg-slate-800/50 p-4 rounded-2xl border border-red-500/30">
            <p className="text-red-400 mb-1">{t('highPriorityOpen', 'High Priority (Open)')}</p>
            <p className={`font-bold text-white ${isEasyMode ? 'text-4xl' : 'text-3xl'}`}>{highPriorityIncidents}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Report Form */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800 rounded-3xl p-6 border border-slate-700 sticky top-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-red-500/20 rounded-xl">
                  <ShieldAlert className="w-6 h-6 text-red-400" />
                </div>
                <h3 className={`font-bold text-white ${isEasyMode ? 'text-2xl' : 'text-xl'}`}>
                  {t('newIncidentReport', 'New Incident Report')}
                </h3>
              </div>

              {submitSuccess && (
                <div className="mb-6 p-4 bg-emerald-500/20 border border-emerald-500/50 rounded-xl flex items-start gap-3 animate-fade-in">
                  <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-emerald-400 font-medium">{t('reportSubmittedSuccess', 'Incident report submitted successfully.')}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-slate-400 text-sm mb-2">{t('incidentType', 'Incident Type')}</label>
                  <select 
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className={`w-full bg-slate-900 border ${formErrors.type ? 'border-red-500' : 'border-slate-700'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 appearance-none`}
                  >
                    <option value="">{t('selectType', 'Select Incident Type')}</option>
                    {incidentTypes.map(type => (
                      <option key={type} value={type}>{t(type.replace(/\s+/g, ''), type)}</option>
                    ))}
                  </select>
                  {formErrors.type && <p className="text-red-400 text-xs mt-1">{formErrors.type}</p>}
                </div>

                <div>
                  <label className="block text-slate-400 text-sm mb-2">{t('priority', 'Priority')}</label>
                  <select 
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 appearance-none"
                  >
                    <option value="High">{t('priorityHigh', 'High')}</option>
                    <option value="Medium">{t('priorityMedium', 'Medium')}</option>
                    <option value="Low">{t('priorityLow', 'Low')}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 text-sm mb-2">{t('location', 'Location')}</label>
                  <input 
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder={t('locationPlaceholder', 'e.g., Gate A, North Stand')}
                    className={`w-full bg-slate-900 border ${formErrors.location ? 'border-red-500' : 'border-slate-700'} rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500`}
                  />
                  {formErrors.location && <p className="text-red-400 text-xs mt-1">{formErrors.location}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 text-sm mb-2">{t('reporterName', 'Reporter Name')}</label>
                    <input 
                      type="text"
                      name="reporterName"
                      value={formData.reporterName}
                      onChange={handleInputChange}
                      placeholder={t('reporterName', 'Reporter Name')}
                      className={`w-full bg-slate-900 border ${formErrors.reporterName ? 'border-red-500' : 'border-slate-700'} rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500`}
                    />
                    {formErrors.reporterName && <p className="text-red-400 text-xs mt-1">{formErrors.reporterName}</p>}
                  </div>
                  <div>
                    <label className="block text-slate-400 text-sm mb-2">{t('time', 'Time')}</label>
                    <input 
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      className={`w-full bg-slate-900 border ${formErrors.time ? 'border-red-500' : 'border-slate-700'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500`}
                    />
                    {formErrors.time && <p className="text-red-400 text-xs mt-1">{formErrors.time}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 text-sm mb-2">{t('description', 'Description')}</label>
                  <textarea 
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder={t('incidentDescPlaceholder', 'Provide details about the incident...')}
                    rows="4"
                    className={`w-full bg-slate-900 border ${formErrors.description ? 'border-red-500' : 'border-slate-700'} rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 resize-none`}
                  ></textarea>
                  {formErrors.description && <p className="text-red-400 text-xs mt-1">{formErrors.description}</p>}
                </div>

                <div className="flex gap-3 pt-4 border-t border-slate-700">
                  <button 
                    type="button"
                    onClick={handleClearForm}
                    className="flex-1 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl transition-colors font-medium"
                  >
                    {t('clearForm', 'Clear Form')}
                  </button>
                  <button 
                    type="submit"
                    className="flex-[2] py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-colors font-bold flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    <span>{t('submitReport', 'Submit Report')}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Incident Feed */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className={`font-bold text-white mb-4 ${isEasyMode ? 'text-2xl' : 'text-xl'}`}>
              {t('recentIncidents', 'Recent Incidents')}
            </h3>
            
            {incidents.map(incident => (
              <div key={incident.id} className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700 hover:border-slate-500 transition-colors">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span className={`px-3 py-1 rounded-full border text-xs font-semibold ${getPriorityColor(incident.priority)}`}>
                        {t(`priority${incident.priority}`, incident.priority)}
                      </span>
                      <span className={`px-3 py-1 rounded-full border text-xs font-semibold ${getStatusColor(incident.status)}`}>
                        {t(`status${incident.status}`, incident.status)}
                      </span>
                      <span className="text-slate-400 text-sm">{incident.id}</span>
                    </div>
                    <h3 className={`font-bold text-white mb-2 ${isEasyMode ? 'text-2xl' : 'text-xl'}`}>
                      {t(incident.type.replace(/\s+/g, ''), incident.type)}
                    </h3>
                    <p className={`text-slate-300 line-clamp-2 ${isEasyMode ? 'text-lg' : 'text-sm'}`}>
                      {t(incident.description, incident.fallbackDesc)}
                    </p>
                    <div className="flex flex-wrap gap-4 text-slate-400 text-sm mt-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-indigo-400" />
                        <span>{t(incident.location.replace(/\s+/g, ''), incident.location)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-indigo-400" />
                        <span>{incident.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-indigo-400" />
                        <span>{incident.reporterName}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-row md:flex-col gap-3 shrink-0">
                    <button 
                      onClick={() => setSelectedIncident(incident)}
                      className="flex-1 md:flex-none px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors text-center"
                    >
                      {t('viewDetails', 'View Details')}
                    </button>
                    {incident.status === 'Open' && (
                      <button 
                        onClick={() => handleMarkResolved(incident.id)}
                        className="flex-1 md:flex-none px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>{t('markResolved', 'Mark Resolved')}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Incident Details Modal */}
      {selectedIncident && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-800 rounded-3xl w-full max-w-2xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-slate-700 flex items-start justify-between bg-slate-800/80 sticky top-0">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className={`px-3 py-1 rounded-full border text-xs font-semibold ${getPriorityColor(selectedIncident.priority)}`}>
                    {t(`priority${selectedIncident.priority}`, selectedIncident.priority)}
                  </span>
                  <span className={`px-3 py-1 rounded-full border text-xs font-semibold ${getStatusColor(selectedIncident.status)}`}>
                    {t(`status${selectedIncident.status}`, selectedIncident.status)}
                  </span>
                  <span className="text-slate-400 text-sm">{selectedIncident.id}</span>
                </div>
                <h3 className={`font-bold text-white ${isEasyMode ? 'text-3xl' : 'text-2xl'}`}>
                  {t(selectedIncident.type.replace(/\s+/g, ''), selectedIncident.type)}
                </h3>
              </div>
              <button 
                onClick={() => setSelectedIncident(null)}
                className="p-2 bg-slate-700 hover:bg-slate-600 text-white rounded-full transition-colors shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-6">
              <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
                <p className="text-slate-400 text-sm mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-indigo-400" />
                  {t('description', 'Description')}
                </p>
                <p className="text-white text-lg leading-relaxed">{t(selectedIncident.description, selectedIncident.fallbackDesc)}</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50 flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-indigo-400 shrink-0" />
                  <div>
                    <p className="text-slate-500 text-xs">{t('location', 'Location')}</p>
                    <p className="text-slate-200">{t(selectedIncident.location.replace(/\s+/g, ''), selectedIncident.location)}</p>
                  </div>
                </div>
                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50 flex items-start gap-3">
                  <Clock className="w-5 h-5 text-indigo-400 shrink-0" />
                  <div>
                    <p className="text-slate-500 text-xs">{t('time', 'Time')}</p>
                    <p className="text-slate-200">{selectedIncident.time}</p>
                  </div>
                </div>
                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50 flex items-start gap-3 sm:col-span-2">
                  <User className="w-5 h-5 text-indigo-400 shrink-0" />
                  <div>
                    <p className="text-slate-500 text-xs">{t('reportedBy', 'Reported By')}</p>
                    <p className="text-slate-200 font-medium">{selectedIncident.reporterName}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-700 bg-slate-800/80 sticky bottom-0">
              {selectedIncident.status === 'Open' ? (
                <button 
                  onClick={() => handleMarkResolved(selectedIncident.id)}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition-colors font-bold flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>{t('markResolved', 'Mark Resolved')}</span>
                </button>
              ) : (
                <button 
                  disabled
                  className="w-full py-3 bg-slate-700 text-emerald-400 rounded-xl font-bold flex items-center justify-center gap-2 opacity-70 cursor-not-allowed"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>{t('incidentResolved', 'Incident Resolved')}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default IncidentReporting;
