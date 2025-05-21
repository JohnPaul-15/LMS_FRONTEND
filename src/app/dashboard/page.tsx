import { BookOpen, Users, BookCheck, UserCheck } from 'lucide-react';

const metrics = [
  {
    title: 'Total Books',
    value: '2,451',
    icon: BookOpen,
    change: '+12%',
    color: 'text-accent-orange',
  },
  {
    title: 'Active Borrowers',
    value: '183',
    icon: Users,
    change: '+5%',
    color: 'text-accent-yellow',
  },
  {
    title: 'Available Copies',
    value: '1,892',
    icon: BookCheck,
    change: '+8%',
    color: 'text-green-500',
  },
  {
    title: 'Total Users',
    value: '324',
    icon: UserCheck,
    change: '+15%',
    color: 'text-blue-500',
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="card bg-background-lighter">
        <div className="flex items-center justify-between">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-bold mb-4">
              Welcome to LibDash
            </h1>
            <p className="text-gray-300 mb-6">
              Your modern library management system. Track books, manage borrowers, and keep your library running smoothly.
            </p>
            <button className="btn-primary">
              Learn More
            </button>
          </div>
          <div className="hidden lg:block">
            {/* Placeholder for illustration */}
            <div className="w-64 h-64 bg-background-light rounded-full flex items-center justify-center">
              <BookOpen className="w-32 h-32 text-accent-orange opacity-20" />
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.title} className="card hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-background ${metric.color} bg-opacity-10`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium text-green-500">
                  {metric.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-1">{metric.value}</h3>
              <p className="text-gray-400">{metric.title}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Activity Section */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {/* Placeholder for activity items */}
          <div className="flex items-center justify-between p-4 bg-background rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent-orange bg-opacity-10 rounded-lg">
                <BookOpen className="w-5 h-5 text-accent-orange" />
              </div>
              <div>
                <p className="font-medium">New book added</p>
                <p className="text-sm text-gray-400">The Great Gatsby by F. Scott Fitzgerald</p>
              </div>
            </div>
            <span className="text-sm text-gray-400">2 hours ago</span>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-background rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent-yellow bg-opacity-10 rounded-lg">
                <Users className="w-5 h-5 text-accent-yellow" />
              </div>
              <div>
                <p className="font-medium">New borrower registered</p>
                <p className="text-sm text-gray-400">John Doe</p>
              </div>
            </div>
            <span className="text-sm text-gray-400">5 hours ago</span>
          </div>
        </div>
      </div>
    </div>
  );
} 