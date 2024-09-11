"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import heroCover from "@/assets/cover/hero.jpg";
import { supabase } from '@/lib/supabase';

export default function Login() {
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });

    if (error) {
      console.error('Error during Google Sign-In:', error.message);
    } else {
      router.push('/profile');
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 flex flex-col items-center justify-center p-10 relative">
        <Link href="/" className="absolute top-4 left-4">
          <Button variant="ghost" className="font-montserrat text-white hover:text-gray-300 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        <div className="max-w-sm w-full space-y-8">
          <div>
            <h2 className="font-montserrat mt-6 text-3xl font-extrabold text-white">Welcome back</h2>
            <p className="font-montserrat mt-2 text-sm text-gray-400">Please sign in to continue</p>
          </div>
          <Button
            onClick={handleGoogleSignIn}
            className="font-montserrat w-full flex items-center justify-center py-2 px-4 border border-gray-700 rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-900 transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
            </svg>
            Sign in with Google
          </Button>
          <p className="mt-2 text-center text-xs text-gray-500">
            By signing in, you agree to our{' '}
            <a href="#" className="font-medium text-red-400 hover:text-red-300 transition-colors duration-200">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="font-medium text-red-400 hover:text-red-300 transition-colors duration-200">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
      <div className="hidden lg:block relative w-0 flex-1">
        <div className="absolute inset-0 h-full w-full">
          <Image
            className="h-full w-full object-cover"
            src={heroCover}
            alt="Login background"
            layout="fill"
          />
          <div className="absolute -left-0.5 w-full h-screen bg-gradient-to-l from-transparent to-[#0a0a0a] opacity-100"></div>
        </div>
      </div>
    </div>
  );
}
