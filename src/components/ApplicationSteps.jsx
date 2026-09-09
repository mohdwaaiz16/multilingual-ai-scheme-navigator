import React from 'react';
import { ArrowRight, CheckCircle, ExternalLink } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function ApplicationSteps({ applicationProcess, officialSource, officialUrl }) {
  const { t, l } = useLanguage();

  // Parse steps if structured, or break text into meaningful milestones
  const steps = [
    {
      stepNumber: 1,
      title: t('scheme.step1Title', 'Check Initial Eligibility & Documents'),
      description: t('scheme.step1Desc', 'Verify that you meet the age, income, and category criteria, and gather your required identity & income documents.')
    },
    {
      stepNumber: 2,
      title: t('scheme.step2Title', 'Submission Channel'),
      description: l(applicationProcess) || t('scheme.step2Desc', 'Submit your application through the designated official portal, Common Service Centre (CSC), or authorized nodal agency.')
    },
    {
      stepNumber: 3,
      title: t('scheme.step3Title', 'Verification & Direct Benefit'),
      description: t('scheme.step3Desc', 'Local authorities or designated department officials will verify details and disburse benefits directly to your verified bank account or project.')
    }
  ];

  return (
    <div className="bg-white border border-charcoal-100 rounded-2xl p-6 shadow-soft space-y-6">
      <div>
        <h3 className="text-base font-semibold text-black">
          {t('scheme.howToApply', 'How to Apply')}
        </h3>
        <p className="text-xs text-charcoal-600 mt-0.5">
          {t('scheme.howToApplySub', 'Follow these structured milestones to successfully apply for this scheme.')}
        </p>
      </div>

      <div className="relative pl-6 space-y-8 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-charcoal-200">
        {steps.map((step) => (
          <div key={step.stepNumber} className="relative group">
            {/* Step Number Circle */}
            <div className="absolute -left-6 top-0 w-6 h-6 rounded-full bg-lemon-400 text-black text-xs font-bold flex items-center justify-center ring-4 ring-white shadow-soft">
              {step.stepNumber}
            </div>

            <div className="space-y-1 pl-3">
              <h4 className="text-sm font-semibold text-black">
                {step.title}
              </h4>
              <p className="text-sm text-charcoal-700 leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
