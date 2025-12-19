"use client";

import Header from "@/components/Header";
import DashboardGuard from "../dashboard/_components/DashboardGuard";
import ResumeBuilderForm from "./_components/ResumeBuilderForm";
import ResumePreview from "./_components/ResumePreview";
import { ResumeProvider } from "./_components/ResumeContext";
import { useState } from "react";
import { EyeIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function ResumeBuilderPage() {
  const [showPreview, setShowPreview] = useState(false);
  return (
    <DashboardGuard>
      <ResumeProvider>
        <div className="h-screen bg-gradient-to-br from-violet-800 via-purple-900 to-indigo-900 overflow-hidden">
          <Header />

          <div className="hidden xl:flex h-[calc(100vh-72px)]">
            <div className="w-1/2 overflow-y-auto border-r border-white/20">
              <ResumeBuilderForm />
            </div>

            <div className="w-1/2 fixed right-0 top-[72px] h-[calc(100vh-72px)] overflow-auto">
              <div className="p-6 h-full">
                <ResumePreview />
              </div>
            </div>
          </div>

          <div className="xl:hidden h-[calc(100vh-72px)] relative">
            <div className={`${showPreview ? "hidden" : "block"} h-full overflow-y-auto`}>
              <ResumeBuilderForm />
            </div>

            {showPreview && (
              <div className="fixed inset-0 top-[72px] bg-gradient-to-br from-violet-800 via-purple-900 to-indigo-900 z-40">
                <div className="p-4 h-full">
                  <ResumePreview />
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
      </ResumeProvider>
    </DashboardGuard>
  );
}
