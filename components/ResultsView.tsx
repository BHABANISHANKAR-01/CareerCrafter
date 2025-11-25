import React, { useState } from 'react';
import { OptimizationResult, AppStatus } from '../types';
import { ResumePreview } from './ResumePreview';
import { ATSAnalysisView } from './ATSAnalysisView';
import { CoverLetterView } from './CoverLetterView';
import { InterviewPrepView } from './InterviewPrepView';
import { FileText, Search, PenTool, MessageSquare, ArrowLeft } from 'lucide-react';

interface ResultsViewProps {
  result: OptimizationResult;
  onBack: () => void;
}

type Tab = 'resume' | 'ats' | 'coverLetter' | 'interview';

export const ResultsView: React.FC<ResultsViewProps> = ({ result, onBack }) => {
  const [activeTab, setActiveTab] = useState<Tab>('ats');

  const tabs = [
    { id: 'ats', label: 'ATS Analysis', icon: Search },
    { id: 'resume', label: 'Optimized Resume', icon: FileText },
    { id: 'coverLetter', label: 'Cover Letter', icon: PenTool },
    { id: 'interview', label: 'Interview Prep', icon: MessageSquare },
  ];

  return (
    <div className="max-w-6xl mx-auto pb-12">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 hover:text-slate-800 mb-6 transition-colors font-medium"
      >
        <ArrowLeft className="w-4 h-4" />
        Start Over
      </button>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-1 mb-6 flex flex-wrap gap-1 sticky top-4 z-20">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`
                flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold transition-all
                ${isActive 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'bg-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
              `}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content Area */}
      <div className="min-h-[600px] animate-fade-in-up">
        {activeTab === 'resume' && (
           <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg flex items-center justify-between">
                 <p className="text-sm text-blue-800">
                    💡 <strong>Tip:</strong> Use your browser's print function (Ctrl+P) and "Save as PDF" to export this resume.
                 </p>
                 <button 
                   onClick={() => window.print()} 
                   className="text-xs bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 font-medium"
                 >
                   Print / Save PDF
                 </button>
              </div>
              <ResumePreview data={result.optimizedResume} />
           </div>
        )}
        {activeTab === 'ats' && <ATSAnalysisView analysis={result.atsAnalysis} />}
        {activeTab === 'coverLetter' && <CoverLetterView content={result.coverLetter} />}
        {activeTab === 'interview' && <InterviewPrepView questions={result.interviewPrep} />}
      </div>
    </div>
  );
};
