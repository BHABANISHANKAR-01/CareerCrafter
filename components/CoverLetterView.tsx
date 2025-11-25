import React from 'react';
import { Copy, Check } from 'lucide-react';

interface CoverLetterViewProps {
  content: string;
}

export const CoverLetterView: React.FC<CoverLetterViewProps> = ({ content }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden max-w-[210mm] mx-auto">
      <div className="bg-slate-50 border-b border-slate-200 p-4 flex justify-between items-center">
        <h3 className="font-bold text-slate-700">Generated Cover Letter</h3>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-600 bg-white border border-slate-300 rounded hover:bg-slate-50 hover:text-blue-600 transition-colors"
        >
          {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
          {copied ? 'Copied' : 'Copy Text'}
        </button>
      </div>
      <div className="p-10 text-slate-800 leading-relaxed whitespace-pre-wrap font-serif text-base">
        {content}
      </div>
    </div>
  );
};
