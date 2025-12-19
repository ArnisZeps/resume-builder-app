"use client";

import Header from "@/components/Header";
import DashboardGuard from "../dashboard/_components/DashboardGuard";
import ResumeBuilderForm from "./_components/ResumeBuilderForm";
import ResumePreview from "./_components/ResumePreview";
import { ResumeProvider, useResumeContext } from "./_components/ResumeContext";
import { useState } from "react";
import { EyeIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function ResumeBuilderPage() {
  return (
    <DashboardGuard>
      <ResumeProvider>
        <ResumeBuilderInner />
      </ResumeProvider>
    </DashboardGuard>
  );
}

function ResumeBuilderInner() {
  const { resumeData } = useResumeContext();
  const [showPreview, setShowPreview] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pagesForExport, setPagesForExport] = useState<string[]>([]);
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadPdf = async () => {
    if (isDownloading) return;
    if (!pagesForExport || pagesForExport.length === 0) return;

    setIsDownloading(true);
    try {
      const firstName = resumeData.personalInfo.firstName || 'Resume';
      const lastName = resumeData.personalInfo.lastName || '';
      const title = `${firstName}${lastName ? ` ${lastName}` : ''} Resume`;

      const res = await fetch('/api/resume/pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pages: pagesForExport,
          title,
        }),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(text || `PDF generation failed (${res.status})`);
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${title}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
      alert('Failed to generate PDF. Check server logs.');
    } finally {
      setIsDownloading(false);
    }
  };

  const downloadDisabled = isDownloading || pagesForExport.length === 0;

  return (
    <div className="h-screen bg-gradient-to-br from-violet-800 via-purple-900 to-indigo-900 overflow-hidden">
      <Header />

      <div className="hidden xl:flex h-[calc(100vh-72px)]">
        <div className="w-1/2 overflow-y-auto scrollbar-none border-r border-white/20">
          <ResumeBuilderForm />
        </div>

        <div className="w-1/2 fixed right-0 top-[72px] h-[calc(100vh-72px)] overflow-hidden">
          <div className=" h-full relative">
            <ResumePreview
              currentPage={currentPage}
              onCurrentPageChange={setCurrentPage}
              onTotalPagesChange={setTotalPages}
              onPagesChange={setPagesForExport}
            />

            <div className="fixed bottom-6 right-0 w-1/2 flex justify-center z-50 pointer-events-none">
              <div className="pointer-events-auto flex items-center gap-3 px-6 py-3 bg-white/90 backdrop-blur-md border border-black/10 rounded-full shadow-2xl">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage <= 1}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    currentPage <= 1
                      ? 'text-slate-400 cursor-not-allowed'
                      : 'text-slate-900 hover:bg-black/5'
                  }`}
                >
                  ← Previous
                </button>

                <span className="text-slate-900 font-medium px-3">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage >= totalPages}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    currentPage >= totalPages
                      ? 'text-slate-400 cursor-not-allowed'
                      : 'text-slate-900 hover:bg-black/5'
                  }`}
                >
                  Next →
                </button>

                <button
                  onClick={downloadPdf}
                  disabled={downloadDisabled}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    downloadDisabled
                      ? 'text-slate-400 cursor-not-allowed'
                      : 'text-slate-900 hover:bg-black/5'
                  }`}
                >
                  {isDownloading ? 'Generating…' : 'Download PDF'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="xl:hidden h-[calc(100vh-72px)] relative">
        <div className={`${showPreview ? 'hidden' : 'block'} h-full overflow-y-auto scrollbar-none`}>
          <ResumeBuilderForm />
        </div>

        {showPreview && (
          <div className="fixed inset-0 top-[72px] bg-gradient-to-br from-violet-800 via-purple-900 to-indigo-900 z-40">
            <div className="p-4 h-full relative">
              <ResumePreview
                currentPage={currentPage}
                onCurrentPageChange={setCurrentPage}
                onTotalPagesChange={setTotalPages}
                onPagesChange={setPagesForExport}
              />

              {/* Floating Pagination Controls */}
              <div className="fixed bottom-6 left-0 right-0 flex justify-center z-50 pointer-events-none">
                <div className="pointer-events-auto flex items-center gap-3 px-6 py-3 bg-white/90 backdrop-blur-md border border-black/10 rounded-full shadow-2xl">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage <= 1}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      currentPage <= 1
                        ? 'text-slate-400 cursor-not-allowed'
                        : 'text-slate-900 hover:bg-black/5'
                    }`}
                  >
                    ← Previous
                  </button>

                  <span className="text-slate-900 font-medium px-3">
                    Page {currentPage} of {totalPages}
                  </span>

                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage >= totalPages}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      currentPage >= totalPages
                        ? 'text-slate-400 cursor-not-allowed'
                        : 'text-slate-900 hover:bg-black/5'
                    }`}
                  >
                    Next →
                  </button>

                  <button
                    onClick={downloadPdf}
                    disabled={downloadDisabled}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      downloadDisabled
                        ? 'text-slate-400 cursor-not-allowed'
                        : 'text-slate-900 hover:bg-black/5'
                    }`}
                  >
                    {isDownloading ? 'Generating…' : 'PDF'}
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowPreview(false)}
              className="fixed top-20 right-4 z-50 p-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white hover:bg-white/30 transition-all duration-200"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
        )}

        {!showPreview && (
          <button
            onClick={() => setShowPreview(true)}
            className="fixed bottom-6 right-6 z-30 p-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white hover:bg-white/30 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <EyeIcon className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
}
