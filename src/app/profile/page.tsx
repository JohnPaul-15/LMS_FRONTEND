'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BookOpen, User, Mail, Calendar } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import AuthService from '@/lib/api/auth';
import BooksService from '@/lib/api/books';
import type { Transaction } from '@/lib/api/books';

export default function ProfilePage() {
  const router = useRouter();
  const { user, updateUser } = useAuth();
  const [borrowedBooks, setBorrowedBooks] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    current_password: '',
    new_password: '',
    new_password_confirmation: '',
  });

  // Load borrowed books
  useEffect(() => {
    if (user) {
      loadBorrowedBooks();
    }
  }, [user]);

  const loadBorrowedBooks = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await BooksService.getUserBorrowedBooks();
      setBorrowedBooks(response.data);
    } catch (err: any) {
      setError(err.message || 'Failed to load borrowed books');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError(null);
      const response = await AuthService.updateProfile(formData);
      updateUser(response.data);
      setIsEditing(false);
      setFormData({
        ...formData,
        current_password: '',
        new_password: '',
        new_password_confirmation: '',
      });
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-accent-orange border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Section */}
        <div className="md:col-span-1">
          <div className="bg-background-lighter rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-accent-orange/10 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-accent-orange" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-accent-orange">{user.name}</h1>
                <p className="text-gray-400 capitalize">{user.role}</p>
              </div>
            </div>

            {!isEditing ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-gray-300">
                  <Mail className="w-5 h-5" />
                  <span>{user.email}</span>
                </div>
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn-primary w-full"
                >
                  Edit Profile
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500">
                    {error}
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input-field w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="input-field w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={formData.current_password}
                    onChange={(e) => setFormData({ ...formData, current_password: e.target.value })}
                    className="input-field w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={formData.new_password}
                    onChange={(e) => setFormData({ ...formData, new_password: e.target.value })}
                    className="input-field w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={formData.new_password_confirmation}
                    onChange={(e) => setFormData({ ...formData, new_password_confirmation: e.target.value })}
                    className="input-field w-full"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="btn-secondary flex-1"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary flex-1">
                    Save Changes
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Borrowed Books Section */}
        <div className="md:col-span-2">
          <div className="bg-background-lighter rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-700">
              <h2 className="text-xl font-bold text-accent-orange">Borrowed Books</h2>
            </div>
            {isLoading ? (
              <div className="p-6 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-accent-orange border-t-transparent rounded-full animate-spin" />
              </div>
            ) : borrowedBooks.length === 0 ? (
              <div className="p-6 text-center text-gray-400">
                You haven't borrowed any books yet.
              </div>
            ) : (
              <div className="divide-y divide-gray-700">
                {borrowedBooks.map((transaction) => (
                  <div key={transaction.id} className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-accent-orange/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <BookOpen className="w-6 h-6 text-accent-orange" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-accent-orange">
                          {transaction.book.title}
                        </h3>
                        <p className="text-sm text-gray-400 mb-2">
                          by {transaction.book.author}
                        </p>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-400">Borrowed:</span>{' '}
                            {new Date(transaction.borrowed_at).toLocaleDateString()}
                          </div>
                          <div>
                            <span className="text-gray-400">Due:</span>{' '}
                            {new Date(transaction.due_date).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="mt-2">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              transaction.status === 'returned'
                                ? 'bg-green-100 text-green-800'
                                : transaction.status === 'overdue'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 