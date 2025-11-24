import { generatePDFFromHTML, PDFGenerationOptions } from './pdfGenerator';

export interface ResumeGenerationOptions extends PDFGenerationOptions {
  filename?: string;
}

export async function generateResumePDF(
  resumeHTML: string,
  options: ResumeGenerationOptions = {}
): Promise<Uint8Array> {
  // Generate PDF using Puppeteer
  const pdfBuffer = await generatePDFFromHTML(resumeHTML, {
    format: 'A4',
    margin: {
      top: '0.5in',
      right: '0.5in',
      bottom: '0.5in',
      left: '0.5in'
    },
    printBackground: true,
    scale: 0.8, // Slightly smaller to fit nicely on page
    ...options
  });

  return pdfBuffer;
}

export function downloadPDF(pdfBuffer: Uint8Array, filename: string = 'resume.pdf') {
  // Create blob from buffer
  const blob = new Blob([new Uint8Array(pdfBuffer)], { type: 'application/pdf' });
  
  // Create download link
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  
  // Trigger download
  document.body.appendChild(link);
  link.click();
  
  // Clean up
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}