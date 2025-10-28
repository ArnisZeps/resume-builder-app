"use client";

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

export interface ResumeData extends Record<string, unknown>{
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    linkedin: string;
    github: string;
    professionalSummary: string;
  };
  experience: Array<{
    jobTitle: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    responsibilities: string[];
  }>;
  education: Array<{
    degree: string;
    institution: string;
    location: string;
    graduationDate: string;
    gpa: string;
  }>;
  skills: Array<{
    category: string;
    items: string[];
  }>;
  projects: Array<{
    title: string;
    description: string;
    technologies: string[];
    url: string;
    startDate: string;
    endDate: string;
  }>;
  certifications: Array<{
    name: string;
    issuer: string;
    date: string;
    url: string;
  }>;
}

export type TemplateType = 'classic' | 'modern' | 'minimal' | 'executive';

interface ResumeContextType {
  resumeData: ResumeData;
  selectedTemplate: TemplateType;
  updateResumeData: (data: Partial<ResumeData>) => void;
  updatePersonalInfo: (data: Partial<ResumeData['personalInfo']>) => void;
  updateProfessionalSummary: (summary: string) => void;
  updateExperience: (experience: ResumeData['experience']) => void;
  updateEducation: (education: ResumeData['education']) => void;
  updateSkills: (skills: ResumeData['skills']) => void;
  updateProjects: (projects: ResumeData['projects']) => void;
  updateCertifications: (certifications: ResumeData['certifications']) => void;
  setSelectedTemplate: (template: TemplateType) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>('classic');
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      location: '',
      website: '',
      linkedin: '',
      github: '',
      professionalSummary: '',
    },
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
  });

  const updateResumeData = useCallback((data: Partial<ResumeData>) => {
    setResumeData(prev => ({ ...prev, ...data }));
  }, []);

  const updatePersonalInfo = useCallback((data: Partial<ResumeData['personalInfo']>) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...data }
    }));
  }, []);

  const updateProfessionalSummary = useCallback((summary: string) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        professionalSummary: summary
      }
    }));
  }, []);

  const updateExperience = useCallback((experience: ResumeData['experience']) => {
    setResumeData(prev => ({
      ...prev,
      experience
    }));
  }, []);

  const updateEducation = useCallback((education: ResumeData['education']) => {
    setResumeData(prev => ({
      ...prev,
      education
    }));
  }, []);

  const updateSkills = useCallback((skills: ResumeData['skills']) => {
    setResumeData(prev => ({
      ...prev,
      skills
    }));
  }, []);

  const updateProjects = useCallback((projects: ResumeData['projects']) => {
    setResumeData(prev => ({
      ...prev,
      projects
    }));
  }, []);

  const updateCertifications = useCallback((certifications: ResumeData['certifications']) => {
    setResumeData(prev => ({
      ...prev,
      certifications
    }));
  }, []);

  return (
    <ResumeContext.Provider value={{
      resumeData,
      selectedTemplate,
      updateResumeData,
      updatePersonalInfo,
      updateProfessionalSummary,
      updateExperience,
      updateEducation,
      updateSkills,
      updateProjects,
      updateCertifications,
      setSelectedTemplate,
    }}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResumeContext() {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResumeContext must be used within a ResumeProvider');
  }
  return context;
}
