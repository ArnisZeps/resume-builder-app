import LoginForm from "./_components/LoginForm";
import Header from "@/components/Header";

export default function LoginPage() {
  return (
    <div className="flex flex-col bg-gradient-to-br from-violet-800 via-purple-900 to-indigo-900 ">
      <Header />

      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-white/80">Sign in to your account</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
