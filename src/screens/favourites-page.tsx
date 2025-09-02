"use client";

import CatCard from "@/components/cats/cat-card";
import CatCardSkeleton from "@/components/cats/cat-card-skeleton";
import Container from "@/components/ui/container";
import StatusMessage from "@/components/ui/status-message";
import { useFavourites } from "@/hooks/cats/useFavourites";
import { CATS_PER_PAGE } from "@/lib/constants";
import { ArrowLeft, HeartIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const FavouritesPage = () => {
  const { items, toggleFavourite, isFavourite, loading, error } =
    useFavourites();
  const router = useRouter();

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
    <Container>
      <section className="min-h-screen">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: CATS_PER_PAGE }).map((_, idx) => (
              <CatCardSkeleton key={idx} />
            ))}
          </div>
        ) : error ? (
          <StatusMessage
            message={error || "Something went wrong. Please try again later."}
            color="text-red-500"
          />
        ) : items && items.length > 0 ? (
          <>
            <div className="mb-8">
              <button
                onClick={() => router.back()}
                className="flex items-center space-x-2 text-foreground hover:text-muted mb-4 cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="text-foreground hover:text-muted">
                  Back to cats
                </span>
              </button>

              <div className="flex items-center space-x-3">
                <HeartIcon className="w-8 h-8 text-primary" />
                <h1 className="text-3xl font-bold text-primary">Favourites</h1>
              </div>
              <p className="text-foreground mt-2">
                Your favourite cats are gathered here, waiting for you to admire
                them again!
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 my-6">
              {items?.map((fav) => (
                <CatCard
                  key={fav.id}
                  id={fav.image.id}
                  url={fav.image.url}
                  isLiked={isFavourite(fav.image_id)}
                  onHeartClick={handleLike}
                />
              ))}
            </div>
          </>
        ) : (
          <StatusMessage
            message={"No cats found. Please try again later."}
            color="text-primary"
          />
        )}
      </section>
    </Container>
  );
};

export default FavouritesPage;
