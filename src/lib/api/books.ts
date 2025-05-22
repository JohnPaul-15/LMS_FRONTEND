import { API_CONFIG } from './config';

export interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  genre?: string;
  description: string;
  total_copies: number;
  available_copies: number;
  publisher?: string;
  publication_year?: number;
  language?: string;
  cover_image?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateBookData {
  title: string;
  author: string;
  isbn: string;
  genre?: string;
  description: string;
  total_copies: number;
  publisher?: string;
  publication_year?: number;
  language?: string;
  cover_image?: File;
}

export interface UpdateBookData extends Partial<CreateBookData> {}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  meta?: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export interface Transaction {
  id: number;
  book: Book;
  borrowed_at: string;
  due_date: string;
  returned_at?: string;
  status: 'borrowed' | 'returned' | 'overdue';
}

export interface AdminTransaction extends Transaction {
  user: {
    id: number;
    name: string;
    email: string;
  };
}

class BooksService {
  private baseUrl = API_CONFIG.BASE_URL;

  // Helper method to handle API requests
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = new Headers(API_CONFIG.DEFAULT_HEADERS);

    // Add auth token if it exists
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      headers.append('Authorization', `Bearer ${token}`);
    }

    // Handle FormData for file uploads
    let body = options.body;
    if (options.body instanceof FormData) {
      headers.delete('Content-Type'); // Let the browser set the correct content type
    } else if (typeof options.body === 'object') {
      body = JSON.stringify(options.body);
    }

    // Add any additional headers from options
    if (options.headers) {
      if (options.headers instanceof Headers) {
        options.headers.forEach((value, key) => headers.append(key, value));
      } else if (Array.isArray(options.headers)) {
        options.headers.forEach(([key, value]) => headers.append(key, value));
      } else {
        Object.entries(options.headers).forEach(([key, value]) => {
          if (value) headers.append(key, value);
        });
      }
    }

    const response = await fetch(url, {
      ...options,
      headers,
      body,
      credentials: 'include',
    });

    const data = await response.json();

    if (!response.ok) {
      throw {
        message: data.message || 'An error occurred',
        errors: data.errors,
        status: response.status,
      };
    }

    return data;
  }

  // Get all books
  async getAllBooks(params?: { 
    search?: string;
    genre?: string;
    available?: boolean;
    sort_by?: string;
    sort_order?: 'asc' | 'desc';
    page?: number;
    per_page?: number;
  }): Promise<ApiResponse<Book[]>> {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }
    const queryString = queryParams.toString();
    return this.request<Book[]>(`/books${queryString ? `?${queryString}` : ''}`);
  }

  // Get a single book
  async getBook(id: number): Promise<ApiResponse<Book>> {
    return this.request<Book>(`/books/${id}`);
  }

  // Create a new book
  async createBook(data: CreateBookData): Promise<ApiResponse<Book>> {
    const formData = new FormData();
    
    // Append all fields to FormData
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) {
        if (key === 'cover_image' && value instanceof File) {
          formData.append(key, value);
        } else if (value !== null && value !== undefined) {
          formData.append(key, value.toString());
        }
      }
    });

    return this.request<Book>('/books', {
      method: 'POST',
      body: formData,
    });
  }

  // Update a book
  async updateBook(id: number, data: UpdateBookData): Promise<ApiResponse<Book>> {
    const formData = new FormData();
    
    // Append all fields to FormData
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) {
        if (key === 'cover_image' && value instanceof File) {
          formData.append(key, value);
        } else if (value !== null && value !== undefined) {
          formData.append(key, value.toString());
        }
      }
    });

    return this.request<Book>(`/books/${id}`, {
      method: 'PUT',
      body: formData,
    });
  }

  // Delete a book
  async deleteBook(id: number): Promise<ApiResponse<void>> {
    return this.request<void>(`/books/${id}`, {
      method: 'DELETE',
    });
  }

  // Restore a deleted book
  async restoreBook(id: number): Promise<ApiResponse<Book>> {
    return this.request<Book>(`/books/${id}/restore`, {
      method: 'POST',
    });
  }

  // Get user's borrowed books
  async getUserBorrowedBooks(): Promise<ApiResponse<Transaction[]>> {
    return this.request<Transaction[]>('/transactions/my-books');
  }

  // Get all transactions (admin only)
  async getAllTransactions(): Promise<ApiResponse<AdminTransaction[]>> {
    return this.request<AdminTransaction[]>('/transactions');
  }

  // Return a book
  async returnBook(transactionId: number): Promise<ApiResponse<void>> {
    return this.request<void>(`/transactions/${transactionId}/return`, {
      method: 'POST',
    });
  }
}

export default new BooksService(); 