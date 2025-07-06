import Header from '@/components/Header';
import DashboardGuard from '../dashboard/_components/DashboardGuard';
import ResumeBuilderForm from './_components/ResumeBuilderForm';
import ResumePreview from './_components/ResumePreview';
import { ResumeProvider } from './_components/ResumeContext';

export default function ResumeBuilderPage() {
  return (
    <DashboardGuard>
      <ResumeProvider>
        <div className="h-screen bg-gradient-to-br from-violet-800 via-purple-900 to-indigo-900 overflow-hidden">
          <Header />
          
          <div className="flex h-[calc(100vh-72px)]">
            <div className="w-1/2 overflow-y-auto border-r border-white/20">
              <ResumeBuilderForm />
            </div>

            <div className="w-1/2 fixed right-0 top-[72px] h-[calc(100vh-72px)] overflow-hidden">
              <div className="p-6 h-full">
                <ResumePreview />
              </div>
            </div>
          </div>
          
        </div>
      </ResumeProvider>
    </DashboardGuard>
  );
}
