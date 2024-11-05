"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

import { ReactNode } from 'react';

const AdminRoute = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAdminStatus = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (session) {
        const { data: profile } = await supabase
          .from('profile')
          .select('is_admin')
          .eq('id', session.user.id)
          .single();

        if (profile?.is_admin) {
          setIsAdmin(true);
        } else {
          router.push('/not-authorized');
        }
      } else {
        router.push('/login');
      }
      setIsLoading(false);
    };

    checkAdminStatus();
  }, [router]);

  if (isLoading) return <div>Loading...</div>;
  return isAdmin ? children : null;
};

export default AdminRoute;
