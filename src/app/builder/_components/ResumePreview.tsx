"use client";

import { useResumeContext } from './ResumeContext';
import { useEffect, useRef, useState } from 'react';
import { usePDFGenerator } from '@/hooks/usePDFGenerator';

export default function ResumePreview() {
  const { resumeData, selectedTemplate } = useResumeContext();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [htmlUrl, setHtmlUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const { generatePDF, isGenerating: isPDFGenerating, error: pdfError } = usePDFGenerator();

  useEffect(() => {
    const updatePreview = () => {
      setIsLoading(true);
      
      // Create new URL for the resume page
      const resumeDataParam = encodeURIComponent(JSON.stringify(resumeData));
      const newUrl = `/resume-html?data=${resumeDataParam}&template=${selectedTemplate}`;
      
      setHtmlUrl(newUrl);
      setIsLoading(false);
    };

    const timeoutId = setTimeout(() => {
      updatePreview();
    }, 300);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [resumeData, selectedTemplate]);

  const handleDownloadPDF = async () => {
    const success = await generatePDF(resumeData, selectedTemplate, {
      filename: `${resumeData.personalInfo.firstName}_${resumeData.personalInfo.lastName}_Resume.pdf`,
      format: 'A4',
      margin: {
        top: '0.5in',
        right: '0.5in',
        bottom: '0.5in',
        left: '0.5in'
      },
      scale: 0.8
    });
    
    if (!success && pdfError) {
      alert(`Failed to generate PDF: ${pdfError}`);
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* PDF Download Button */}
      <div className="flex-shrink-0 p-4 border-b border-white/20">
        <div className="flex items-center justify-center">
          <button
            onClick={handleDownloadPDF}
            disabled={isPDFGenerating}
            className={`px-6 py-2 rounded-lg font-medium text-sm transition-all ${
              isPDFGenerating
                ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isPDFGenerating ? 'Generating PDF...' : 'Download PDF'}
          </button>
        </div>
        {pdfError && (
          <div className="mt-2 text-center text-red-400 text-sm">
            Error: {pdfError}
          </div>
        )}
      </div>
      
      {/* Preview Area */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full h-full max-w-4xl relative">
          {isLoading && (
            <div className="flex items-center justify-center h-full">
              <div className="text-white/70">Loading preview...</div>
            </div>
          )}
          
          {htmlUrl && !isLoading && (
            <div 
              className="relative w-full h-full select-none"
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
            >
              <iframe
                ref={iframeRef}
                src={htmlUrl}
                className="w-full h-full border-0 shadow-2xl pointer-events-auto"
                style={{
                  aspectRatio: '794/1123',
                  maxHeight: 'calc(100vh - 200px)',
                  backgroundColor: 'white',
                }}
                title="Resume Preview"
                sandbox="allow-same-origin"
                onContextMenu={(e) => e.preventDefault()}
              />
              {/* Invisible overlay to prevent right-click on iframe border */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{ zIndex: 1 }}
                onContextMenu={(e) => e.preventDefault()}
              />
            </div>
          )}
        </div>
      </div>
      
      {/* Info */}
      <div className="flex-shrink-0 flex items-center justify-center p-4 border-t border-white/20">
        <div className="text-white/70 text-sm text-center">
          Live preview • Click &quot;Download PDF&quot; for perfect formatting
        </div>
      </div>
    </div>
  );
}
