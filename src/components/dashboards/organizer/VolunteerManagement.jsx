import React, { useState } from 'react';
import { ArrowLeft, Users, CheckCircle, Clock, XCircle, MapPin, Briefcase, Phone, Mail, User, Shield, ChevronRight, X } from 'lucide-react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const mockVolunteersData = [
  {
    id: 'VOL-101',
    name: 'Sarah Connor',
    zone: 'Gate A',
    task: 'Ticket Scanning',
    contact: '+1 234 567 8900',
    email: 'sarah.c@stadium.mock',
    status: 'Busy',
    role: 'Lead Volunteer'
  },
  {
    id: 'VOL-102',
    name: 'Mike Johnson',
    zone: 'South Stand',
    task: 'Crowd Control',
    contact: '+1 234 567 8901',
    email: 'mike.j@stadium.mock',
    status: 'Available',
    role: 'Volunteer'
  },
  {
    id: 'VOL-103',
    name: 'Emma Smith',
    zone: 'Main Concourse',
    task: 'Merchandise Help',
    contact: '+1 234 567 8902',
    email: 'emma.s@stadium.mock',
    status: 'Offline',
    role: 'Volunteer'
  },
  {
    id: 'VOL-104',
    name: 'John Doe',
    zone: 'North Stand',
    task: 'Medical Assistance',
    contact: '+1 234 567 8903',
    email: 'john.d@stadium.mock',
    status: 'Busy',
    role: 'Medical Volunteer'
  }
];

const availableZones = [
  'Gate A', 'Gate B', 'Gate C', 'Gate D',
  'North Stand', 'South Stand', 'East Stand', 'West Stand',
  'Main Concourse', 'VIP Lounge', 'Medical Center'
];

