import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6 bg-white border border-charcoal-200 rounded-3xl p-8 shadow-soft">
        <div className="w-16 h-16 rounded-2xl bg-lemon-100 text-lemon-600 flex items-center justify-center mx-auto">
          <Compass className="w-8 h-8 text-lemon-500" />
        </div>

        <div className="space-y-2">
          <span className="text-4xl font-extrabold text-black">404</span>
          <h1 className="text-xl font-bold text-black">Page Not Found</h1>
          <p className="text-sm text-charcoal-600">
            The page you are looking for does not exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-lemon-400 hover:bg-lemon-500 text-black rounded-xl text-sm font-semibold transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Go to Home</span>
          </Link>
          <Link
            to="/schemes"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-cream-200 hover:bg-cream-300 text-charcoal-700 rounded-xl text-sm font-semibold transition-colors"
          >
            <Search className="w-4 h-4" />
            <span>Find Schemes</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
