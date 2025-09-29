import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DashboardGuard from './_components/DashboardGuard';
import SavedResumes from './_components/SavedResumes';
import Link from 'next/link';

export default function DashboardPage() {
  
  return (
    <DashboardGuard>
      <div className="flex flex-col  bg-gradient-to-br from-violet-800 via-purple-900 to-indigo-900">
        <Header />
        
        <main className="flex-1 p-4 min-h-screen">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 pt-8">
              <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
              <p className="text-white/80">Welcome to your resume builder dashboard</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 ">
                <SavedResumes />
              </div>
              
              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-white/20">
                  <h2 className="text-xl font-semibold text-white mb-4">Resume Templates</h2>
                  <p className="text-white/80 mb-4">Choose from our professionally designed templates</p>
                  <Link href="/builder">
                    <button className="w-full bg-white text-violet-700 font-semibold py-2 px-4 rounded-lg hover:bg-violet-50 transition-colors">
                      Browse Templates
                    </button>
                  </Link>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-white/20">
                  <h2 className="text-xl font-semibold text-white mb-4">Create New Resume</h2>
                  <p className="text-white/80 mb-4">Start building your professional resume</p>
                  <Link href="/builder">
                    <button className="w-full bg-yellow-400 text-violet-900 font-semibold py-2 px-4 rounded-lg hover:bg-yellow-300 transition-colors">
                      Get Started
                    </button>
                  </Link>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-white/20">
                  <h2 className="text-xl font-semibold text-white mb-4">Quick Stats</h2>
                  <p className="text-white/80 mb-4">Track your resume building progress</p>
                  <div className="space-y-2 text-sm text-white/70">
                    <div className="flex justify-between">
                      <span>Total Resumes:</span>
                      <span className="font-medium">-</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Updated:</span>
                      <span className="font-medium">-</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        
        <section className="bg-white"> 
        <Footer />

        </section>
      </div>
    </DashboardGuard>
  );
}
