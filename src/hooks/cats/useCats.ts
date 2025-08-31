import {
  BreedData,
  Cat,
  catsApi,
  CatsApiResponse,
  SortOrder,
} from "@/lib/api/cats";
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
  breeds: BreedData[];
  breedsLoading: boolean;
  breedsError: string | null;
  selectedBreeds: string[];
  handleBreedsChange: (breedIds: string[]) => void;
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
    if (typeof window === "undefined") return "RAND";
    const sortParam = new URLSearchParams(window.location.search).get("sort");
    return sortParam === "RAND" || sortParam === "ASC" || sortParam === "DESC"
      ? sortParam
      : "RAND";
  });
  const [data, setData] = useState<Cat[]>([]);
  const [pagination, setPagination] = useState<
    CatsApiResponse["pagination"] | null
  >(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [breeds, setBreeds] = useState<BreedData[]>([]);
  const [breedsLoading, setBreedsLoading] = useState(true);
  const [breedsError, setBreedsError] = useState<string | null>(null);
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);

  useEffect(() => {
    const fetchBreeds = async () => {
      setBreedsLoading(true);
      setError(null);

      try {
        const res = await catsApi.fetchBreeds();
        setBreeds(res.data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong! Please try again later."
        );
      } finally {
        setBreedsLoading(false);
      }
    };

    fetchBreeds();
  }, []);

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
          breed_ids: selectedBreeds.join(","),
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
  }, [page, sortOrder, selectedBreeds]);

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

  const handleBreedsChange = (newBreedIds: string[]) => {
    setSelectedBreeds(newBreedIds);
  };

  return {
    data,
    pagination,
    page,
    sortOrder,
    loading,
    error,
    handlePageChange,
    handleSortChange,
    breeds,
    breedsLoading,
    breedsError,
    selectedBreeds,
    handleBreedsChange,
  };
};
