'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import AdminRegistration from '../_components/AdminRegistration';

export default function RegisterWithToken({ params }: { params: { token: string } }) {
  const [isValidToken, setIsValidToken] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const validateToken = async () => {
      try {
        const { data, error } = await supabase
          .from('admin_invites')
          .select('email, used')
          .eq('token', params.token)
          .single();

        if (error || !data || data.used) {
          router.push('/cbc-admin/login');
          return;
        }

        setIsValidToken(true);
        setEmail(data.email);
      } catch (err) {
        router.push('/cbc-admin/login');
      } finally {
        setIsLoading(false);
      }
    };

    validateToken();
  }, [params.token, router, supabase]);

  if (isLoading) {
    return <div>Validating invite...</div>;
  }

  if (!isValidToken || !email) {
    return null; 
  }

  return <AdminRegistration inviteToken={params.token} inviteEmail={email} />;
}