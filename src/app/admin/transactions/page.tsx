'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BookOpen, CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import BooksService, { AdminTransaction } from '@/lib/api/books';

export default function TransactionsManagementPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<AdminTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'returned'>('all');

  // Check if user is admin
  useEffect(() => {
    if (user && user.role !== 'admin') {
      router.push('/dashboard');
    }
  }, [user, router]);

  // Load transactions
  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await BooksService.getAllTransactions();
      setTransactions(response.data);
    } catch (err: any) {
      setError(err.message || 'Failed to load transactions');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReturn = async (transactionId: number) => {
    try {
      setError(null);
      await BooksService.returnBook(transactionId);
      loadTransactions();
    } catch (err: any) {
      setError(err.message || 'Failed to return book');
    }
  };

  const filteredTransactions = transactions.filter((transaction) => {
    if (filter === 'all') return true;
    if (filter === 'active') return !transaction.returned_at;
    if (filter === 'returned') return !!transaction.returned_at;
    return true;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-accent-orange border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-accent-orange">Transactions Management</h1>
        <div className="flex gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as typeof filter)}
            className="input-field"
          >
            <option value="all">All Transactions</option>
            <option value="active">Active Borrowings</option>
            <option value="returned">Returned Books</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500">
          {error}
        </div>
      )}

      <div className="bg-background-lighter rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-background-darker text-left">
                <th className="p-4 text-gray-300">Book</th>
                <th className="p-4 text-gray-300">Borrower</th>
                <th className="p-4 text-gray-300">Borrowed Date</th>
                <th className="p-4 text-gray-300">Due Date</th>
                <th className="p-4 text-gray-300">Returned Date</th>
                <th className="p-4 text-gray-300">Status</th>
                <th className="p-4 text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-t border-gray-700">
                  <td className="p-4 text-gray-300">
                    <div>
                      <div className="font-medium">{transaction.book.title}</div>
                      <div className="text-sm text-gray-400">{transaction.book.author}</div>
                    </div>
                  </td>
                  <td className="p-4 text-gray-300">
                    <div>
                      <div className="font-medium">{transaction.user.name}</div>
                      <div className="text-sm text-gray-400">{transaction.user.email}</div>
                    </div>
                  </td>
                  <td className="p-4 text-gray-300">
                    {new Date(transaction.borrowed_at).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-gray-300">
                    {new Date(transaction.due_date).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-gray-300">
                    {transaction.returned_at
                      ? new Date(transaction.returned_at).toLocaleDateString()
                      : '-'}
                  </td>
                  <td className="p-4">
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
                  </td>
                  <td className="p-4">
                    {!transaction.returned_at && (
                      <button
                        onClick={() => handleReturn(transaction.id)}
                        className="p-2 text-green-500 hover:text-green-400 transition-colors"
                        title="Return Book"
                      >
                        <CheckCircle className="w-5 h-5" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 