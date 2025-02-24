
const PhotoGridSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="aspect-square bg-gray-800 animate-pulse rounded-lg"
        />
      ))}
    </div>
  );
};

export default PhotoGridSkeleton;
