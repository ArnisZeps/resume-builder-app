"use client";

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

export interface ResumeData {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    linkedin: string;
    github: string;
  };
  professionalSummary: string;
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

interface ResumeContextType {
  resumeData: ResumeData;
  updateResumeData: (data: Partial<ResumeData>) => void;
  updatePersonalInfo: (data: Partial<ResumeData['personalInfo']>) => void;
  updateProfessionalSummary: (summary: string) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({ children }: { children: ReactNode }) {
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
    },
    professionalSummary: '',
    experience: [
      {
        jobTitle: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        responsibilities: [''],
      },
    ],
    education: [
      {
        degree: '',
        institution: '',
        location: '',
        graduationDate: '',
        gpa: '',
      },
    ],
    skills: [
      {
        category: '',
        items: [''],
      },
    ],
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
      professionalSummary: summary
    }));
  }, []);

  return (
    <ResumeContext.Provider value={{
      resumeData,
      updateResumeData,
      updatePersonalInfo,
      updateProfessionalSummary,
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
