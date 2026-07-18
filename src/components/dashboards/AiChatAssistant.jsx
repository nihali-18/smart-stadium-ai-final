import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Send, Trash2, MessageSquare } from 'lucide-react';
import { sendMessageToAI } from '../../services/ai';

const AiChatAssistant = () => {
  const navigate = useNavigate();
  const { isEasyMode } = useOutletContext();
  const { t, i18n } = useTranslation();
  
  const [messages, setMessages] = useState([
    {
      translationKey: 'ai.welcomeMessage',
      fallbackText: t('ai.welcomeMessage', 'Hello! I am your Smart Stadium AI Assistant. How can I help you today?'),
      timestamp: new Date().toISOString(),
      isAi: true
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const quickActions = [
    t('quickAction1', 'Find my seat'),
    t('quickAction2', 'Food near me'),
    t('quickAction3', 'Match schedule'),
    t('quickAction4', 'Emergency help'),
    t('quickAction5', 'Stadium rules')
  ];

 const scrollToBottom = () => {
  if (messagesEndRef.current) {
    messagesEndRef.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });
  }
};

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Reset chat history when language changes, keeping only the welcome message
  useEffect(() => {
    setMessages([
      {
        translationKey: 'ai.welcomeMessage',
        fallbackText: t('ai.welcomeMessage', 'Hello! I am your Smart Stadium AI Assistant. How can I help you today?'),
        timestamp: new Date().toISOString(),
        isAi: true
      }
    ]);
  }, [i18n.language]);

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;
    
    // Add user message
    const userMsg = {
      text,
      timestamp: new Date().toISOString(),
      isAi: false
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Fetch AI response
      const aiResponse = await sendMessageToAI(text, messages, i18n.language);
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Failed to get AI response:', error);
      // Fallback message in case of error
      setMessages(prev => [...prev, {
        text: t('ai.errorMessage', 'Sorry, I encountered an error. Please try again.'),
        timestamp: new Date().toISOString(),
        isAi: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        translationKey: 'ai.welcomeMessage',
        fallbackText: t('ai.welcomeMessage', 'Hello! I am your Smart Stadium AI Assistant. How can I help you today?'),
        timestamp: new Date().toISOString(),
        isAi: true
      }
    ]);
  };

  return (
  <div className="h-screen flex flex-col bg-slate-900 animate-fade-in overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 md:p-6 pr-24 md:pr-48 bg-slate-800/80 backdrop-blur-md border-b border-slate-700 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center justify-center p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-cyan-500/20">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <h2 className={`font-bold text-white ${isEasyMode ? 'text-2xl md:text-3xl' : 'text-xl'}`}>
              {t('aiChatAssistant', 'AI Chat Assistant')}
            </h2>
          </div>
        </div>
        <button 
          onClick={handleClearChat}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
          title={t('clearChat', 'Clear Chat')}
        >
          <Trash2 className="w-5 h-5" />
          <span className="hidden sm:inline text-sm font-medium">{t('clearChat', 'Clear Chat')}</span>
        </button>
      </div>

      {/* Messages Area */}
      <div
  className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 custom-scrollbar"
  style={{ scrollBehavior: "smooth" }}
>
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.isAi ? 'justify-start' : 'justify-end'}`}>
            <div 
              className={`max-w-[85%] md:max-w-[70%] p-4 rounded-2xl ${
                msg.isAi 
                  ? 'bg-slate-800 border border-slate-700 text-slate-200 rounded-tl-sm shadow-md' 
                  : 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-tr-sm shadow-lg shadow-blue-500/20'
              } ${isEasyMode ? 'text-xl' : 'text-base'}`}
            >
              {msg.isAi && msg.translationKey ? t(msg.translationKey, msg.fallbackText) : msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[85%] md:max-w-[70%] p-4 rounded-2xl bg-slate-800 border border-slate-700 text-slate-400 rounded-tl-sm flex items-center gap-2">
              <span className="text-sm mr-1">{t('ai.typing', 'AI Assistant is typing')}</span>
              <div className="w-2 h-2 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area & Quick Actions */}
      <div className="bg-slate-800/90 backdrop-blur-md border-t border-slate-700 p-4 sticky bottom-0">
        <div className="max-w-4xl mx-auto flex flex-col gap-3">
          
          {/* Quick Actions Scrollable Row */}
          <div className="flex overflow-x-auto gap-2 pb-2 custom-scrollbar hide-scrollbar">
            {quickActions.map((action, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(action)}
                disabled={isLoading}
                className="whitespace-nowrap px-4 py-2 rounded-full bg-slate-700/50 hover:bg-slate-600 border border-slate-600 text-slate-300 text-sm font-medium transition-colors disabled:opacity-50"
              >
                {action}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputValue); }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={t('typeMessage', 'Type a message...')}
              disabled={isLoading}
              className={`flex-1 bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors ${isEasyMode ? 'text-lg' : 'text-base'}`}
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className={`flex items-center justify-center bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${isEasyMode ? 'px-8' : 'px-6'}`}
              title={t('send', 'Send')}
            >
              <Send className={`${isEasyMode ? 'w-6 h-6' : 'w-5 h-5'}`} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AiChatAssistant;
