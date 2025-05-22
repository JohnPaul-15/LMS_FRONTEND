import { apiClient } from './apiClient';
import { Book } from './books';

export interface Borrower {
  id: number;
  name: string;
  email: string;
  borrowedBooks: number;
  status: 'active' | 'overdue';
  dueDate: string;
  borrowed_book_id?: number;
}

export interface CreateBorrowerData {
  name: string;
  email: string;
  borrowed_book_id?: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export class BorrowersService {
  static async getAllBorrowers(): Promise<ApiResponse<Borrower[]>> {
    const response = await apiClient.get('/borrowers');
    return response.data;
  }

  static async createBorrower(data: CreateBorrowerData): Promise<ApiResponse<Borrower>> {
    const response = await apiClient.post('/borrowers', data);
    return response.data;
  }

  static async getAvailableBooks(): Promise<ApiResponse<Book[]>> {
    const response = await apiClient.get('/books/available');
    return response.data;
  }
} 