import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero section */}
      <section className="min-h-screen flex flex-col  snap-start bg-gradient-to-br from-violet-700 via-purple-600 to-sky-600">
        <Header />
        <div className="container flex flex-col flex-1 justify-center mx-auto px-6 py-12">
          <div className="flex flex-col items-center gap-8 text-center text-white md:gap-12">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Professional Resume Builder
            </h1>
            
            <div className="max-w-2xl space-y-4 border-l-4 border-violet-300/50 pl-6 text-left font-medium backdrop-blur-sm">
              <p className="text-lg sm:text-xl">Build best looking resume in minutes!</p>
              <p className="text-base opacity-90">
                Only 2% of resumes win. Yours will be one of them. Let&apos;s build you a resume that works.
              </p>
              <p className="text-base opacity-90">Use best industry templates</p>
              <p className="text-base font-semibold">
                $2.99 monthly - no hidden costs
              </p>
              <p className="text-lg font-semibold">
                Change your job search game with Resumex!
              </p>
            </div>
            
            <button className="mt-4 rounded-lg bg-white px-8 py-3 font-semibold text-violet-700 shadow-lg transition-all duration-200 hover:bg-violet-50 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-violet-300/50">
              Get Started Today
            </button>
          </div>
        </div>
      <Footer />

      </section>
    </div>
  );
}
