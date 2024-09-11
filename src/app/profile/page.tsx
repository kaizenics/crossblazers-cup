"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

const Profile = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data?.user) {
        router.push('/login'); 
      } else {
        setUser(data.user);
      }
    };
    getUser();
  }, [router]);

  return (
    <div>
      <h1>Welcome, {user?.email}</h1>
    </div>
  );
};

export default Profile;
