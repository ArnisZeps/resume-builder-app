"use client";

import { useResumeContext, ResumeData } from './ResumeContext';
import { useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';

export default function ResumePreview() {
  const { resumeData } = useResumeContext();
  const hiddenResumeRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateCanvas = async () => {
    if (!hiddenResumeRef.current || !canvasRef.current) return;

    setIsGenerating(true);
    try {
      const canvas = await html2canvas(hiddenResumeRef.current, {
        scale: 2, // Higher quality
        useCORS: true,
        backgroundColor: '#ffffff',
        width: 794, // A4 width in pixels at 96 DPI
        height: 1123, // A4 height in pixels at 96 DPI
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
  }, [resumeData]);

  return (
    <div className="w-full h-full flex items-center justify-center ">
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
        <ResumeHtmlContent resumeData={resumeData} />
      </div>

      <div className="relative w-full h-full flex items-center justify-center">
        {isGenerating && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-10">
            <div className="text-gray-600">Generating preview...</div>
          </div>
        )}
        
        <canvas
          ref={canvasRef}
          className="max-w-full max-h-full shadow-2xl"
          style={{
            aspectRatio: '794/1123', 
            backgroundColor: 'white'
          }}
        />
      </div>
    </div>
  );
}

function ResumeHtmlContent({ resumeData }: { resumeData: ResumeData }) {
  return (
    <>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#111827', margin: '0 0 16px 0' }}>
          {resumeData.personalInfo.firstName} {resumeData.personalInfo.lastName}
        </h1>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px', fontSize: '14px', color: '#4B5563', marginBottom: '8px' }}>
          {resumeData.personalInfo.email && <span>{resumeData.personalInfo.email}</span>}
          {resumeData.personalInfo.phone && <span>{resumeData.personalInfo.phone}</span>}
          {resumeData.personalInfo.location && <span>{resumeData.personalInfo.location}</span>}
        </div>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px', fontSize: '14px', color: '#2563EB' }}>
          {resumeData.personalInfo.website && <span>{resumeData.personalInfo.website}</span>}
          {resumeData.personalInfo.linkedin && <span>{resumeData.personalInfo.linkedin}</span>}
          {resumeData.personalInfo.github && <span>{resumeData.personalInfo.github}</span>}
        </div>
      </div>

      {resumeData.professionalSummary && (
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#111827', marginBottom: '12px', paddingBottom: '4px', borderBottom: '2px solid #D1D5DB' }}>
            Professional Summary
          </h2>
          <p style={{ color: '#374151', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
            {resumeData.professionalSummary}
          </p>
        </div>
      )}

      {!resumeData.personalInfo.firstName && !resumeData.personalInfo.lastName && (
        <div style={{ textAlign: 'center', padding: '48px 0' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '500', color: '#111827', marginBottom: '8px' }}>Your Resume Preview</h3>
          <p style={{ color: '#6B7280', margin: 0 }}>
            Start filling out the form on the left to see your resume come to life!
          </p>
        </div>
      )}
    </>
  );
}
