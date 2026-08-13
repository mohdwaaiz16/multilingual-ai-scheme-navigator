import React from 'react';
import { ArrowRight, CheckCircle, ExternalLink } from 'lucide-react';

export default function ApplicationSteps({ applicationProcess, officialSource, officialUrl }) {
  // Parse steps if structured, or break text into meaningful milestones
  const steps = [
    {
      stepNumber: 1,
      title: "Check Initial Eligibility & Documents",
      description: "Verify that you meet the age, income, and category criteria, and gather your required identity & income documents."
    },
    {
      stepNumber: 2,
      title: "Submission Channel",
      description: applicationProcess || "Submit your application through the designated official portal, Common Service Centre (CSC), or authorized nodal agency."
    },
    {
      stepNumber: 3,
      title: "Verification & Direct Benefit",
      description: "Local authorities or designated department officials will verify details and disburse benefits directly to your verified bank account or project."
    }
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
      <div>
        <h3 className="text-base font-semibold text-slate-900">
          How to Apply
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Follow these structured milestones to successfully apply for this scheme.
        </p>
      </div>

      <div className="relative pl-6 space-y-8 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
        {steps.map((step) => (
          <div key={step.stepNumber} className="relative group">
            {/* Step Number Circle */}
            <div className="absolute -left-6 top-0 w-6 h-6 rounded-full bg-civic-900 text-white text-xs font-bold flex items-center justify-center ring-4 ring-white shadow-sm">
              {step.stepNumber}
            </div>

            <div className="space-y-1 pl-3">
              <h4 className="text-sm font-semibold text-slate-900">
                {step.title}
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
