"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { appwriteAuth } from '@/lib/appwrite';

const registerSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(8, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegistrationForm() {
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setMessage(null);
    
    try {
      const result = await appwriteAuth.createAccount(
        data.email,
        data.password,
        `${data.firstName} ${data.lastName}`
      );

      if (result.success) {
        setMessage({ type: 'success', text: 'Account created successfully! Please check your email for verification.' });
        
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to create account' });
      }
    } catch (error) {
      console.error('Registration error:', error);
      setMessage({ type: 'error', text: 'An unexpected error occurred. Please try again.' });
    }
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              {...register('firstName')}
              type="text"
              placeholder="First Name"
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-4 focus:ring-violet-300/50 focus:border-white/40 backdrop-blur-sm"
            />
            {errors.firstName && (
              <p className="text-red-300 text-sm mt-1">{errors.firstName.message}</p>
            )}
          </div>
          
          <div>
            <input
              {...register('lastName')}
              type="text"
              placeholder="Last Name"
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-4 focus:ring-violet-300/50 focus:border-white/40 backdrop-blur-sm"
            />
            {errors.lastName && (
              <p className="text-red-300 text-sm mt-1">{errors.lastName.message}</p>
            )}
          </div>
        </div>

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

        <div>
          <input
            {...register('confirmPassword')}
            type="password"
            placeholder="Confirm Password"
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-4 focus:ring-violet-300/50 focus:border-white/40 backdrop-blur-sm"
          />
          {errors.confirmPassword && (
            <p className="text-red-300 text-sm mt-1">{errors.confirmPassword.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-white px-8 py-3 font-semibold text-violet-700 shadow-lg transition-all duration-200 hover:bg-violet-50 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-violet-300/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {isSubmitting ? 'Creating Account...' : 'Create Account'}
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
          Already have an account?{' '}
          <Link href="/login" className="text-yellow-200 hover:text-yellow-100 font-semibold">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
