"use client";

import { useResumeContext } from './ResumeContext';
import { useEffect, useRef } from 'react';
import { templates } from './templates';
import { usePDFGenerator } from '@/hooks/usePDFGenerator';

export default function ResumePreview() {
  const { resumeData, selectedTemplate } = useResumeContext();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { generatePDF, isGenerating: isPDFGenerating, error: pdfError } = usePDFGenerator();

  useEffect(() => {
    if (!iframeRef.current) return;

    const SelectedTemplate = templates[selectedTemplate];
    
    // Create the HTML content for the iframe
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            * { 
              box-sizing: border-box; 
              margin: 0;
              padding: 0;
            }
            body { 
              margin: 0; 
              padding: 40px;
              font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
              line-height: 1.4;
              color: #333;
              background: white;
              width: 794px;
              min-height: 1123px;
            }
            @media print {
              body { margin: 0; padding: 20px; }
            }
          </style>
        </head>
        <body>
          <div id="resume-root"></div>
          <script type="module">
            // We'll inject the rendered HTML here
          </script>
        </body>
      </html>
    `;

    // Write the HTML to the iframe
    const iframe = iframeRef.current;
    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (doc) {
      doc.open();
      doc.write(htmlContent);
      doc.close();

      // Render the React component to string and inject it
      // We'll do this by creating a temporary div and using React to render into it
      const tempDiv = document.createElement('div');
      const root = doc.getElementById('resume-root');
      if (root) {
        // For now, let's use a simple approach - we'll improve this
        root.innerHTML = `
          <div style="text-align: center; padding: 60px; color: #666;">
            <h2>Resume Preview</h2>
            <p>Template: ${selectedTemplate}</p>
            <p>Name: ${resumeData.personalInfo.firstName} ${resumeData.personalInfo.lastName}</p>
            <p style="margin-top: 20px; font-size: 14px;">
              Use the "Download PDF" button above to generate the full resume with Puppeteer.
            </p>
          </div>
        `;
      }
    }
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
        <div className="w-full h-full max-w-4xl">
          <iframe
            ref={iframeRef}
            className="w-full h-full border-0 shadow-2xl"
            style={{
              aspectRatio: '794/1123',
              maxHeight: 'calc(100vh - 200px)',
              backgroundColor: 'white',
            }}
            title="Resume Preview"
          />
        </div>
      </div>
      
      {/* Info */}
      <div className="flex-shrink-0 flex items-center justify-center p-4 border-t border-white/20">
        <div className="text-white/70 text-sm text-center">
          Click "Download PDF" to generate your resume with perfect formatting
        </div>
      </div>
    </div>
  );
}