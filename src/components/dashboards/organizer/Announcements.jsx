import React, { useState } from 'react';
import { ArrowLeft, Megaphone, Trash2, Send, Clock, Users, AlertTriangle, Info, X } from 'lucide-react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const mockAnnouncementsData = [
  {
    id: 'ANN-301',
    title: 'gateCDelay',
    fallbackTitle: 'Gate C Entry Delay',
    message: 'gateCDelayMsg',
    fallbackMessage: 'There is a 15-minute delay at Gate C due to security checks. Please redirect fans to Gate B if possible.',
    audience: 'Volunteers',
    priority: 'High',
    time: '14:30',
    status: 'Active'
  },
  {
    id: 'ANN-302',
    title: 'welcomeMessage',
    fallbackTitle: 'Welcome to the Match!',
    message: 'welcomeMsgFull',
    fallbackMessage: 'Welcome to the stadium. Enjoy the match and stay safe!',
    audience: 'All Visitors',
    priority: 'Low',
    time: '12:00',
    status: 'Active'
  }
];

const Announcements = () => {
  const navigate = useNavigate();
  const { isEasyMode } = useOutletContext();
  const { t } = useTranslation();

  const [announcements, setAnnouncements] = useState(mockAnnouncementsData);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    audience: 'All Visitors',
    priority: 'Medium'
  });
  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleClear = () => {
    setFormData({
      title: '',
      message: '',
      audience: 'All Visitors',
      priority: 'Medium'
    });
    setFormErrors({});
  };

  const handlePublish = (e) => {
    e.preventDefault();
    
    // Validate
    const errors = {};
    if (!formData.title.trim()) errors.title = t('errTitleRequired', 'Title is required');
    if (!formData.message.trim()) errors.message = t('errMessageRequired', 'Message is required');

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    const newAnnouncement = {
      id: `ANN-${Math.floor(300 + Math.random() * 900)}`,
      title: formData.title,
      fallbackTitle: formData.title,
      message: formData.message,
      fallbackMessage: formData.message,
      audience: formData.audience,
      priority: formData.priority,
      time: timeStr,
      status: 'Active'
    };

    setAnnouncements([newAnnouncement, ...announcements]);
    handleClear();
  };

  const handleDelete = (id) => {
    setAnnouncements(announcements.filter(ann => ann.id !== id));
    if (selectedAnnouncement && selectedAnnouncement.id === id) {
      setSelectedAnnouncement(null);
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

  const getPriorityIcon = (priority) => {
    switch(priority) {
      case 'High': return <AlertTriangle className="w-4 h-4" />;
      case 'Medium': return <Info className="w-4 h-4" />;
      case 'Low': return <Megaphone className="w-4 h-4" />;
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
          {t('announcements', 'Announcements')}
        </h2>
      </div>

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Create Form */}
        <div className="lg:col-span-1">
          <div className="bg-slate-800 rounded-3xl p-6 border border-slate-700 sticky top-6">
            <h3 className={`font-bold text-white mb-6 ${isEasyMode ? 'text-2xl' : 'text-xl'}`}>
              {t('newAnnouncement', 'New Announcement')}
            </h3>

            <form onSubmit={handlePublish} className="space-y-4">
              <div>
                <label className="block text-slate-400 text-sm mb-2">{t('announcementTitle', 'Title')}</label>
                <input 
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder={t('titlePlaceholder', 'Enter title...')}
                  className={`w-full bg-slate-900 border ${formErrors.title ? 'border-red-500' : 'border-slate-700'} rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500`}
                />
                {formErrors.title && <p className="text-red-400 text-xs mt-1">{formErrors.title}</p>}
              </div>

              <div>
                <label className="block text-slate-400 text-sm mb-2">{t('targetAudience', 'Target Audience')}</label>
                <select 
                  name="audience"
                  value={formData.audience}
                  onChange={handleInputChange}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 appearance-none"
                >
                  <option value="All Visitors">{t('audienceAll', 'All Visitors')}</option>
                  <option value="Volunteers">{t('audienceVolunteers', 'Volunteers')}</option>
                  <option value="On-Ground Staff">{t('audienceStaff', 'On-Ground Staff')}</option>
                  <option value="Emergency Only">{t('audienceEmergency', 'Emergency Only')}</option>
                </select>
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
                <label className="block text-slate-400 text-sm mb-2">{t('message', 'Message')}</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder={t('messagePlaceholder', 'Enter message...')}
                  rows="4"
                  className={`w-full bg-slate-900 border ${formErrors.message ? 'border-red-500' : 'border-slate-700'} rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 resize-none`}
                ></textarea>
                {formErrors.message && <p className="text-red-400 text-xs mt-1">{formErrors.message}</p>}
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-700">
                <button 
                  type="button"
                  onClick={handleClear}
                  className="flex-1 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl transition-colors font-medium"
                >
                  {t('clear', 'Clear')}
                </button>
                <button 
                  type="submit"
                  className="flex-[2] py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-colors font-bold flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  <span>{t('publish', 'Publish')}</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Announcements List */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className={`font-bold text-white mb-4 ${isEasyMode ? 'text-2xl' : 'text-xl'}`}>
            {t('publishedAnnouncements', 'Published Announcements')}
          </h3>
          
          {announcements.length === 0 ? (
            <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700 text-center">
              <Megaphone className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400">{t('noAnnouncements', 'No announcements published yet.')}</p>
            </div>
          ) : (
            announcements.map(ann => (
              <div key={ann.id} className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700 hover:border-slate-500 transition-colors">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span className={`px-3 py-1 rounded-full border text-xs font-semibold flex items-center gap-1 ${getPriorityColor(ann.priority)}`}>
                        {getPriorityIcon(ann.priority)}
                        <span>{t(`priority${ann.priority}`, ann.priority)}</span>
                      </span>
                      <span className="text-slate-400 text-sm">{ann.time}</span>
                    </div>
                    <h3 className={`font-bold text-white mb-2 ${isEasyMode ? 'text-2xl' : 'text-xl'}`}>
                      {t(ann.title, ann.fallbackTitle)}
                    </h3>
                    <p className={`text-slate-300 line-clamp-2 ${isEasyMode ? 'text-lg' : 'text-sm'}`}>
                      {t(ann.message, ann.fallbackMessage)}
                    </p>
                    <div className="flex items-center gap-2 text-slate-400 text-sm mt-4 bg-slate-900/50 inline-flex px-3 py-1 rounded-lg border border-slate-700/50">
                      <Users className="w-4 h-4 text-indigo-400" />
                      <span>{t(ann.audience.replace(/\s+/g, ''), ann.audience)}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-row md:flex-col gap-3 shrink-0">
                    <button 
                      onClick={() => setSelectedAnnouncement(ann)}
                      className="flex-1 md:flex-none px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors text-center"
                    >
                      {t('viewDetails', 'View Details')}
                    </button>
                    <button 
                      onClick={() => handleDelete(ann.id)}
                      className="flex-1 md:flex-none px-4 py-2 bg-red-600/20 hover:bg-red-600/40 text-red-400 border border-red-500/30 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>{t('delete', 'Delete')}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

      </div>

      {/* Details Modal */}
      {selectedAnnouncement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-800 rounded-3xl w-full max-w-lg border border-slate-700 shadow-2xl overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-700 flex items-start justify-between bg-slate-800/80 sticky top-0">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className={`px-3 py-1 rounded-full border text-xs font-semibold flex items-center gap-1 ${getPriorityColor(selectedAnnouncement.priority)}`}>
                    {getPriorityIcon(selectedAnnouncement.priority)}
                    <span>{t(`priority${selectedAnnouncement.priority}`, selectedAnnouncement.priority)}</span>
                  </span>
                  <span className="text-slate-400 text-sm">{selectedAnnouncement.time}</span>
                </div>
                <h3 className={`font-bold text-white ${isEasyMode ? 'text-3xl' : 'text-2xl'}`}>
                  {t(selectedAnnouncement.title, selectedAnnouncement.fallbackTitle)}
                </h3>
              </div>
              <button 
                onClick={() => setSelectedAnnouncement(null)}
                className="p-2 bg-slate-700 hover:bg-slate-600 text-white rounded-full transition-colors shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
                <p className="text-white text-lg leading-relaxed">
                  {t(selectedAnnouncement.message, selectedAnnouncement.fallbackMessage)}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50 flex flex-col items-center justify-center text-center">
                  <Users className="w-6 h-6 text-indigo-400 mb-2" />
                  <p className="text-slate-500 text-xs mb-1">{t('targetAudience', 'Target Audience')}</p>
                  <p className="text-slate-200 font-medium">{t(selectedAnnouncement.audience.replace(/\s+/g, ''), selectedAnnouncement.audience)}</p>
                </div>
                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50 flex flex-col items-center justify-center text-center">
                  <Clock className="w-6 h-6 text-indigo-400 mb-2" />
                  <p className="text-slate-500 text-xs mb-1">{t('publishedAt', 'Published At')}</p>
                  <p className="text-slate-200 font-medium">{selectedAnnouncement.time}</p>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-700 bg-slate-800/80 sticky bottom-0">
              <button 
                onClick={() => handleDelete(selectedAnnouncement.id)}
                className="w-full py-3 bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/30 rounded-xl transition-colors font-bold flex items-center justify-center gap-2"
              >
                <Trash2 className="w-5 h-5" />
                <span>{t('deleteAnnouncement', 'Delete Announcement')}</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Announcements;
