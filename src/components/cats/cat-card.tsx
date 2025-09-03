"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import LoadingSpinner from "../ui/loading-spinner";
import { Breed } from "@/lib/api/cats";
import { ArrowRight, Check, Heart } from "lucide-react";
import { useCompare } from "@/context/compare-context";

interface CatCardProps {
  id: string;
  url: string;
  breeds?: Breed[];
  isLiked: boolean;
  onHeartClick: (e: React.MouseEvent<HTMLButtonElement>, id: string) => void;
}

const CatCard = ({ id, url, breeds, isLiked, onHeartClick }: CatCardProps) => {
  const [imgSrc, setImgSrc] = useState(url || "/images/cat-placeholder.png");
  const [imageLoaded, setImageLoaded] = useState(false);
  const breed: Breed | null = breeds ? breeds[0] : null;
  const {
    addToCompare,
    removeFromCompare,
    isBreedInCompare,
    isImageInCompare,
    canAddMore,
  } = useCompare();

  const handleCompareToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (breed) {
      if (isImageInCompare(id)) {
        removeFromCompare(id);
      } else if (canAddMore && !isBreedInCompare(breed.id)) {
        addToCompare({
          id,
          breedId: breed.id,
          breedName: breed.name,
          imageUrl: url,
        });
      }
    }
  };

  return (
    <div className="flex justify-center">
      <div className="bg-foreground text-background rounded-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
        <div className="relative w-[250px] h-[250px] bg-gray-100 rounded-t-lg">
          {!imageLoaded && (
            <div className="absolute inset-0 flex justify-center items-center">
              <LoadingSpinner />
            </div>
          )}
          <Image
            key={id}
            src={imgSrc}
            alt="cat-image"
            fill
            className={`object-cover rounded-t-lg transition-opacity ${
              imageLoaded ? "opacity-100" : "opacity-100"
            }`}
            sizes="250px"
            onError={() => setImgSrc("/images/cat-placeholder.png")}
            onLoad={() => setImageLoaded(true)}
          />

          {/* Favourites Button */}
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

          {/* Compare Checkbox */}
          {breed && (
            <button
              onClick={handleCompareToggle}
              className={`absolute top-4 left-4 p-2 rounded-full backdrop-blur-sm transition-all duration-200 transform hover:scale-110 active:scale-95 ${
                isImageInCompare(id)
                  ? "bg-blue-500 text-white"
                  : canAddMore || isImageInCompare(breed.id)
                  ? "bg-white/90 hover:bg-white text-gray-700 hover:text-blue-500"
                  : "bg-gray-300/60 cursor-not-allowed text-gray-400"
              }`}
              aria-label={
                isImageInCompare(id)
                  ? `Remove ${breed.name} from comparison`
                  : `Add ${breed.name} to comparison`
              }
            >
              <div className="relative w-5 h-5">
                {isImageInCompare(id) ? (
                  <Check className="w-5 h-5 animate-in zoom-in-50 duration-200" />
                ) : (
                  <div
                    className={`w-5 h-5 border-2 rounded transition-colors ${
                      canAddMore || isImageInCompare(breed.id)
                        ? "border-gray-400"
                        : "border-gray-300"
                    }`}
                  />
                )}
              </div>
            </button>
          )}
        </div>
        {breed?.name && (
          <div className="mt-2 px-2">
            <h3 className="text-lg font-semibold text-center">{breed.name}</h3>
          </div>
        )}

        <div className="flex justify-center">
          <Link href={`/cats/${id}`}>
            <button
              className="px-6 py-2 font-medium hover:underline cursor-pointer"
              aria-label={`View detailed information about ${
                breed?.name || "this cat"
              }`}
            >
              <div className="flex items-center gap-2">
                <span>View Details</span>
                <ArrowRight className="w-5 h-5" />
              </div>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CatCard;
