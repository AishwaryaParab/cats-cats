"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import LoadingSpinner from "../ui/loading-spinner";
import { Breed } from "@/lib/api/cats";

interface CatCardProps {
  id: string;
  url: string;
  breeds?: Breed[];
}

const CatCard = ({ id, url, breeds }: CatCardProps) => {
  const [imgSrc, setImageSrc] = useState(url || "/images/cat-placeholder.png");
  const [imageLoaded, setImageLoaded] = useState(false);
  const breed = breeds ? breeds[0] : null;
  return (
    <div className="flex justify-center">
      <Link
        href={`/cats/${id}`}
        className="cursor-pointer"
        aria-label={`View details about ${breed?.name || "this cat"}`}
      >
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
            className={`object-cover rounded-lg transition-opacity ${
              imageLoaded ? "opacity-100" : "opacity-100"
            }`}
            sizes="250px"
            onError={() => setImageSrc("/images/cat-placeholder.png")}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
        <p>{breed?.name}</p>
      </Link>
    </div>
  );
};

export default CatCard;
