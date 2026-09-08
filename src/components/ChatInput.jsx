import React, { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';

const SUGGESTIONS = [
  "Find student schemes",
  "Find farmer schemes",
  "Find business schemes",
  "Find pension schemes",
  "Find scholarships",
  "What documents do I need?",
  "How do I apply?",
  "Show schemes for low-income families"
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
        <span className="text-xs font-bold text-charcoal-600 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-lemon-500" />
          <span>Suggestions:</span>
        </span>
        {SUGGESTIONS.map((suggestion, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleChipClick(suggestion)}
            disabled={isTyping}
            className="text-xs bg-white hover:bg-cream-200 text-black font-medium px-3 py-1.5 rounded-full transition-colors disabled:opacity-50 text-left border border-charcoal-200 shadow-soft"
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
          placeholder="Ask SchemeSathi AI anything across 70 government schemes..."
          disabled={isTyping}
          className="w-full bg-white border border-charcoal-200 rounded-2xl pl-4 pr-12 py-3.5 text-sm text-black focus:outline-none focus:ring-2 focus:ring-lemon-500 focus:border-lemon-500 shadow-soft disabled:bg-cream-100 placeholder:text-charcoal-400 font-medium"
        />

        <button
          type="submit"
          disabled={!text.trim() || isTyping}
          className="absolute right-2 p-2.5 rounded-xl bg-lemon-400 text-black hover:bg-lemon-500 disabled:bg-charcoal-200 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-lemon-600"
          aria-label="Send message to SchemeSathi AI"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
