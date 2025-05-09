export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] space-y-4">
      <div className="relative">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200"></div>
        <div className="absolute top-0 left-0 animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
      <div className="text-gray-600 font-medium animate-pulse">
        Loading...
      </div>
      <div className="text-sm text-gray-500">
        Please wait while we process your request
      </div>
    </div>
  );
}