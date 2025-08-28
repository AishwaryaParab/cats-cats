import { Cat, catsApi, CatsApiResponse, SortOrder } from "@/lib/api/cats";
import { CATS_PER_PAGE } from "@/lib/constants";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface UseCatsOptions {
  limit?: number;
  hasBreeds?: 0 | 1;
}

interface UseCatsResult {
  data: Cat[];
  loading: boolean;
  error: string | null;
  pagination: CatsApiResponse["pagination"] | null;
  page: number;
  sortOrder: SortOrder;
  handlePageChange: (page: number) => void;
  handleSortChange: (sortOrder: SortOrder) => void;
}

export const useCats = ({
  limit = CATS_PER_PAGE,
  hasBreeds = 1,
}: UseCatsOptions): UseCatsResult => {
  const router = useRouter();
  const pathname = usePathname();
  const [page, setPage] = useState<number>(() => {
    if (typeof window === "undefined") return 1;
    const pageParam = new URLSearchParams(window.location.search).get("page");
    const parsed = pageParam ? parseInt(pageParam, 10) : NaN;
    return !isNaN(parsed) && parsed > 0 ? parsed : 1;
  });

  const [sortOrder, setSortOrder] = useState<SortOrder>(() => {
    if (typeof window === "undefined") return "RANDOM";
    const sortParam = new URLSearchParams(window.location.search).get("sort");
    return sortParam === "RANDOM" || sortParam === "ASC" || sortParam === "DESC"
      ? sortParam
      : "RANDOM";
  });
  const [data, setData] = useState<Cat[]>([]);
  const [pagination, setPagination] = useState<
    CatsApiResponse["pagination"] | null
  >(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await catsApi.fetchCats({
          page,
          order: sortOrder,
          limit,
          hasBreeds,
        });
        setData(res.data);
        setPagination(res.pagination);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong! Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, sortOrder]);

  return {
    data,
    pagination,
    page,
    sortOrder,
    loading,
    error,
    handlePageChange,
    handleSortChange,
  };
};
