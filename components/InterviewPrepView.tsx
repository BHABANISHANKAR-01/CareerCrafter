import React, { useState } from 'react';
import { InterviewQuestion } from '../types';
import { ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';

interface InterviewPrepViewProps {
  questions: InterviewQuestion[];
}

export const InterviewPrepView: React.FC<InterviewPrepViewProps> = ({ questions }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-r-lg">
        <p className="text-blue-800 text-sm">
          <strong>Preparation Mode:</strong> These questions are tailored specifically to the job description and your resume gaps.
          Practice speaking the answers out loud using the STAR method (Situation, Task, Action, Result).
        </p>
      </div>

      {questions.map((item, index) => (
        <div 
          key={index} 
          className={`bg-white rounded-lg border transition-all duration-200 ${openIndex === index ? 'shadow-md border-blue-200 ring-1 ring-blue-100' : 'border-slate-200 hover:border-blue-300'}`}
        >
          <button
            onClick={() => toggle(index)}
            className="w-full flex items-start justify-between p-5 text-left focus:outline-none"
          >
            <div className="flex gap-4">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs font-bold shrink-0 mt-0.5">
                {index + 1}
              </span>
              <h3 className={`font-semibold text-lg ${openIndex === index ? 'text-blue-700' : 'text-slate-800'}`}>
                {item.question}
              </h3>
            </div>
            {openIndex === index ? (
              <ChevronUp className="w-5 h-5 text-slate-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-slate-400" />
            )}
          </button>

          {openIndex === index && (
            <div className="px-5 pb-6 pl-14 space-y-4 animate-fade-in">
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <MessageCircle className="w-3 h-3" />
                  Suggested Answer Structure
                </div>
                <p className="text-slate-700 leading-relaxed text-sm whitespace-pre-line">
                  {item.answer}
                </p>
              </div>

              <div className="flex gap-2 items-start text-sm text-amber-700 bg-amber-50 p-3 rounded border border-amber-100">
                <span className="font-bold shrink-0">💡 Pro Tip:</span>
                <span>{item.tip}</span>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
