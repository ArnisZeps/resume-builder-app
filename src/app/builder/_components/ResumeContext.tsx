"use client";

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

import type { ResumeStyleSettings } from './templates/templateKit';
import { DEFAULT_STYLE_SETTINGS } from './templates/templateKit';

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
    photoFileId?: string;
  };
  /** Global section order used by templates (sidebar templates filter this list per region). */
  sectionOrder?: SectionKey[];
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

export const TEMPLATE_KEYS = [
  'aster',
  'birch',
  'cipher',
  'dune',
  'eon',
  'fjord',
  'grove',
  'halo',
  'ivory',
  'juniper',
  'lumen',
  'mosaic',
  'nova',
  'sable',
  'vale',
] as const;
export type TemplateType = (typeof TEMPLATE_KEYS)[number];

export function isTemplateType(value: unknown): value is TemplateType {
  return typeof value === 'string' && (TEMPLATE_KEYS as readonly string[]).includes(value);
}

export const SECTION_KEYS = [
  'summary',
  'experience',
  'projects',
  'education',
  'skills',
  'certifications',
] as const;
export type SectionKey = (typeof SECTION_KEYS)[number];

export function normalizeSectionOrder(input: unknown): SectionKey[] {
  if (!Array.isArray(input)) return [...SECTION_KEYS];
  const allowed = new Set<string>(SECTION_KEYS);
  const filtered = input.filter((x) => typeof x === 'string' && allowed.has(x)) as SectionKey[];

  // Ensure all keys exist exactly once.
  const seen = new Set<SectionKey>();
  const unique = filtered.filter((k) => (seen.has(k) ? false : (seen.add(k), true)));
  for (const k of SECTION_KEYS) {
    if (!seen.has(k)) unique.push(k);
  }
  return unique;
}

interface ResumeContextType {
  resumeData: ResumeData;
  selectedTemplate: TemplateType;
  styleSettings: ResumeStyleSettings;
  updateResumeData: (data: Partial<ResumeData>) => void;
  updatePersonalInfo: (data: Partial<ResumeData['personalInfo']>) => void;
  updateProfessionalSummary: (summary: string) => void;
  updateExperience: (experience: ResumeData['experience']) => void;
  updateEducation: (education: ResumeData['education']) => void;
  updateSkills: (skills: ResumeData['skills']) => void;
  updateProjects: (projects: ResumeData['projects']) => void;
  updateCertifications: (certifications: ResumeData['certifications']) => void;
  updateStyleSettings: (settings: Partial<ResumeStyleSettings>) => void;
  setStyleSettings: (settings: ResumeStyleSettings) => void;
  setSelectedTemplate: (template: TemplateType) => void;
  setSectionOrder: (order: SectionKey[]) => void;
  moveSectionInOrder: (section: SectionKey, direction: 'up' | 'down', scope: 'all' | 'main' | 'sidebar', sidebarSections: readonly SectionKey[]) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>('aster');
  const [styleSettings, setStyleSettings] = useState<ResumeStyleSettings>(DEFAULT_STYLE_SETTINGS);
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
      photoFileId: undefined,
    },
    sectionOrder: [...SECTION_KEYS],
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
  });

  const updateResumeData = useCallback((data: Partial<ResumeData>) => {
    setResumeData(prev => ({ ...prev, ...data }));
  }, []);

  const setSectionOrder = useCallback((order: SectionKey[]) => {
    setResumeData((prev) => ({ ...prev, sectionOrder: normalizeSectionOrder(order) }));
  }, []);

  const moveSectionInOrder = useCallback(
    (section: SectionKey, direction: 'up' | 'down', scope: 'all' | 'main' | 'sidebar', sidebarSections: readonly SectionKey[]) => {
      setResumeData((prev) => {
        const current = normalizeSectionOrder(prev.sectionOrder);
        if (scope === 'all') {
          const idx = current.indexOf(section);
          if (idx < 0) return prev;
          const nextIdx = direction === 'up' ? idx - 1 : idx + 1;
          if (nextIdx < 0 || nextIdx >= current.length) return prev;
          const next = [...current];
          [next[idx], next[nextIdx]] = [next[nextIdx], next[idx]];
          return { ...prev, sectionOrder: next };
        }

        const sidebarSet = new Set<SectionKey>(sidebarSections);
        const region = scope === 'sidebar' ? 'sidebar' : 'main';
        const regionKeys = current.filter((k) => (region === 'sidebar' ? sidebarSet.has(k) : !sidebarSet.has(k)));
        const regionIdx = regionKeys.indexOf(section);
        if (regionIdx < 0) return prev;
        const neighborIdx = direction === 'up' ? regionIdx - 1 : regionIdx + 1;
        if (neighborIdx < 0 || neighborIdx >= regionKeys.length) return prev;
        const neighbor = regionKeys[neighborIdx];

        const a = current.indexOf(section);
        const b = current.indexOf(neighbor);
        if (a < 0 || b < 0) return prev;
        const next = [...current];
        [next[a], next[b]] = [next[b], next[a]];
        return { ...prev, sectionOrder: next };
      });
    },
    [],
  );

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

  const updateStyleSettings = useCallback((settings: Partial<ResumeStyleSettings>) => {
    setStyleSettings(prev => ({ ...prev, ...settings }));
  }, []);

  const setStyleSettingsValue = useCallback((settings: ResumeStyleSettings) => {
    setStyleSettings(settings);
  }, []);

  return (
    <ResumeContext.Provider value={{
      resumeData,
      selectedTemplate,
      styleSettings,
      updateResumeData,
      updatePersonalInfo,
      updateProfessionalSummary,
      updateExperience,
      updateEducation,
      updateSkills,
      updateProjects,
      updateCertifications,
      updateStyleSettings,
      setStyleSettings: setStyleSettingsValue,
      setSelectedTemplate,
      setSectionOrder,
      moveSectionInOrder,
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
