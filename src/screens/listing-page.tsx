"use client";

import CatCard from "../components/cat-card";
import Container from "../ui/container";
import Pagination from "../components/pagination";
import CatCardSkeleton from "../components/cat-card-skeleton";
import SortDropdown from "@/components/sort-dropdown";
import { CATS_PER_PAGE } from "@/lib/constants";
import { useCats } from "@/hooks/cats/useCats";

const LIMIT = CATS_PER_PAGE;

const ListingPage = () => {
  const {
    data: cats,
    page,
    sortOrder,
    pagination,
    loading,
    error,
    handlePageChange,
    handleSortChange,
  } = useCats({ limit: LIMIT, hasBreeds: 1 });

  return (
    <Container>
      <div className="min-h-screen">
        <SortDropdown value={sortOrder} onOptionChange={handleSortChange} />

        {error && (
          <div>
            <p className="text-red-500">{error}</p>
          </div>
        )}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: CATS_PER_PAGE }).map((_, idx) => (
              <CatCardSkeleton key={idx} />
            ))}
          </div>
        ) : cats && cats.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {cats?.map((cat) => (
                <CatCard key={cat.id} {...cat} />
              ))}
            </div>
            <Pagination
              currentPage={page}
              onPageChange={handlePageChange}
              hasNextPage={cats?.length === CATS_PER_PAGE}
            />
          </>
        ) : (
          <div className="text-center py-4">
            <p className="text-primary text-lg">
              No cats found. Please try again later.
            </p>
          </div>
        )}
      </div>
    </Container>
  );
};

export default ListingPage;
