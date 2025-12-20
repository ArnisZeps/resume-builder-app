import { NextRequest, NextResponse } from 'next/server';
import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';

export const runtime = 'nodejs';

type PdfRequestBody = {
  pages: string[];
  title?: string;
};

const A4_WIDTH = 794;
const A4_HEIGHT = 1123;
const PADDING = 60;

function safeFilename(input: string) {
  return input
    .trim()
    .replace(/[\\/:*?"<>|]+/g, '_')
    .replace(/\s+/g, '_')
    .slice(0, 80);
}

function buildHtml(pages: string[], title: string) {
  const allPagesContent = pages
    .map(
      (pageContent, index) => `
      <div class="resume-page" style="page-break-after: ${index < pages.length - 1 ? 'always' : 'auto'};">
        ${pageContent}
      </div>
    `
    )
    .join('');

  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>${title}</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      html, body {
        height: 100%;
      }

      body {
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        background: white;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }

      .resume-page {
        width: ${A4_WIDTH}px;
        height: ${A4_HEIGHT}px;
        padding: ${PADDING}px;
        margin: 0 auto;
        background: white;
        position: relative;
        overflow: hidden;
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
          margin: 0;
        }
      }
    </style>
  </head>
  <body>
    ${allPagesContent}
  </body>
</html>
`;
}

export async function POST(req: NextRequest) {
  let body: PdfRequestBody;
  try {
    body = (await req.json()) as PdfRequestBody;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const pages = body?.pages;
  if (!Array.isArray(pages) || pages.length === 0 || pages.some((p) => typeof p !== 'string')) {
    return NextResponse.json({ error: '`pages` must be a non-empty string[]' }, { status: 400 });
  }

  const title = typeof body.title === 'string' && body.title.trim().length > 0 ? body.title.trim() : 'Resume';

  try {
    const envExecutablePath = process.env.PUPPETEER_EXECUTABLE_PATH?.trim();
    const executablePath = envExecutablePath && envExecutablePath.length > 0 ? envExecutablePath : await chromium.executablePath();
    const args = envExecutablePath && envExecutablePath.length > 0 ? [] : chromium.args;

    console.log('Using browser executable at:', executablePath);
    const browser = await puppeteer.launch({
      args,
      executablePath,
      headless: true,
    });

    try {
      const page = await browser.newPage();

      // Ensure consistent viewport for layout.
      await page.setViewport({ width: A4_WIDTH, height: A4_HEIGHT });

      const html = buildHtml(pages, title);
      await page.setContent(html, { waitUntil: 'networkidle0' });

      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        preferCSSPageSize: true,
        margin: {
          top: '0',
          right: '0',
          bottom: '0',
          left: '0',
        },
      });

      const filename = safeFilename(title) || 'Resume';

      return new NextResponse(pdfBuffer, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="${filename}.pdf"`,
          'Cache-Control': 'no-store',
        },
      });
    } finally {
      await browser.close();
    }
  } catch (err) {
    console.error('PDF generation error:', err);
    return NextResponse.json(
      {
        error: 'Failed to generate PDF',
        detail: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
}
