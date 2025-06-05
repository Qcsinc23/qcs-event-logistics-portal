import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Link from 'next/link'; // Import Link

export default async function DashboardPage() {
  const user = await currentUser();

  if (!user) {
    // This should ideally be handled by middleware, but as a fallback
    redirect('/sign-in');
  }

  return (
    <div className="text-text-dark-gray dark:text-dark-text-primary">
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
      <p className="mb-6 text-lg">Welcome, {user.firstName || user.emailAddresses[0]?.emailAddress || user.id}!</p>
      
      <div className="p-4 border dark:border-slate-700 rounded-md bg-white dark:bg-dark-surface shadow">
        <h2 className="text-xl font-medium mb-3">Portal Home</h2>
        <p className="text-gray-700 dark:text-dark-text-secondary">
          This is your main dashboard area. Future updates will include order summaries, quick actions, and more.
        </p>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link href="/(portal)/orders/create" className="text-indigo-600 dark:text-indigo-400 hover:underline">Create New Order</Link></li>
            <li><Link href="/(portal)/end-customers" className="text-indigo-600 dark:text-indigo-400 hover:underline">Manage End Customers</Link></li>
            {/* <li><Link href="/(portal)/orders" className="text-indigo-600 dark:text-indigo-400 hover:underline">View All Orders</Link></li> */}
            {/* <li><Link href="/user-profile" className="text-indigo-600 dark:text-indigo-400 hover:underline">Manage Your Profile</Link></li> */}
          </ul>
        </div>
      </div>

      {/* Placeholder for QCSUserProfile data if synced */}
      {/* We'll add fetching and displaying QCSUserProfile data later */}
      {/* 
      <div className="mt-6 p-4 border rounded-md bg-gray-50">
        <h2 className="text-xl font-medium mb-2">User Profile (from QCS Database)</h2>
        <p>Profile data from your database will appear here once synced and fetched.</p>
      </div>
      */}
    </div>
  );
}
