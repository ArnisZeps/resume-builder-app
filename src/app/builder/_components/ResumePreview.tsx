"use client";

import { useResumeContext } from './ResumeContext';
import { useCallback, useEffect, useRef, useState } from 'react';
import { templates } from './templates';

interface ResumePreviewProps {
  currentPage?: number;
  onCurrentPageChange?: (page: number) => void;
  onTotalPagesChange?: (total: number) => void;
  onPagesChange?: (pages: string[]) => void;
}

export default function ResumePreview({ currentPage: controlledCurrentPage, onCurrentPageChange, onTotalPagesChange, onPagesChange }: ResumePreviewProps = {}) {
  const { resumeData, selectedTemplate } = useResumeContext();
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const fragmentMeasureRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [pages, setPages] = useState<string[]>(['']);

  const A4_WIDTH = 794;
  const A4_HEIGHT = 1123;
  const PADDING = 60;
  const CONTENT_HEIGHT = A4_HEIGHT - (PADDING * 2);

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

        if (elementHeight <= remainingHeight) {
          currentPageContent.push(element.outerHTML);
          currentHeight += elementHeight;
          continue;
        }

        if (currentPageContent.length > 0 && remainingHeight > 48) {
          const fillFragments = splitElementByChildren(element, remainingHeight);
          const didSplit = fillFragments.length > 1 || fillFragments[0] !== element.outerHTML;

          if (didSplit) {
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

        if (currentPageContent.length > 0) {
          flushPage();
        }

        if (elementHeight <= CONTENT_HEIGHT) {
          currentPageContent.push(element.outerHTML);
          currentHeight += elementHeight;
          continue;
        }

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
      if (onPagesChange) {
        onPagesChange(nextPages);
      }

      const nextTotalPages = Math.max(nextPages.length, 1);
      if (onTotalPagesChange) {
        onTotalPagesChange(nextTotalPages);
      }

      if (currentPage > nextTotalPages) {
        setCurrentPage(1);
      }
    }, 100); // Debounce to avoid excessive recalculation

    return () => clearTimeout(timer);
  }, [resumeData, selectedTemplate, CONTENT_HEIGHT, currentPage, onPagesChange, onTotalPagesChange, getOuterHeight, measureHtmlFragmentHeight, setCurrentPage, splitElementByChildren]);

  const SelectedTemplate = templates[selectedTemplate];

  const currentPageContent = pages[currentPage - 1] || '';

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
        <div ref={contentRef}>
          <SelectedTemplate resumeData={resumeData} />
        </div>
        <div ref={fragmentMeasureRef} />
      </div>

      <div 
        ref={containerRef}
        className="flex-1 overflow-y-auto overflow-x-hidden overscroll-contain scrollbar-none p-4"
      >
        <div className="min-h-full flex justify-center items-start md:items-center">
          {/*
            NOTE: CSS transforms don't affect layout size. We wrap the scaled page in a box
            that uses the scaled dimensions so layouts don't center/clamp the unscaled A4 height.
          */}
          <div
            style={{
              width: `${A4_WIDTH * scale}px`,
              height: `${A4_HEIGHT * scale}px`,
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
      </div>
    </div>
  );
}
