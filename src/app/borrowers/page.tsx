import { Plus, Search, UserCheck, UserX } from 'lucide-react';

const borrowers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    borrowedBooks: 2,
    status: 'active',
    dueDate: '2024-03-15',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    borrowedBooks: 1,
    status: 'overdue',
    dueDate: '2024-03-01',
  },
  // Add more sample borrowers as needed
];

export default function BorrowersPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Borrowers Management</h1>
        <button className="btn-primary flex items-center gap-2">
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
            />
          </div>
          <select className="input-field w-48">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>
      </div>

      {/* Borrowers Table */}
      <div className="card overflow-hidden">
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
              {borrowers.map((borrower) => (
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
      </div>
    </div>
  );
} 