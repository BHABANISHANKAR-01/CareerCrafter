
import React, { useState } from 'react';
import { UserInput, OptimizationResult, AppStatus } from './types';
import { generateOptimization } from './services/geminiService';
import { InputSection } from './components/InputSection';
import { ResultsView } from './components/ResultsView';
import { Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [error, setError] = useState<string | null>(null);
  
  const [input, setInput] = useState<UserInput>({
    resumeText: '',
    jobDescription: '',
    additionalNotes: '',
  });

  const [result, setResult] = useState<OptimizationResult | null>(null);

  const handleGenerate = async () => {
    setStatus(AppStatus.LOADING);
    setError(null);
    try {
      const data = await generateOptimization(input);
      setResult(data);
      setStatus(AppStatus.SUCCESS);
    } catch (err: any) {
      console.error(err);
      setStatus(AppStatus.ERROR);
      setError("Failed to generate optimization. Please check your API key or try again with shorter text.");
    }
  };

  const handleReset = () => {
    setStatus(AppStatus.IDLE);
    setResult(null);
    // Optional: Keep input or clear them. Keeping them is usually better UX.
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-100">
      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-lg flex items-center justify-center text-white">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">CareerCrafter AI</span>
          </div>
          <div className="text-sm text-slate-500 hidden sm:block">
            Powered by Gemini 2.5
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {status === AppStatus.ERROR && (
          <div className="max-w-2xl mx-auto mb-8 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center justify-center">
            <p>{error}</p>
          </div>
        )}

        {(status === AppStatus.IDLE || status === AppStatus.LOADING) && (
          <InputSection 
            input={input} 
            setInput={setInput} 
            onGenerate={handleGenerate} 
            isLoading={status === AppStatus.LOADING} 
          />
        )}

        {status === AppStatus.SUCCESS && result && (
          <ResultsView result={result} onBack={handleReset} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white mt-20 text-center text-sm text-slate-500">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} CareerCrafter AI. Built for success.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
