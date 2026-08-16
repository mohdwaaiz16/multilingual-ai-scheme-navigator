import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, User, ArrowRight, Sparkles, Building2, CheckCircle2 } from 'lucide-react';
import EligibilityBadge from './EligibilityBadge';

export default function ChatMessage({ message }) {
  const isAssistant = message.sender === 'assistant';

  return (
    <div
      className={`flex items-start gap-3.5 ${
        isAssistant ? 'justify-start' : 'justify-end flex-row-reverse'
      }`}
    >
      {/* Avatar */}
      <div
        className={`w-9 h-9 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm ${
          isAssistant
            ? 'bg-civic-900 text-white'
            : 'bg-warmamber-500 text-slate-950 font-bold'
        }`}
      >
        {isAssistant ? (
          <Bot className="w-5 h-5 text-warmamber-400" />
        ) : (
          <User className="w-5 h-5" />
        )}
      </div>

      {/* Message Bubble Content */}
      <div className="space-y-3 max-w-xl">
        <div
          className={`p-4 sm:p-5 rounded-3xl text-sm leading-relaxed shadow-sm ${
            isAssistant
              ? 'bg-white border border-slate-200/90 text-slate-800 rounded-tl-sm'
              : 'bg-civic-900 text-white rounded-tr-sm font-medium'
          }`}
        >
          <div className="whitespace-pre-line">{message.text}</div>
        </div>

        {/* Embedded Scheme Recommendation Cards */}
        {isAssistant && message.recommendedSchemes && message.recommendedSchemes.length > 0 && (
          <div className="space-y-3 pt-1">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Suggested Potential Matches ({message.recommendedSchemes.length}):
            </span>
            <div className="grid grid-cols-1 gap-3">
              {message.recommendedSchemes.map((scheme) => (
                <div
                  key={scheme.id}
                  className="bg-white border border-slate-200 rounded-2xl p-4 shadow-subtle hover:border-civic-300 transition-all space-y-2.5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-1.5">
                    <EligibilityBadge type={scheme.category} variant="category" />
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {scheme.subcategory}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900">
                    <Link
                      to={`/schemes/${scheme.id}`}
                      className="hover:text-civic-900 hover:underline"
                    >
                      {scheme.schemeName}
                    </Link>
                  </h4>

                  <p className="text-xs text-slate-600 line-clamp-2">
                    {scheme.keyBenefits || scheme.description}
                  </p>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">
                      {scheme.implementingMinistry}
                    </span>
                    <Link
                      to={`/schemes/${scheme.id}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-civic-900 hover:text-civic-800"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-3.5 h-3.5 text-warmamber-500" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
