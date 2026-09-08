import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Bot, 
  Sparkles, 
  RotateCcw, 
  ShieldCheck, 
  Info, 
  HelpCircle,
  ChevronRight,
  Layers
} from 'lucide-react';
import ChatMessage from '../components/ChatMessage';
import ChatInput from '../components/ChatInput';
import LanguageSelector from '../components/LanguageSelector';
import { findMatchingSchemesForAssistant } from '../utils/filterUtils';

const INITIAL_MESSAGES = [
  {
    id: 'msg-welcome',
    sender: 'assistant',
    text: "Namaste! I am SchemeSathi AI — your conversational companion for discovering Indian government welfare schemes. 🇮🇳\n\nI can help you explore 70 verified schemes across 10 official categories, understand eligibility criteria, and find required documents.\n\nHow can I help you today? You can choose one of the prompt chips below or type your question.",
    recommendedSchemes: []
  }
];

export default function Assistant() {
  const [searchParams] = useSearchParams();
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

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

    setTimeout(() => {
      const lower = userText.toLowerCase();
      const matches = findMatchingSchemesForAssistant(userText);
      let responseText = "";

      if (lower.includes("document") || lower.includes("documents")) {
        responseText = "For most central welfare schemes, commonly required documents include:\n• Aadhaar Card (linked with active mobile number)\n• Proof of Residence / Domicile Certificate\n• Bank Account Passbook with IFSC code\n• Income Certificate / Category Certificate (SC/ST/OBC/EWS) where applicable\n• Educational marksheets or trade certificates (for scholarships/skill schemes)\n\nHere are schemes that appear relevant to your documentation query:";
      } else if (lower.includes("how do i apply") || lower.includes("apply")) {
        responseText = "Most central government schemes accept online applications via national portals (such as JanSamarth, National Scholarship Portal, Skill India Digital, or PM-Kisan) or through local Common Service Centres (CSCs).\n\nHere are relevant schemes with direct application pathways:";
      } else if (lower.includes("low income") || lower.includes("poverty") || lower.includes("bpl")) {
        responseText = "For low-income families and vulnerable households, key central initiatives provide free food security (PMGKAY), comprehensive health coverage up to ₹5 Lakh (AB-PMJAY), social pensions (IGNOAPS/PM-SYM), and collateral-free microfinance:\n\nHere are primary welfare matches:";
      } else if (lower.includes("explain")) {
        responseText = "Here is a breakdown of the relevant welfare scheme from our verified 70-scheme registry. You can explore its benefits, eligibility criteria, and official government portal below:";
      } else if (matches.length > 0) {
        responseText = `Based on your request, I found ${matches.length} scheme${matches.length > 1 ? 's' : ''} in our 70-scheme verified registry that may match your requirements:`;
      } else {
        responseText = "I couldn't find an exact scheme match for that specific phrase in our 70-scheme registry. Try asking about scholarships (e.g. PM-Vidyalaxmi, NMMSS), business loans (MUDRA, PMEGP), pensions (UPS, APY), farmer credit (KCC, PMFBY), or health coverage (PM-JAY)!";
      }

      const botMsg = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: responseText,
        recommendedSchemes: matches.slice(0, 3)
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 450);
  };

  const handleResetChat = () => {
    setMessages(INITIAL_MESSAGES);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-6">
      
      {/* Page Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-charcoal-200">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-lemon-400 text-black flex items-center justify-center shadow-sm">
              <Bot className="w-5 h-5 text-peach-600" />
            </div>
            <h1 className="text-2xl font-extrabold text-black tracking-tight flex items-center gap-2">
              <span>SchemeSathi AI</span>
              <span className="text-xl">🤖</span>
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-bold bg-lemon-100 text-lemon-800 rounded-full">
              70 Schemes Companion
            </span>
          </div>
          <p className="text-xs sm:text-sm text-charcoal-600">
            Your conversational guide to understanding government schemes.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <LanguageSelector />
          <button
            type="button"
            onClick={handleResetChat}
            className="p-2 text-charcoal-500 hover:text-black hover:bg-cream-100 rounded-lg text-xs font-medium inline-flex items-center gap-1.5 transition-colors"
            title="Reset Chat Session"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      {/* Prototype Notice */}
      <div className="p-4 bg-lemon-100 border border-lemon-200 rounded-2xl flex items-start gap-3 text-xs text-charcoal-800">
        <Info className="w-4 h-4 text-lemon-600 flex-shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>SchemeSathi AI Guide:</strong> This conversational assistant demonstrates deterministic matching against all 70 verified schemes in 10 categories. Final eligibility should always be verified on the official government portal.
        </p>
      </div>

      {/* Chat Messages Container */}
      <div className="bg-cream-50 border border-charcoal-200 rounded-3xl p-4 sm:p-6 min-h-[420px] max-h-[560px] overflow-y-auto space-y-6 shadow-inner">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}

        {isTyping && (
          <div className="flex items-center gap-3 text-xs text-charcoal-500 font-medium">
            <div className="w-8 h-8 rounded-xl bg-lemon-400 text-black flex items-center justify-center shadow-sm">
              <Bot className="w-4 h-4 text-peach-500 animate-pulse" />
            </div>
            <div className="p-3.5 bg-white border border-charcoal-200 rounded-2xl rounded-tl-sm flex items-center gap-1.5 shadow-soft">
              <span className="w-2 h-2 rounded-full bg-charcoal-400 animate-bounce"></span>
              <span className="w-2 h-2 rounded-full bg-charcoal-600 animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-2 h-2 rounded-full bg-black animate-bounce [animation-delay:0.4s]"></span>
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
