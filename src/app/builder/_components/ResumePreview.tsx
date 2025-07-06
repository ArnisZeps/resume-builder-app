"use client";

import { useResumeContext } from './ResumeContext';
import { useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { templates } from './templates';

export default function ResumePreview() {
  const { resumeData, selectedTemplate } = useResumeContext();
  const hiddenResumeRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateCanvas = async () => {
    if (!hiddenResumeRef.current || !canvasRef.current) return;

    setIsGenerating(true);
    try {
      const canvas = await html2canvas(hiddenResumeRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        width: 794,
        height: 1123,
      });

      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        canvasRef.current.width = 794;
        canvasRef.current.height = 1123;
        ctx.drawImage(canvas, 0, 0, 794, 1123);
      }
    } catch (error) {
      console.error('Error generating canvas:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      generateCanvas();
    }, 300); 

    return () => clearTimeout(timeoutId);
  }, [resumeData, selectedTemplate]);

  const SelectedTemplate = templates[selectedTemplate];

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <div
          ref={hiddenResumeRef}
          className="absolute -left-[9999px] top-0 bg-white"
          style={{
            width: '794px',
            height: '1123px',
            padding: '60px',
            fontFamily: 'system-ui, -apple-system, sans-serif'
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
          <button className="px-3 py-1 bg-white/10 border border-white/20 rounded text-white text-sm opacity-50 cursor-not-allowed">
            ← Previous
          </button>
          <span className="text-white/70 text-sm">Page 1 of 1</span>
          <button className="px-3 py-1 bg-white/10 border border-white/20 rounded text-white text-sm opacity-50 cursor-not-allowed">
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
