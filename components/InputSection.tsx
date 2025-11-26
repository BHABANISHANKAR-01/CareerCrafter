
import React, { useRef } from 'react';
import { UserInput } from '../types';
import { FileText, Briefcase, StickyNote, Sparkles, Upload, X, FileType } from 'lucide-react';

interface InputSectionProps {
  input: UserInput;
  setInput: React.Dispatch<React.SetStateAction<UserInput>>;
  onGenerate: () => void;
  isLoading: boolean;
}

export const InputSection: React.FC<InputSectionProps> = ({ input, setInput, onGenerate, isLoading }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (field: keyof UserInput, value: string) => {
    setInput(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        // remove data:mime/type;base64, prefix
        const base64Data = base64String.split(',')[1];
        
        setInput(prev => ({
          ...prev,
          resumeFile: {
            data: base64Data,
            mimeType: file.type,
            name: file.name
          },
          resumeText: '' // Clear text if file is uploaded
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeFile = () => {
    setInput(prev => ({ ...prev, resumeFile: undefined }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const isReady = (input.resumeText.length > 50 || input.resumeFile) && input.jobDescription.length > 50;

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl mb-4">
          <span className="text-blue-600">Optimize</span> Your Application <span className="text-blue-600">Instantly</span>
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Upload your resume and the job description below. Our AI will rewrite your resume for ATS systems, 
          generate a cover letter, and prep you for the interview.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Resume Input */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow flex flex-col h-[400px]">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
            <FileText className="w-4 h-4 text-blue-500" />
            Your Resume
          </label>
          
          <div className="flex-1 flex flex-col">
            {!input.resumeFile ? (
              <>
                <div className="flex-1 relative">
                  <textarea
                    className="w-full h-full p-4 rounded-lg border border-slate-200 bg-slate-50 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none transition-all placeholder:text-slate-400"
                    placeholder="Paste your resume text here..."
                    value={input.resumeText}
                    onChange={(e) => handleChange('resumeText', e.target.value)}
                  />
                  {input.resumeText.length === 0 && (
                     <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="bg-white/90 p-4 rounded-lg border border-dashed border-slate-300 text-center">
                           <p className="text-sm text-slate-400 mb-2">Or upload a file</p>
                        </div>
                     </div>
                  )}
                </div>
                
                <div className="mt-4">
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.txt"
                  />
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-slate-300 rounded-lg text-slate-500 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all font-medium text-sm"
                  >
                    <Upload className="w-4 h-4" />
                    Upload Resume (PDF / Word)
                  </button>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center border-2 border-blue-100 bg-blue-50 rounded-lg p-6 text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                   <FileType className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-1 line-clamp-1 break-all px-2">
                  {input.resumeFile.name}
                </h3>
                <p className="text-sm text-slate-500 mb-6">Resume Uploaded Successfully</p>
                
                <button 
                  onClick={removeFile}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 shadow-sm rounded-lg text-sm font-medium text-slate-700 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-all"
                >
                  <X className="w-4 h-4" />
                  Remove File
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Job Description Input */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow flex flex-col h-[400px]">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
            <Briefcase className="w-4 h-4 text-emerald-500" />
            Job Description
          </label>
          <textarea
            className="w-full h-full p-4 rounded-lg border border-slate-200 bg-slate-50 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none resize-none transition-all placeholder:text-slate-400"
            placeholder="Paste the complete job description here..."
            value={input.jobDescription}
            onChange={(e) => handleChange('jobDescription', e.target.value)}
          />
        </div>
      </div>

      {/* Additional Notes */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
          <StickyNote className="w-4 h-4 text-amber-500" />
          Additional Notes (Optional)
        </label>
        <textarea
          className="w-full h-24 p-4 rounded-lg border border-slate-200 bg-slate-50 text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none resize-none placeholder:text-slate-400"
          placeholder="E.g., I want to highlight my leadership experience, or I am switching industries from Marketing to Tech..."
          value={input.additionalNotes}
          onChange={(e) => handleChange('additionalNotes', e.target.value)}
        />
      </div>

      <div className="flex justify-center pt-4">
        <button
          onClick={onGenerate}
          disabled={!isReady || isLoading}
          className={`
            group relative flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-lg shadow-lg transition-all transform
            ${isReady && !isLoading 
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:scale-105 hover:shadow-xl hover:from-blue-700 hover:to-indigo-700' 
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'}
          `}
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Optimizing...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 group-hover:animate-pulse" />
              <span>Generate Application Package</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
