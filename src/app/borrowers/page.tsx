'use client';

import { useState, useEffect } from 'react';
import { Plus, Search, UserCheck, UserX, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { BorrowersService, Borrower, CreateBorrowerData } from '@/lib/api/borrowers';
import { Book } from '@/lib/api/books';

export default function BorrowersPage() {
  const { user } = useAuth();
  const [borrowers, setBorrowers] = useState<Borrower[]>([]);
  const [availableBooks, setAvailableBooks] = useState<Book[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState<CreateBorrowerData>({
    name: '',
    email: '',
    borrowed_book_id: undefined,
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadBorrowers();
    loadAvailableBooks();
  }, []);

  const loadBorrowers = async () => {
    try {
      const response = await BorrowersService.getAllBorrowers();
      if (response.success) {
        setBorrowers(response.data);
      } else {
        setError(response.message);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load borrowers');
    } finally {
      setIsLoading(false);
    }
  };

  const loadAvailableBooks = async () => {
    try {
      const response = await BorrowersService.getAvailableBooks();
      if (response.success) {
        setAvailableBooks(response.data);
      }
    } catch (err: any) {
      console.error('Failed to load available books:', err);
    }
  };

  const handleAddBorrower = () => {
    setIsModalOpen(true);
    setFormData({ name: '', email: '', borrowed_book_id: undefined });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      console.log('Submitting borrower data:', formData); // Debug log
      const response = await BorrowersService.createBorrower(formData);
      console.log('API Response:', response); // Debug log
      
      if (response.success) {
        await loadBorrowers(); // Reload the borrowers list
        setIsModalOpen(false);
        setFormData({ name: '', email: '', borrowed_book_id: undefined });
      } else {
        setError(response.message || 'Failed to add borrower');
      }
    } catch (err: any) {
      console.error('Error creating borrower:', err); // Debug log
      setError(err.message || 'Failed to add borrower. Please try again.');
    }
  };

  const filteredBorrowers = borrowers.filter(borrower => {
    const matchesSearch = borrower.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         borrower.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !statusFilter || borrower.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-accent-orange">Borrowers Management</h1>
        <button 
          onClick={handleAddBorrower}
          className="btn-primary flex items-center gap-2"
          type="button"
        >
          <Plus className="w-5 h-5" />
          Add New Borrower
        </button>
      </div>

      {/* Search and Filters */}
      <div className="card bg-background-lighter">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search borrowers..."
              className="input-field w-full pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select 
            className="input-field w-48"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>
      </div>

      {/* Borrowers Table */}
      <div className="card overflow-hidden">
        {isLoading ? (
          <div className="p-4 text-center text-gray-400">Loading borrowers...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left p-4 font-medium text-gray-400">Name</th>
                  <th className="text-left p-4 font-medium text-gray-400">Email</th>
                  <th className="text-left p-4 font-medium text-gray-400">Borrowed Books</th>
                  <th className="text-left p-4 font-medium text-gray-400">Status</th>
                  <th className="text-left p-4 font-medium text-gray-400">Due Date</th>
                  <th className="text-right p-4 font-medium text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBorrowers.map((borrower) => (
                  <tr key={borrower.id} className="border-b border-gray-800 hover:bg-background-lighter">
                    <td className="p-4">{borrower.name}</td>
                    <td className="p-4">{borrower.email}</td>
                    <td className="p-4">{borrower.borrowedBooks}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        borrower.status === 'active'
                          ? 'bg-green-500/10 text-green-500'
                          : 'bg-red-500/10 text-red-500'
                      }`}>
                        {borrower.status === 'active' ? (
                          <span className="flex items-center gap-1">
                            <UserCheck className="w-4 h-4" />
                            Active
                          </span>
                        ) : (
                          <span className="flex items-center gap-1">
                            <UserX className="w-4 h-4" />
                            Overdue
                          </span>
                        )}
                      </span>
                    </td>
                    <td className="p-4">{borrower.dueDate}</td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <button className="btn-secondary text-sm py-1">
                          View Details
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Borrower Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div 
            className="bg-background-lighter rounded-lg p-6 w-full max-w-md relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-300"
              type="button"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold text-accent-orange mb-4">Add New Borrower</h2>
            
            {error && (
              <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
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
                  Book to Borrow (Optional)
                </label>
                <select
                  value={formData.borrowed_book_id?.toString() || ''}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    borrowed_book_id: e.target.value ? Number(e.target.value) : undefined 
                  })}
                  className="input-field w-full"
                >
                  <option value="">Select a book</option>
                  {availableBooks.map((book) => (
                    <option key={book.id} value={book.id}>
                      {book.title} - {book.author} (Available: {book.available_copies})
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Add Borrower
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 