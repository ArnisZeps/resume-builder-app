"use client";

import { useResumeContext } from './ResumeContext';
import { useEffect, useRef, useState, useCallback } from 'react';
import html2canvas from 'html2canvas';
import { templates } from './templates';

export default function ResumePreview() {
  const { resumeData, selectedTemplate } = useResumeContext();
  const hiddenResumeRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const generateCanvas = useCallback(async () => {
    if (!hiddenResumeRef.current || !canvasRef.current) return;

    setIsGenerating(true);
    try {
      // First, capture the full content to determine total height
      const tempCanvas = await html2canvas(hiddenResumeRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        width: 794,
        height: hiddenResumeRef.current.scrollHeight,
      });

      const pageHeight = 1123 * 2; // Account for scale
      const contentHeight = tempCanvas.height;
      const calculatedPages = Math.max(1, Math.ceil(contentHeight / pageHeight));
      
      setTotalPages(calculatedPages);

      // Generate canvas for current page
      const yOffset = (currentPage - 1) * pageHeight;
      
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        canvasRef.current.width = 794;
        canvasRef.current.height = 1123;
        
        // Clear canvas
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, 794, 1123);
        
        // Draw the portion of content for current page
        ctx.drawImage(
          tempCanvas,
          0, yOffset, // Source x, y
          794 * 2, Math.min(pageHeight, contentHeight - yOffset), // Source width, height
          0, 0, // Destination x, y
          794, Math.min(1123, (contentHeight - yOffset) / 2) // Destination width, height
        );
      }
    } catch (error) {
      console.error('Error generating canvas:', error);
    } finally {
      setIsGenerating(false);
    }
  }, [currentPage]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      generateCanvas();
    }, 300); 

    return () => clearTimeout(timeoutId);
  }, [resumeData, selectedTemplate, currentPage, generateCanvas]);

  const SelectedTemplate = templates[selectedTemplate];

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <div
          ref={hiddenResumeRef}
          className="absolute -left-[9999px] top-0 bg-white"
          style={{
            width: '794px',
            height: 'auto',
            minHeight: '1123px',
            padding: '60px',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            overflow: 'visible'
          }}
        >
          <SelectedTemplate resumeData={resumeData} />
        </div>

        <div className="relative w-full h-full flex items-center justify-center">
          {isGenerating && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-10">
              <div className="text-gray-600">Generating preview...</div>
            </div>
          )}
          
          <canvas
            ref={canvasRef}
            className="max-w-full max-h-[calc(100vh-200px)] shadow-2xl"
            style={{
              aspectRatio: '794/1123', 
              backgroundColor: 'white',
            }}
          />
        </div>
      </div>
      
      <div className="flex-shrink-0 flex items-center justify-center p-4 border-t border-white/20">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage <= 1}
            className={`px-3 py-1 border border-white/20 rounded text-white text-sm transition-all ${
              currentPage <= 1 
                ? 'bg-white/10 opacity-50 cursor-not-allowed' 
                : 'bg-white/20 hover:bg-white/30 cursor-pointer'
            }`}
          >
            ← Previous
          </button>
          <span className="text-white/70 text-sm">Page {currentPage} of {totalPages}</span>
          <button 
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage >= totalPages}
            className={`px-3 py-1 border border-white/20 rounded text-white text-sm transition-all ${
              currentPage >= totalPages 
                ? 'bg-white/10 opacity-50 cursor-not-allowed' 
                : 'bg-white/20 hover:bg-white/30 cursor-pointer'
            }`}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
