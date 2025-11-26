
export interface ResumeSection {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  location: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  duration: string;
  location: string;
  points: string[];
}

export interface ProjectItem {
  name: string;
  description: string;
  technologies: string[];
  link?: string;
}

export interface EducationItem {
  institution: string;
  degree: string;
  year: string;
}

export interface OptimizedResume {
  personalInfo: ResumeSection;
  summary: string;
  skills: {
    core: string[];
    technical: string[];
  };
  experience: ExperienceItem[];
  projects: ProjectItem[];
  educations: EducationItem[];
  certifications: string[];
}

export interface AtsAnalysis {
  score: number;
  strengths: string[];
  weaknesses: string[];
  missingKeywords: string[];
  suggestions: string[];
}

export interface InterviewQuestion {
  question: string;
  answer: string;
  tip: string;
}

export interface OptimizationResult {
  optimizedResume: OptimizedResume;
  atsAnalysis: AtsAnalysis;
  coverLetter: string;
  interviewPrep: InterviewQuestion[];
}

export enum AppStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export interface UserInput {
  resumeText: string;
  resumeFile?: {
    data: string;
    mimeType: string;
    name: string;
  };
  jobDescription: string;
  additionalNotes: string;
}
