import React from 'react';
import { AtsAnalysis } from '../types';
import { CheckCircle2, XCircle, AlertTriangle, Lightbulb } from 'lucide-react';

interface ATSAnalysisViewProps {
  analysis: AtsAnalysis;
}

export const ATSAnalysisView: React.FC<ATSAnalysisViewProps> = ({ analysis }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600 border-emerald-200 bg-emerald-50';
    if (score >= 60) return 'text-amber-600 border-amber-200 bg-amber-50';
    return 'text-red-600 border-red-200 bg-red-50';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent Match';
    if (score >= 60) return 'Good Potential';
    return 'Needs Improvement';
  };

  const ScoreRing = ({ score }: { score: number }) => {
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (score / 100) * circumference;
    
    let colorClass = "stroke-red-500";
    if (score >= 60) colorClass = "stroke-amber-500";
    if (score >= 80) colorClass = "stroke-emerald-500";

    return (
      <div className="relative w-40 h-40 flex items-center justify-center">
        <svg className="transform -rotate-90 w-full h-full">
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="currentColor"
            strokeWidth="10"
            fill="transparent"
            className="text-slate-100"
          />
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="currentColor"
            strokeWidth="10"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={`${colorClass} transition-all duration-1000 ease-out`}
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-4xl font-bold text-slate-800">{score}</span>
          <span className="text-xs uppercase font-semibold text-slate-400">ATS Score</span>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Score Card */}
      <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200 flex flex-col md:flex-row items-center gap-8">
        <ScoreRing score={analysis.score} />
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">{getScoreLabel(analysis.score)}</h2>
          <p className="text-slate-600 leading-relaxed">
            Your resume has been analyzed against the job description. 
            A score above 80 typically ensures you pass automated screening filters.
            Review the breakdown below to improve your standing.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Missing Keywords */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                Missing Keywords
            </h3>
            <p className="text-sm text-slate-500 mb-4">Add these to your resume skills or experience section to pass filters.</p>
            <div className="flex flex-wrap gap-2">
                {analysis.missingKeywords.length > 0 ? (
                    analysis.missingKeywords.map((kw, i) => (
                        <span key={i} className="px-3 py-1 bg-red-50 text-red-700 text-sm font-medium rounded-full border border-red-100">
                            {kw}
                        </span>
                    ))
                ) : (
                    <span className="text-emerald-600 text-sm italic">Great job! No critical keywords missing.</span>
                )}
            </div>
        </div>

        {/* Suggestions */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-blue-500" />
                Suggestions
            </h3>
            <ul className="space-y-3">
                {analysis.suggestions.map((sugg, i) => (
                    <li key={i} className="flex gap-3 text-sm text-slate-700">
                        <span className="block w-1.5 h-1.5 mt-1.5 rounded-full bg-blue-400 shrink-0" />
                        {sugg}
                    </li>
                ))}
            </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {/* Strengths */}
         <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                Strengths
            </h3>
            <ul className="space-y-2">
                {analysis.strengths.map((str, i) => (
                    <li key={i} className="flex gap-2 text-sm text-slate-700">
                         <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        {str}
                    </li>
                ))}
            </ul>
        </div>

        {/* Weaknesses */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <XCircle className="w-5 h-5 text-red-500" />
                Areas for Improvement
            </h3>
            <ul className="space-y-2">
                {analysis.weaknesses.map((weak, i) => (
                    <li key={i} className="flex gap-2 text-sm text-slate-700">
                         <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                        {weak}
                    </li>
                ))}
            </ul>
        </div>
      </div>
    </div>
  );
};
