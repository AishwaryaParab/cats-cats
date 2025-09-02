import {
  BreedData,
  Cat,
  catsApi,
  CatsApiResponse,
  SortOrder,
} from "@/lib/api/cats";
import { CATS_PER_PAGE } from "@/lib/constants";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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
  const searchParams = useSearchParams();

  const [page, setPage] = useState<number>(1);
  const [sortOrder, setSortOrder] = useState<SortOrder>("RAND");
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);

  const [data, setData] = useState<Cat[]>([]);
  const [pagination, setPagination] = useState<
    CatsApiResponse["pagination"] | null
  >(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [breeds, setBreeds] = useState<BreedData[]>([]);
  const [breedsLoading, setBreedsLoading] = useState(true);
  const [breedsError, setBreedsError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);

  // --- Sync state with URL whenever it changes ---
  useEffect(() => {
    const pageParam = searchParams.get("page");
    const parsedPage = pageParam ? parseInt(pageParam, 10) : NaN;
    setPage(!isNaN(parsedPage) && parsedPage > 0 ? parsedPage : 1);

    const sortParam = searchParams.get("sort");
    setSortOrder(
      sortParam === "RAND" || sortParam === "ASC" || sortParam === "DESC"
        ? sortParam
        : "RAND"
    );

    const breedsParam = searchParams.get("breeds");
    setSelectedBreeds(breedsParam ? breedsParam.split(",") : []);

    setInitialized(true);
  }, [searchParams]);

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
    if (!initialized) return;
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
  }, [page, sortOrder, selectedBreeds, limit, hasBreeds]);

  const updateUrl = (page: number, sort: SortOrder, breeds: string[]) => {
    const params = new URLSearchParams();
    params.set("page", page.toString());
    params.set("sort", sort);
    if (breeds.length > 0) {
      params.set("breeds", breeds.join(","));
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    updateUrl(newPage, sortOrder, selectedBreeds);
  };

  const handleSortChange = (newSort: SortOrder) => {
    setSortOrder(newSort);
    updateUrl(page, newSort, selectedBreeds);
  };

  const handleBreedsChange = (newBreedIds: string[]) => {
    setSelectedBreeds(newBreedIds);
    // Reset page to 1 when filters change
    setPage(1);
    updateUrl(1, sortOrder, newBreedIds);
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
