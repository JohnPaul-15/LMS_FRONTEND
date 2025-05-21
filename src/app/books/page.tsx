import { Plus, Search, Edit, Trash2 } from 'lucide-react';

const books = [
  {
    id: 1,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    publisher: 'Scribner',
    totalCopies: 5,
    availableCopies: 3,
  },
  {
    id: 2,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    publisher: 'Grand Central Publishing',
    totalCopies: 3,
    availableCopies: 1,
  },
  // Add more sample books as needed
];

export default function BooksPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Books Management</h1>
        <button className="btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add New Book
        </button>
      </div>

      {/* Search and Filters */}
      <div className="card bg-background-lighter">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search books..."
              className="input-field w-full pl-10"
            />
          </div>
          <select className="input-field w-48">
            <option value="">All Publishers</option>
            <option value="Scribner">Scribner</option>
            <option value="Grand Central Publishing">Grand Central Publishing</option>
          </select>
        </div>
      </div>

      {/* Books Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left p-4 font-medium text-gray-400">Title</th>
                <th className="text-left p-4 font-medium text-gray-400">Author</th>
                <th className="text-left p-4 font-medium text-gray-400">Publisher</th>
                <th className="text-left p-4 font-medium text-gray-400">Total Copies</th>
                <th className="text-left p-4 font-medium text-gray-400">Available</th>
                <th className="text-right p-4 font-medium text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id} className="border-b border-gray-800 hover:bg-background-lighter">
                  <td className="p-4">{book.title}</td>
                  <td className="p-4">{book.author}</td>
                  <td className="p-4">{book.publisher}</td>
                  <td className="p-4">{book.totalCopies}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      book.availableCopies > 0 ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                    }`}>
                      {book.availableCopies} available
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 hover:bg-background rounded-lg transition-colors">
                        <Edit className="w-5 h-5 text-accent-yellow" />
                      </button>
                      <button className="p-2 hover:bg-background rounded-lg transition-colors">
                        <Trash2 className="w-5 h-5 text-red-500" />
                      </button>
                    </div>
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