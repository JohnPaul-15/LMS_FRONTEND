import { Plus, Search, Shield, UserCog } from 'lucide-react';

const users = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@libdash.com',
    role: 'admin',
    status: 'active',
    lastLogin: '2024-03-10 14:30',
  },
  {
    id: 2,
    name: 'Librarian User',
    email: 'librarian@libdash.com',
    role: 'librarian',
    status: 'active',
    lastLogin: '2024-03-09 09:15',
  },
  // Add more sample users as needed
];

export default function UsersPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Users Management</h1>
        <button className="btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add New User
        </button>
      </div>

      {/* Search and Filters */}
      <div className="card bg-background-lighter">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search users..."
              className="input-field w-full pl-10"
            />
          </div>
          <select className="input-field w-48">
            <option value="">All Roles</option>
            <option value="admin">Admin</option>
            <option value="librarian">Librarian</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left p-4 font-medium text-gray-400">Name</th>
                <th className="text-left p-4 font-medium text-gray-400">Email</th>
                <th className="text-left p-4 font-medium text-gray-400">Role</th>
                <th className="text-left p-4 font-medium text-gray-400">Status</th>
                <th className="text-left p-4 font-medium text-gray-400">Last Login</th>
                <th className="text-right p-4 font-medium text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-gray-800 hover:bg-background-lighter">
                  <td className="p-4">{user.name}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-sm flex items-center gap-1 ${
                      user.role === 'admin'
                        ? 'bg-purple-500/10 text-purple-500'
                        : 'bg-blue-500/10 text-blue-500'
                    }`}>
                      {user.role === 'admin' ? (
                        <>
                          <Shield className="w-4 h-4" />
                          Admin
                        </>
                      ) : (
                        <>
                          <UserCog className="w-4 h-4" />
                          Librarian
                        </>
                      )}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 rounded-full text-sm bg-green-500/10 text-green-500">
                      Active
                    </span>
                  </td>
                  <td className="p-4 text-gray-400">{user.lastLogin}</td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="btn-secondary text-sm py-1">
                        Edit Role
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