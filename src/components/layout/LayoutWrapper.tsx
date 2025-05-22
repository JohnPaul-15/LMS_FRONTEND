'use client';

import { usePathname } from 'next/navigation';
import DashboardLayout from './DashboardLayout';

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Check if the current route is an auth route (including login)
  const isAuthRoute = pathname?.startsWith('/login') || 
                     pathname?.startsWith('/register') || 
                     pathname?.startsWith('/forgot-password');

  if (isAuthRoute) {
    // Render all auth pages (including login) without dashboard layout
    return <>{children}</>;
  }

  // Render only dashboard pages with dashboard layout
  return <DashboardLayout>{children}</DashboardLayout>;
} 