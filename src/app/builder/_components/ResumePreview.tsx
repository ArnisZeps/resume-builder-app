"use client";

import { useResumeContext } from './ResumeContext';
import { useCallback, useEffect, useRef, useState } from 'react';
import { templates } from './templates';

interface ResumePreviewProps {
  currentPage?: number;
  onCurrentPageChange?: (page: number) => void;
  onTotalPagesChange?: (total: number) => void;
}

export default function ResumePreview({ currentPage: controlledCurrentPage, onCurrentPageChange, onTotalPagesChange }: ResumePreviewProps = {}) {
  const { resumeData, selectedTemplate } = useResumeContext();
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const fragmentMeasureRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [pages, setPages] = useState<string[]>(['']);

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

  const [uncontrolledCurrentPage, setUncontrolledCurrentPage] = useState(1);
  const currentPage = controlledCurrentPage ?? uncontrolledCurrentPage;
  const setCurrentPage = useCallback((nextPage: number) => {
    if (onCurrentPageChange) {
      onCurrentPageChange(nextPage);
      return;
    }
    setUncontrolledCurrentPage(nextPage);
  }, [onCurrentPageChange]);

  const getOuterHeight = useCallback((element: HTMLElement) => {
    const style = window.getComputedStyle(element);
    const marginTop = Number.parseFloat(style.marginTop || '0') || 0;
    const marginBottom = Number.parseFloat(style.marginBottom || '0') || 0;
    const rectHeight = element.getBoundingClientRect().height;
    return rectHeight + marginTop + marginBottom;
  }, []);

  const measureHtmlFragmentHeight = useCallback((html: string) => {
    const host = fragmentMeasureRef.current;
    if (!host) return 0;
    host.innerHTML = html;
    const el = host.firstElementChild as HTMLElement | null;
    if (!el) {
      host.innerHTML = '';
      return 0;
    }
    const height = getOuterHeight(el);
    host.innerHTML = '';
    return height;
  }, [getOuterHeight]);

  const splitElementByChildren = useCallback((element: HTMLElement, maxHeight: number, maxDepth = 3): string[] => {
    const style = window.getComputedStyle(element);
    const paddingTop = Number.parseFloat(style.paddingTop || '0') || 0;
    const paddingBottom = Number.parseFloat(style.paddingBottom || '0') || 0;
    const borderTop = Number.parseFloat(style.borderTopWidth || '0') || 0;
    const borderBottom = Number.parseFloat(style.borderBottomWidth || '0') || 0;
    const marginTop = Number.parseFloat(style.marginTop || '0') || 0;
    const marginBottom = Number.parseFloat(style.marginBottom || '0') || 0;
    const baseOuter = paddingTop + paddingBottom + borderTop + borderBottom + marginTop + marginBottom;

    const availableForChildren = Math.max(0, maxHeight - baseOuter);
    const children = Array.from(element.children) as HTMLElement[];
    if (children.length === 0 || availableForChildren <= 0 || maxDepth <= 0) {
      return [element.outerHTML];
    }

    const fragments: string[] = [];
    let currentFragmentChildren: HTMLElement[] = [];
    let currentHeight = 0;

    const flush = () => {
      const wrapper = element.cloneNode(false) as HTMLElement;
      for (const child of currentFragmentChildren) {
        wrapper.appendChild(child.cloneNode(true));
      }
      fragments.push(wrapper.outerHTML);
    };

    for (const child of children) {
      const childHeight = getOuterHeight(child);

      // If child itself is too tall for the available space, recursively split it.
      if (childHeight > availableForChildren) {
        if (currentFragmentChildren.length > 0) {
          flush();
          currentFragmentChildren = [];
          currentHeight = 0;
        }

        const childFragments = splitElementByChildren(child, availableForChildren, maxDepth - 1);
        for (const frag of childFragments) {
          const wrapper = element.cloneNode(false) as HTMLElement;
          wrapper.innerHTML = frag;
          fragments.push(wrapper.outerHTML);
        }

        continue;
      }

      if (currentFragmentChildren.length > 0 && currentHeight + childHeight > availableForChildren) {
        flush();
        currentFragmentChildren = [];
        currentHeight = 0;
      }

      currentFragmentChildren.push(child);
      currentHeight += childHeight;
    }

    if (currentFragmentChildren.length > 0) {
      flush();
    }

    return fragments.length > 0 ? fragments : [element.outerHTML];
  }, [getOuterHeight]);

  // Intelligent pagination: measure content and split into pages
  useEffect(() => {
    if (!contentRef.current) return;

    const timer = setTimeout(() => {
      const elements = Array.from(contentRef.current!.children) as HTMLElement[];
      const pageContents: string[] = [];
      let currentPageContent: string[] = [];
      let currentHeight = 0;

      const flushPage = () => {
        if (currentPageContent.length === 0) return;
        pageContents.push(currentPageContent.join(''));
        currentPageContent = [];
        currentHeight = 0;
      };

      for (const element of elements) {
        const elementHeight = getOuterHeight(element);
        const remainingHeight = CONTENT_HEIGHT - currentHeight;

        // Fits in current page
        if (elementHeight <= remainingHeight) {
          currentPageContent.push(element.outerHTML);
          currentHeight += elementHeight;
          continue;
        }

        // Doesn't fit in remaining space: try splitting it to fill the current page.
        if (currentPageContent.length > 0 && remainingHeight > 48) {
          const fillFragments = splitElementByChildren(element, remainingHeight);
          const didSplit = fillFragments.length > 1 || fillFragments[0] !== element.outerHTML;

          if (didSplit) {
            // Put the first fragment on the current page, then continue packing the rest.
            currentPageContent.push(fillFragments[0]);
            flushPage();

            for (const frag of fillFragments.slice(1)) {
              const fragHeight = measureHtmlFragmentHeight(frag);

              if (currentPageContent.length > 0 && currentHeight + fragHeight > CONTENT_HEIGHT) {
                flushPage();
              }

              currentPageContent.push(frag);
              currentHeight += fragHeight;
            }

            continue;
          }
        }

        // Doesn't fit: close current page if it has content
        if (currentPageContent.length > 0) {
          flushPage();
        }

        // Now we're at the top of a new page
        if (elementHeight <= CONTENT_HEIGHT) {
          currentPageContent.push(element.outerHTML);
          currentHeight += elementHeight;
          continue;
        }

        // Element itself is taller than a page: split by its direct children into multiple page fragments.
        const fragments = splitElementByChildren(element, CONTENT_HEIGHT);
        for (const frag of fragments) {
          const fragHeight = measureHtmlFragmentHeight(frag);

          if (currentPageContent.length > 0 && currentHeight + fragHeight > CONTENT_HEIGHT) {
            flushPage();
          }

          currentPageContent.push(frag);
          currentHeight += fragHeight;
        }
      }

      flushPage();

      const nextPages = pageContents.length > 0 ? pageContents : [''];
      setPages(nextPages);

      const nextTotalPages = Math.max(nextPages.length, 1);
      if (onTotalPagesChange) {
        onTotalPagesChange(nextTotalPages);
      }

      if (currentPage > nextTotalPages) {
        setCurrentPage(1);
      }
    }, 100); // Debounce to avoid excessive recalculation

    return () => clearTimeout(timer);
  }, [resumeData, selectedTemplate, CONTENT_HEIGHT, currentPage, onTotalPagesChange, getOuterHeight, measureHtmlFragmentHeight, setCurrentPage, splitElementByChildren]);

  // const handleDownload = () => {
  //   setIsDownloading(true);
    
  //   try {
  //     const iframe = document.createElement('iframe');
  //     iframe.style.position = 'absolute';
  //     iframe.style.width = '0';
  //     iframe.style.height = '0';
  //     iframe.style.border = 'none';
  //     document.body.appendChild(iframe);
      
  //     const iframeDoc = iframe.contentWindow?.document;
  //     if (!iframeDoc) return;
      
  //     const allPagesContent = pages.map((pageContent, index) => `
  //       <div class="resume-page" style="page-break-after: ${index < pages.length - 1 ? 'always' : 'auto'};">
  //         ${pageContent}
  //       </div>
  //     `).join('');
      
  //     const firstName = resumeData.personalInfo.firstName || 'Resume';
  //     const lastName = resumeData.personalInfo.lastName || '';
      
  //     iframeDoc.open();
  //     iframeDoc.write(`
  //       <!DOCTYPE html>
  //       <html>
  //         <head>
  //           <meta charset="UTF-8">
  //           <title>${firstName}_${lastName}_Resume</title>
  //           <style>
  //             * {
  //               margin: 0;
  //               padding: 0;
  //               box-sizing: border-box;
  //             }
              
  //             body {
  //               font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  //               background: white;
  //               -webkit-print-color-adjust: exact;
  //               print-color-adjust: exact;
  //             }
              
  //             .resume-page {
  //               width: 794px;
  //               height: 1123px;
  //               padding: 60px;
  //               margin: 0 auto;
  //               background: white;
  //               position: relative;
  //             }
              
  //             @page {
  //               size: A4;
  //               margin: 0;
  //             }
              
  //             @media print {
  //               body {
  //                 margin: 0;
  //                 padding: 0;
  //               }
                
  //               .resume-page {
  //                 width: 100%;
  //                 height: 100vh;
  //                 margin: 0;
  //               }
  //             }
  //           </style>
  //         </head>
  //         <body>
  //           ${allPagesContent}
  //         </body>
  //       </html>
  //     `);
  //     iframeDoc.close();
      
  //     setTimeout(() => {
  //       iframe.contentWindow?.print();
  //       setTimeout(() => {
  //         document.body.removeChild(iframe);
  //         setIsDownloading(false);
  //       }, 100);
  //     }, 250);
      
  //   } catch (error) {
  //     console.error('Error downloading PDF:', error);
  //     setIsDownloading(false);
  //   }
  // };

  const SelectedTemplate = templates[selectedTemplate];

  const currentPageContent = pages[currentPage - 1] || '';

  return (
    <div className="w-full h-full flex flex-col">
      {/* Hidden content for measurement */}
      <div
        style={{
          position: 'absolute',
          left: '-9999px',
          top: 0,
          width: `${A4_WIDTH}px`,
          padding: `${PADDING}px`,
          boxSizing: 'border-box',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          backgroundColor: 'white',
        }}
      >
        <div ref={contentRef}>
          <SelectedTemplate resumeData={resumeData} />
        </div>
        <div ref={fragmentMeasureRef} />
      </div>

      {/* Download Button */}
      {/* <div className="flex-shrink-0 p-4 border-b border-white/20">
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
      </div> */}

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
            dangerouslySetInnerHTML={{ __html: currentPageContent }}
          />
        </div>
      </div>
    </div>
  );
}
