"use client";

import CatCard from "@/components/cats/cat-card";
import CatCardSkeleton from "@/components/cats/cat-card-skeleton";
import Container from "@/components/ui/container";
import StatusMessage from "@/components/ui/status-message";
import { useFavourites } from "@/hooks/cats/useFavourites";
import { CATS_PER_PAGE } from "@/lib/constants";

const FavouritesPage = () => {
  const { items, toggleFavourite, isFavourite, loading, error } =
    useFavourites();

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
