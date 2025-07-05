"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { appwriteAuth } from '@/lib/appwrite';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string } | null>(null);
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    const checkExistingSession = async () => {
      const sessionCheck = await appwriteAuth.checkSession();
      if (sessionCheck.isLoggedIn && sessionCheck.user) {
        setIsLoggedIn(true);
        setCurrentUser({ name: sessionCheck.user.name, email: sessionCheck.user.email });
      }
    };
    checkExistingSession();
  }, []);

  const handleLogout = async () => {
    try {
      const result = await appwriteAuth.logout();
      if (result.success) {
        setIsLoggedIn(false);
        setCurrentUser(null);
        setMessage({ type: 'success', text: 'Logged out successfully' });
      } else {
        setMessage({ type: 'error', text: result.error || 'Logout failed' });
      }
    } catch (error) {
      console.error('Logout error:', error);
      setMessage({ type: 'error', text: 'An unexpected error occurred during logout' });
    }
  };

  const onSubmit = async (data: LoginFormData) => {
    setMessage(null);
    
    try {
      const result = await appwriteAuth.login(data.email, data.password);

      if (result.success) {
        if (result.message === 'Already logged in') {
          setMessage({ type: 'success', text: 'You are already logged in!' });
          setIsLoggedIn(true);
          if (result.user) {
            setCurrentUser({ name: result.user.name, email: result.user.email });
          }
        } else {
          setMessage({ type: 'success', text: 'Login successful! Redirecting...' });
          setTimeout(() => {
            router.push('/dashboard'); 
          }, 1500);
        }
      } else {
        setMessage({ type: 'error', text: result.error || 'Login failed' });
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage({ type: 'error', text: 'An unexpected error occurred. Please try again.' });
    }
  };

  if (isLoggedIn && currentUser) {
    return (
      <div className="w-full max-w-md">
        <div className="text-center space-y-6">
          <div className="p-4 bg-green-500/20 border border-green-400/30 rounded-lg">
            <p className="text-green-100 mb-2">You are already logged in!</p>
            <p className="text-white/80 text-sm">Welcome back, {currentUser.name}</p>
          </div>
          
          <div className="space-y-3">
            <button
              onClick={() => router.push('/dashboard')}
              className="w-full rounded-lg bg-white px-8 py-3 font-semibold text-violet-700 shadow-lg transition-all duration-200 hover:bg-violet-50 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-violet-300/50"
            >
              Go to Dashboard
            </button>
            
            <button
              onClick={handleLogout}
              className="w-full rounded-lg bg-red-500/20 border border-red-400/30 px-8 py-3 font-semibold text-red-100 shadow-lg transition-all duration-200 hover:bg-red-500/30 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-300/50"
            >
              Logout
            </button>
          </div>
        </div>

        {message && (
          <div className={`mt-4 p-4 rounded-lg ${
            message.type === 'success' 
              ? 'bg-green-500/20 border border-green-400/30 text-green-100' 
              : 'bg-red-500/20 border border-red-400/30 text-red-100'
          }`}>
            {message.text}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <input
            {...register('email')}
            type="email"
            placeholder="Email Address"
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-4 focus:ring-violet-300/50 focus:border-white/40 backdrop-blur-sm"
          />
          {errors.email && (
            <p className="text-red-300 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <input
            {...register('password')}
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-4 focus:ring-violet-300/50 focus:border-white/40 backdrop-blur-sm"
          />
          {errors.password && (
            <p className="text-red-300 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-white px-8 py-3 font-semibold text-violet-700 shadow-lg transition-all duration-200 hover:bg-violet-50 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-violet-300/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {isSubmitting ? 'Signing In...' : 'Sign In'}
        </button>
      </form>

      {message && (
        <div className={`mt-4 p-4 rounded-lg ${
          message.type === 'success' 
            ? 'bg-green-500/20 border border-green-400/30 text-green-100' 
            : 'bg-red-500/20 border border-red-400/30 text-red-100'
        }`}>
          {message.text}
        </div>
      )}

      <div className="mt-6 text-center">
        <p className="text-white/80">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-yellow-200 hover:text-yellow-100 font-semibold">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}
