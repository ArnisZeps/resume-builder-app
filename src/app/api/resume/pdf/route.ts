import { NextRequest, NextResponse } from 'next/server';
import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';

export const runtime = 'nodejs';

type PdfRequestBody = {
  pages: string[];
  title?: string;
};

const A4_WIDTH = 794;
const A4_HEIGHT = 1123;
const PADDING = 60;

const APPWRITE_ENDPOINT = (process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1').replace(/\/$/, '');
const APPWRITE_PROJECT_ID = process.env.APPWRITE_PROJECT_ID || process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '';
const APPWRITE_API_KEY = process.env.APPWRITE_API_KEY || process.env.APPWRITE_KEY || '';

function getAppwriteProjectIdForUrl(src: string) {
  try {
    const url = new URL(src);
    const fromQuery = url.searchParams.get('project')?.trim();
    if (fromQuery) return fromQuery;
  } catch {
    // ignore
  }
  return APPWRITE_PROJECT_ID;
}

function isAppwriteFileViewUrl(src: string) {
  try {
    const url = new URL(src);
    if (!url.href.startsWith(APPWRITE_ENDPOINT)) return false;
    return /\/storage\/buckets\/.+\/files\/.+\/(view|download)\b/.test(url.pathname);
  } catch {
    return false;
  }
}

async function inlineAppwriteImages(html: string) {
  // Only target Appwrite file URLs. The common failure mode is that the browser (user) can
  // see the image due to session cookies, but Puppeteer can't (no cookies), resulting in
  // missing photos in the PDF.
  const imgSrcRegex = /<img\b[^>]*?\bsrc=("|')([^"']+?)\1/gi;
  const sources = new Set<string>();

  let match: RegExpExecArray | null;
  while ((match = imgSrcRegex.exec(html)) !== null) {
    const src = match[2];
    if (!src) continue;
    if (src.startsWith('data:')) continue;
    if (!/^https?:\/\//i.test(src)) continue;
    if (!isAppwriteFileViewUrl(src)) continue;
    sources.add(src);
  }

  if (sources.size === 0) return html;

  const srcToDataUrl = new Map<string, string>();
  await Promise.all(
    Array.from(sources).map(async (src) => {
      try {
        const projectId = getAppwriteProjectIdForUrl(src);
        const headers: Record<string, string> = {
          'User-Agent': 'Mozilla/5.0 (compatible; ResumeBuilderPDF/1.0)',
          Accept: 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
        };

        // Appwrite API key auth requires a matching project id header.
        // Prefer the project id from the URL query param if present.
        if (projectId) headers['X-Appwrite-Project'] = projectId;
        // If file access requires auth, use a server API key (kept server-side).
        if (APPWRITE_API_KEY) headers['X-Appwrite-Key'] = APPWRITE_API_KEY;

        const res = await fetch(src, { headers, cache: 'no-store' });
        if (!res.ok) {
          return;
        }
        const contentType = res.headers.get('content-type') || 'image/png';

        const contentLength = res.headers.get('content-length');
        if (contentLength && Number(contentLength) > 5_000_000) return;

        const arrayBuffer = await res.arrayBuffer();
        const base64 = Buffer.from(arrayBuffer).toString('base64');
        srcToDataUrl.set(src, `data:${contentType};base64,${base64}`);
      } catch (e) {
        // Ignore image inlining failures; the PDF can still be generated.
      }
    })
  );

  if (srcToDataUrl.size === 0) return html;

  return html.replace(imgSrcRegex, (full, quote, src) => {
    const next = srcToDataUrl.get(src);
    if (!next) return full;
    return full.replace(src, next);
  });
}

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

    const browser = await puppeteer.launch({
      args,
      executablePath,
      headless: true,
    });

    try {
      const page = await browser.newPage();

      await page.setViewport({ width: A4_WIDTH, height: A4_HEIGHT });

      let html = buildHtml(pages, title);
      html = await inlineAppwriteImages(html);
      await page.setContent(html);

      // Ensure <img> elements finish loading before PDF generation.
      await page.evaluate(async () => {
        const images = Array.from(document.images);
        await Promise.all(
          images.map((img) => {
            if (img.complete) return Promise.resolve();
            return new Promise<void>((resolve) => {
              const done = () => resolve();
              img.addEventListener('load', done, { once: true });
              img.addEventListener('error', done, { once: true });
            });
          })
        );
      });

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

      const pdfArrayBuffer = pdfBuffer.buffer.slice(
        pdfBuffer.byteOffset,
        pdfBuffer.byteOffset + pdfBuffer.byteLength
      ) as ArrayBuffer;

      return new NextResponse(pdfArrayBuffer, {
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
