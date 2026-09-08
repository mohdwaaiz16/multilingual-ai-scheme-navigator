import React from 'react';

export default function EligibilityBadge({ type, label, variant = 'default' }) {
  const getColors = () => {
    switch (variant) {
      case 'central':
        return 'bg-cream-200 text-charcoal-800 border-charcoal-200';
      case 'sponsored':
        return 'bg-peach-100 text-charcoal-900 border-peach-200';
      case 'success':
        return 'bg-lemon-100 text-charcoal-800 border-lemon-200';
      case 'warning':
        return 'bg-peach-200 text-charcoal-900 border-peach-300';
      case 'category':
        return 'bg-peach-50 text-charcoal-800 border-peach-200';
      default:
        return 'bg-white text-charcoal-700 border-charcoal-100';
    }
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-medium border ${getColors()}`}>
      {type === 'Central' && <span className="w-1.5 h-1.5 rounded-full bg-peach-500"></span>}
      {type === 'Centrally Sponsored' && <span className="w-1.5 h-1.5 rounded-full bg-lemon-500"></span>}
      {label || type}
    </span>
  );
}
