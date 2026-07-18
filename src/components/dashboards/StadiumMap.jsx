import React, { useState } from 'react';
import { ArrowLeft, Search, MapPin, Info, Clock, Route, Compass, Coffee, HeartPulse, AlertTriangle, Car } from 'lucide-react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const mapLocations = {
  gateA: { id: 'gateA', name: 'Gate A', desc: 'Main Entrance - North West', distance: '120m', time: '2 mins', nearby: ['Information Desk', 'North Stand'] },
  gateB: { id: 'gateB', name: 'Gate B', desc: 'North East Entrance', distance: '300m', time: '4 mins', nearby: ['East Stand', 'Food Court'] },
  gateC: { id: 'gateC', name: 'Gate C', desc: 'South East Entrance', distance: '450m', time: '6 mins', nearby: ['South Stand', 'Parking'] },
  gateD: { id: 'gateD', name: 'Gate D', desc: 'South West Entrance', distance: '200m', time: '3 mins', nearby: ['West Stand', 'Medical Center'] },
  northStand: { id: 'northStand', name: 'North Stand', desc: 'Home Team Supporters', distance: '150m', time: '2 mins', nearby: ['Gate A', 'Washrooms'] },
  southStand: { id: 'southStand', name: 'South Stand', desc: 'Away Team Supporters', distance: '400m', time: '5 mins', nearby: ['Gate C', 'Food Court'] },
  eastStand: { id: 'eastStand', name: 'East Stand', desc: 'General Admission', distance: '250m', time: '3 mins', nearby: ['Gate B'] },
  westStand: { id: 'westStand', name: 'West Stand', desc: 'Premium Seating', distance: '180m', time: '3 mins', nearby: ['VIP Lounge', 'Gate D'] },
  vip: { id: 'vip', name: 'VIP Lounge', desc: 'Exclusive Premium Area', distance: '190m', time: '3 mins', nearby: ['West Stand'] },
  food: { id: 'food', name: 'Food Court', desc: 'Main Dining Area', distance: '350m', time: '5 mins', nearby: ['East Stand', 'Gate B'] },
  washroom: { id: 'washroom', name: 'Washrooms', desc: 'Public Restrooms', distance: '50m', time: '1 min', nearby: ['North Stand'] },
  medical: { id: 'medical', name: 'Medical Center', desc: 'First Aid & Emergency', distance: '220m', time: '3 mins', nearby: ['Gate D'] },
  parking: { id: 'parking', name: 'Parking', desc: 'Main Stadium Parking', distance: '500m', time: '7 mins', nearby: ['Gate C'] },
  emergency: { id: 'emergency', name: 'Emergency Exit', desc: 'Quick Evacuation Route', distance: '80m', time: '1 min', nearby: ['All Stands'] },
  info: { id: 'info', name: 'Information Desk', desc: 'Guest Services', distance: '100m', time: '2 mins', nearby: ['Gate A'] }
};

const MapButton = ({ id, label, className, selected, onClick, isEasyMode }) => (
  <button 
    onClick={() => onClick(id)}
    className={`absolute flex items-center justify-center text-center font-bold text-xs md:text-sm rounded-lg transition-all duration-300 ${
      selected 
        ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.7)] z-10 scale-110 border-2 border-blue-400' 
        : 'bg-slate-700/80 text-slate-300 hover:bg-slate-600 border border-slate-600 hover:scale-105'
    } ${isEasyMode ? 'text-base md:text-lg' : ''} ${className}`}
  >
    {label}
  </button>
);

