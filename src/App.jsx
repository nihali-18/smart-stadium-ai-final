import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, Outlet, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguagePopup from './components/LanguagePopup';
import LanguageSwitcher from './components/LanguageSwitcher';
import LandingPage from './components/LandingPage';
import RoleSelection from './components/RoleSelection';
import FanExperience from './components/FanExperience';
import FanDashboard from './components/dashboards/FanDashboard';
import VolunteerDashboard from './components/dashboards/VolunteerDashboard';
import OrganizerDashboard from './components/dashboards/OrganizerDashboard';
import VolunteerLogin from './components/Login/VolunteerLogin';
import OrganizerLogin from './components/Login/OrganizerLogin';
import StaffLogin from './components/Login/StaffLogin';
import StaffDashboard from './components/dashboards/StaffDashboard';
import FeaturePlaceholder from './components/dashboards/FeaturePlaceholder';
import AiChatAssistant from './components/dashboards/AiChatAssistant';
import AssignedTasks from './components/dashboards/volunteer/AssignedTasks';
import CrowdManagement from './components/dashboards/volunteer/CrowdManagement';
import IncidentReporting from './components/dashboards/volunteer/IncidentReporting';
import EventOverview from './components/dashboards/organizer/EventOverview';
import VolunteerManagement from './components/dashboards/organizer/VolunteerManagement';
import Announcements from './components/dashboards/organizer/Announcements';
import AnalyticsReports from './components/dashboards/organizer/AnalyticsReports';
import LiveMatchInfo from './components/dashboards/LiveMatchInfo';
import TicketInfo from './components/dashboards/TicketInfo';
import StadiumMap from './components/dashboards/StadiumMap';
import EmergencyAssistance from './components/dashboards/ground/EmergencyAssistance';
import FacilityStatus from './components/dashboards/ground/FacilityStatus';
import MaintenanceRequests from './components/dashboards/ground/MaintenanceRequests';
import FanFeedback from './components/dashboards/FanFeedback';
import About from './components/About';
import Footer from './components/Footer';

const INACTIVITY_TIMEOUT = 15 * 60 * 1000; // 15 minutes

const ProtectedRoute = ({ role, authState, children }) => {
  if (!authState.isAuthenticated || authState.role !== role) {
    return <Navigate to={`/login/${role}`} replace />;
  }
  return children;
};

