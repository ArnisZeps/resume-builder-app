"use client";

import { useState, useCallback } from 'react';
import { ResumeData } from '../app/builder/_components/ResumeContext';
import type { ResumeStyleSettings } from '../app/builder/_components/templates/templateKit';
import { normalizeStyleSettings } from '../app/builder/_components/templates/templateKit';
import { appwriteDatabase, Query } from '@/lib/appwrite';

interface SaveResumeResponse {
  success: boolean;
  resumeId?: string;
  message?: string;
  error?: string;
}

interface UseResumeApiReturn {
  saveResume: (resumeData: ResumeData & { template: string; styleSettings?: ResumeStyleSettings; userId?: string }) => Promise<SaveResumeResponse>;
  updateResume: (resumeId: string, resumeData: ResumeData & { template: string; styleSettings?: ResumeStyleSettings }) => Promise<SaveResumeResponse>;
  getResume: (resumeId: string) => Promise<{ success: boolean; data?: ResumeData & { template: string; styleSettings?: ResumeStyleSettings; id: string }; error?: string }>;
  getUserResumes: (userId: string) => Promise<{ success: boolean; data?: Array<{ id: string; title: string; createdAt: string; updatedAt: string; template: string }>; error?: string }>;
  testListDocuments: () => Promise<{ success: boolean; data?: unknown; error?: string }>;
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

  const saveResume = useCallback(async (resumeData: ResumeData & { template: string; styleSettings?: ResumeStyleSettings; userId?: string }): Promise<SaveResumeResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      const resumeDocument = {
        userId: resumeData.userId || 'temp_user',
        title: `${resumeData.personalInfo.firstName} ${resumeData.personalInfo.lastName} Resume`,
        resumeData: JSON.stringify({
          template: resumeData.template,
          styleSettings: resumeData.styleSettings,
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
  }, []);

  const updateResume = useCallback(async (resumeId: string, resumeData: ResumeData & { template: string; styleSettings?: ResumeStyleSettings }): Promise<SaveResumeResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      const updateDocument = {
        title: `${resumeData.personalInfo.firstName} ${resumeData.personalInfo.lastName} Resume`,
        resumeData: JSON.stringify({
          template: resumeData.template,
          styleSettings: resumeData.styleSettings,
          personalInfo: resumeData.personalInfo,
          experience: resumeData.experience || [],
          education: resumeData.education || [],
          skills: resumeData.skills || [],
          projects: resumeData.projects || [],
          certifications: resumeData.certifications || []
        })
      } as Record<string, unknown>;
      console.log('Updating resume with data:', updateDocument);
      const response = await appwriteDatabase.updateDocument(
        COLLECTIONS.RESUMES,
        resumeId,
        updateDocument
      );

      if (!response.success) {
        throw new Error('Failed to update resume');
      }

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
  }, []);

  const getResume = useCallback(async (resumeId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await appwriteDatabase.getDocument(
        COLLECTIONS.RESUMES,
        resumeId
      );

      if (!response.success || !response.document) {
        throw new Error('Failed to fetch resume');
      }

      const doc = response.document;
      const parsedResumeData = doc.resumeData ? JSON.parse(doc.resumeData) : {};
      const resumeData: ResumeData & { template: string; styleSettings?: ResumeStyleSettings; id: string } = {
        id: doc.$id,
        template: parsedResumeData.template || 'classic',
        styleSettings: parsedResumeData.styleSettings ? normalizeStyleSettings(parsedResumeData.styleSettings) : undefined,
        personalInfo: parsedResumeData.personalInfo || {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          location: '',
          website: '',
          linkedin: '',
          github: '',
        },
        professionalSummary: parsedResumeData.professionalSummary || '',
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
  }, []);

  const getUserResumes = useCallback(async (userId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await appwriteDatabase.listDocuments(
        COLLECTIONS.RESUMES,
        [Query.equal('userId', userId)]
      );


      if (!response.success) {
        console.error('Database query failed:', response.error);
        throw new Error(response.error || 'Failed to fetch user resumes');
      }

      if (!response.documents) {
        console.warn('No documents returned, but query was successful');
        return {
          success: true,
          data: []
        };
      }

      // Transform documents to summary format
      const resumes = response.documents.map(doc => {
        let template = 'classic';
        
        // Try to extract template from resumeData JSON
        try {
          if (doc.resumeData) {
            const parsedData = JSON.parse(doc.resumeData);
            template = parsedData.template || 'classic';
          }
        } catch (e) {
          console.warn('Failed to parse resumeData for template:', e);
        }

        return {
          id: doc.$id,
          title: doc.title || 'Untitled Resume',
          createdAt: doc.$createdAt || new Date().toISOString(),
          updatedAt: doc.$updatedAt || new Date().toISOString(),
          template
        };
      });

      return {
        success: true,
        data: resumes
      };

    } catch (err) {
      console.error('Error fetching user resumes:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch user resumes';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const testListDocuments = useCallback(async () => {
    try {
      const response = await appwriteDatabase.listDocuments(COLLECTIONS.RESUMES);
      return {
        success: true,
        data: response
      };
    } catch (err) {
      console.error('Test error:', err);
      return {
        success: false,
        error: err instanceof Error ? err.message : 'Test failed'
      };
    }
  }, []);

  const deleteResume = useCallback(async (resumeId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await appwriteDatabase.deleteDocument(
        COLLECTIONS.RESUMES,
        resumeId
      );

      if (!response.success) {
        throw new Error('Failed to delete resume');
      }

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
  }, []);

  return {
    saveResume,
    updateResume,
    getResume,
    getUserResumes,
    testListDocuments,
    deleteResume,
    isLoading,
    error,
  };
}
