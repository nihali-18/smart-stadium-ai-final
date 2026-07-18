import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Star, MessageSquare, ArrowLeft, Send, Trash2, Eye } from 'lucide-react';
import { useNavigate, useOutletContext } from 'react-router-dom';

const initialFeedback = [
  { id: 1, rating: 5, category: 'AI Chat', comment: 'Very helpful feature!', datetime: '2026-07-17 14:30' },
  { id: 2, rating: 4, category: 'Stadium Map', comment: 'Good, but could use more details.', datetime: '2026-07-18 15:45' }
];

export default function FanFeedback() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const context = useOutletContext();
  const isEasyMode = context?.isEasyMode || false;

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [category, setCategory] = useState('Overall Experience');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [feedbackList, setFeedbackList] = useState(initialFeedback);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) return;
    
    const newFeedback = {
      id: Date.now(),
      rating,
      category,
      comment,
      datetime: new Date().toLocaleString()
    };
    
    setFeedbackList([newFeedback, ...feedbackList]);
    setSubmitted(true);
    handleClear();
    
    // Hide success message after 3 seconds
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleClear = () => {
    setRating(0);
    setCategory('Overall Experience');
    setComment('');
  };

  const categories = [
    t('fan.feedback.cat1', 'Overall Experience'),
    t('fan.feedback.cat2', 'AI Chat'),
    t('fan.feedback.cat3', 'Stadium Map'),
    t('fan.feedback.cat4', 'Ticket Information'),
    t('fan.feedback.cat5', 'Match Experience')
  ];

  return (
    <div className={`min-h-screen p-6 bg-slate-900 animate-fade-in ${isEasyMode ? 'text-xl' : 'text-base'}`}>
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className={`${isEasyMode ? 'w-8 h-8' : 'w-6 h-6'}`} />
          </button>
          <h1 className={`font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 ${isEasyMode ? 'text-4xl md:text-5xl' : 'text-3xl'}`}>
            {t('fan.feedback.title', 'Fan Feedback')}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Form Section */}
          <div className="bg-slate-800/50 border border-slate-700 p-6 md:p-8 rounded-3xl shadow-xl">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <MessageSquare className="text-blue-400" />
              {t('fan.feedback.shareTitle', 'Share Your Experience')}
            </h2>
            
            {submitted && (
              <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-xl text-green-300 font-medium animate-slide-up">
                {t('fan.feedback.successMsg', 'Thank you! Your feedback has been submitted successfully.')}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Rating */}
              <div>
                <label className="block text-slate-300 font-medium mb-3">{t('fan.feedback.rating', 'Rating (Required)')}</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                      className="focus:outline-none transition-transform hover:scale-110"
                    >
                      <Star 
                        className={`${isEasyMode ? 'w-10 h-10' : 'w-8 h-8'} ${
                          (hoverRating || rating) >= star 
                            ? 'fill-yellow-400 text-yellow-400' 
                            : 'text-slate-600'
                        }`} 
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-slate-300 font-medium mb-2">{t('fan.feedback.category', 'Category (Optional)')}</label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition-colors"
                >
                  {categories.map((cat, idx) => (
                    <option key={idx} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Comment */}
              <div>
                <label className="block text-slate-300 font-medium mb-2">{t('fan.feedback.comment', 'Comment (Optional)')}</label>
                <textarea 
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition-colors resize-none h-32"
                  placeholder={t('fan.feedback.placeholder', 'Tell us about your experience...')}
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-2">
                <button 
                  type="button"
                  onClick={handleClear}
                  className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-medium py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-5 h-5" />
                  <span className="hidden sm:inline">{t('common.clear', 'Clear')}</span>
                </button>
                <button 
                  type="submit"
                  disabled={rating === 0}
                  className="flex-[2] bg-gradient-to-r from-blue-500 to-cyan-500 hover:opacity-90 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
                >
                  <Send className="w-5 h-5" />
                  {t('fan.feedback.submit', 'Submit')}
                </button>
              </div>
            </form>
          </div>

          {/* List Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Star className="text-yellow-400" />
              {t('fan.feedback.previousFeedback', 'Previous Feedback')}
            </h2>
            
            <div className="space-y-4 overflow-y-auto max-h-[600px] pr-2 custom-scrollbar">
              {feedbackList.map((item) => (
                <div key={item.id} className="bg-slate-800 rounded-2xl p-5 border border-slate-700 shadow-md transition-all hover:border-slate-500">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < item.rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-600'}`} />
                      ))}
                    </div>
                    <span className="text-xs text-slate-400">{item.datetime}</span>
                  </div>
                  
                  <div className="mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 bg-blue-400/10 px-2 py-1 rounded">
                      {item.category}
                    </span>
                  </div>
                  
                  {item.comment && (
                    <p className="text-slate-300 text-sm line-clamp-2 mt-3">{item.comment}</p>
                  )}
                  
                  <button 
                    onClick={() => setSelectedFeedback(item)}
                    className="mt-4 text-sm text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
                  >
                    <Eye className="w-4 h-4" /> {t('common.viewDetails', 'View Details')}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Details Modal */}
      {selectedFeedback && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 rounded-3xl shadow-2xl w-full max-w-md p-6 border border-slate-700 animate-slide-up">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-xl font-bold text-white">{t('fan.feedback.details', 'Feedback Details')}</h2>
              <span className="text-sm text-slate-500">{selectedFeedback.datetime}</span>
            </div>
            
            <div className="space-y-5">
              <div>
                <label className="text-sm text-slate-400 block mb-2">{t('fan.feedback.ratingLabel', 'Rating')}</label>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-6 h-6 ${i < selectedFeedback.rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-700'}`} />
                  ))}
                </div>
              </div>
              
              <div>
                <label className="text-sm text-slate-400 block mb-1">{t('fan.feedback.categoryLabel', 'Category')}</label>
                <div className="font-medium text-blue-300">{selectedFeedback.category}</div>
              </div>
              
              {selectedFeedback.comment && (
                <div>
                  <label className="text-sm text-slate-400 block mb-1">{t('fan.feedback.commentLabel', 'Comment')}</label>
                  <div className="bg-slate-800 p-4 rounded-xl text-slate-200 border border-slate-700">
                    {selectedFeedback.comment}
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-8 flex justify-end">
              <button 
                onClick={() => setSelectedFeedback(null)}
                className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-2 rounded-xl transition-colors border border-slate-600"
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
