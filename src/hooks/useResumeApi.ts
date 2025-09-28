"use client";

import { useState } from 'react';
import { ResumeData } from '../app/builder/_components/ResumeContext';
import { appwriteDatabase } from '@/lib/appwrite';

interface SaveResumeResponse {
  success: boolean;
  resumeId?: string;
  message?: string;
  error?: string;
}

interface UseResumeApiReturn {
  saveResume: (resumeData: ResumeData & { template: string, userId?: string }) => Promise<SaveResumeResponse>;
  updateResume: (resumeId: string, resumeData: ResumeData & { template: string }) => Promise<SaveResumeResponse>;
  getResume: (resumeId: string) => Promise<{ success: boolean; data?: ResumeData & { template: string; id: string }; error?: string }>;
  deleteResume: (resumeId: string) => Promise<{ success: boolean; message?: string; error?: string }>;
  isLoading: boolean;
  error: string | null;
}

const COLLECTIONS = {
  RESUMES: 'resume'
} as const;

export function useResumeApi(): UseResumeApiReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveResume = async (resumeData: ResumeData & { template: string, userId?: string }): Promise<SaveResumeResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      console.log('Saving resume data:', resumeData);

      const resumeDocument = {
        userId: resumeData.userId || 'temp_user',
        title: `${resumeData.personalInfo.firstName} ${resumeData.personalInfo.lastName} Resume`,
        resumeData: JSON.stringify({
          template: resumeData.template,
          personalInfo: resumeData.personalInfo,
          experience: resumeData.experience || [],
          education: resumeData.education || [],
          skills: resumeData.skills || [],
          projects: resumeData.projects || [],
          certifications: resumeData.certifications || []
        })
      } as Record<string, unknown>;

      const response = await appwriteDatabase.createDocument(
        COLLECTIONS.RESUMES, 
        resumeDocument
      );

      if (!response.success || !response.document) {
        throw new Error('Failed to create resume');
      }

      console.log('Resume saved successfully:', response.document.$id);
      
      return { 
        success: true, 
        resumeId: response.document.$id,
        message: 'Resume saved successfully' 
      };

    } catch (err) {
      console.error('Error saving resume:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to save resume';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const updateResume = async (resumeId: string, resumeData: ResumeData & { template: string }): Promise<SaveResumeResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      console.log('Updating resume:', resumeId, resumeData);

      const updateDocument = {
        title: `${resumeData.personalInfo.firstName} ${resumeData.personalInfo.lastName} Resume`,
        resumeData: JSON.stringify({
          template: resumeData.template,
          personalInfo: resumeData.personalInfo,
          experience: resumeData.experience || [],
          education: resumeData.education || [],
          skills: resumeData.skills || [],
          projects: resumeData.projects || [],
          certifications: resumeData.certifications || []
        })
      } as Record<string, unknown>;

      const response = await appwriteDatabase.updateDocument(
        COLLECTIONS.RESUMES,
        resumeId,
        updateDocument
      );

      if (!response.success) {
        throw new Error('Failed to update resume');
      }

      console.log('Resume updated successfully:', resumeId);

      return {
        success: true,
        resumeId,
        message: 'Resume updated successfully'
      };

    } catch (err) {
      console.error('Error updating resume:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to update resume';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const getResume = async (resumeId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      console.log('Fetching resume:', resumeId);

      const response = await appwriteDatabase.getDocument(
        COLLECTIONS.RESUMES,
        resumeId
      );

      if (!response.success || !response.document) {
        throw new Error('Failed to fetch resume');
      }

      const doc = response.document;
      console.log('Resume fetched successfully:', doc);

      const parsedResumeData = doc.resumeData ? JSON.parse(doc.resumeData) : {};

      const resumeData: ResumeData & { template: string; id: string } = {
        id: doc.$id,
        template: parsedResumeData.template || 'classic',
        personalInfo: parsedResumeData.personalInfo || {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          location: '',
          website: '',
          linkedin: '',
          github: '',
          professionalSummary: ''
        },
        experience: parsedResumeData.experience || [],
        education: parsedResumeData.education || [],
        skills: parsedResumeData.skills || [],
        projects: parsedResumeData.projects || [],
        certifications: parsedResumeData.certifications || []
      };

      return {
        success: true,
        data: resumeData
      };

    } catch (err) {
      console.error('Error fetching resume:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch resume';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const deleteResume = async (resumeId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      console.log('Deleting resume:', resumeId);

      const response = await appwriteDatabase.deleteDocument(
        COLLECTIONS.RESUMES,
        resumeId
      );

      if (!response.success) {
        throw new Error('Failed to delete resume');
      }

      console.log('Resume deleted successfully');

      return {
        success: true,
        message: 'Resume deleted successfully'
      };

    } catch (err) {
      console.error('Error deleting resume:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete resume';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    saveResume,
    updateResume,
    getResume,
    deleteResume,
    isLoading,
    error,
  };
}
