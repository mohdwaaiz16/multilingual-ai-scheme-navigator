import React, { useEffect, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Lazy load route components to reduce initial bundle size
const Home = React.lazy(() => import('./pages/Home'));
const UserDetails = React.lazy(() => import('./pages/UserDetails'));
const AiResults = React.lazy(() => import('./pages/AiResults'));
const SchemeDetails = React.lazy(() => import('./pages/SchemeDetails'));
const CategoryPage = React.lazy(() => import('./pages/CategoryPage'));
const Assistant = React.lazy(() => import('./pages/Assistant'));
const SchemeFinder = React.lazy(() => import('./pages/SchemeFinder'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);

  return null;
}

// Simple fallback loader
const PageLoader = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh]">
    <div className="w-12 h-12 border-4 border-lemon-200 border-t-lemon-500 rounded-full animate-spin"></div>
    <p className="mt-4 text-sm font-medium text-charcoal-600">Loading SchemeSathi...</p>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-civic-100 selection:text-civic-900">
        <Navbar />
        <main className="flex-grow">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Core 5 Screen + Category Directory Experience */}
              <Route path="/" element={<Home />} />
              <Route path="/schemes" element={<SchemeFinder />} />
              <Route path="/category/:categorySlug" element={<CategoryPage />} />
              <Route path="/schemes/:id" element={<SchemeDetails />} />
              <Route path="/find" element={<UserDetails />} />
              <Route path="/results" element={<AiResults />} />
              <Route path="/assistant" element={<Assistant />} />
              
              {/* Fallback 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
