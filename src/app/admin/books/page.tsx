'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Pencil, Trash2, BookOpen } from 'lucide-react';
import BooksService, { Book, CreateBookData, UpdateBookData } from '@/lib/api/books';
import { useAuth } from '@/context/AuthContext';

export default function BooksManagementPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [formData, setFormData] = useState<CreateBookData>({
    title: '',
    author: '',
    isbn: '',
    genre: '',
    description: '',
    total_copies: 1,
    publisher: '',
    publication_year: new Date().getFullYear(),
    language: 'English',
  });
  const [coverImage, setCoverImage] = useState<File | null>(null);

  // Check if user is admin
  useEffect(() => {
    if (user && user.role !== 'admin') {
      router.push('/dashboard');
    }
  }, [user, router]);

  // Load books
  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await BooksService.getAllBooks();
      if (response.success) {
        setBooks(response.data);
      } else {
        setError(response.message || 'Failed to load books');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load books');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError(null);
      const submitData = { ...formData };

      if (editingBook) {
        const response = await BooksService.updateBook(editingBook.id, submitData);
        if (!response.success) {
          throw new Error(response.message);
        }
      } else {
        const response = await BooksService.createBook(submitData);
        if (!response.success) {
          throw new Error(response.message);
        }
      }

      setIsModalOpen(false);
      setEditingBook(null);
      setFormData({
        title: '',
        author: '',
        isbn: '',
        genre: '',
        description: '',
        total_copies: 1,
        publisher: '',
        publication_year: new Date().getFullYear(),
        language: 'English',
      });
      setCoverImage(null);
      loadBooks();
    } catch (err: any) {
      setError(err.message || 'Failed to save book');
    }
  };

  const handleEdit = (book: Book) => {
    setEditingBook(book);
    setFormData({
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      genre: book.genre || '',
      description: book.description,
      total_copies: book.total_copies,
      publisher: book.publisher || '',
      publication_year: book.publication_year || new Date().getFullYear(),
      language: book.language || 'English',
    });
    setCoverImage(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this book?')) return;
    try {
      setError(null);
      const response = await BooksService.deleteBook(id);
      if (!response.success) {
        throw new Error(response.message);
      }
      loadBooks();
    } catch (err: any) {
      setError(err.message || 'Failed to delete book');
    }
  };

  const handleCreate = () => {
    setEditingBook(null);
    setFormData({
      title: '',
      author: '',
      isbn: '',
      genre: '',
      description: '',
      total_copies: 1,
      publisher: '',
      publication_year: new Date().getFullYear(),
      language: 'English',
    });
    setCoverImage(null);
    setIsModalOpen(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCoverImage(e.target.files[0]);
    }
  };

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
        <h1 className="text-2xl font-bold text-accent-orange">Books Management</h1>
        <button
          onClick={handleCreate}
          className="btn-primary flex items-center gap-2"
          type="button"
        >
          <Plus className="w-5 h-5" />
          Add New Book
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500">
          {error}
        </div>
      )}

      <div className="bg-background-lighter rounded-lg shadow-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-background-darker text-left">
              <th className="p-4">Title</th>
              <th className="p-4">Author</th>
              <th className="p-4">ISBN</th>
              <th className="p-4">Genre</th>
              <th className="p-4">Available</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id} className="border-t border-gray-700">
                <td className="p-4">{book.title}</td>
                <td className="p-4">{book.author}</td>
                <td className="p-4">{book.isbn}</td>
                <td className="p-4">{book.genre || '-'}</td>
                <td className="p-4">
                  {book.available_copies} / {book.total_copies}
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(book)}
                      className="p-2 text-blue-500 hover:text-blue-400"
                    >
                      <Pencil className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(book.id)}
                      className="p-2 text-red-500 hover:text-red-400"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal - Fixed positioning and z-index */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="bg-background-lighter rounded-lg p-6 w-full max-w-md relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-300"
            >
              ×
            </button>
            <h2 className="text-xl font-bold text-accent-orange mb-4">
              {editingBook ? 'Edit Book' : 'Add New Book'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Form fields remain the same */}
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editingBook ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}