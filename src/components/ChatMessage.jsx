import React from 'react';
import { Bot, User, ShieldCheck, ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import EligibilityBadge from './EligibilityBadge';

export default function ChatMessage({ message }) {
  const isBot = message.sender === 'assistant';

  return (
    <div className={`flex gap-3 sm:gap-4 ${isBot ? 'justify-start' : 'justify-end'}`}>
      {isBot && (
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-civic-900 text-white flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5">
          <Bot className="w-5 h-5 text-warmamber-400" />
        </div>
      )}

      <div className={`max-w-[85%] sm:max-w-[75%] space-y-3`}>
        {/* Main Message Bubble */}
        <div
          className={`p-4 rounded-2xl text-sm leading-relaxed ${
            isBot
              ? 'bg-white border border-slate-200 text-slate-800 shadow-sm rounded-tl-sm'
              : 'bg-civic-900 text-white rounded-tr-sm'
          }`}
        >
          <p className="whitespace-pre-line">{message.text}</p>
        </div>

        {/* Embedded Matched Scheme Recommendations (if any) */}
        {isBot && message.recommendedSchemes && message.recommendedSchemes.length > 0 && (
          <div className="space-y-2 pt-1">
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <span>Recommended Schemes ({message.recommendedSchemes.length})</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {message.recommendedSchemes.map((scheme) => (
                <div
                  key={scheme.id}
                  className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2 hover:border-civic-400 transition-colors"
                >
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[10px] font-semibold uppercase text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                      {scheme.category}
                    </span>
                    <span className="text-[10px] text-govblue-700 font-mono">
                      {scheme.officialSource}
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-900 text-xs line-clamp-1">
                    {scheme.schemeName}
                  </h4>

                  <p className="text-[11px] text-slate-600 line-clamp-2">
                    {scheme.description}
                  </p>

                  <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between">
                    <Link
                      to={`/schemes/${scheme.id}`}
                      className="text-xs font-semibold text-civic-800 hover:text-civic-950 inline-flex items-center gap-1"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Prototype Verification Flag */}
        {isBot && (
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
            <ShieldCheck className="w-3 h-3 text-emerald-500" />
            <span>Navigator AI Prototype Guidance &bull; Verify on official portal</span>
          </div>
        )}
      </div>

      {!isBot && (
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5">
          <User className="w-5 h-5" />
        </div>
      )}
    </div>
  );
}
