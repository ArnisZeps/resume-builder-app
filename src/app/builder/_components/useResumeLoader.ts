"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useResumeApi } from '@/hooks/useResumeApi';
import { normalizeSectionOrder, useResumeContext } from './ResumeContext';
import { DEFAULT_STYLE_SETTINGS, normalizeStyleSettings } from './templates/templateKit';
import { migrateTemplateKey } from './templates';

export function useResumeLoader() {
  const searchParams = useSearchParams();
  const { getResume } = useResumeApi();
  const { updateResumeData, setSelectedTemplate, setStyleSettings, setSectionOrder } = useResumeContext();
  const [isLoadingResume, setIsLoadingResume] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [hasLoadedResume, setHasLoadedResume] = useState(false);
  const resumeId = searchParams.get('resumeId');

  useEffect(() => {
    const loadResume = async () => {
      if (!resumeId) return;

      setIsLoadingResume(true);
      setLoadError(null);

      try {
        const response = await getResume(resumeId);
        
        if (response.success && response.data) {
          updateResumeData({
            personalInfo: {
              ...response.data.personalInfo,
            },
            sectionOrder: normalizeSectionOrder(response.data.sectionOrder),
            experience: response.data.experience,
            education: response.data.education,
            skills: response.data.skills,
            projects: response.data.projects,
            certifications: response.data.certifications,
          });
          setSelectedTemplate(migrateTemplateKey(response.data.template));

          setSectionOrder(normalizeSectionOrder(response.data.sectionOrder));

          const nextStyleSettings = response.data.styleSettings ? normalizeStyleSettings(response.data.styleSettings) : DEFAULT_STYLE_SETTINGS;
          setStyleSettings(nextStyleSettings);

          setHasLoadedResume(true);
        } else {
          const errorMsg = response.error || 'Failed to load resume';
          console.error('Failed to load resume:', errorMsg);
          setLoadError(errorMsg);
        }
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Error loading resume';
        console.error('Error loading resume:', error);
        setLoadError(errorMsg);
      } finally {
        setIsLoadingResume(false);
      }
    };

    loadResume();
  }, [resumeId, getResume, updateResumeData, setSelectedTemplate, setStyleSettings, setSectionOrder]);

  return { 
    resumeId, 
    isEditing: !!resumeId, 
    isLoadingResume,
    loadError,
    hasLoadedResume
  };
}