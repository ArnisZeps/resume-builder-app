import Header from '@/components/Header';
import DashboardGuard from '../dashboard/_components/DashboardGuard';
import ResumeBuilderForm from './_components/ResumeBuilderForm';
import ResumePreview from './_components/ResumePreview';
import { ResumeProvider } from './_components/ResumeContext';

export default function ResumeBuilderPage() {
  return (
    <DashboardGuard>
      <ResumeProvider>
        <div className="h-screen bg-gradient-to-br from-violet-800 via-purple-900 to-indigo-900 flex flex-col">
          <Header />
          
          <main className="flex overflow-hidden">
            <div className="flex flex-1 flex-col border-r border-white/20">

              
                <ResumeBuilderForm />
            </div>
            
            <div className="flex flex-1 flex-col">
              <div className="overflow-y-auto p-6">
                <ResumePreview />
              </div>
            </div>
          </main>
          
        </div>
      </ResumeProvider>
    </DashboardGuard>
  );
}
