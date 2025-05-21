'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BookOpen,
  Users,
  UserCircle,
  LogIn,
  LogOut,
} from 'lucide-react';

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
            <Link href="/login" className="sidebar-link">
              <LogIn className="w-5 h-5" />
              <span>Login</span>
            </Link>
            <button className="sidebar-link w-full">
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
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