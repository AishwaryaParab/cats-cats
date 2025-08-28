import React from "react";

const CatCardSkeleton = () => {
  return (
    <div className="flex justify-center">
      <div className="relative w-[250px] h-[250px]">
        <div className="w-full h-full rounded-lg bg-gray-200 animate-pulse" />
      </div>
    </div>
  );
};

export default CatCardSkeleton;
