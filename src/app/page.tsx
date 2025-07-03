export default function Home() {
  return (
    <div className="flex flex-col ">
      {/* Full-page height div */}
      <section className="h-screen flex flex-col snap-start">
        <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-r from-violet-700 to-sky-600">
          <div className="flex flex-col gap-6 items-center  md:gap-12 text-white">
            <h1 className="text-2xl">Professional resume builder</h1>
            <div className="max-w-96 font-medium border-l-4 border-violet-900 pl-4 space-y-2 md:max-w-full">
              <p>Build best looking resume in minutes!</p>
              <p>Only 2% of resumes win. Yours will be one of them. Lets build you a resume that works.</p>
              <p>Use best industry templates</p>
              <p>2.99$ monthly - no hidden costs</p>
              <p>Change your job search game with Resumex!</p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
