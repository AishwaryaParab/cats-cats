"use client";

import { useState } from "react";
import CatCard from "../components/cat-card";
import Container from "../ui/container";
import Pagination from "../components/pagination";
import CatCardSkeleton from "../components/cat-card-skeleton";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Cat, SortOrder } from "@/utils/types";
import SortDropdown from "@/components/sort-dropdown";
import { useFetch } from "@/hooks/useFetch";

const CATS_PER_PAGE = 15;

const ListingPage = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [page, setPage] = useState<number>(() => {
    const pageParam = searchParams.get("page");
    const parsed = pageParam ? parseInt(pageParam, 10) : NaN;
    return !isNaN(parsed) && parsed > 0 ? parsed : 1;
  });
  const [sortOrder, setSortOrder] = useState<SortOrder>(() => {
    const sortParam = searchParams.get("sort");
    return sortParam === "RANDOM" || sortParam === "ASC" || sortParam === "DESC"
      ? sortParam
      : "RANDOM";
  });
  const {
    data: cats,
    loading,
    error,
  } = useFetch<Cat[]>(
    `https://api.thecatapi.com/v1/images/search?page=${
      page - 1
    }&limit=${CATS_PER_PAGE}&order=${sortOrder}&has_breeds=1`,
    {
      headers: { "x-api-key": process.env.NEXT_PUBLIC_CAT_API_KEY! },
    },
    [page, sortOrder]
  );

  const router = useRouter();

  const updateUrl = (page: number, sort: SortOrder) => {
    const params = new URLSearchParams();
    params.set("page", page.toString());
    params.set("sort", sort);
    router.push(`${pathname}?${params.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    updateUrl(newPage, sortOrder);
  };

  const handleSortChange = (newSort: SortOrder) => {
    setSortOrder(newSort);
    updateUrl(page, newSort);
  };

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
