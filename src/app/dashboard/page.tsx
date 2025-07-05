export default function DashboardPage() {
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-800 via-purple-900 to-indigo-900 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 pt-8">
          <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-white/80">Welcome to your resume builder dashboard</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-white/20">
            <h2 className="text-xl font-semibold text-white mb-4">Resume Templates</h2>
            <p className="text-white/80 mb-4">Choose from our professionally designed templates</p>
            <button className="w-full bg-white text-violet-700 font-semibold py-2 px-4 rounded-lg hover:bg-violet-50 transition-colors">
              Browse Templates
            </button>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-white/20">
            <h2 className="text-xl font-semibold text-white mb-4">My Resumes</h2>
            <p className="text-white/80 mb-4">View and edit your saved resumes</p>
            <button className="w-full bg-white text-violet-700 font-semibold py-2 px-4 rounded-lg hover:bg-violet-50 transition-colors">
              View Resumes
            </button>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-white/20">
            <h2 className="text-xl font-semibold text-white mb-4">Create New Resume</h2>
            <p className="text-white/80 mb-4">Start building your professional resume</p>
            <button className="w-full bg-yellow-400 text-violet-900 font-semibold py-2 px-4 rounded-lg hover:bg-yellow-300 transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
