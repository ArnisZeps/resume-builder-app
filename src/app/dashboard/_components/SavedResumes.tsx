"use client";

import { useState, useEffect } from 'react';
import { useResumeApi } from '@/hooks/useResumeApi';
import { appwriteAuth } from '@/lib/appwrite';
import Link from 'next/link';
import { DocumentIcon, PencilIcon, TrashIcon, DocumentDuplicateIcon, EyeIcon } from '@heroicons/react/24/outline';

interface Resume {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  template: string;
}

export default function SavedResumes() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const { getUserResumes, deleteResume, testListDocuments, isLoading, error } = useResumeApi();
  console.log('SavedResumes render - resumes:', resumes, 'isLoading:', isLoading, 'error:', error);

  const handleTestQuery = async () => {
    console.log('Testing direct query...');
    const result = await testListDocuments();
    console.log('Test result:', result);
  };
  useEffect(() => {
    const loadUserAndResumes = async () => {
      try {
        // Get current user
        const userResponse = await appwriteAuth.getCurrentUser();
        if (userResponse.success && userResponse.user) {
          // Load user's resumes
          console.log('Current user:', userResponse.user);
          const resumesResponse = await getUserResumes(userResponse.user.$id);
          if (resumesResponse.success && resumesResponse.data) {
            setResumes(resumesResponse.data);
          }
        }
      } catch (err) {
        console.error('Error loading user resumes:', err);
      }
    };

    loadUserAndResumes();
  }, [getUserResumes]);

  const handleDeleteResume = async (resumeId: string, resumeTitle: string) => {
    if (!confirm(`Are you sure you want to delete "${resumeTitle}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const response = await deleteResume(resumeId);
      if (response.success) {
        // Remove from local state
        setResumes(prev => prev.filter(resume => resume.id !== resumeId));
      } else {
        alert('Failed to delete resume. Please try again.');
      }
    } catch (err) {
      console.error('Error deleting resume:', err);
      alert('An error occurred while deleting the resume.');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getTemplateColor = (template: string) => {
    switch (template) {
      case 'modern':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'minimal':
        return 'bg-gray-50 text-gray-700 border-gray-200';
      default:
        return 'bg-green-50 text-green-700 border-green-200';
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-white/20">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          <span className="ml-3 text-white">Loading resumes...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-white/20">
        <div className="text-center py-12">
          <DocumentIcon className="mx-auto h-12 w-12 text-red-400" />
          <h3 className="mt-2 text-sm font-medium text-white">Error loading resumes</h3>
          <p className="mt-1 text-sm text-white/80">{error}</p>
        </div>
      </div>
    );
  }

  if (resumes.length === 0) {
    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-white/20">
        <div className="text-center py-12">
          <DocumentIcon className="mx-auto h-12 w-12 text-white/60" />
          <h3 className="mt-2 text-sm font-medium text-white">No resumes yet</h3>
          <p className="mt-1 text-sm text-white/80">Get started by creating your first resume</p>
          <div className="mt-6">
            <Link href="/builder">
              <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-violet-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500">
                Create Resume
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-white/20">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white mb-2">My Resumes</h2>
        <p className="text-white/80">Manage your saved resumes</p>
        <button 
          onClick={handleTestQuery}
          className="mt-2 px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
        >
          Test Database Connection
        </button>
      </div>

      <div className="space-y-4">
        {resumes.map((resume) => (
          <div
            key={resume.id}
            className="bg-white/20 rounded-xl p-4 border border-white/30 hover:bg-white/25 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <DocumentIcon className="h-5 w-5 text-white/80" />
                  <h3 className="font-semibold text-white truncate">{resume.title}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getTemplateColor(resume.template)}`}>
                    {resume.template}
                  </span>
                </div>
                <div className="text-sm text-white/70">
                  <p>Created: {formatDate(resume.createdAt)}</p>
                  <p>Updated: {formatDate(resume.updatedAt)}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 ml-4">
                <Link href={`/builder?resumeId=${resume.id}`}>
                  <button
                    className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-colors"
                    title="Edit Resume"
                  >
                    <PencilIcon className="h-4 w-4" />
                  </button>
                </Link>
                
                <button
                  className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-colors"
                  title="Preview Resume"
                  onClick={() => {
                    // TODO: Implement preview functionality
                    alert('Preview functionality coming soon!');
                  }}
                >
                  <EyeIcon className="h-4 w-4" />
                </button>
                
                <button
                  className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-colors"
                  title="Duplicate Resume"
                  onClick={() => {
                    // TODO: Implement duplicate functionality
                    alert('Duplicate functionality coming soon!');
                  }}
                >
                  <DocumentDuplicateIcon className="h-4 w-4" />
                </button>
                
                <button
                  onClick={() => handleDeleteResume(resume.id, resume.title)}
                  className="p-2 text-red-300 hover:text-red-200 hover:bg-red-500/20 rounded-lg transition-colors"
                  title="Delete Resume"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-white/20">
        <Link href="/builder">
          <button className="w-full bg-white text-violet-700 font-semibold py-2 px-4 rounded-lg hover:bg-violet-50 transition-colors">
            Create New Resume
          </button>
        </Link>
      </div>
    </div>
  );
}