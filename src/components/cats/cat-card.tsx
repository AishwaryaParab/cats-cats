"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import LoadingSpinner from "../ui/loading-spinner";
import { Breed } from "@/lib/api/cats";
import { Heart } from "lucide-react";

interface CatCardProps {
  id: string;
  url: string;
  breeds?: Breed[];
  isLiked: boolean;
  onHeartClick: (e: React.MouseEvent<HTMLButtonElement>, id: string) => void;
}

const CatCard = ({ id, url, breeds, isLiked, onHeartClick }: CatCardProps) => {
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

          <button
            onClick={(e) => onHeartClick(e, id)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-200 transform hover:scale-110 active:scale-95 cursor-pointer"
            aria-label={isLiked ? "Unlike this cat" : "Like this cat"}
          >
            <Heart
              className={`w-5 h-5 transition-all duration-300 ${
                isLiked
                  ? "fill-red-500 text-red-500 scale-110"
                  : "text-gray-600 hover:text-red-500"
              }`}
              style={{
                filter: isLiked
                  ? "drop-shadow(0 0 8px rgba(239, 68, 68, 0.5))"
                  : "none",
                animation: isLiked ? "heartBeat 0.6s ease-in-out" : "none",
              }}
            />
          </button>
        </div>
        <p>{breed?.name}</p>
      </Link>
    </div>
  );
};

export default CatCard;
