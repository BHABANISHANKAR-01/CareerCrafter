import React from 'react';
import { OptimizedResume } from '../types';
import { MapPin, Mail, Phone, Linkedin, Award, BookOpen, Briefcase, Code } from 'lucide-react';

interface ResumePreviewProps {
  data: OptimizedResume;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ data }) => {
  return (
    <div className="bg-white shadow-lg rounded-none md:rounded-lg overflow-hidden max-w-[210mm] mx-auto border border-slate-200 print:shadow-none print:border-none print:max-w-full">
      {/* Header */}
      <div className="bg-slate-900 text-white p-8 print:bg-slate-900 print:text-white">
        <h1 className="text-3xl font-bold mb-2 uppercase tracking-wide">{data.personalInfo.name}</h1>
        <div className="flex flex-wrap gap-4 text-sm text-slate-300 mt-4">
          {data.personalInfo.location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>{data.personalInfo.location}</span>
            </div>
          )}
          {data.personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="w-3 h-3" />
              <span>{data.personalInfo.email}</span>
            </div>
          )}
          {data.personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="w-3 h-3" />
              <span>{data.personalInfo.phone}</span>
            </div>
          )}
          {data.personalInfo.linkedin && (
            <div className="flex items-center gap-1">
              <Linkedin className="w-3 h-3" />
              <span className="truncate max-w-[200px]">{data.personalInfo.linkedin}</span>
            </div>
          )}
        </div>
      </div>

      <div className="p-8 space-y-6 text-slate-800">
        {/* Summary */}
        <section>
          <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wider border-b-2 border-slate-200 pb-1 mb-3">Professional Summary</h2>
          <p className="text-sm leading-relaxed text-slate-700">{data.summary}</p>
        </section>

        {/* Skills */}
        <section>
          <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wider border-b-2 border-slate-200 pb-1 mb-3 flex items-center gap-2">
            <Code className="w-5 h-5 text-slate-500" /> Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-sm mb-2 text-slate-900">Core Competencies</h3>
              <div className="flex flex-wrap gap-2">
                {data.skills.core.map((skill, idx) => (
                  <span key={idx} className="px-2 py-1 bg-slate-100 rounded text-xs font-medium text-slate-700 border border-slate-200 print:border-slate-300">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-sm mb-2 text-slate-900">Technical Skills</h3>
              <div className="flex flex-wrap gap-2">
                {data.skills.technical.map((skill, idx) => (
                  <span key={idx} className="px-2 py-1 bg-blue-50 rounded text-xs font-medium text-blue-700 border border-blue-100 print:bg-slate-50 print:text-slate-700 print:border-slate-300">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Experience */}
        <section>
          <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wider border-b-2 border-slate-200 pb-1 mb-3 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-slate-500" /> Experience
          </h2>
          <div className="space-y-6">
            {data.experience.map((exp, idx) => (
              <div key={idx} className="relative pl-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-slate-900">{exp.role}</h3>
                  <span className="text-sm font-medium text-slate-500 whitespace-nowrap">{exp.duration}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-blue-700 print:text-slate-800">{exp.company}</span>
                  <span className="text-xs text-slate-500 italic">{exp.location}</span>
                </div>
                <ul className="list-disc ml-4 space-y-1">
                  {exp.points.map((point, pIdx) => (
                    <li key={pIdx} className="text-sm text-slate-700 leading-snug pl-1 marker:text-slate-400">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Projects (Conditional) */}
        {data.projects.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wider border-b-2 border-slate-200 pb-1 mb-3 flex items-center gap-2">
              <Award className="w-5 h-5 text-slate-500" /> Key Projects
            </h2>
            <div className="space-y-4">
              {data.projects.map((proj, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-sm text-slate-900">{proj.name}</h3>
                    {proj.link && <span className="text-xs text-blue-600 print:text-slate-500">{proj.link}</span>}
                  </div>
                  <p className="text-sm text-slate-700 mt-1">{proj.description}</p>
                  <p className="text-xs text-slate-500 mt-1">
                    <span className="font-semibold">Tech:</span> {proj.technologies.join(", ")}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education & Certs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section>
            <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wider border-b-2 border-slate-200 pb-1 mb-3 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-slate-500" /> Education
            </h2>
            <div className="space-y-3">
              {data.education.map((edu, idx) => (
                <div key={idx}>
                  <h3 className="font-bold text-sm text-slate-900">{edu.institution}</h3>
                  <div className="flex justify-between text-sm text-slate-600">
                    <span>{edu.degree}</span>
                    <span className="text-xs text-slate-500">{edu.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {data.certifications.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wider border-b-2 border-slate-200 pb-1 mb-3">
                Certifications
              </h2>
              <ul className="list-disc ml-4 space-y-1">
                {data.certifications.map((cert, idx) => (
                  <li key={idx} className="text-sm text-slate-700 pl-1">{cert}</li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
