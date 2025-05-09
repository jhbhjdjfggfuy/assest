import Loading from '../components/loading';

export default function DashboardLoading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-7xl p-8">
        {/* Skeleton loader for dashboard header */}
        <div className="mb-8 animate-pulse">
          <div className="h-8 w-64 bg-gray-200 rounded-lg mb-4"></div>
          <div className="h-4 w-96 bg-gray-200 rounded-lg"></div>
        </div>

        {/* Skeleton loader for dashboard stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-sm animate-pulse">
              <div className="h-4 w-24 bg-gray-200 rounded mb-4"></div>
              <div className="h-8 w-32 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>

        {/* Main loading spinner */}
        <div className="flex justify-center">
          <Loading />
        </div>
      </div>
    </div>
  );
}