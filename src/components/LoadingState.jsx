import React from 'react';

export default function LoadingState({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" aria-label="Loading schemes">
      {Array.from({ length: count }).map((_, idx) => (
        <div 
          key={idx} 
          className="bg-white border border-charcoal-100 rounded-2xl p-6 space-y-4 animate-pulse"
        >
          <div className="flex items-center justify-between">
            <div className="h-5 w-24 bg-charcoal-200 rounded"></div>
            <div className="h-5 w-16 bg-charcoal-200 rounded"></div>
          </div>
          <div className="h-6 w-3/4 bg-charcoal-200 rounded"></div>
          <div className="space-y-2">
            <div className="h-4 w-full bg-charcoal-100 rounded"></div>
            <div className="h-4 w-5/6 bg-charcoal-100 rounded"></div>
          </div>
          <div className="pt-4 border-t border-charcoal-100 flex items-center justify-between">
            <div className="h-4 w-28 bg-charcoal-200 rounded"></div>
            <div className="h-8 w-24 bg-charcoal-200 rounded-lg"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
