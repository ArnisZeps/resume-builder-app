"use client";

import { useResumeContext, TemplateType } from './ResumeContext';
import { useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { templates, templateNames } from './templates';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export default function ResumePreview() {
  const { resumeData, selectedTemplate, setSelectedTemplate } = useResumeContext();
  const hiddenResumeRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const templateSelectorRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (templateSelectorRef.current && !templateSelectorRef.current.contains(event.target as Node)) {
        setShowTemplateSelector(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (templateSelectorRef.current && !templateSelectorRef.current.contains(event.target as Node)) {
        setShowTemplateSelector(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
      <div className="flex-shrink-0 p-4 border-b border-white/20">
        <div className="relative" ref={templateSelectorRef}>
          <button
            onClick={() => setShowTemplateSelector(!showTemplateSelector)}
            className="flex items-center justify-between w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all duration-200"
          >
            <span className="font-medium">Template: {templateNames[selectedTemplate]}</span>
            <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${showTemplateSelector ? 'rotate-180' : ''}`} />
          </button>

          {showTemplateSelector && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-sm border border-white/20 rounded-lg shadow-xl z-10">
              {Object.entries(templateNames).map(([key, name]) => (
                <button
                  key={key}
                  onClick={() => {
                    setSelectedTemplate(key as TemplateType);
                    setShowTemplateSelector(false);
                  }}
                  className={`w-full px-4 py-3 text-left transition-all duration-200 first:rounded-t-lg last:rounded-b-lg ${
                    selectedTemplate === key
                      ? 'bg-violet-600 text-white'
                      : 'hover:bg-gray-100 text-gray-800'
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

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
            className="max-w-full max-h-full shadow-2xl"
            style={{
              aspectRatio: '794/1123', 
              backgroundColor: 'white'
            }}
          />
        </div>
      </div>
    </div>
  );
}
