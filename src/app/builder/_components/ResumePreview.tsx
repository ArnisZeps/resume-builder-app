"use client";

import { useResumeContext } from './ResumeContext';
import { useCallback, useEffect, useRef, useState } from 'react';
import { DEFAULT_TEMPLATE_KEY, templates } from './templates';
import { account } from '@/lib/appwrite';

interface ResumePreviewProps {
  onPagesChange?: (pages: string[]) => void;
}

export default function ResumePreview({ onPagesChange }: ResumePreviewProps = {}) {
  const { resumeData, selectedTemplate, styleSettings } = useResumeContext();
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [html, setHtml] = useState<string>('');
  const pageRef = useRef<HTMLDivElement>(null);
  const [scaledHeight, setScaledHeight] = useState<number>(1123);
  const inlineCacheRef = useRef<Map<string, string>>(new Map());
  const inlineJobRef = useRef(0);

  const A4_WIDTH = 794;
  const A4_HEIGHT = 1123;
  const PADDING = 60;

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

  const inlineAppwriteImages = useCallback(async (inputHtml: string) => {
    const endpoint = (process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1').replace(/\/$/, '');
    const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '';
    const imgSrcRegex = /<img\b[^>]*?\bsrc=("|')([^"']+?)\1/gi;

    const isAppwriteFileViewUrl = (src: string) => {
      try {
        const url = new URL(src);
        if (!url.href.startsWith(endpoint)) return false;
        return /\/storage\/buckets\/.+\/files\/.+\/(view|download)\b/.test(url.pathname);
      } catch {
        return false;
      }
    };

    const sources = new Set<string>();
    let match: RegExpExecArray | null;
    imgSrcRegex.lastIndex = 0;
    while ((match = imgSrcRegex.exec(inputHtml)) !== null) {
      const src = match[2];
      if (!src) continue;
      if (src.startsWith('data:')) continue;
      if (!/^https?:\/\//i.test(src)) continue;
      if (!isAppwriteFileViewUrl(src)) continue;
      sources.add(src);
    }

    if (sources.size === 0) return inputHtml;

    let jwt: string | undefined;
    try {
      const token = await account.createJWT();
      jwt = token.jwt;
    } catch {
      // If not logged in or session expired, keep original URLs.
      return inputHtml;
    }

    const blobToDataUrl = (blob: Blob) =>
      new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = () => reject(new Error('Failed to read blob as data URL'));
        reader.onload = () => resolve(String(reader.result || ''));
        reader.readAsDataURL(blob);
      });

    await Promise.all(
      Array.from(sources).map(async (src) => {
        if (inlineCacheRef.current.has(src)) return;
        try {
          const headers: Record<string, string> = {
            Accept: 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
          };
          if (projectId) headers['X-Appwrite-Project'] = projectId;
          if (jwt) headers['X-Appwrite-JWT'] = jwt;

          const res = await fetch(src, { headers, cache: 'no-store' });
          if (!res.ok) return;

          const contentLength = res.headers.get('content-length');
          if (contentLength && Number(contentLength) > 5_000_000) return;

          const blob = await res.blob();
          const dataUrl = await blobToDataUrl(blob);
          if (!dataUrl.startsWith('data:')) return;
          inlineCacheRef.current.set(src, dataUrl);
        } catch {
          // Ignore failures; keep original URL.
        }
      })
    );

    imgSrcRegex.lastIndex = 0;
    return inputHtml.replace(imgSrcRegex, (full, quote, src) => {
      const next = inlineCacheRef.current.get(src);
      if (!next) return full;
      return full.replace(src, next);
    });
  }, []);

  useEffect(() => {
    const jobId = ++inlineJobRef.current;
    const timer = setTimeout(() => {
      if (!contentRef.current) return;

      const rawHtml = contentRef.current.innerHTML || '';

      // Inline Appwrite images client-side so private images render even when cross-site cookies are blocked,
      // and so exported HTML is self-contained for server-side PDF generation.
      void (async () => {
        const inlinedHtml = await inlineAppwriteImages(rawHtml);
        if (inlineJobRef.current !== jobId) return;

        setHtml(inlinedHtml);
        if (onPagesChange) {
          // Keep existing callback shape for compatibility; a single item represents a continuous document.
          onPagesChange([inlinedHtml]);
        }
      })();
    }, 100);

    return () => clearTimeout(timer);
  }, [resumeData, selectedTemplate, styleSettings, onPagesChange, inlineAppwriteImages]);

  useEffect(() => {
    const el = pageRef.current;
    if (!el) return;

    const update = () => {
      const unscaled = el.scrollHeight || A4_HEIGHT;
      setScaledHeight(Math.max(1, Math.round(unscaled * scale)));
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [scale, html]);

  const SelectedTemplate = templates[selectedTemplate] ?? templates[DEFAULT_TEMPLATE_KEY];

  return (
    <div className="w-full h-full flex flex-col relative">
      <div
        style={{
          position: 'fixed',
          left: '-10000px',
          top: 0,
          width: `${A4_WIDTH}px`,
          padding: `${PADDING}px`,
          boxSizing: 'border-box',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          backgroundColor: 'white',
          opacity: 0,
          pointerEvents: 'none',
        }}
      >
        <div ref={contentRef} style={{ display: 'flex', flexDirection: 'column' }}>
          <SelectedTemplate resumeData={resumeData} styleSettings={styleSettings} />
        </div>
      </div>

      <div 
        ref={containerRef}
        className="flex-1 overflow-y-auto overflow-x-hidden overscroll-contain scrollbar-none p-4"
      >
        <div className="min-h-full flex justify-center items-start md:items-center">
          <div
            style={{
              width: `${A4_WIDTH * scale}px`,
              height: `${scaledHeight}px`,
            }}
          >
            <div
              style={{
                transform: `scale(${scale})`,
                transformOrigin: 'top left',
                transition: 'transform 0.2s ease-out',
              }}
            >
              <div
                className="shadow-2xl"
                style={{
                  width: `${A4_WIDTH}px`,
                  backgroundColor: 'white',
                  padding: `${PADDING}px`,
                  boxSizing: 'border-box',
                  overflow: 'visible',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  display: 'flex',
                  flexDirection: 'column',
                }}
                ref={pageRef}
                dangerouslySetInnerHTML={{ __html: html }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
