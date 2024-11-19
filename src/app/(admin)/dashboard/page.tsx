"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Panel() {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dash</h1>
    </div>
  );
}