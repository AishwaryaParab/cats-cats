import { useFavourites } from "@/hooks/cats/useFavourites";
import { Cat } from "@/lib/api/cats";
import { ArrowLeft, CatIcon, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CatCharacteristics from "./cat-characteristics";

interface CatDetailsProps {
  cat: Cat;
}

const CatDetails = ({ cat }: CatDetailsProps) => {
  const breed = cat?.breeds?.[0];
  const { toggleFavourite, isFavourite } = useFavourites();
  const isLiked = isFavourite(cat.id);

  const handleLike = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await toggleFavourite(id);
    } catch (err) {
      console.error("Error toggling favourite: ", err);
    }
  };

  return (
    <>
      <div className="mb-8">
        <Link href="/">
          <button className="flex items-center space-x-2 text-foreground hover:text-muted mb-4 cursor-pointer">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-foreground hover:text-muted">
              Back to cats
            </span>
          </button>
        </Link>

        <div className="flex items-center space-x-3">
          <CatIcon className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold text-primary">
            More about {breed?.name || "this cat"}
          </h1>
        </div>
        <p className="text-foreground mt-2">
          Learn about {breed?.name || "this cat"}’s unique traits, personality,
          and care needs. Perfect for curious cat lovers and future pet parents!
        </p>
      </div>

      <section className="flex flex-col lg:flex-row gap-4">
        <div className="relative lg:w-1/2 h-100 rounded-lg">
          <Image
            src={cat.url}
            alt={breed ? `${breed.name} cat image` : "Beautiful cat image"}
            fill
            className="object-cover rounded-lg"
          />
          <button
            onClick={(e) => handleLike(e, cat.id)}
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

        {breed ? (
          <div className="lg:w-1/2 flex flex-col gap-4">
            <h1 className="text-2xl font-bold text-primary">{breed.name}</h1>

            <div>
              {breed.description && (
                <div>
                  <h3 className="text-primary font-semibold">Description</h3>
                  <p>{breed.description}</p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {breed.origin && (
                <div>
                  <span className="text-primary font-semibold">Origin:</span>
                  <p>{breed.origin}</p>
                </div>
              )}

              {breed.life_span && (
                <div>
                  <span className="text-primary font-semibold">Life Span:</span>
                  <p>{breed.life_span} years</p>
                </div>
              )}

              {breed.weight?.metric && (
                <div>
                  <span className="text-primary font-semibold">Weight:</span>
                  <p>{breed.weight.metric} kg</p>
                </div>
              )}

              {breed.energy_level && (
                <div>
                  <span className="text-primary font-semibold">
                    Energy Level:
                  </span>
                  <p>{breed.energy_level}/5</p>
                </div>
              )}
            </div>

            <div>
              {breed.temperament && (
                <div>
                  <span className="text-primary font-semibold">
                    Temperament
                  </span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {breed.temperament.split(", ").map((temp, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-primary text-white rounded-full text-sm"
                      >
                        {temp}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>
            <h1 className="text-2xl font-bold text-primary">Beautiful Cat</h1>
            <p>
              This lovely cat doesn't have breed information available, but
              isn't it gorgeous?
            </p>
          </div>
        )}
      </section>

      {breed && <CatCharacteristics breed={breed} />}
    </>
  );
};

export default CatDetails;