const VolunteerManagement = () => {
  const navigate = useNavigate();
  const { isEasyMode } = useOutletContext();
  const { t } = useTranslation();

  const [volunteers, setVolunteers] = useState(mockVolunteersData);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [showReassignModal, setShowReassignModal] = useState(false);
  const [reassignZone, setReassignZone] = useState('');

  // Summary Metrics
  const totalVolunteers = volunteers.length;
  const availableVolunteers = volunteers.filter(v => v.status === 'Available').length;
  const busyVolunteers = volunteers.filter(v => v.status === 'Busy').length;
  const offlineVolunteers = volunteers.filter(v => v.status === 'Offline').length;

  const handleReassign = () => {
    if (selectedVolunteer && reassignZone) {
      setVolunteers(volunteers.map(v => 
        v.id === selectedVolunteer.id ? { ...v, zone: reassignZone } : v
      ));
      setShowReassignModal(false);
      setSelectedVolunteer(null);
      setReassignZone('');
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Available': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
      case 'Busy': return 'text-orange-400 bg-orange-400/10 border-orange-400/20';
      case 'Offline': return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
      default: return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Available': return <CheckCircle className="w-4 h-4" />;
      case 'Busy': return <Clock className="w-4 h-4" />;
      case 'Offline': return <XCircle className="w-4 h-4" />;
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
          {t('volunteerManagement', 'Volunteer Management')}
        </h2>
      </div>

      <div className="max-w-6xl mx-auto w-full space-y-8">
        
        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700">
            <p className="text-slate-400 mb-1">{t('totalVolunteers', 'Total Volunteers')}</p>
            <p className={`font-bold text-white ${isEasyMode ? 'text-4xl' : 'text-3xl'}`}>{totalVolunteers}</p>
          </div>
          <div className="bg-slate-800/50 p-4 rounded-2xl border border-emerald-500/30">
            <p className="text-emerald-400 mb-1">{t('available', 'Available')}</p>
            <p className={`font-bold text-white ${isEasyMode ? 'text-4xl' : 'text-3xl'}`}>{availableVolunteers}</p>
          </div>
          <div className="bg-slate-800/50 p-4 rounded-2xl border border-orange-500/30">
            <p className="text-orange-400 mb-1">{t('busy', 'Busy')}</p>
            <p className={`font-bold text-white ${isEasyMode ? 'text-4xl' : 'text-3xl'}`}>{busyVolunteers}</p>
          </div>
          <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-500/30">
            <p className="text-slate-400 mb-1">{t('offline', 'Offline')}</p>
            <p className={`font-bold text-white ${isEasyMode ? 'text-4xl' : 'text-3xl'}`}>{offlineVolunteers}</p>
          </div>
        </div>

        {/* Volunteer List */}
        <div className="space-y-4">
          {volunteers.map(volunteer => (
            <div key={volunteer.id} className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700 hover:border-slate-500 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className={`px-3 py-1 rounded-full border text-xs font-semibold flex items-center gap-1 ${getStatusColor(volunteer.status)}`}>
                      {getStatusIcon(volunteer.status)}
                      <span>{t(`status${volunteer.status}`, volunteer.status)}</span>
                    </span>
                    <span className="text-slate-400 text-sm font-mono">{volunteer.id}</span>
                  </div>
                  <h3 className={`font-bold text-white mb-3 ${isEasyMode ? 'text-3xl' : 'text-2xl'}`}>
                    {volunteer.name}
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-slate-300 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-indigo-400" />
                      <span>{t('zone', 'Zone')}: <span className="text-white font-medium">{t(volunteer.zone.replace(/\s+/g, ''), volunteer.zone)}</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-indigo-400" />
                      <span>{t('task', 'Task')}: <span className="text-white font-medium">{t(volunteer.task.replace(/\s+/g, ''), volunteer.task)}</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-indigo-400" />
                      <span>{volunteer.contact}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-row md:flex-col gap-3 shrink-0 w-full md:w-auto">
                  <button 
                    onClick={() => { setSelectedVolunteer(volunteer); setShowReassignModal(true); setReassignZone(volunteer.zone); }}
                    className="flex-1 md:flex-none px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors font-medium text-center"
                  >
                    {t('reassignZone', 'Reassign Zone')}
                  </button>
                  <button 
                    onClick={() => { setSelectedVolunteer(volunteer); setShowReassignModal(false); }}
                    className="flex-1 md:flex-none px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors font-medium text-center"
                  >
                    {t('viewDetails', 'View Details')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Volunteer Details Modal */}
      {selectedVolunteer && !showReassignModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-800 rounded-3xl w-full max-w-lg border border-slate-700 shadow-2xl overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-700 flex items-start justify-between bg-slate-800/80 sticky top-0">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className={`px-3 py-1 rounded-full border text-xs font-semibold flex items-center gap-1 ${getStatusColor(selectedVolunteer.status)}`}>
                    {getStatusIcon(selectedVolunteer.status)}
                    <span>{t(`status${selectedVolunteer.status}`, selectedVolunteer.status)}</span>
                  </span>
                  <span className="text-slate-400 text-sm font-mono">{selectedVolunteer.id}</span>
                </div>
                <h3 className={`font-bold text-white ${isEasyMode ? 'text-3xl' : 'text-2xl'}`}>
                  {selectedVolunteer.name}
                </h3>
              </div>
              <button 
                onClick={() => setSelectedVolunteer(null)}
                className="p-2 bg-slate-700 hover:bg-slate-600 text-white rounded-full transition-colors shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50 flex items-start gap-3">
                  <Shield className="w-5 h-5 text-indigo-400 shrink-0" />
                  <div>
                    <p className="text-slate-500 text-xs">{t('role', 'Role')}</p>
                    <p className="text-slate-200 font-medium">{t(selectedVolunteer.role.replace(/\s+/g, ''), selectedVolunteer.role)}</p>
                  </div>
                </div>
                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50 flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-indigo-400 shrink-0" />
                  <div>
                    <p className="text-slate-500 text-xs">{t('assignedZone', 'Assigned Zone')}</p>
                    <p className="text-slate-200 font-medium">{t(selectedVolunteer.zone.replace(/\s+/g, ''), selectedVolunteer.zone)}</p>
                  </div>
                </div>
                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50 flex items-start gap-3">
                  <Phone className="w-5 h-5 text-indigo-400 shrink-0" />
                  <div>
                    <p className="text-slate-500 text-xs">{t('contact', 'Contact')}</p>
                    <p className="text-slate-200 font-medium">{selectedVolunteer.contact}</p>
                  </div>
                </div>
                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50 flex items-start gap-3">
                  <Mail className="w-5 h-5 text-indigo-400 shrink-0" />
                  <div>
                    <p className="text-slate-500 text-xs">{t('email', 'Email')}</p>
                    <p className="text-slate-200 font-medium text-sm break-all">{selectedVolunteer.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reassign Zone Modal */}
      {selectedVolunteer && showReassignModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-800 rounded-3xl w-full max-w-md border border-slate-700 shadow-2xl overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-700 flex items-center justify-between">
              <h3 className={`font-bold text-white ${isEasyMode ? 'text-3xl' : 'text-2xl'}`}>
                {t('reassignZone', 'Reassign Zone')}
              </h3>
              <button 
                onClick={() => { setShowReassignModal(false); setSelectedVolunteer(null); }}
                className="p-2 bg-slate-700 hover:bg-slate-600 text-white rounded-full transition-colors shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              <p className="text-slate-300 mb-4">
                {t('reassigningVolunteer', 'Reassigning volunteer')}: <span className="font-bold text-white">{selectedVolunteer.name}</span>
              </p>
              
              <label className="block text-slate-400 text-sm mb-2">{t('selectNewZone', 'Select New Zone')}</label>
              <select 
                value={reassignZone}
                onChange={(e) => setReassignZone(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 appearance-none mb-6"
              >
                {availableZones.map(zone => (
                  <option key={zone} value={zone}>{t(zone.replace(/\s+/g, ''), zone)}</option>
                ))}
              </select>

              <button 
                onClick={handleReassign}
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-colors font-bold"
              >
                {t('confirmReassignment', 'Confirm Reassignment')}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default VolunteerManagement;
