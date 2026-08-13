import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6 bg-white border border-slate-200 rounded-3xl p-8 shadow-civic">
        <div className="w-16 h-16 rounded-2xl bg-civic-50 text-civic-800 flex items-center justify-center mx-auto">
          <Compass className="w-8 h-8 text-civic-700" />
        </div>

        <div className="space-y-2">
          <span className="text-4xl font-extrabold text-civic-900">404</span>
          <h1 className="text-xl font-bold text-slate-900">Page Not Found</h1>
          <p className="text-sm text-slate-600">
            The page you are looking for does not exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-civic-900 hover:bg-civic-800 text-white rounded-xl text-sm font-semibold transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Go to Home</span>
          </Link>
          <Link
            to="/schemes"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-semibold transition-colors"
          >
            <Search className="w-4 h-4" />
            <span>Find Schemes</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
