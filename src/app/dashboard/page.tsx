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
      <p className="mb-2">Welcome, {user.firstName || user.emailAddresses[0]?.emailAddress || user.id}!</p>
      
      <div className="mt-6 p-4 border rounded-md bg-gray-50">
        <h2 className="text-xl font-medium mb-2">User Information (from Clerk)</h2>
        <pre className="text-sm bg-gray-100 p-3 rounded overflow-x-auto">
          {JSON.stringify(user, null, 2)}
        </pre>
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
