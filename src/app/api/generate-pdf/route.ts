import { NextRequest, NextResponse } from 'next/server';
import { generatePDFFromURL } from '@/lib/pdfGenerator';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { resumeData, templateName, options = {} } = body;

    // Validate input
    if (!resumeData || !templateName) {
      return NextResponse.json(
        { error: 'Missing resumeData or templateName' },
        { status: 400 }
      );
    }

    // Create URL for the resume HTML page
    const baseUrl = request.nextUrl.origin;
    const resumeDataParam = encodeURIComponent(JSON.stringify(resumeData));
    const resumeUrl = `${baseUrl}/resume-html?data=${resumeDataParam}&template=${templateName}`;

    // Generate PDF from URL
    const pdfBuffer = await generatePDFFromURL(resumeUrl, {
      format: 'A4',
      margin: {
        top: '0.5in',
        right: '0.5in',
        bottom: '0.5in',
        left: '0.5in'
      },
      printBackground: true,
      scale: 0.8,
      ...options
    });

    // Return PDF as response
    return new NextResponse(Buffer.from(pdfBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${options.filename || 'resume.pdf'}"`,
        'Content-Length': pdfBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}