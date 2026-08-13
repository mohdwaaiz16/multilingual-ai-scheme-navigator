import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  HeartPulse, 
  Baby, 
  Building2, 
  Home, 
  SunMedium, 
  Flame, 
  GraduationCap, 
  School, 
  BookOpenCheck, 
  Award, 
  ShieldAlert, 
  Droplets, 
  Coins, 
  Store, 
  Hammer, 
  Rocket, 
  Briefcase, 
  Sparkles, 
  ShieldCheck, 
  Users, 
  Layers 
} from 'lucide-react';

const ICON_MAP = {
  HeartPulse,
  Baby,
  Building2,
  Home,
  SunMedium,
  Flame,
  GraduationCap,
  School,
  BookOpenCheck,
  Award,
  ShieldAlert,
  Droplets,
  Coins,
  Store,
  Hammer,
  Rocket,
  Briefcase,
  Sparkles,
  ShieldCheck,
  Users,
  Layers
};

export default function CategoryCard({ category }) {
  const IconComponent = ICON_MAP[category.icon] || Layers;

  return (
    <Link
      to={`/schemes?category=${encodeURIComponent(category.name)}`}
      className="group relative flex flex-col justify-between p-5 sm:p-6 bg-white border border-slate-200 rounded-2xl shadow-subtle hover:shadow-civic-hover hover:border-civic-300 transition-all text-left focus:outline-none focus:ring-2 focus:ring-civic-500"
    >
      <div>
        <div className="w-12 h-12 rounded-xl bg-civic-50 text-civic-700 flex items-center justify-center mb-4 group-hover:bg-civic-900 group-hover:text-white transition-colors">
          <IconComponent className="w-6 h-6" />
        </div>
        <h3 className="text-base font-semibold text-slate-900 mb-1 group-hover:text-civic-900 transition-colors">
          {category.name}
        </h3>
        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
          {category.description}
        </p>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs font-medium text-slate-600">
        <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
          {category.schemesCount} {category.schemesCount === 1 ? 'Scheme' : 'Schemes'}
        </span>
        <span className="inline-flex items-center gap-1 text-civic-700 group-hover:text-civic-900 group-hover:translate-x-0.5 transition-all">
          <span>Explore</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </Link>
  );
}
