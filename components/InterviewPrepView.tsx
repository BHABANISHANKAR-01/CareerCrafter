
import React, { useState } from 'react';
import { InterviewQuestion, UserInput } from '../types';
import { ChevronDown, ChevronUp, MessageCircle, Send, Bot, Sparkles, Target } from 'lucide-react';
import { askInterviewCoach } from '../services/geminiService';

interface InterviewPrepViewProps {
  questions: InterviewQuestion[];
  input?: UserInput; // Optional to maintain backward compatibility if needed, but we passed it.
}

export const InterviewPrepView: React.FC<InterviewPrepViewProps> = ({ questions, input }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  // Chat state
  const [customQuestion, setCustomQuestion] = useState('');
  const [focusArea, setFocusArea] = useState('General Strategy');
  const [customAnswer, setCustomAnswer] = useState<string | null>(null);
  const [isAsking, setIsAsking] = useState(false);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleAskCoach = async () => {
    if (!input || !customQuestion.trim()) return;
    
    setIsAsking(true);
    setCustomAnswer(null);
    try {
        const answer = await askInterviewCoach(input, customQuestion, focusArea);
        setCustomAnswer(answer);
    } catch (e) {
        setCustomAnswer("Failed to get an answer. Please try again.");
    } finally {
        setIsAsking(false);
    }
  };

  const focusOptions = [
    "General Strategy",
    "Technical Skills",
    "Behavioral Questions",
    "Career Goals",
    "Salary Negotiation",
    "Company Research"
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-8">
      {/* Introduction Banner */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
        <p className="text-blue-800 text-sm">
          <strong>Preparation Mode:</strong> These questions are tailored specifically to the job description and your resume gaps.
          Practice speaking the answers out loud using the STAR method (Situation, Task, Action, Result).
        </p>
      </div>

      {/* Generated Questions List */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Common Interview Questions</h2>
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

      {/* Ask the Coach Section */}
      {input && (
          <div className="mt-12 bg-gradient-to-br from-indigo-50 to-white rounded-2xl border border-indigo-100 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
                <div className="bg-indigo-600 p-2 rounded-lg text-white">
                    <Bot className="w-6 h-6" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-slate-900">AI Interview Coach</h2>
                    <p className="text-sm text-slate-500">Ask specific questions about the role or your resume.</p>
                </div>
            </div>

            <div className="space-y-4">
                {/* Focus Area Selector */}
                <div className="bg-white p-3 rounded-lg border border-slate-200 flex items-center gap-3">
                   <Target className="w-4 h-4 text-indigo-500" />
                   <span className="text-sm font-semibold text-slate-600">Focus Area:</span>
                   <div className="relative flex-1">
                      <select 
                        value={focusArea}
                        onChange={(e) => setFocusArea(e.target.value)}
                        className="w-full appearance-none bg-transparent text-sm font-medium text-slate-800 focus:outline-none cursor-pointer"
                      >
                         {focusOptions.map(opt => (
                           <option key={opt} value={opt}>{opt}</option>
                         ))}
                      </select>
                      <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                   </div>
                </div>

                <div className="relative">
                    <textarea 
                        className="w-full p-4 rounded-xl border border-slate-200 bg-white shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none min-h-[100px] text-sm"
                        placeholder={`Ask a question about ${focusArea.toLowerCase()}...`}
                        value={customQuestion}
                        onChange={(e) => setCustomQuestion(e.target.value)}
                    />
                    <div className="absolute bottom-3 right-3">
                        <button 
                            onClick={handleAskCoach}
                            disabled={isAsking || !customQuestion.trim()}
                            className={`
                                flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all
                                ${isAsking || !customQuestion.trim() 
                                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                                    : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg'}
                            `}
                        >
                            {isAsking ? (
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <Send className="w-4 h-4" />
                            )}
                            {isAsking ? 'Thinking...' : 'Ask Coach'}
                        </button>
                    </div>
                </div>

                {customAnswer && (
                    <div className="animate-fade-in bg-white rounded-xl border border-indigo-100 shadow-sm p-6 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500" />
                        <div className="flex items-start gap-3">
                            <Sparkles className="w-5 h-5 text-indigo-500 shrink-0 mt-1" />
                            <div className="space-y-2">
                                <h4 className="font-bold text-slate-900 text-sm">Coach's Advice ({focusArea}):</h4>
                                <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">
                                    {customAnswer}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
          </div>
      )}
    </div>
  );
};
