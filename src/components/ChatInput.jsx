import React, { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';

const SUGGESTIONS = [
  "What scholarships can I apply for?",
  "I need help starting a small business.",
  "Are there government schemes for housing?",
  "I need help with healthcare.",
  "I want skill training."
];

export default function ChatInput({ onSendMessage, isTyping = false }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() && !isTyping) {
      onSendMessage(text.trim());
      setText('');
    }
  };

  const handleChipClick = (suggestion) => {
    if (!isTyping) {
      onSendMessage(suggestion);
    }
  };

  return (
    <div className="space-y-3 pt-2">
      {/* Suggested Prompt Chips */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-warmamber-500" />
          <span>Suggestions:</span>
        </span>
        {SUGGESTIONS.map((suggestion, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleChipClick(suggestion)}
            disabled={isTyping}
            className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium px-3 py-1.5 rounded-full transition-colors disabled:opacity-50 text-left border border-slate-200"
          >
            {suggestion}
          </button>
        ))}
      </div>

      {/* Input Field Form */}
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Ask a question about schemes, eligibility, or benefits..."
          disabled={isTyping}
          className="w-full bg-white border border-slate-300 rounded-2xl pl-4 pr-12 py-3.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-civic-500 focus:border-civic-500 shadow-sm disabled:bg-slate-50 placeholder:text-slate-400"
        />

        <button
          type="submit"
          disabled={!text.trim() || isTyping}
          className="absolute right-2 p-2.5 rounded-xl bg-civic-900 text-white hover:bg-civic-800 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-civic-500"
          aria-label="Send message"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
