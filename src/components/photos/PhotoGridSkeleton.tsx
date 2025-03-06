
const PhotoGridSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {[...Array(12)].map((_, index) => (
        <div
          key={index}
          className="aspect-square bg-gray-800 animate-pulse rounded-lg flex items-center justify-center"
        >
          <div className="text-gray-700">Loading...</div>
        </div>
      ))}
    </div>
  );
};

export default PhotoGridSkeleton;
