import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, Clock, AlertCircle, FileText, MapPin, User, Calendar, X } from 'lucide-react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const mockTasksData = [
  {
    id: 'T-1001',
    title: 'ticketScanningZoneA',
    fallbackTitle: 'Ticket Scanning - Zone A',
    description: 'scanTicketsDesc',
    fallbackDesc: 'Scan digital tickets at Gate A and verify VIP passes.',
    assignedBy: 'Sarah Connor',
    assignedTime: '14:00',
    startTime: '15:00',
    endTime: '19:00',
    location: 'Gate A',
    priority: 'High',
    status: 'In Progress',
    notes: 'ensureScannerCharged',
    fallbackNotes: 'Ensure scanner is fully charged before shift.'
  },
  {
    id: 'T-1002',
    title: 'crowdControlSouth',
    fallbackTitle: 'Crowd Control - South Stand',
    description: 'guideFansDesc',
    fallbackDesc: 'Guide fans to their seats and clear blocked aisles.',
    assignedBy: 'Mike Johnson',
    assignedTime: '14:30',
    startTime: '16:00',
    endTime: '18:00',
    location: 'South Stand',
    priority: 'Medium',
    status: 'Pending',
    notes: 'wearHiVis',
    fallbackNotes: 'Wear high-visibility jacket at all times.'
  },
  {
    id: 'T-1003',
    title: 'merchStandHelp',
    fallbackTitle: 'Merchandise Stand Assistance',
    description: 'assistMerchDesc',
    fallbackDesc: 'Help stock items and manage queue at main merch stand.',
    assignedBy: 'Emma Smith',
    assignedTime: '13:00',
    startTime: '13:30',
    endTime: '15:30',
    location: 'Main Concourse',
    priority: 'Low',
    status: 'Completed',
    notes: 'none',
    fallbackNotes: 'None'
  }
];

