"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useResumeApi } from '@/hooks/useResumeApi';
import { useResumeContext, TemplateType } from './ResumeContext';

export function useResumeLoader() {
  const searchParams = useSearchParams();
  const { getResume } = useResumeApi();
  const { updateResumeData, setSelectedTemplate } = useResumeContext();
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
            experience: response.data.experience,
            education: response.data.education,
            skills: response.data.skills,
            projects: response.data.projects,
            certifications: response.data.certifications,
          });
          setSelectedTemplate(response.data.template as TemplateType);
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
  }, [resumeId, getResume, updateResumeData, setSelectedTemplate]);

  return { 
    resumeId, 
    isEditing: !!resumeId, 
    isLoadingResume,
    loadError,
    hasLoadedResume
  };
}