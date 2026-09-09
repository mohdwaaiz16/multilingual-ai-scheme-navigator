import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { Link } from 'react-router-dom';
import { Bot, User, ArrowRight, Sparkles, Building2, CheckCircle2 } from 'lucide-react';
import EligibilityBadge from './EligibilityBadge';

export default function ChatMessage({ message }) {
  const { t, l } = useLanguage();
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
            ? 'bg-lemon-400 text-black font-bold'
            : 'bg-peach-300 text-black font-bold'
        }`}
      >
        {isAssistant ? (
          <Bot className="w-5 h-5 text-black" />
        ) : (
          <User className="w-5 h-5" />
        )}
      </div>

      {/* Message Bubble Content */}
      <div className="space-y-3 max-w-xl">
        <div
          className={`p-4 sm:p-5 rounded-3xl text-sm leading-relaxed shadow-sm ${
            isAssistant
              ? 'bg-white border border-charcoal-100 text-black rounded-tl-sm'
              : 'bg-lemon-400 text-black rounded-tr-sm font-bold'
          }`}
        >
          <div className="whitespace-pre-line">{message.text}</div>
        </div>

        {/* Embedded Scheme Recommendation Cards */}
        {isAssistant && message.recommendedSchemes && message.recommendedSchemes.length > 0 && (
          <div className="space-y-3 pt-1">
            <span className="text-[11px] font-bold text-charcoal-600 uppercase tracking-wider block">
              {t('assistant.suggestedMatches', 'Suggested Potential Matches')} ({message.recommendedSchemes.length}):
            </span>
            <div className="grid grid-cols-1 gap-3">
              {message.recommendedSchemes.map((scheme) => (
                <div
                  key={scheme.id}
                  className="bg-white border border-charcoal-200 rounded-2xl p-4 shadow-soft hover:border-lemon-500 transition-all space-y-2.5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-1.5">
                    <EligibilityBadge type={scheme.category} variant="category" />
                    <span className="text-[10px] font-bold text-charcoal-600 bg-cream-200 px-2 py-0.5 rounded">
                      {l(scheme.subcategory)}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-black">
                    <Link
                      to={`/schemes/${scheme.id}`}
                      className="hover:text-lemon-600 hover:underline"
                    >
                      {l(scheme.schemeName || scheme.name)}
                    </Link>
                  </h4>

                  <p className="text-xs text-charcoal-700 line-clamp-2">
                    {l(scheme.keyBenefits || scheme.description)}
                  </p>

                  <div className="pt-2 border-t border-charcoal-100 flex items-center justify-between">
                    <span className="text-[11px] text-charcoal-500 truncate max-w-[150px]">
                      {l(scheme.implementingMinistry || scheme.department)}
                    </span>
                    <Link
                      to={`/schemes/${scheme.id}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-black hover:text-charcoal-800"
                    >
                      <span>{t('scheme.viewDetails', 'View Details')}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-lemon-600" />
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
