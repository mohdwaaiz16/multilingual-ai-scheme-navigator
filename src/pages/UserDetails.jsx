import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  User, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  GraduationCap, 
  Tractor, 
  Briefcase, 
  Rocket, 
  Search, 
  HelpCircle,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { STATES_AND_UTS } from '../data/categories';

const OCCUPATION_OPTIONS = [
  "Student",
  "Farmer",
  "Employee",
  "Self-employed",
  "Business owner",
  "Homemaker",
  "Unemployed",
  "Other"
];

const INCOME_OPTIONS = [
  "Below ₹1 lakh",
  "₹1–3 lakh",
  "₹3–5 lakh",
  "₹5–10 lakh",
  "₹10–18 lakh",
  "Above ₹18 lakh",
  "Prefer not to say"
];

const ROLES = [
  { id: "student", label: "Student", desc: "School or college student seeking scholarships or education loans", icon: GraduationCap },
  { id: "farmer", label: "Farmer", desc: "Agriculture, farming, or rural household support", icon: Tractor },
  { id: "employee", label: "Employee", desc: "Salaried employee or organized sector worker", icon: Briefcase },
  { id: "entrepreneur", label: "Entrepreneur", desc: "Starting a business, startup, or micro-enterprise", icon: Rocket },
  { id: "job seeker", label: "Job Seeker", desc: "Looking for employment or skill training programs", icon: Search },
  { id: "other", label: "Other", desc: "General citizen exploring welfare & health benefits", icon: HelpCircle }
];

