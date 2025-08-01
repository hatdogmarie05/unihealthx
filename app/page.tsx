'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to login page on app load
    router.push('/login');
  }, [router]);

  return (
    <div className="min-h-screen healthcare-gradient flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-primary mb-2">UniHealth Admin Portal</h1>
        <p className="text-muted-foreground">Redirecting to login...</p>
      </div>
    </div>
  );
}