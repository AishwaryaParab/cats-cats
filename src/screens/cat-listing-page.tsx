"use client";

import CatCard from "../components/cats/cat-card";
import Container from "../components/ui/container";
import Pagination from "../components/cats/pagination";
import CatCardSkeleton from "../components/cats/cat-card-skeleton";
import SortDropdown from "@/components/cats/sort-dropdown";
import { CATS_PER_PAGE } from "@/lib/constants";
import { useCats } from "@/hooks/cats/useCats";

const LIMIT = CATS_PER_PAGE;

const CatListingPage = () => {
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
      <section className="min-h-screen">
        <SortDropdown
          value={sortOrder}
          onOptionChange={handleSortChange}
          disabled={loading}
        />

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: CATS_PER_PAGE }).map((_, idx) => (
              <CatCardSkeleton key={idx} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-4">
            <p className="text-red-500 text-lg">
              {error || "Something went wrong. Please try again later."}
            </p>
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
      </section>
    </Container>
  );
};

export default CatListingPage;
