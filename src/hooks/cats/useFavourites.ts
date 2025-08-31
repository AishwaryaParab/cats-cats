import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  addFavourite,
  clearError,
  fetchFavourites,
  removeFavourite,
} from "@/store/slices/favouritesSlice";
import { useEffect } from "react";

export const useFavourites = () => {
  const favourites = useAppSelector((state) => state.favourites);
  const { items, favouriteImageIds, loading, error, initialized, pagination } =
    favourites;
  const dispatch = useAppDispatch();
  // const [page, setPage] = useState(() => {
  //   if (typeof window === "undefined") return 1;
  //   const pageParam = new URLSearchParams(window.location.search).get("page");
  //   const parsed = pageParam ? parseInt(pageParam, 10) : NaN;
  //   return !isNaN(parsed) && parsed > 0 ? parsed : 1;
  // });

  useEffect(() => {
    if (!initialized && !loading) {
      dispatch(fetchFavourites());
    }
  }, [dispatch, initialized, loading]);

  const isFavourite = (imageId: string) => favouriteImageIds.includes(imageId);

  const toggleFavourite = async (imageId: string) => {
    if (isFavourite(imageId)) {
      const favorite = favourites.items.find((fav) => fav.image_id === imageId);
      if (favorite) {
        dispatch(removeFavourite(favorite.id));
      }
    } else {
      dispatch(addFavourite(imageId));
    }
  };

  const clearFavouritesError = () => dispatch(clearError());

  console.log(favourites);

  return {
    items,
    favouriteImageIds,
    loading,
    error,
    initialized,
    toggleFavourite,
    isFavourite,
    pagination,
    clearFavouritesError,
    refetchFavourites: () => dispatch(fetchFavourites()),
  };
};
