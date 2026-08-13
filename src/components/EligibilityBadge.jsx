import React from 'react';

export default function EligibilityBadge({ type, label, variant = 'default' }) {
  const getColors = () => {
    switch (variant) {
      case 'central':
        return 'bg-govblue-50 text-govblue-700 border-govblue-200';
      case 'sponsored':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'success':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'warning':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'category':
        return 'bg-civic-50 text-civic-800 border-civic-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-medium border ${getColors()}`}>
      {type === 'Central' && <span className="w-1.5 h-1.5 rounded-full bg-govblue-500"></span>}
      {type === 'Centrally Sponsored' && <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>}
      {label || type}
    </span>
  );
}
