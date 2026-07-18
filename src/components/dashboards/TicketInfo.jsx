import React from 'react';
import { ArrowLeft, Ticket, QrCode, Download, Share2, MapPin, User, Calendar, Clock } from 'lucide-react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getSharedMatchData } from '../../data/matchData';

const TicketInfo = () => {
  const navigate = useNavigate();
  const { isEasyMode } = useOutletContext();
  const { t } = useTranslation();

  const sharedData = getSharedMatchData(t);

  const ticketData = {
    match: `${sharedData.homeTeam} vs ${sharedData.awayTeam}`,
    date: sharedData.matchDate,
    time: sharedData.matchTime,
    venue: sharedData.venue,
    status: sharedData.status,
    fanName: 'Alex Johnson', 
    bookingId: 'BKG-8472910',
    type: t('vipType', 'VIP Premium'),
    gate: 'A4',
    entryTime: '17:30',
    stand: 'North',
    row: 'G',
    seat: '42'
  };

  return (
    <div className={`min-h-screen bg-slate-900 pb-20 ${isEasyMode ? 'text-xl' : 'text-base'}`}>
      {/* Header */}
      <div className="bg-slate-800 p-4 sticky top-0 z-10 border-b border-slate-700 shadow-lg">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 text-slate-300 hover:text-white transition-colors"
          >
            <ArrowLeft className={isEasyMode ? 'w-8 h-8' : 'w-6 h-6'} />
          </button>
          <h1 className={`font-bold text-white ${isEasyMode ? 'text-2xl' : 'text-xl'}`}>
            {t('ticketInfo', 'Ticket Info')}
          </h1>
        </div>
      </div>

      <div className="p-4 max-w-lg mx-auto space-y-6 animate-fade-in mt-4">
        
        {/* Ticket Card */}
        <div className="bg-gradient-to-br from-indigo-900 to-blue-900 rounded-2xl overflow-hidden shadow-xl border border-indigo-500/30">
          
          {/* Match Details Section */}
          <div className="p-6 border-b border-white/10">
            <div className="flex justify-between items-start mb-4">
              <span className={`px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full font-medium ${isEasyMode ? 'text-lg' : 'text-sm'}`}>
                {ticketData.type}
              </span>
              <Ticket className="text-indigo-300 opacity-50 w-8 h-8" />
            </div>
            
            <h2 className={`font-bold text-white mb-2 ${isEasyMode ? 'text-3xl' : 'text-2xl'}`}>
              {ticketData.match}
            </h2>
            
            <div className="space-y-2 text-indigo-100">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-indigo-300" />
                <span>{ticketData.date} • {ticketData.time}{ticketData.status ? ` • ${ticketData.status}` : ''}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-indigo-300" />
                <span>{ticketData.venue}</span>
              </div>
            </div>
          </div>

          {/* Seat & Entry Details */}
          <div className="bg-white/5 p-6 space-y-4 border-b border-white/10">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-indigo-300 text-sm mb-1">{t('gateLabel', 'Gate')}</p>
                <p className={`font-bold text-white ${isEasyMode ? 'text-2xl' : 'text-xl'}`}>{ticketData.gate}</p>
              </div>
              <div>
                <p className="text-indigo-300 text-sm mb-1">{t('entryTimeLabel', 'Entry Time')}</p>
                <p className={`font-bold text-white ${isEasyMode ? 'text-2xl' : 'text-xl'}`}>{ticketData.entryTime}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/10">
              <div className="text-center bg-black/20 rounded-lg p-2">
                <p className="text-indigo-300 text-xs mb-1">{t('standLabel', 'Stand / Block')}</p>
                <p className="font-bold text-white">{ticketData.stand}</p>
              </div>
              <div className="text-center bg-black/20 rounded-lg p-2">
                <p className="text-indigo-300 text-xs mb-1">{t('rowLabel', 'Row')}</p>
                <p className="font-bold text-white">{ticketData.row}</p>
              </div>
              <div className="text-center bg-black/20 rounded-lg p-2">
                <p className="text-indigo-300 text-xs mb-1">{t('seatLabel', 'Seat Number')}</p>
                <p className="font-bold text-white">{ticketData.seat}</p>
              </div>
            </div>
          </div>

          {/* Fan Info */}
          <div className="p-6 bg-slate-900/40">
            <div className="flex items-center justify-between mb-2">
              <p className="text-indigo-300 text-sm">{t('fanNameLabel', 'Fan Name')}</p>
              <p className="font-medium text-white">{ticketData.fanName}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-indigo-300 text-sm">{t('ticketIdLabel', 'Ticket ID / Booking ID')}</p>
              <p className="font-medium text-white font-mono">{ticketData.bookingId}</p>
            </div>
          </div>
        </div>

        {/* QR Code Section */}
        <div className="bg-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center border border-slate-700 text-center">
          <div className="bg-white p-4 rounded-xl mb-4">
            <QrCode className="w-32 h-32 text-slate-900" />
          </div>
          <h3 className="text-white font-medium mb-1">{t('qrCodeDemo', 'QR Code Verification (Demo)')}</h3>
          <p className="text-slate-400 text-sm">{t('scanAtGate', 'Scan this code at the gate')}</p>
        </div>

      </div>
    </div>
  );
};

export default TicketInfo;
