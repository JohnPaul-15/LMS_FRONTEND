'use client';

import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  BookOpen,
  Users,
  UserCircle,
  LogIn,
  LogOut,
} from 'lucide-react';
import AuthService from '@/lib/api/auth';

interface DashboardLayoutProps {
  children: ReactNode;
}

const sidebarItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/books', icon: BookOpen, label: 'Books' },
  { href: '/borrowers', icon: Users, label: 'Borrowers' },
  { href: '/users', icon: UserCircle, label: 'Users' },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await AuthService.logout();
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      // Still redirect to login even if the API call fails
      router.push('/login');
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-background-light border-r border-gray-800 fixed h-full">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-accent-orange">LibDash</h1>
        </div>
        
        <nav className="mt-6 px-3">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`sidebar-link ${isActive ? 'active' : ''}`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
          
          <div className="mt-6 pt-6 border-t border-gray-800">
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="sidebar-link w-full text-left disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <LogOut className="w-5 h-5" />
              <span>{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        {children}
      </main>
    </div>
  );
} 