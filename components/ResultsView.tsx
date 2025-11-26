
import React, { useState } from 'react';
import { OptimizationResult } from '../types';
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
  ] as const;

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
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-1 mb-6 flex flex-wrap gap-1 sticky top-20 z-20">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id as Tab;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`
                flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold transition-all
                ${isActive 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'bg-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }
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
              {/* Toolbar */}
              <div className="bg-white border border-slate-200 p-3 rounded-lg flex flex-wrap items-center justify-between gap-4 shadow-sm">
                 <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-2">Template:</span>
                    <div className="relative">
                      <select 
                        value={template}
                        onChange={(e) => setTemplate(e.target.value as ResumeTemplate)}
                        className="appearance-none bg-white border border-slate-300 text-slate-700 py-1.5 pl-3 pr-8 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-slate-400 transition-colors cursor-pointer"
                      >
                        <option value="modern">Modern (2-Column)</option>
                        <option value="classic">Classic (Serif)</option>
                        <option value="minimal">Minimal (Clean)</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                        <ChevronDown className="h-4 w-4" />
                      </div>
                    </div>
                 </div>

                 <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-md border border-slate-200">
                       <button 
                          onClick={() => setCompactMode(false)}
                          className={`px-3 py-1 rounded text-xs font-medium transition-colors ${!compactMode ? 'bg-white shadow text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                       >
                          Standard
                       </button>
                       <button 
                          onClick={() => setCompactMode(true)}
                          className={`px-3 py-1 rounded text-xs font-medium transition-colors ${compactMode ? 'bg-white shadow text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                       >
                          Compact
                       </button>
                    </div>

                    <button 
                      onClick={() => window.print()} 
                      className="flex items-center gap-2 text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium shadow-sm transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Save PDF
                    </button>
                 </div>
              </div>

              {/* Preview Container */}
              <div className="overflow-x-auto pb-8 flex justify-center bg-slate-100/50 p-4 rounded-xl border border-dashed border-slate-200 transition-all duration-300">
                 <div key={template} className="animate-fade-in origin-top">
                    <ResumePreview 
                        data={result.optimizedResume} 
                        template={template} 
                        compactMode={compactMode} 
                    />
                 </div>
              </div>
           </div>
        )}
        {activeTab === 'ats' && <ATSAnalysisView analysis={result.atsAnalysis} />}
        {activeTab === 'coverLetter' && <CoverLetterView content={result.coverLetter} />}
        {activeTab === 'interview' && <InterviewPrepView questions={result.interviewPrep} input={input} />}
      </div>
    </div>
  );
};
