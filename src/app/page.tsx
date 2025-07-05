import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ContactForm from "./_components/ContactForm";
import Link from "next/link";
import AuthRedirect from "@/components/AuthRedirect";

export default function Home() {
  return (
    <AuthRedirect redirectTo="/dashboard" redirectCondition="authenticated">
      <div className="flex flex-col">
        <section className="min-h-screen flex flex-col bg-gradient-to-br from-violet-700 via-purple-600 to-sky-600">
          <Header />
          <div className="container flex flex-col flex-1 justify-center mx-auto px-6 py-12">
            <div className="flex flex-col items-center gap-8 text-center text-white md:gap-12">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Professional Resume Builder</h1>

              <div className="max-w-2xl space-y-6">
                <div className="space-y-4 text-lg font-semibold border-l-4 border-violet-300/50 pl-6 text-left ">
                  <p className="text-lg">Build best looking resume in minutes!</p>
                  <p className="text-lg">Use best industry templates</p>
                  <p className="text-lg">$2.99 monthly - no hidden costs</p>
                  <p className="text-lg">Change your job search game with Resume Lab!</p>
                </div>
              </div>
              <div className="text-center space-y-2 py-6 px-4 bg-white/10 rounded-lg border border-white/20">
                <p className="text-lg font-bold text-yellow-200">
                  Only 2% of resumes win. Yours will be one of them. Let&apos;s build you a resume that works!
                </p>
              </div>
              <Link href="/register">
                <button className="rounded-lg bg-white px-8 py-3 font-semibold text-violet-700 shadow-lg duration-200 hover:bg-violet-50 hover:shadow-xl hover:scale-105 cursor-pointer focus:outline-none focus:ring-4 focus:ring-violet-300/50">
                  Get Started Now
                </button>
              </Link>
            </div>
          </div>
        </section>

        <section className="min-h-screen flex flex-col bg-white">
          <div className="container flex flex-col flex-1 justify-center mx-auto px-6 py-12">
            <ContactForm />
          </div>
          <Footer />
        </section>

      </div>
    </AuthRedirect>
  );
}
