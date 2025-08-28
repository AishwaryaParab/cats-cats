"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import LoadingSpinner from "../ui/loading-spinner";

interface CatCardProps {
  id: string;
  url: string;
}

const CatCard = ({ id, url }: CatCardProps) => {
  const [imgSrc, setImageSrc] = useState(url || "/images/cat-placeholder.png");
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="flex justify-center">
      <Link href={`/cats/${id}`} className="cursor-pointer">
        <div className="relative w-[250px] h-[250px] bg-gray-100 rounded-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
          {!imageLoaded && (
            <div className="absolute inset-0 flex justify-center items-center">
              <LoadingSpinner />
            </div>
          )}
          <Image
            key={id}
            src={imgSrc}
            alt="cat-image"
            // width={cat.width}
            // height={cat.height}
            fill
            className={`object-cover rounded-lg ${
              imageLoaded ? "opacity-100" : "opacity-100"
            }`}
            onError={() => setImageSrc("/images/cat-placeholder.png")}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
      </Link>
    </div>
  );
};

export default CatCard;
