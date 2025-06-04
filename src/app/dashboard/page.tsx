import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const user = await currentUser();

  if (!user) {
    // This should ideally be handled by middleware, but as a fallback
    redirect('/sign-in');
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
      <p className="mb-6 text-lg">Welcome, {user.firstName || user.emailAddresses[0]?.emailAddress || user.id}!</p>
      
      {/* You can start building your dashboard content here. */}
      <div className="p-4 border rounded-md bg-white shadow">
        <h2 className="text-xl font-medium mb-3">Portal Home</h2>
        <p className="text-gray-700">
          This is your main dashboard area. Future updates will include order summaries, quick actions, and more.
        </p>
        {/* Example placeholder for future content */}
        {/*
        <div className="mt-4">
          <h3 className="text-lg font-medium">Quick Links</h3>
          <ul className="list-disc list-inside mt-2">
            <li><a href="/orders" className="text-blue-600 hover:underline">View Orders</a></li>
            <li><a href="/profile" className="text-blue-600 hover:underline">Manage Profile</a></li>
          </ul>
        </div>
        */}
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
