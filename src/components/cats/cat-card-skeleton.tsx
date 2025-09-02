const CatCardSkeleton = () => {
  return (
    <div
      className="flex justify-center"
      role="status"
      aria-busy="true"
      aria-label="Loading Cat Card"
    >
      <div className="relative w-[250px] h-[250px]">
        <div
          className="w-full h-full rounded-lg bg-gray-200 animate-pulse"
          aria-hidden="true"
        />
      </div>
    </div>
  );
};

export default CatCardSkeleton;
