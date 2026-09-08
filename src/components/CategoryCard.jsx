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
      className="group relative flex flex-col justify-between p-5 sm:p-6 bg-white border border-charcoal-100 rounded-2xl shadow-soft hover:shadow-soft-hover hover:border-lemon-400 transition-all hover:-translate-y-1 text-left focus:outline-none focus:ring-2 focus:ring-lemon-500"
    >
      <div>
        <div className="w-12 h-12 rounded-xl bg-peach-100 text-charcoal-800 flex items-center justify-center mb-4 group-hover:bg-lemon-400 group-hover:text-black transition-colors">
          <IconComponent className="w-6 h-6" />
        </div>
        <h3 className="text-base font-semibold text-black mb-1 transition-colors">
          {category.name}
        </h3>
        <p className="text-xs text-charcoal-600 line-clamp-2 leading-relaxed mb-4">
          {category.description}
        </p>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-charcoal-100 text-xs font-medium text-charcoal-600">
        <span className="bg-cream-200 text-charcoal-800 px-2 py-0.5 rounded-full">
          {category.schemesCount} {category.schemesCount === 1 ? 'Scheme' : 'Schemes'}
        </span>
        <span className="inline-flex items-center gap-1 text-charcoal-800 group-hover:text-black font-bold group-hover:translate-x-0.5 transition-all">
          <span>Explore</span>
          <ArrowRight className="w-3.5 h-3.5 text-lemon-600 group-hover:text-black" />
        </span>
      </div>
    </Link>
  );
}