const Layout = ({ isEasyMode, setIsEasyMode, authState, setAuthState }) => {
  const location = useLocation();
  const { i18n } = useTranslation();
  const [hasSelectedLanguage, setHasSelectedLanguage] = useState(
    localStorage.getItem('hasSelectedLanguage') === 'true'
  );

  const handleSelectLanguage = (code) => {
    i18n.changeLanguage(code);
    localStorage.setItem('hasSelectedLanguage', 'true');
    setHasSelectedLanguage(true);
  };

  const isFanRoute = location.pathname.startsWith('/dashboard/fan') || location.pathname.startsWith('/fan-experience');

  useEffect(() => {
    if (!isFanRoute) {
      if (isEasyMode) {
        setIsEasyMode(false);
      }
    }
  }, [isFanRoute, isEasyMode, setIsEasyMode]);

  return (
    <div className={`min-h-screen bg-slate-900 flex flex-col ${(isFanRoute && isEasyMode) ? 'text-xl' : 'text-base'}`}>
      {!hasSelectedLanguage && (
        <LanguagePopup 
          onSelectLanguage={handleSelectLanguage} 
          isEasyMode={isFanRoute && isEasyMode} 
        />
      )}
      {hasSelectedLanguage && (
        <>
          <LanguageSwitcher />
          <main className="flex-1 w-full flex flex-col">
            <Outlet context={{ isEasyMode, setIsEasyMode, authState, setAuthState }} />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
};

function App() {
  const [isEasyMode, setIsEasyMode] = useState(false);
  const [authState, setAuthState] = useState(() => {
    const saved = localStorage.getItem('authState');
    return saved ? JSON.parse(saved) : { role: null, isAuthenticated: false };
  });

  const logout = useCallback(() => {
    if (authState.role) {
      sessionStorage.setItem('sessionExpired', 'true');
    }
    setAuthState({ role: null, isAuthenticated: false });
    localStorage.removeItem('authState');
  }, [authState.role]);

  useEffect(() => {
    let timeoutId;
    
    const resetTimer = () => {
      clearTimeout(timeoutId);
      if (authState.isAuthenticated) {
        timeoutId = setTimeout(logout, INACTIVITY_TIMEOUT);
      }
    };

    if (authState.isAuthenticated) {
      resetTimer();
      window.addEventListener('mousemove', resetTimer);
      window.addEventListener('keydown', resetTimer);
      window.addEventListener('click', resetTimer);
      window.addEventListener('scroll', resetTimer);
    }

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      window.removeEventListener('click', resetTimer);
      window.removeEventListener('scroll', resetTimer);
    };
  }, [authState.isAuthenticated, logout]);

  useEffect(() => {
    localStorage.setItem('authState', JSON.stringify(authState));
  }, [authState]);

  return (
    <Routes>
      <Route element={<Layout isEasyMode={isEasyMode} setIsEasyMode={setIsEasyMode} authState={authState} setAuthState={setAuthState} />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/role" element={<RoleSelection />} />
        <Route path="/fan-experience" element={<FanExperience />} />
        
        {/* Auth Routes */}
        <Route path="/login/volunteer" element={<VolunteerLogin />} />
        <Route path="/login/organizer" element={<OrganizerLogin />} />
        <Route path="/login/staff" element={<StaffLogin />} />

        {/* Dashboard Routes */}
        <Route path="/dashboard/fan" element={<FanDashboard />} />
        <Route path="/dashboard/fan/chat" element={<AiChatAssistant />} />
        <Route path="/dashboard/fan/match" element={<LiveMatchInfo />} />
        <Route path="/dashboard/fan/ticket" element={<TicketInfo />} />
        <Route path="/dashboard/fan/map" element={<StadiumMap />} />
        <Route path="/dashboard/fan/nav" element={<StadiumMap />} />
        <Route path="/dashboard/fan/feedback" element={<FanFeedback />} />
        <Route path="/dashboard/fan/:featureId" element={<FeaturePlaceholder />} />

        {/* Protected Volunteer Routes */}
        <Route path="/dashboard/volunteer" element={
          <ProtectedRoute role="volunteer" authState={authState}>
            <VolunteerDashboard />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/volunteer/tasks" element={
          <ProtectedRoute role="volunteer" authState={authState}>
            <AssignedTasks />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/volunteer/crowd" element={
          <ProtectedRoute role="volunteer" authState={authState}>
            <CrowdManagement />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/volunteer/incident" element={
          <ProtectedRoute role="volunteer" authState={authState}>
            <IncidentReporting />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/volunteer/:featureId" element={
          <ProtectedRoute role="volunteer" authState={authState}>
            <FeaturePlaceholder />
          </ProtectedRoute>
        } />

        {/* Protected Organizer Routes */}
        <Route path="/dashboard/organizer" element={
          <ProtectedRoute role="organizer" authState={authState}>
            <OrganizerDashboard />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/organizer/match" element={
          <ProtectedRoute role="organizer" authState={authState}>
            <EventOverview />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/organizer/volunteers" element={
          <ProtectedRoute role="organizer" authState={authState}>
            <VolunteerManagement />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/organizer/announcements" element={
          <ProtectedRoute role="organizer" authState={authState}>
            <Announcements />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/organizer/reports" element={
          <ProtectedRoute role="organizer" authState={authState}>
            <AnalyticsReports />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/organizer/analytics" element={
          <ProtectedRoute role="organizer" authState={authState}>
            <AnalyticsReports />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/organizer/:featureId" element={
          <ProtectedRoute role="organizer" authState={authState}>
            <FeaturePlaceholder />
          </ProtectedRoute>
        } />

        {/* Protected Staff Routes */}
        <Route path="/dashboard/staff" element={
          <ProtectedRoute role="staff" authState={authState}>
            <StaffDashboard />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/staff/emergency" element={
          <ProtectedRoute role="staff" authState={authState}>
            <EmergencyAssistance />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/staff/facility" element={
          <ProtectedRoute role="staff" authState={authState}>
            <FacilityStatus />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/staff/maintenance" element={
          <ProtectedRoute role="staff" authState={authState}>
            <MaintenanceRequests />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/staff/:featureId" element={
          <ProtectedRoute role="staff" authState={authState}>
            <FeaturePlaceholder />
          </ProtectedRoute>
        } />
      </Route>
    </Routes>
  );
}

export default App;
