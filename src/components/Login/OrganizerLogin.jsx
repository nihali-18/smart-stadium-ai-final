import React, { useState, useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { requestOTP, verifyOTP } from '../../services/auth';

const OrganizerLogin = () => {
  const [step, setStep] = useState(1); // 1: Details, 2: OTP
  const [name, setName] = useState('');
  const [organizerId, setOrganizerId] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [devOtpMsg, setDevOtpMsg] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);
  const [sessionExpired, setSessionExpired] = useState(false);

  const navigate = useNavigate();
  const { setAuthState } = useOutletContext();
  const { t } = useTranslation();

  useEffect(() => {
    if (sessionStorage.getItem('sessionExpired') === 'true') {
      setSessionExpired(true);
      sessionStorage.removeItem('sessionExpired');
    }
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleRequestOTP = async (e) => {
    e.preventDefault();
    if (!name.trim() || !organizerId.trim() || !email.trim()) return;
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError(t('invalidEmailFormat', 'Please enter a valid email address.'));
      return;
    }

    setLoading(true);
    setError('');
    setDevOtpMsg('');
    setSessionExpired(false);

    try {
      const trimmedEmail = email.trim().toLowerCase();
      const generatedOtp = await requestOTP('organizer', name.trim(), organizerId.trim(), trimmedEmail);
      setStep(2);
      setTimeLeft(60); // 60 seconds countdown for resend
      // Display OTP during development
      setDevOtpMsg(t('devOtpMessage', 'Development OTP generated: ') + generatedOtp);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (!otp.trim()) return;

    setLoading(true);
    setError('');
    setDevOtpMsg('');
    
    try {
      const user = await verifyOTP(email.trim().toLowerCase(), otp.trim());
      setAuthState({ role: 'organizer', isAuthenticated: true, user });
      navigate('/dashboard/organizer', { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-6 bg-slate-900 animate-fade-in relative items-center justify-center">
      <button 
        onClick={() => navigate(-1)}
        className="absolute top-8 left-8 flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>{t('back', 'Back')}</span>
      </button>

      <div className="w-full max-w-md bg-slate-800/50 p-8 rounded-3xl border border-slate-700 shadow-2xl backdrop-blur-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="p-4 rounded-full bg-gradient-to-br from-orange-500 to-yellow-500 shadow-lg shadow-orange-500/20 mb-4">
            <ShieldCheck className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white">{t('organizerLogin', 'Organizer Login')}</h2>
          <p className="text-slate-400 mt-2 text-center">
            {step === 1 ? t('enterDetails', 'Enter your details to receive an OTP.') : t('enterOTP', 'Enter the OTP sent to') + ` ${email}`}
          </p>
        </div>

        {sessionExpired && (
          <div className="mb-6 p-4 rounded-xl bg-orange-500/20 border border-orange-500/50 text-orange-200 text-sm text-center">
            {t('sessionExpired', 'Your session has expired due to inactivity. Please log in again.')}
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/20 border border-red-500/50 text-red-200 text-sm text-center">
            {error}
          </div>
        )}

        {devOtpMsg && (
          <div className="mb-6 p-4 rounded-xl bg-green-500/20 border border-green-500/50 text-green-200 text-sm text-center font-bold">
            {devOtpMsg}
          </div>
        )}

        {step === 1 ? (
          <form onSubmit={handleRequestOTP} className="flex flex-col gap-5">
            <div>
              <label className="block text-slate-300 font-medium mb-2">{t('organizerName', 'Organizer Name')}</label>
              <input 
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-xl text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                placeholder={t('organizerNamePlaceholder', 'e.g. Admin')}
                required
              />
            </div>
            <div>
              <label className="block text-slate-300 font-medium mb-2">{t('organizerId', 'Organizer ID')}</label>
              <input 
                type="text"
                value={organizerId}
                onChange={(e) => setOrganizerId(e.target.value)}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-xl text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                placeholder={t('organizerIdPlaceholder', 'e.g. ORG-123')}
                required
              />
            </div>
            <div>
              <label className="block text-slate-300 font-medium mb-2">{t('officialEmail', 'Official Email')}</label>
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-xl text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                placeholder={t('organizerEmailPlaceholder', 'admin@example.com')}
                required
              />
            </div>
            <button 
              type="submit"
              disabled={loading}
              className="w-full mt-4 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-lg hover:opacity-90 hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-orange-500/25 disabled:opacity-50 disabled:scale-100"
            >
              {loading ? t('sending', 'Sending...') : t('sendOTP', 'Send OTP')}
            </button>
            <div className="text-center text-xs text-slate-500 mt-2">
              {t('testCredentialsOrganizer', 'Use ORG-123 / Admin / admin@example.com for testing')}
            </div>
          </form>
        ) : (
          <form onSubmit={handleVerifyOTP} className="flex flex-col gap-5">
            <div>
              <label className="block text-slate-300 font-medium mb-2">{t('oneTimePassword', 'One-Time Password')}</label>
              <input 
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-xl text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors text-center text-2xl tracking-widest"
                placeholder="••••••"
                maxLength={6}
                required
              />
            </div>
            <button 
              type="submit"
              disabled={loading}
              className="w-full mt-4 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-lg hover:opacity-90 hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-orange-500/25 disabled:opacity-50 disabled:scale-100"
            >
              {loading ? t('verifying', 'Verifying...') : t('verifyOTP', 'Verify OTP')}
            </button>
            
            <div className="flex justify-center mt-4">
              <button
                type="button"
                onClick={handleRequestOTP}
                disabled={timeLeft > 0 || loading}
                className="text-orange-400 text-sm font-medium hover:text-orange-300 transition-colors disabled:opacity-50"
              >
                {timeLeft > 0 ? t('resendOTPIn', 'Resend OTP in') + ` ${timeLeft}s` : t('resendOTP', 'Resend OTP')}
              </button>
            </div>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-slate-500 text-sm font-medium hover:text-slate-300 transition-colors mt-2"
            >
              {t('backToDetails', 'Back to Details')}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default OrganizerLogin;