export default function UserDetails() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Retrieve initial values if pre-filled from Home Quick Finder
  const [age, setAge] = useState(searchParams.get('age') || '');
  const [state, setState] = useState(searchParams.get('state') || 'All India (Central)');
  const [occupation, setOccupation] = useState(searchParams.get('occupation') || 'Student');
  const [income, setIncome] = useState(searchParams.get('income') || '₹1–3 lakh');
  const [role, setRole] = useState(searchParams.get('role') || 'student');
  
  // Dynamic question states
  const [educationLevel, setEducationLevel] = useState('Undergraduate / College');
  const [landHolding, setLandHolding] = useState('Small / Marginal Landholder');
  const [businessStage, setBusinessStage] = useState('Early Startup / Seed Stage');

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!age || isNaN(age) || parseInt(age, 10) < 1 || parseInt(age, 10) > 120) {
      newErrors.age = "Please enter a valid age (e.g. 19)";
    }
    if (!state) {
      newErrors.state = "Please select your state or UT";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Save profile to localStorage for persistence
    const profile = {
      age,
      state,
      occupation,
      income,
      role,
      subDetails: {
        educationLevel: role === 'student' ? educationLevel : undefined,
        landHolding: role === 'farmer' ? landHolding : undefined,
        businessStage: role === 'entrepreneur' ? businessStage : undefined
      }
    };

    localStorage.setItem('schemesathi_user_profile', JSON.stringify(profile));

    // Navigate to Results page
    navigate('/results', { state: { profile } });
  };

  return (
    <div className="bg-cream-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Card Container */}
        <div className="bg-white border border-charcoal-200 rounded-3xl p-6 sm:p-10 shadow-soft space-y-8">
          
          {/* Header */}
          <div className="space-y-2 border-b border-charcoal-100 pb-6">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-lemon-100 text-lemon-700 text-xs font-bold border border-lemon-200">
                <Sparkles className="w-3.5 h-3.5 text-peach-500" />
                <span>Eligibility Matcher</span>
              </div>
              <span className="text-xs font-semibold text-charcoal-400">
                Step 1 of 1
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-black tracking-tight">
              Tell us about yourself
            </h1>
            <p className="text-sm text-charcoal-600">
              Answer a few simple questions so we can find schemes that may be relevant to you.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Section 1: Basic Details */}
            <div className="space-y-5">
              <h2 className="text-sm font-bold text-black uppercase tracking-wider">
                1. Basic Details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Age Input */}
                <div>
                  <label htmlFor="age" className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider mb-1.5">
                    Age <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="age"
                    type="number"
                    min="1"
                    max="120"
                    value={age}
                    onChange={(e) => {
                      setAge(e.target.value);
                      if (errors.age) setErrors(prev => ({ ...prev, age: undefined }));
                    }}
                    placeholder="Enter your age (e.g. 21)"
                    className={`w-full bg-cream-50 border rounded-xl px-4 py-3 text-sm text-black focus:outline-none focus:ring-2 focus:ring-lemon-500 focus:bg-white transition-all ${
                      errors.age ? 'border-red-400 bg-red-50/30' : 'border-charcoal-300'
                    }`}
                  />
                  {errors.age && (
                    <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.age}</span>
                    </p>
                  )}
                </div>

                {/* State Dropdown */}
                <div>
                  <label htmlFor="state" className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider mb-1.5">
                    State / Union Territory <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full bg-cream-50 border border-charcoal-300 rounded-xl px-4 py-3 text-sm text-black focus:outline-none focus:ring-2 focus:ring-lemon-500 focus:bg-white transition-all font-medium"
                  >
                    {STATES_AND_UTS.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Occupation Dropdown */}
                <div>
                  <label htmlFor="occupation" className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider mb-1.5">
                    Occupation
                  </label>
                  <select
                    id="occupation"
                    value={occupation}
                    onChange={(e) => setOccupation(e.target.value)}
                    className="w-full bg-cream-50 border border-charcoal-300 rounded-xl px-4 py-3 text-sm text-black focus:outline-none focus:ring-2 focus:ring-lemon-500 focus:bg-white transition-all font-medium"
                  >
                    {OCCUPATION_OPTIONS.map((occ) => (
                      <option key={occ} value={occ}>
                        {occ}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Annual Income Dropdown */}
                <div>
                  <label htmlFor="income" className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider mb-1.5">
                    Annual Household Income
                  </label>
                  <select
                    id="income"
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                    className="w-full bg-cream-50 border border-charcoal-300 rounded-xl px-4 py-3 text-sm text-black focus:outline-none focus:ring-2 focus:ring-lemon-500 focus:bg-white transition-all font-medium"
                  >
                    {INCOME_OPTIONS.map((inc) => (
                      <option key={inc} value={inc}>
                        {inc}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Section 2: Role / Profile Selectable Cards */}
            <div className="space-y-4 pt-4 border-t border-charcoal-100">
              <div>
                <label className="block text-xs font-bold text-black uppercase tracking-wider">
                  2. Which best describes you? <span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-charcoal-500 mt-0.5">
                  Select your primary role to tailor matching scheme recommendations.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {ROLES.map((r) => {
                  const Icon = r.icon;
                  const isSelected = role === r.id;
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setRole(r.id)}
                      className={`relative flex flex-col p-4 rounded-2xl border text-left transition-all ${
                        isSelected
                          ? 'bg-lemon-50/70 border-lemon-500 ring-2 ring-lemon-400/30'
                          : 'bg-white hover:bg-cream-50 border-charcoal-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          isSelected ? 'bg-lemon-400 text-black' : 'bg-cream-100 text-charcoal-600'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        {isSelected && (
                          <CheckCircle2 className="w-4 h-4 text-lemon-600" />
                        )}
                      </div>
                      <h3 className="text-sm font-bold text-black">
                        {r.label}
                      </h3>
                      <p className="text-[11px] text-charcoal-500 leading-tight mt-1">
                        {r.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Section 3: Dynamic Questions */}
            {role === 'student' && (
              <div className="p-4 bg-cream-50 rounded-2xl border border-charcoal-200 space-y-2">
                <label className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider">
                  Education Level
                </label>
                <select
                  value={educationLevel}
                  onChange={(e) => setEducationLevel(e.target.value)}
                  className="w-full bg-white border border-charcoal-300 rounded-xl px-3.5 py-2.5 text-sm text-black focus:ring-2 focus:ring-lemon-500 font-medium"
                >
                  <option value="School Class 11-12">School (Class 11 - 12)</option>
                  <option value="Undergraduate / College">Undergraduate / College Degree</option>
                  <option value="Postgraduate">Postgraduate Degree</option>
                  <option value="Technical / Professional">Technical / Professional Courses (Engineering/Medical)</option>
                </select>
              </div>
            )}

            {role === 'farmer' && (
              <div className="p-4 bg-cream-50 rounded-2xl border border-charcoal-200 space-y-2">
                <label className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider">
                  Farming / Landholding Status
                </label>
                <select
                  value={landHolding}
                  onChange={(e) => setLandHolding(e.target.value)}
                  className="w-full bg-white border border-charcoal-300 rounded-xl px-3.5 py-2.5 text-sm text-black focus:ring-2 focus:ring-lemon-500 font-medium"
                >
                  <option value="Small / Marginal Landholder">Small & Marginal Farmer (Up to 2 hectares)</option>
                  <option value="Medium / Large Landholder">Medium or Large Farmer</option>
                  <option value="Tenant / Farm Worker">Tenant Farmer / Agricultural Labourer</option>
                </select>
              </div>
            )}

            {role === 'entrepreneur' && (
              <div className="p-4 bg-cream-50 rounded-2xl border border-charcoal-200 space-y-2">
                <label className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider">
                  Business / Startup Stage
                </label>
                <select
                  value={businessStage}
                  onChange={(e) => setBusinessStage(e.target.value)}
                  className="w-full bg-white border border-charcoal-300 rounded-xl px-3.5 py-2.5 text-sm text-black focus:ring-2 focus:ring-lemon-500 font-medium"
                >
                  <option value="Idea / Greenfield Venture">New Idea / Greenfield Project</option>
                  <option value="Early Startup / Seed Stage">Early Startup (Prototype / Market Entry)</option>
                  <option value="Existing Micro/Small Enterprise">Existing Micro or Small Business (MSE)</option>
                </select>
              </div>
            )}

            {/* Actions */}
            <div className="pt-4 border-t border-charcoal-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-charcoal-700 hover:bg-cream-100 rounded-xl transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base font-bold text-black bg-lemon-400 hover:bg-lemon-500 active:bg-lemon-600 rounded-xl shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-lemon-500 focus:ring-offset-2"
              >
                <span>Find My Schemes</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>
            </div>

          </form>

        </div>

      </div>
    </div>
  );
}
