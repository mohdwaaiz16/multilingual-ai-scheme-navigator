import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
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
    text: "Namaste! I am SchemeSathi AI. 🇮🇳\n\nI can help you explore government schemes, understand eligibility criteria, and find required documents for Indian welfare initiatives.\n\nHow can I help you today? You can choose one of the suggestions below or ask a question in your own words.",
    recommendedSchemes: []
  }
];

export default function Assistant() {
  const [searchParams] = useSearchParams();
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef(null);

  // Auto scroll chat to bottom
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Handle incoming query param if user came with a question
  useEffect(() => {
    const initialQuery = searchParams.get('q');
    if (initialQuery && messages.length === 1) {
      handleSendMessage(initialQuery);
    }
  }, [searchParams]);

  const handleSendMessage = (userText) => {
    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: userText
    };

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    // Deterministic mock response engine matching across the 20 verified schemes
    setTimeout(() => {
      const lower = userText.toLowerCase();
      const matches = findMatchingSchemesForAssistant(userText);
      let responseText = "";

      if (lower.includes("document") || lower.includes("documents")) {
        responseText = "For most central welfare schemes, general required documents include:\n• Aadhaar Card\n• Income / Category Certificate (where applicable)\n• Bank Account Passbook / Details\n• Residence / Electricity Bill Proof\n\nHere are schemes that might match your documentation query:";
      } else if (lower.includes("explain")) {
        responseText = "Here is a breakdown of the relevant welfare scheme from our verified dataset. You can explore its benefits, age & income criteria, and official source below:";
      } else if (matches.length > 0) {
        responseText = `Based on the information provided, these ${matches.length} scheme${matches.length > 1 ? 's' : ''} appear to be potential matches. I can help guide you through their eligibility and benefits:`;
      } else {
        responseText = "I couldn't find an exact scheme match for that specific term in our 20-scheme Phase 1 database. Try asking about scholarships, housing, solar subsidies, health coverage, or small business credit!";
      }

      const botMsg = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: responseText,
        recommendedSchemes: matches.slice(0, 3)
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 500);
  };

  const handleResetChat = () => {
    setMessages(INITIAL_MESSAGES);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-6">
      
      {/* Page Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-civic-900 text-white flex items-center justify-center shadow-sm">
              <Bot className="w-5 h-5 text-warmamber-400" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <span>SchemeSathi AI</span>
              <span className="text-xl">🤖</span>
            </h1>
            <span className="px-2 py-0.5 text-xs font-bold bg-govblue-100 text-govblue-800 rounded-full">
              Prototype
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600">
            Your guide to understanding government schemes.
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
          <strong>SchemeSathi AI Guide:</strong> This conversational assistant demonstrates deterministic matching against the 20 verified schemes. Always verify final eligibility on the official government website.
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
            <div className="p-3.5 bg-white border border-slate-200 rounded-2xl rounded-tl-sm flex items-center gap-1.5 shadow-sm">
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
