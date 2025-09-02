const CatDetailsSkeleton = () => {
  return (
    <>
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-5 h-5 bg-gray-200 rounded animate-pulse" />
          <div className="w-24 h-5 bg-gray-200 rounded animate-pulse" />
        </div>

        <div className="flex items-center space-x-3 mb-2">
          <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
          <div className="w-64 h-8 bg-gray-200 rounded animate-pulse" />
        </div>

        <div className="w-48 h-5 bg-gray-200 rounded animate-pulse mt-2" />
      </div>

      <section className="flex flex-col lg:flex-row gap-4">
        <div className="relative lg:w-1/2 h-96 lg:h-[500px] bg-gray-200 rounded-lg animate-pulse">
          <div className="absolute top-4 right-4 w-9 h-9 bg-white/90 rounded-full animate-pulse" />
        </div>

        <div className="lg:w-1/2 flex flex-col gap-4">
          <div className="w-48 h-8 bg-gray-200 rounded animate-pulse" />

          <div>
            <div className="w-24 h-6 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="space-y-2">
              <div className="w-full h-4 bg-gray-200 rounded animate-pulse" />
              <div className="w-full h-4 bg-gray-200 rounded animate-pulse" />
              <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="w-16 h-5 bg-gray-200 rounded animate-pulse mb-1" />
              <div className="w-20 h-4 bg-gray-200 rounded animate-pulse" />
            </div>

            <div>
              <div className="w-20 h-5 bg-gray-200 rounded animate-pulse mb-1" />
              <div className="w-16 h-4 bg-gray-200 rounded animate-pulse" />
            </div>

            <div>
              <div className="w-16 h-5 bg-gray-200 rounded animate-pulse mb-1" />
              <div className="w-12 h-4 bg-gray-200 rounded animate-pulse" />
            </div>

            <div>
              <div className="w-24 h-5 bg-gray-200 rounded animate-pulse mb-1" />
              <div className="w-8 h-4 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>

          <div>
            <div className="w-28 h-6 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="flex flex-wrap gap-2">
              <div className="w-16 h-7 bg-gray-200 rounded-full animate-pulse" />
              <div className="w-20 h-7 bg-gray-200 rounded-full animate-pulse" />
              <div className="w-18 h-7 bg-gray-200 rounded-full animate-pulse" />
              <div className="w-22 h-7 bg-gray-200 rounded-full animate-pulse" />
              <div className="w-16 h-7 bg-gray-200 rounded-full animate-pulse" />
              <div className="w-24 h-7 bg-gray-200 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CatDetailsSkeleton;
