# Smart Stadium System - Software Requirements Specification (SRS)

## 1. Introduction
The Smart Stadium System is a comprehensive digital platform designed to enhance the stadium experience for fans, streamline operations for on-ground staff and volunteers, and provide centralized control for organizers.

## 2. System Architecture & Workflows
The system is built as a Single Page Application (SPA) using React, Vite, and Tailwind CSS.
- **Frontend**: React.js with Tailwind CSS for modern, responsive UI.
- **State Management**: React Hooks (useState, useEffect, useOutletContext).
- **Routing**: React Router DOM (v6+).
- **Internationalization**: `react-i18next` for seamless language switching.
- **AI Integration**: Google Generative AI (Gemini API) for the AI Chat Assistant.

### Key Workflows
1. **Landing & Role Selection**: Users are welcomed and can select their preferred language and role.
2. **Authentication**: Simulated role-based login with session timeout handling.
3. **Dashboard Navigation**: Role-specific dashboards providing relevant features.
4. **AI Assistance**: An integrated conversational AI available in the Fan Dashboard.

## 3. Supported Languages
The platform supports multilingual capabilities across all views:
- English
- Spanish
- French
- Chinese
- Hindi
- Arabic

## 4. Role-Based Dashboards & Features

### 4.1 Fan Dashboard
- **Navigation & Ticketing**: View match schedules, find seats, and navigate the stadium.
- **Services**: Locate food courts and washrooms.
- **AI Chat Assistant**: Integrated Google Gemini AI for answering stadium-related queries.
- **Accessibility**: "Easy Mode" for simplified UI with larger text.
- **Quick Action Buttons**: One-tap buttons for common tasks (e.g., "Find my seat", "Emergency help").

### 4.2 Volunteer Dashboard
- **Task Management**: View and manage assigned tasks.
- **Communication**: Coordinate with organizers and other volunteers.
- **Map & Navigation**: Assist fans with directions.

### 4.3 Organizer Dashboard
- **Centralized Control**: Manage stadium operations, match schedules, and staff assignments.
- **Analytics**: View real-time data on stadium occupancy and issues.
- **Alerts**: Broadcast emergency or informational alerts.

### 4.4 On-Ground Staff Dashboard
- **Operations**: Track and resolve maintenance, security, and crowd control issues.
- **Communication**: Receive real-time alerts from organizers.

## 5. Functional Requirements
- **Authentication**: The system must verify the selected role before granting access.
- **Multilingual Support**: The system must instantly translate UI text and AI responses when the language is changed.
- **AI Chatbot**: 
  - The AI must respond strictly to stadium-related queries.
  - The AI must respond in the currently selected language.
  - The AI chat history must reset internally (keeping only the translated welcome message) when the user switches languages.
  - The system must send only the last 8 conversation messages to Gemini to optimize token usage.
- **Session Security**: The system must implement session timeouts and log users out after inactivity.

## 6. Non-Functional Requirements
- **Performance**: The UI must remain highly responsive. The AI API calls must be optimized (e.g., maxOutputTokens set to 200, temperature 0.7).
- **Usability**: The interface must support an "Easy Mode" for better accessibility.
- **Reliability**: The system must provide fallback text and error handling for failed AI requests.
- **Maintainability**: The application code must be modularized (e.g., distinct component files, centralized AI service).

## 7. Updated System Modules
- **`ai.js`**: Core service handling Gemini API integration, history filtering, and parameter configuration.
- **`AiChatAssistant.jsx`**: The React component rendering the chatbot interface, quick actions, and handling language-based chat resets.
- **`LanguageSwitcher.jsx` / `LanguagePopup.jsx`**: Components for handling global language state.
- **`RoleSelection.jsx` & Dashboards**: Role-based routing and UI containers.

## 8. Updated Use Cases
- **Fan gets directions**: A fan selects Hindi, opens the AI Assistant, uses the "Find my seat" quick action, and receives directions in Hindi.
- **Staff manages tasks**: On-ground staff logs in and views pending maintenance issues in their preferred language.
- **User changes language mid-chat**: A user chatting in English switches to Spanish. The chat history clears, displaying only the Spanish welcome message, and the new context is ready for Spanish queries.
