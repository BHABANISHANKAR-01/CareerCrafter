
import React from 'react';
import { OptimizedResume } from '../types';
import { MapPin, Mail, Phone, Linkedin, Globe, ExternalLink } from 'lucide-react';

export type ResumeTemplate = 'modern' | 'classic' | 'minimal';

interface ResumePreviewProps {
  data: OptimizedResume;
  template: ResumeTemplate;
  compactMode: boolean;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ data, template, compactMode }) => {
  
  // --- STYLES & HELPERS ---
  const densityClass = compactMode ? 'text-xs leading-snug' : 'text-sm leading-normal';
  const sectionGap = compactMode ? 'space-y-4' : 'space-y-6';
  const mbHeader = compactMode ? 'mb-4' : 'mb-8';
  
  // Helper for Contact Icons
  const ContactItem = ({ icon: Icon, text, link }: { icon: any, text: string, link?: string }) => {
    if (!text) return null;
    return (
      <div className="flex items-center gap-1.5 whitespace-nowrap">
        <Icon className="w-3.5 h-3.5 opacity-70" />
        {link ? (
          <a href={link} target="_blank" rel="noreferrer" className="hover:underline">{text}</a>
        ) : (
          <span>{text}</span>
        )}
      </div>
    );
  };

  // --- TEMPLATE 1: MODERN (2-Column, original request) ---
  const ModernTemplate = () => {
    const SectionHeader = ({ title }: { title: string }) => (
      <div className={`w-full border-y-2 border-slate-900 py-1 ${compactMode ? 'mb-2 mt-4' : 'mb-4 mt-6'} first:mt-0 text-center`}>
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest">{title}</h2>
      </div>
    );

    return (
      <div className="h-full">
        {/* Header */}
        <header className={`${mbHeader} text-center`}>
          <h1 className="text-4xl font-extrabold uppercase tracking-wide mb-2 text-slate-900">
            {data.personalInfo.name}
          </h1>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm mt-3 text-slate-700 font-medium">
             <ContactItem icon={Mail} text={data.personalInfo.email} />
             <ContactItem icon={Phone} text={data.personalInfo.phone} />
             <ContactItem icon={MapPin} text={data.personalInfo.location} />
             <ContactItem icon={Linkedin} text="LinkedIn" link={data.personalInfo.linkedin} />
          </div>
        </header>

        <div className="grid grid-cols-12 gap-8 h-full">
          {/* Left Column */}
          <div className="col-span-12 md:col-span-8 print:col-span-8">
            <section className="mb-6">
              <SectionHeader title="Objective" />
              <p className="text-justify leading-relaxed">{data.summary}</p>
            </section>

            <section className="mb-6">
              <SectionHeader title="Experience" />
              <div className={sectionGap}>
                {data.experience.map((exp, idx) => (
                  <div key={idx}>
                    <div className="mb-1">
                      <h3 className="font-bold text-base">{exp.role}</h3>
                      <div className="text-slate-700 italic">{exp.company}</div>
                      <div className="flex justify-between text-xs text-slate-500 font-medium mt-0.5">
                        <span>{exp.duration}</span>
                        <span>{exp.location}</span>
                      </div>
                    </div>
                    <ul className="list-disc ml-4 space-y-1 mt-2 marker:text-slate-900">
                      {exp.points.map((point, pIdx) => (
                        <li key={pIdx} className="pl-1 text-slate-800">{point}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <SectionHeader title="Education" />
              <div className="space-y-4">
                {data.education.map((edu, idx) => (
                  <div key={idx}>
                    <h3 className="font-bold text-base">{edu.degree}</h3>
                    <div className="text-slate-700">{edu.institution}</div>
                    <div className="text-xs text-slate-500 font-medium mt-0.5">{edu.year}</div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="col-span-12 md:col-span-4 print:col-span-4">
            <section className="mb-6">
              <SectionHeader title="Skills" />
              <div className="space-y-4">
                 <div>
                    <h4 className="font-bold text-xs uppercase text-slate-500 mb-2">Core</h4>
                    <ul className="space-y-1.5">
                       {data.skills.core.map((skill, idx) => (
                           <li key={idx} className="font-medium border-b border-slate-100 pb-1">{skill}</li>
                       ))}
                    </ul>
                 </div>
                 <div>
                    <h4 className="font-bold text-xs uppercase text-slate-500 mb-2">Technical</h4>
                    <div className="flex flex-wrap gap-2">
                       {data.skills.technical.map((skill, idx) => (
                            <span key={idx} className="bg-slate-100 px-2 py-1 rounded text-xs">{skill}</span>
                       ))}
                    </div>
                 </div>
              </div>
            </section>

            {data.certifications.length > 0 && (
              <section className="mb-6">
                <SectionHeader title="Certification" />
                <ul className="list-disc ml-4 space-y-2 marker:text-slate-900">
                  {data.certifications.map((cert, idx) => (
                    <li key={idx} className="pl-1">{cert}</li>
                  ))}
                </ul>
              </section>
            )}

            <section>
              <SectionHeader title="Projects" />
              <div className="space-y-5">
                {data.projects.map((proj, idx) => (
                  <div key={idx}>
                    <h3 className="font-bold text-sm text-slate-900">{proj.name}</h3>
                    <p className="text-xs text-slate-700 mt-1 leading-relaxed text-justify">
                      {proj.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  };

  // --- TEMPLATE 2: CLASSIC (Single Column, Serif Headers, Traditional) ---
  const ClassicTemplate = () => {
    return (
      <div className="h-full font-serif text-slate-900">
        <header className="border-b-2 border-slate-900 pb-6 mb-6 text-center">
          <h1 className="text-3xl font-bold uppercase tracking-wider mb-3">{data.personalInfo.name}</h1>
          <div className="flex flex-wrap justify-center gap-4 text-sm italic text-slate-700">
             <ContactItem icon={Mail} text={data.personalInfo.email} />
             <ContactItem icon={Phone} text={data.personalInfo.phone} />
             <ContactItem icon={MapPin} text={data.personalInfo.location} />
             <ContactItem icon={Linkedin} text="LinkedIn" link={data.personalInfo.linkedin} />
          </div>
        </header>

        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase border-b border-slate-300 mb-3 pb-1 tracking-wide">Professional Summary</h2>
          <p className="leading-relaxed">{data.summary}</p>
        </section>

        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase border-b border-slate-300 mb-3 pb-1 tracking-wide">Skills</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm">
             <div>
               <strong className="block mb-1 text-slate-700">Core Competencies:</strong>
               <p>{data.skills.core.join(" • ")}</p>
             </div>
             <div>
               <strong className="block mb-1 text-slate-700">Technical Skills:</strong>
               <p>{data.skills.technical.join(", ")}</p>
             </div>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase border-b border-slate-300 mb-3 pb-1 tracking-wide">Professional Experience</h2>
          <div className="space-y-5">
            {data.experience.map((exp, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-lg text-slate-900">{exp.role}</h3>
                  <span className="text-sm font-medium">{exp.duration}</span>
                </div>
                <div className="flex justify-between items-center mb-2 text-slate-700">
                  <span className="italic font-semibold">{exp.company}</span>
                  <span className="text-xs">{exp.location}</span>
                </div>
                <ul className="list-disc ml-5 space-y-1">
                  {exp.points.map((pt, pIdx) => (
                    <li key={pIdx} className="pl-1">{pt}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase border-b border-slate-300 mb-3 pb-1 tracking-wide">Key Projects</h2>
          <div className="space-y-4">
             {data.projects.map((proj, idx) => (
               <div key={idx}>
                 <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-base">{proj.name}</h3>
                    {proj.link && <a href={proj.link} className="text-blue-600 text-xs hover:underline flex items-center gap-1"><ExternalLink className="w-3 h-3"/>View</a>}
                 </div>
                 <p className="text-sm text-slate-700 mb-1">{proj.description}</p>
                 <p className="text-xs text-slate-500 italic">Technologies: {proj.technologies.join(", ")}</p>
               </div>
             ))}
          </div>
        </section>

        <section>
          <h2 className="text-sm font-bold uppercase border-b border-slate-300 mb-3 pb-1 tracking-wide">Education & Certifications</h2>
          <div className="space-y-3">
             {data.education.map((edu, idx) => (
               <div key={idx} className="flex justify-between">
                 <div>
                   <div className="font-bold">{edu.institution}</div>
                   <div>{edu.degree}</div>
                 </div>
                 <div className="text-right">{edu.year}</div>
               </div>
             ))}
             {data.certifications.length > 0 && (
                <div className="mt-4 pt-2">
                   <div className="font-bold mb-1">Certifications</div>
                   <ul className="list-disc ml-5 text-sm">
                      {data.certifications.map((c, i) => <li key={i}>{c}</li>)}
                   </ul>
                </div>
             )}
          </div>
        </section>
      </div>
    );
  };

  // --- TEMPLATE 3: MINIMAL (Modern, Left Aligned, Clean) ---
  const MinimalTemplate = () => {
    return (
      <div className="h-full font-sans text-slate-800">
         <header className="mb-8 pb-8 border-b border-slate-100">
            <h1 className="text-5xl font-light tracking-tight text-slate-900 mb-4">{data.personalInfo.name}</h1>
            <div className="grid grid-cols-2 gap-y-2 text-sm text-slate-500 max-w-md">
                <ContactItem icon={Mail} text={data.personalInfo.email} />
                <ContactItem icon={Phone} text={data.personalInfo.phone} />
                <ContactItem icon={MapPin} text={data.personalInfo.location} />
                <ContactItem icon={Linkedin} text="LinkedIn Profile" link={data.personalInfo.linkedin} />
            </div>
         </header>

         <div className="grid grid-cols-1 gap-10">
            <div>
               <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-3">Profile</h3>
               <p className="text-lg leading-relaxed font-light text-slate-700">{data.summary}</p>
            </div>

            <div>
               <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-4">Experience</h3>
               <div className="space-y-8 border-l-2 border-slate-100 pl-6 ml-1">
                  {data.experience.map((exp, idx) => (
                     <div key={idx} className="relative">
                        <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-blue-100 border-2 border-white ring-1 ring-blue-600"></div>
                        <h4 className="font-bold text-lg text-slate-900">{exp.role}</h4>
                        <div className="text-sm font-medium text-blue-600 mb-2">{exp.company} • {exp.duration}</div>
                        <ul className="space-y-2 text-slate-600">
                           {exp.points.map((pt, i) => <li key={i} className="block">• {pt}</li>)}
                        </ul>
                     </div>
                  ))}
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-4">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                     {[...data.skills.core, ...data.skills.technical].map((s, i) => (
                        <span key={i} className="px-3 py-1.5 bg-slate-50 text-slate-700 rounded-lg text-sm font-medium border border-slate-200">
                           {s}
                        </span>
                     ))}
                  </div>
               </div>
               <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-4">Projects</h3>
                  <div className="space-y-4">
                     {data.projects.map((proj, i) => (
                        <div key={i}>
                           <div className="font-bold text-slate-900">{proj.name}</div>
                           <div className="text-xs text-slate-500 mb-1">{proj.description}</div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>

            <div>
               <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-3">Education</h3>
               <div className="grid grid-cols-1 gap-4">
                  {data.education.map((edu, i) => (
                     <div key={i} className="flex items-baseline justify-between border-b border-slate-50 pb-2">
                        <div>
                           <div className="font-bold text-slate-900">{edu.institution}</div>
                           <div className="text-slate-600">{edu.degree}</div>
                        </div>
                        <div className="text-sm text-slate-400 font-medium">{edu.year}</div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
    );
  };

  return (
    <div 
      className={`
        bg-white shadow-xl mx-auto p-8 md:p-12 print:p-0 print:shadow-none print:w-full overflow-hidden
        ${densityClass}
      `}
      style={{ 
         width: '210mm', 
         minHeight: '297mm', // Keeps A4 visualization
         height: 'auto'      // Allows expansion to prevent overflow hiding
      }} 
    >
      {template === 'modern' && <ModernTemplate />}
      {template === 'classic' && <ClassicTemplate />}
      {template === 'minimal' && <MinimalTemplate />}
    </div>
  );
};
