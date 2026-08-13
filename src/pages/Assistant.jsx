import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Sparkles, 
  RotateCcw, 
  ShieldCheck, 
  Info, 
  HelpCircle,
  ChevronRight
} from 'lucide-react';
import ChatMessage from '../components/ChatMessage';
import ChatInput from '../components/ChatInput';
import LanguageSelector from '../components/LanguageSelector';
import { findMatchingSchemesForAssistant } from '../utils/filterUtils';

const INITIAL_MESSAGES = [
  {
    id: 'msg-welcome',
    sender: 'assistant',
    text: "Namaste! I am your AI Scheme Navigator prototype. 🇮🇳\n\nI can help you explore government schemes, understand eligibility criteria, and find required documents for Indian welfare initiatives.\n\nHow can I help you today? You can choose one of the suggestions below or ask a question in your own words.",
    recommendedSchemes: []
  }
];

export default function Assistant() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef(null);

  // Auto scroll chat to bottom
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (userText) => {
    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: userText
    };

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    // Simulate AI prototype processing with semantic match across the 20 verified schemes
    setTimeout(() => {
      const matches = findMatchingSchemesForAssistant(userText);
      let responseText = "";

      if (matches.length > 0) {
        responseText = `Based on your request, I found ${matches.length} relevant scheme${matches.length > 1 ? 's' : ''} from our verified dataset. Here are the key details:`;
      } else {
        responseText = `I couldn't find an exact scheme match for your query in our 20-scheme Phase 1 database. You can try exploring categories like Healthcare, Scholarships, Housing, Solar Energy, or Small Business Credit in the Scheme Finder!`;
      }

      const botMsg = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: responseText,
        recommendedSchemes: matches.slice(0, 3) // Top 3 matching schemes
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleResetChat = () => {
    setMessages(INITIAL_MESSAGES);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-6">
      
      {/* Page Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-civic-900 text-white flex items-center justify-center shadow-sm">
              <Bot className="w-5 h-5 text-warmamber-400" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">
              AI Scheme Assistant
            </h1>
            <span className="px-2 py-0.5 text-xs font-semibold bg-govblue-100 text-govblue-800 rounded-full">
              Phase 1 Prototype
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600">
            Ask conversational questions to discover matching government schemes and eligibility guidance.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <LanguageSelector />
          <button
            type="button"
            onClick={handleResetChat}
            className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg text-xs font-medium inline-flex items-center gap-1.5 transition-colors"
            title="Reset Chat Session"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      {/* Prototype Civic Notice */}
      <div className="p-4 bg-govblue-50/80 border border-govblue-200 rounded-2xl flex items-start gap-3 text-xs text-govblue-900">
        <Info className="w-4 h-4 text-govblue-600 flex-shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Frontend Prototype Mode:</strong> This AI assistant demonstrates interactive scheme discovery against the 20 verified schemes. Real AI models (OpenAI/Gemini/Claude) and live translation will be connected in Phase 2.
        </p>
      </div>

      {/* Chat Messages Container */}
      <div className="bg-slate-100/70 border border-slate-200 rounded-3xl p-4 sm:p-6 min-h-[420px] max-h-[560px] overflow-y-auto space-y-6 shadow-inner">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}

        {isTyping && (
          <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
            <div className="w-8 h-8 rounded-xl bg-civic-900 text-white flex items-center justify-center shadow-sm">
              <Bot className="w-4 h-4 text-warmamber-400 animate-pulse" />
            </div>
            <div className="p-3 bg-white border border-slate-200 rounded-2xl rounded-tl-sm flex items-center gap-1.5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-civic-400 animate-bounce"></span>
              <span className="w-2 h-2 rounded-full bg-civic-600 animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-2 h-2 rounded-full bg-civic-900 animate-bounce [animation-delay:0.4s]"></span>
            </div>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* Interactive Input with Chips */}
      <ChatInput onSendMessage={handleSendMessage} isTyping={isTyping} />

    </div>
  );
}
