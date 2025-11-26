
import { GoogleGenerativeAI, Type, Schema, Part } from "@google/generative-ai";
import { UserInput, OptimizationResult } from "../types";

const genAI = new GoogleGenerativeAI({ apiKey: process.env.GEMINI_API_KEY });

const responseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    optimizedResume: {
      type: Type.OBJECT,
      properties: {
        personalInfo: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            email: { type: Type.STRING },
            phone: { type: Type.STRING },
            linkedin: { type: Type.STRING },
            location: { type: Type.STRING },
          },
          required: ["name", "email"],
        },
        summary: { type: Type.STRING },
        skills: {
          type: Type.OBJECT,
          properties: {
            core: { type: Type.ARRAY, items: { type: Type.STRING } },
            technical: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
        },
        experience: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              company: { type: Type.STRING },
              role: { type: Type.STRING },
              duration: { type: Type.STRING },
              location: { type: Type.STRING },
              points: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
          },
        },
        projects: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              description: { type: Type.STRING },
              technologies: { type: Type.ARRAY, items: { type: Type.STRING } },
              link: { type: Type.STRING },
            },
          },
        },
        education: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              institution: { type: Type.STRING },
              degree: { type: Type.STRING },
              year: { type: Type.STRING },
            },
          },
        },
        certifications: { type: Type.ARRAY, items: { type: Type.STRING } },
      },
      required: ["summary", "skills", "experience", "projects"],
    },
    atsAnalysis: {
      type: Type.OBJECT,
      properties: {
        score: { type: Type.INTEGER, description: "Score from 0 to 100" },
        strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
        weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
        missingKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
        suggestions: { type: Type.ARRAY, items: { type: Type.STRING } },
      },
      required: ["score", "strengths", "weaknesses", "missingKeywords", "suggestions"],
    },
    coverLetter: { type: Type.STRING },
    interviewPrep: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          question: { type: Type.STRING },
          answer: { type: Type.STRING },
          tip: { type: Type.STRING },
        },
      },
    },
  },
  required: ["optimizedResume", "atsAnalysis", "coverLetter", "interviewPrep"],
};

export const generateOptimization = async (input: UserInput): Promise<OptimizationResult> => {
  try {
    const model = "gemini-2.5-flash";
    
    const basePrompt = `
    You are an expert HR Manager and ATS Optimization Specialist.
    
    Task: Analyze the Candidate's Resume against the Job Description.
    1. Rewrite the resume to be fully ATS optimized, using STAR format for bullet points.
    2. Analyze the match and provide an ATS score (0-100).
    3. Write a tailored, persuasive cover letter.
    4. Create 10 interview questions with sample STAR-formatted answers tailored to this specific application.
    
    Important Rules:
    - Output MUST be valid JSON following the schema provided
    - Preserve all original factual information from the resume
    - ATS-optimize by using keywords from the job description
    - Do NOT use placeholders like [Your Name] if the information exists in the resume.
    - If personal info is missing, leave it as an empty string or generic placeholder only if absolutely necessary.
    `;

    const parts: Part[] = [];
    parts.push({ text: basePrompt });

    parts.push({ text: `\n\nJOB DESCRIPTION:\n${input.jobDescription}` });

    if (input.additionalNotes) {
      parts.push({ text: `\n\nADDITIONAL NOTES:\n${input.additionalNotes}` });
    }

    if (input.resumeFile) {
        parts.push({ text: "\n\nCANDIDATE RESUME (Attached below):" });
        parts.push({
            inlineData: {
                data: input.resumeFile.data,
                mimeType: input.resumeFile.mimeType
            }
        });
    } else {
        parts.push({ text: `\n\nCANDIDATE RESUME (Text):\n${input.resumeText}` });
    }

    const result = await genAI.models.generateContent({
      model: model,
      contents: { parts },
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.4, 
      },
    });

    const responseText = result.text;
    
    if (!responseText) {
      throw new Error("No response received from Gemini.");
    }

    return JSON.parse(responseText) as OptimizationResult;

  } catch (error) {
    console.error("Error generating optimization:", error);
    throw error;
  }
}
