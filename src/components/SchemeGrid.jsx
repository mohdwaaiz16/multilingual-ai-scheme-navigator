import React from 'react';
import SchemeCard from './SchemeCard';
import EmptyState from './EmptyState';

export default function SchemeGrid({ schemes = [], onResetFilters }) {
  if (schemes.length === 0) {
    return (
      <EmptyState
        title="No Matching Schemes Found"
        message="Try adjusting your search keywords, clearing categories, or resetting filters."
        onReset={onResetFilters}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {schemes.map((scheme) => (
        <SchemeCard key={scheme.id} scheme={scheme} />
      ))}
    </div>
  );
}