const StadiumMap = () => {
  const navigate = useNavigate();
  const { isEasyMode } = useOutletContext();
  const { t } = useTranslation();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selected, setSelected] = useState('northStand');
  const [searchError, setSearchError] = useState('');

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (!query.trim()) {
      setSearchError('');
      return;
    }
    
    const lowerQuery = query.toLowerCase();
    const found = Object.values(mapLocations).find(loc => 
      t(loc.id, loc.name).toLowerCase().includes(lowerQuery) || 
      loc.name.toLowerCase().includes(lowerQuery)
    );
    
    if (found) {
      setSelected(found.id);
      setSearchError('');
    } else {
      setSearchError(t('locationNotFound', 'Location not found.'));
    }
  };

  const quickNav = [
    { id: 'seat', label: t('findMySeat', 'Find My Seat'), icon: MapPin, target: 'northStand' },
    { id: 'food', label: t('foodCourtBtn', 'Food Court'), icon: Coffee, target: 'food' },
    { id: 'washroom', label: t('washroomBtn', 'Washroom'), icon: MapPin, target: 'washroom' },
    { id: 'parking', label: t('parkingBtn', 'Parking'), icon: Car, target: 'parking' },
    { id: 'medical', label: t('medicalBtn', 'Medical Center'), icon: HeartPulse, target: 'medical' },
    { id: 'emergency', label: t('emergencyBtn', 'Emergency Exit'), icon: AlertTriangle, target: 'emergency' }
  ];

  return (
    <div className={`min-h-screen flex flex-col p-6 bg-slate-900 animate-fade-in pb-20 ${isEasyMode ? 'text-lg' : 'text-base'}`}>
      
      {/* Header */}
      <div className="flex items-center gap-4 mb-6 pt-16 sm:pt-0">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center justify-center p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-700 transition-colors shrink-0"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className={`font-bold text-white ${isEasyMode ? 'text-3xl' : 'text-2xl'}`}>
          {t('stadiumMapTitle', 'Stadium Map & Navigation')}
        </h2>
      </div>

      <div className="max-w-4xl mx-auto w-full space-y-6">
        
        {/* Search */}
        <div className="relative flex flex-col gap-2">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder={t('searchLocation', 'Search locations...')}
              value={searchQuery}
              onChange={handleSearch}
              className={`w-full bg-slate-800 border border-slate-700 rounded-2xl pl-12 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors ${isEasyMode ? 'text-xl py-4' : 'text-base'}`}
            />
          </div>
          {searchError && (
            <p className="text-rose-400 text-sm ml-2">{searchError}</p>
          )}
        </div>

        {/* Quick Nav */}
        <div>
          <h3 className={`text-slate-400 mb-3 font-medium ${isEasyMode ? 'text-lg' : 'text-sm'}`}>
            {t('quickLocationsTitle', 'Quick Locations')}
          </h3>
          <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
            {quickNav.map(nav => (
              <button 
                key={nav.id}
                onClick={() => setSelected(nav.target)}
                className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 rounded-full whitespace-nowrap text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
              >
                <nav.icon className="w-4 h-4" />
                <span className={isEasyMode ? 'text-lg' : 'text-sm'}>{nav.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Interactive Map */}
          <div className="relative aspect-square sm:aspect-[4/3] lg:aspect-square w-full bg-slate-800 rounded-3xl border border-slate-700 overflow-hidden shadow-2xl p-4">
            {/* Field */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[45%] h-[55%] bg-emerald-900/30 border-2 border-emerald-500/30 rounded-xl flex items-center justify-center">
              <div className="w-12 h-12 sm:w-20 sm:h-20 border-2 border-emerald-500/30 rounded-full" />
              <div className="absolute w-full h-0.5 bg-emerald-500/30" />
            </div>

            {/* Stands */}
            <MapButton id="northStand" label={t('northStand', 'North Stand')} selected={selected === 'northStand'} onClick={setSelected} isEasyMode={isEasyMode} className="top-[10%] left-[30%] right-[30%] h-[12%]" />
            <MapButton id="southStand" label={t('southStand', 'South Stand')} selected={selected === 'southStand'} onClick={setSelected} isEasyMode={isEasyMode} className="bottom-[10%] left-[30%] right-[30%] h-[12%]" />
            <MapButton id="westStand" label={t('westStand', 'West Stand')} selected={selected === 'westStand'} onClick={setSelected} isEasyMode={isEasyMode} className="left-[10%] top-[30%] bottom-[30%] w-[12%]" />
            <MapButton id="eastStand" label={t('eastStand', 'East Stand')} selected={selected === 'eastStand'} onClick={setSelected} isEasyMode={isEasyMode} className="right-[10%] top-[30%] bottom-[30%] w-[12%]" />

            {/* Gates */}
            <MapButton id="gateA" label={t('gateA', 'Gate A')} selected={selected === 'gateA'} onClick={setSelected} isEasyMode={isEasyMode} className="top-4 left-4 w-14 h-12" />
            <MapButton id="gateB" label={t('gateB', 'Gate B')} selected={selected === 'gateB'} onClick={setSelected} isEasyMode={isEasyMode} className="top-4 right-4 w-14 h-12" />
            <MapButton id="gateC" label={t('gateC', 'Gate C')} selected={selected === 'gateC'} onClick={setSelected} isEasyMode={isEasyMode} className="bottom-4 right-4 w-14 h-12" />
            <MapButton id="gateD" label={t('gateD', 'Gate D')} selected={selected === 'gateD'} onClick={setSelected} isEasyMode={isEasyMode} className="bottom-4 left-4 w-14 h-12" />

            {/* Facilities */}
            <MapButton id="vip" label={t('vipBtn', 'VIP')} selected={selected === 'vip'} onClick={setSelected} isEasyMode={isEasyMode} className="top-[50%] left-2 w-12 h-12 rounded-full" />
            <MapButton id="food" label={t('foodBtn', 'Food')} selected={selected === 'food'} onClick={setSelected} isEasyMode={isEasyMode} className="top-[50%] right-2 w-12 h-12 rounded-full" />
            <MapButton id="washroom" label={t('wcBtn', 'WC')} selected={selected === 'washroom'} onClick={setSelected} isEasyMode={isEasyMode} className="top-[15%] left-[20%] w-10 h-10 rounded-full" />
            <MapButton id="medical" label={t('medBtn', 'Med')} selected={selected === 'medical'} onClick={setSelected} isEasyMode={isEasyMode} className="bottom-[15%] left-[20%] w-10 h-10 rounded-full bg-red-900/50 hover:bg-red-800/50" />
            <MapButton id="parking" label={t('parkBtn', 'Park')} selected={selected === 'parking'} onClick={setSelected} isEasyMode={isEasyMode} className="bottom-2 right-[35%] w-14 h-10" />
            <MapButton id="info" label={t('infoBtn', 'Info')} selected={selected === 'info'} onClick={setSelected} isEasyMode={isEasyMode} className="top-2 left-[35%] w-14 h-10" />
            <MapButton id="emergency" label={t('exitBtn', 'Exit')} selected={selected === 'emergency'} onClick={setSelected} isEasyMode={isEasyMode} className="bottom-[15%] right-[20%] w-10 h-10 rounded-full bg-rose-900/50 hover:bg-rose-800/50" />
          </div>

          <div className="flex flex-col gap-6">
            {/* Info Card */}
            {selected && mapLocations[selected] && (
              <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 animate-slide-up flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className={`font-bold text-white ${isEasyMode ? 'text-2xl' : 'text-xl'}`}>
                    {t(mapLocations[selected].id, mapLocations[selected].name)}
                  </h3>
                </div>
                <p className={`text-slate-400 mb-6 ${isEasyMode ? 'text-lg' : 'text-sm'}`}>
                  {t(mapLocations[selected].id + 'Desc', mapLocations[selected].desc)}
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-3 text-slate-300 bg-slate-900/50 p-3 rounded-xl border border-slate-700/50">
                    <div className="p-2 bg-blue-500/20 rounded-lg"><Route className="w-5 h-5 text-blue-400" /></div>
                    <div>
                      <p className="text-xs text-slate-500">{t('distance', 'Distance')}</p>
                      <p className={`font-semibold ${isEasyMode ? 'text-lg' : 'text-sm'}`}>{t(mapLocations[selected].distance, mapLocations[selected].distance)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-slate-300 bg-slate-900/50 p-3 rounded-xl border border-slate-700/50">
                    <div className="p-2 bg-blue-500/20 rounded-lg"><Clock className="w-5 h-5 text-blue-400" /></div>
                    <div>
                      <p className="text-xs text-slate-500">{t('estTime', 'Est. Time')}</p>
                      <p className={`font-semibold ${isEasyMode ? 'text-lg' : 'text-sm'}`}>{t(mapLocations[selected].time, mapLocations[selected].time)}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <p className="text-xs text-slate-500 mb-3">{t('nearbyFacilities', 'Nearby Facilities')}</p>
                  <div className="flex flex-wrap gap-2">
                    {mapLocations[selected].nearby.map(facility => (
                      <span key={facility} className={`px-3 py-1.5 bg-slate-700/50 border border-slate-600 rounded-full text-slate-300 ${isEasyMode ? 'text-base' : 'text-xs'}`}>
                        {t(facility.replace(/\s+/g, ''), facility)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* AI Tips */}
            <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-blue-500/20 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                <Compass className="w-24 h-24" />
              </div>
              <div className="flex items-center gap-2 mb-4 relative z-10">
                <Compass className="w-5 h-5 text-blue-400" />
                <h3 className={`font-bold text-white ${isEasyMode ? 'text-xl' : 'text-lg'}`}>{t('aiNavTips', 'AI Navigation Tips')}</h3>
              </div>
              <ul className="space-y-3 relative z-10">
                {[
                  t('tip1', 'Gate B is the fastest entrance.'),
                  t('tip2', 'Food Court is less crowded right now.'),
                  t('tip3', 'Washroom near South Stand has the shortest waiting time.')
                ].map((tip, idx) => (
                  <li key={idx} className={`flex items-start gap-3 text-slate-300 bg-slate-800/80 backdrop-blur-sm p-3 rounded-lg border border-slate-700/50 ${isEasyMode ? 'text-lg' : 'text-sm'}`}>
                    <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StadiumMap;