const AssignedTasks = () => {
  const navigate = useNavigate();
  const { isEasyMode } = useOutletContext();
  const { t } = useTranslation();

  const [tasks, setTasks] = useState(mockTasksData);
  const [selectedTask, setSelectedTask] = useState(null);

  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter(t => t.status === 'Pending').length;
  const inProgressTasks = tasks.filter(t => t.status === 'In Progress').length;
  const completedTasks = tasks.filter(t => t.status === 'Completed').length;

  const handleMarkCompleted = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, status: 'Completed' } : task
    ));
    if (selectedTask && selectedTask.id === id) {
      setSelectedTask(null);
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
      case 'Pending': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'In Progress': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'Completed': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
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
          {t('assignedTasks', 'Assigned Tasks')}
        </h2>
      </div>

      <div className="max-w-6xl mx-auto w-full space-y-8">
        
        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700">
            <p className="text-slate-400 mb-1">{t('totalTasks', 'Total Tasks')}</p>
            <p className={`font-bold text-white ${isEasyMode ? 'text-4xl' : 'text-3xl'}`}>{totalTasks}</p>
          </div>
          <div className="bg-slate-800/50 p-4 rounded-2xl border border-yellow-500/30">
            <p className="text-yellow-400 mb-1">{t('pending', 'Pending')}</p>
            <p className={`font-bold text-white ${isEasyMode ? 'text-4xl' : 'text-3xl'}`}>{pendingTasks}</p>
          </div>
          <div className="bg-slate-800/50 p-4 rounded-2xl border border-blue-500/30">
            <p className="text-blue-400 mb-1">{t('inProgress', 'In Progress')}</p>
            <p className={`font-bold text-white ${isEasyMode ? 'text-4xl' : 'text-3xl'}`}>{inProgressTasks}</p>
          </div>
          <div className="bg-slate-800/50 p-4 rounded-2xl border border-emerald-500/30">
            <p className="text-emerald-400 mb-1">{t('completed', 'Completed')}</p>
            <p className={`font-bold text-white ${isEasyMode ? 'text-4xl' : 'text-3xl'}`}>{completedTasks}</p>
          </div>
        </div>

        {/* Task List */}
        <div className="space-y-4">
          {tasks.map(task => (
            <div key={task.id} className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700 hover:border-slate-500 transition-colors">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className={`px-3 py-1 rounded-full border text-xs font-semibold ${getPriorityColor(task.priority)}`}>
                      {t(`priority${task.priority}`, task.priority)}
                    </span>
                    <span className={`px-3 py-1 rounded-full border text-xs font-semibold ${getStatusColor(task.status)}`}>
                      {t(`status${task.status.replace(/\s+/g, '')}`, task.status)}
                    </span>
                    <span className="text-slate-400 text-sm">{task.id}</span>
                  </div>
                  <h3 className={`font-bold text-white mb-2 ${isEasyMode ? 'text-2xl' : 'text-xl'}`}>
                    {t(task.title, task.fallbackTitle)}
                  </h3>
                  <div className="flex flex-col sm:flex-row gap-4 text-slate-300 text-sm mt-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-indigo-400" />
                      <span>{t(task.location.replace(/\s+/g, ''), task.location)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-indigo-400" />
                      <span>{task.startTime} - {task.endTime}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-row md:flex-col gap-3 shrink-0">
                  <button 
                    onClick={() => setSelectedTask(task)}
                    className="flex-1 md:flex-none px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors text-center"
                  >
                    {t('viewDetails', 'View Details')}
                  </button>
                  {task.status !== 'Completed' && (
                    <button 
                      onClick={() => handleMarkCompleted(task.id)}
                      className="flex-1 md:flex-none px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>{t('markCompleted', 'Mark Completed')}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Task Details Modal */}
      {selectedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-800 rounded-3xl w-full max-w-2xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-slate-700 flex items-start justify-between bg-slate-800/80 sticky top-0">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className={`px-3 py-1 rounded-full border text-xs font-semibold ${getPriorityColor(selectedTask.priority)}`}>
                    {t(`priority${selectedTask.priority}`, selectedTask.priority)}
                  </span>
                  <span className={`px-3 py-1 rounded-full border text-xs font-semibold ${getStatusColor(selectedTask.status)}`}>
                    {t(`status${selectedTask.status.replace(/\s+/g, '')}`, selectedTask.status)}
                  </span>
                </div>
                <h3 className={`font-bold text-white ${isEasyMode ? 'text-3xl' : 'text-2xl'}`}>
                  {t(selectedTask.title, selectedTask.fallbackTitle)}
                </h3>
              </div>
              <button 
                onClick={() => setSelectedTask(null)}
                className="p-2 bg-slate-700 hover:bg-slate-600 text-white rounded-full transition-colors shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-6">
              <div>
                <p className="text-slate-400 text-sm mb-1">{t('description', 'Description')}</p>
                <p className="text-white">{t(selectedTask.description, selectedTask.fallbackDesc)}</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-indigo-400 shrink-0" />
                  <div>
                    <p className="text-slate-500 text-xs">{t('assignedBy', 'Assigned By')}</p>
                    <p className="text-slate-200">{selectedTask.assignedBy}</p>
                    <p className="text-slate-500 text-xs mt-1">{t('assignedTime', 'Assigned Time')}: {selectedTask.assignedTime}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-indigo-400 shrink-0" />
                  <div>
                    <p className="text-slate-500 text-xs">{t('location', 'Location')}</p>
                    <p className="text-slate-200">{t(selectedTask.location.replace(/\s+/g, ''), selectedTask.location)}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-indigo-400 shrink-0" />
                  <div>
                    <p className="text-slate-500 text-xs">{t('duration', 'Duration')}</p>
                    <p className="text-slate-200">{selectedTask.startTime} - {selectedTask.endTime}</p>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
                  <FileText className="w-4 h-4" />
                  <span>{t('volunteerNotes', 'Volunteer Notes')}</span>
                </div>
                <div className="bg-slate-700/30 p-4 rounded-xl border border-slate-700 border-l-4 border-l-indigo-500">
                  <p className="text-slate-300 italic">{t(selectedTask.notes, selectedTask.fallbackNotes)}</p>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-700 bg-slate-800/80 sticky bottom-0">
              {selectedTask.status !== 'Completed' ? (
                <button 
                  onClick={() => handleMarkCompleted(selectedTask.id)}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition-colors font-bold flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>{t('markCompleted', 'Mark Completed')}</span>
                </button>
              ) : (
                <button 
                  disabled
                  className="w-full py-3 bg-slate-700 text-emerald-400 rounded-xl font-bold flex items-center justify-center gap-2 opacity-70 cursor-not-allowed"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>{t('taskCompleted', 'Task Completed')}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AssignedTasks;
