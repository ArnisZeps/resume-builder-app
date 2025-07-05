"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { appwriteAuth } from '@/lib/appwrite';

interface AuthRedirectProps {
  redirectTo?: string;
  redirectCondition?: 'authenticated' | 'unauthenticated';
  children: React.ReactNode;
}

export default function AuthRedirect({ 
  redirectTo = '/dashboard', 
  redirectCondition = 'authenticated',
  children 
}: AuthRedirectProps) {
  const router = useRouter();

  useEffect(() => {
    const checkAuthAndRedirect = async () => {
      try {
        const sessionCheck = await appwriteAuth.checkSession();
        
        if (redirectCondition === 'authenticated' && sessionCheck.isLoggedIn) {
          router.push(redirectTo);
        } else if (redirectCondition === 'unauthenticated' && !sessionCheck.isLoggedIn) {
          router.push(redirectTo);
        }
      } catch (error) {
        console.error('Auth check error:', error);
      }
    };

    checkAuthAndRedirect();
  }, [router, redirectTo, redirectCondition]);

  return <>{children}</>;
}
