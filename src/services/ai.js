import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// System instructions to enforce the assistant's behavior
const getSystemInstruction = (languageCode) => `
You are the Smart Stadium AI Assistant. 
You must ONLY answer questions related to the stadium, such as finding seats, navigation, food courts, washrooms, match schedules, stadium rules, emergency assistance, accessibility, and general stadium information.
If a user asks something unrelated to the stadium (e.g., weather, general knowledge, coding), politely guide them back to stadium-related topics.
You MUST reply in the language specified by this language code: ${languageCode}.
Keep responses concise, helpful, and friendly.
Always ensure your response is complete and never ends mid-sentence.
`;

/**
 * Modular AI Service
 * 
 * Handles all communication with the Gemini API.
 */
export const sendMessageToAI = async (message, history = [], languageCode = 'en') => {
  if (!API_KEY) {
    return {
      text: "The Gemini API key is missing. Please add VITE_GEMINI_API_KEY to your .env file to enable the AI Assistant.",
      timestamp: new Date().toISOString(),
      isAi: true
    };
  }

  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview",
      systemInstruction: getSystemInstruction(languageCode)
    });

    // Convert our internal history format to Gemini's expected format
    const formattedHistory = history.map(msg => ({
      role: msg.isAi ? "model" : "user",
      parts: [{ text: msg.translationKey ? (msg.fallbackText || msg.text) : msg.text }]
    }));

    // Filter history so the first item always has role 'user'
    const firstUserIndex = formattedHistory.findIndex(msg => msg.role === 'user');
    let filteredHistory = firstUserIndex !== -1 ? formattedHistory.slice(firstUserIndex) : [];
    
    // Send only the last 8 conversation messages to Gemini
    if (filteredHistory.length > 8) {
      filteredHistory = filteredHistory.slice(-8);
      // Ensure it still starts with a user message after slicing
      if (filteredHistory[0].role === 'model') {
        filteredHistory = filteredHistory.slice(1);
      }
    }

    const chat = model.startChat({
      history: filteredHistory,
      generationConfig: {
        maxOutputTokens: 500,
        temperature: 0.7,
      }
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    return {
      text,
      timestamp: new Date().toISOString(),
      isAi: true
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    
    let errorMessage = "Sorry, I am having trouble connecting to the AI service right now. Please try again later.";
    
    if (error.status === 429 || error?.message?.includes('429') || error?.message?.toLowerCase().includes('quota')) {
      errorMessage = "The AI service has reached its current free-tier usage limit. Please try again later.";
    }

    return {
      text: errorMessage,
      timestamp: new Date().toISOString(),
      isAi: true
    };
  }
};
