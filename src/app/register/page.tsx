import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RegistrationForm from "./_components/RegistrationForm";
import AuthRedirect from "@/components/AuthRedirect";

export default function Register() {
  return (
    <AuthRedirect redirectTo="/dashboard" redirectCondition="authenticated">
      <div className="flex flex-col">
        <section className="min-h-screen flex flex-col bg-gradient-to-br from-violet-700 via-purple-600 to-sky-600">
          <Header />
          <div className="container flex flex-col flex-1 justify-center mx-auto px-6 py-12">
            <div className="flex flex-col items-center gap-8 text-center text-white">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Create Your Account</h1>

              <div className="text-center py-4 px-6 bg-white/10 rounded-lg border border-white/20 max-w-md">
                <p className="text-lg font-semibold text-yellow-200">Join thousands who&apos;ve transformed their careers with Resume Lab!</p>
              </div>

              <RegistrationForm />
            </div>
          </div>
        </section>
        <Footer variant="dark" />
      </div>
    </AuthRedirect>
  );
}
