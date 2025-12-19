"use client";

import { useResumeContext } from './ResumeContext';
import { useEffect, useRef, useState, useMemo } from 'react';
import { templates } from './templates';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';

export default function ResumePreview() {
  const { resumeData, selectedTemplate } = useResumeContext();
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pages, setPages] = useState<string[]>([]);
  const [isDownloading, setIsDownloading] = useState(false);

  // A4 dimensions in pixels at 96 DPI
  const A4_WIDTH = 794;
  const A4_HEIGHT = 1123;
  const PADDING = 60;
  const CONTENT_HEIGHT = A4_HEIGHT - (PADDING * 2);

  // Calculate scale to fit container width
  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const scaleX = Math.min((containerWidth - 40) / A4_WIDTH, 1);
        setScale(scaleX);
      }
    };

    updateScale();
    const resizeObserver = new ResizeObserver(updateScale);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  // Intelligent pagination: measure content and split into pages
  useEffect(() => {
    if (!contentRef.current) return;

    const timer = setTimeout(() => {
      const elements = Array.from(contentRef.current!.children) as HTMLElement[];
      const pageContents: string[] = [];
      let currentPageContent: HTMLElement[] = [];
      let currentHeight = 0;

      elements.forEach((element) => {
        const elementHeight = element.offsetHeight;
        
        // If adding this element exceeds page height, start new page
        if (currentHeight + elementHeight > CONTENT_HEIGHT && currentPageContent.length > 0) {
          // Save current page
          pageContents.push(
            currentPageContent.map(el => el.outerHTML).join('')
          );
          
          // Start new page with current element
          currentPageContent = [element];
          currentHeight = elementHeight;
        } else {
          // Add to current page
          currentPageContent.push(element);
          currentHeight += elementHeight;
        }
      });

      // Add last page if it has content
      if (currentPageContent.length > 0) {
        pageContents.push(
          currentPageContent.map(el => el.outerHTML).join('')
        );
      }

      setPages(pageContents.length > 0 ? pageContents : ['']);
      setTotalPages(Math.max(pageContents.length, 1));
      
      // Reset to page 1 if current page is out of bounds
      if (currentPage > pageContents.length) {
        setCurrentPage(1);
      }
    }, 100); // Debounce to avoid excessive recalculation

    return () => clearTimeout(timer);
  }, [resumeData, selectedTemplate, CONTENT_HEIGHT]);

  const handleDownload = () => {
    setIsDownloading(true);
    
    try {
      const iframe = document.createElement('iframe');
      iframe.style.position = 'absolute';
      iframe.style.width = '0';
      iframe.style.height = '0';
      iframe.style.border = 'none';
      document.body.appendChild(iframe);
      
      const iframeDoc = iframe.contentWindow?.document;
      if (!iframeDoc) return;
      
      const allPagesContent = pages.map((pageContent, index) => `
        <div class="resume-page" style="page-break-after: ${index < pages.length - 1 ? 'always' : 'auto'};">
          ${pageContent}
        </div>
      `).join('');
      
      const firstName = resumeData.personalInfo.firstName || 'Resume';
      const lastName = resumeData.personalInfo.lastName || '';
      
      iframeDoc.open();
      iframeDoc.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <title>${firstName}_${lastName}_Resume</title>
            <style>
              * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
              }
              
              body {
                font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                background: white;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }
              
              .resume-page {
                width: 794px;
                height: 1123px;
                padding: 60px;
                margin: 0 auto;
                background: white;
                position: relative;
              }
              
              @page {
                size: A4;
                margin: 0;
              }
              
              @media print {
                body {
                  margin: 0;
                  padding: 0;
                }
                
                .resume-page {
                  width: 100%;
                  height: 100vh;
                  margin: 0;
                }
              }
            </style>
          </head>
          <body>
            ${allPagesContent}
          </body>
        </html>
      `);
      iframeDoc.close();
      
      setTimeout(() => {
        iframe.contentWindow?.print();
        setTimeout(() => {
          document.body.removeChild(iframe);
          setIsDownloading(false);
        }, 100);
      }, 250);
      
    } catch (error) {
      console.error('Error downloading PDF:', error);
      setIsDownloading(false);
    }
  };

  const SelectedTemplate = templates[selectedTemplate];

  return (
    <div className="w-full h-full flex flex-col">
      {/* Hidden content for measurement */}
      <div
        style={{
          position: 'absolute',
          left: '-9999px',
          width: `${A4_WIDTH - (PADDING * 2)}px`,
        }}
      >
        <div ref={contentRef}>
          <SelectedTemplate resumeData={resumeData} />
        </div>
      </div>

      {/* Download Button */}
      <div className="flex-shrink-0 p-4 border-b border-white/20">
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
            isDownloading
              ? 'bg-gray-600 cursor-not-allowed text-gray-400'
              : 'bg-yellow-400 hover:bg-yellow-300 text-violet-900 hover:shadow-lg'
          }`}
        >
          <ArrowDownTrayIcon className="w-5 h-5" />
          {isDownloading ? 'Preparing PDF...' : 'Download as PDF'}
        </button>
      </div>

      {/* Preview Area */}
      <div 
        ref={containerRef}
        className="flex-1 flex items-center justify-center p-4"
      >
        <div
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'center',
            transition: 'transform 0.2s ease-out',
          }}
        >
          {/* A4 Page */}
          <div
            className="shadow-2xl"
            style={{
              width: `${A4_WIDTH}px`,
              height: `${A4_HEIGHT}px`,
              backgroundColor: 'white',
              padding: `${PADDING}px`,
              boxSizing: 'border-box',
              overflow: 'hidden',
              fontFamily: 'system-ui, -apple-system, sans-serif',
            }}
            dangerouslySetInnerHTML={{ __html: pages[currentPage - 1] || '' }}
          />
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex-shrink-0 flex items-center justify-center gap-4 p-4 border-t border-white/20">
        <button
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage <= 1}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            currentPage <= 1
              ? 'bg-white/10 text-white/30 cursor-not-allowed'
              : 'bg-white/20 text-white hover:bg-white/30'
          }`}
        >
          ← Previous
        </button>
        
        <span className="text-white/80 font-medium">
          Page {currentPage} of {totalPages}
        </span>
        
        <button
          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          disabled={currentPage >= totalPages}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            currentPage >= totalPages
              ? 'bg-white/10 text-white/30 cursor-not-allowed'
              : 'bg-white/20 text-white hover:bg-white/30'
          }`}
        >
          Next →
        </button>
      </div>
    </div>
  );
}
