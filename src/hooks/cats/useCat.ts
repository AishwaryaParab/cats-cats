import { Cat, catsApi } from "@/lib/api/cats";
import { useEffect, useState } from "react";

interface UseCatResult {
  cat: Cat | null;
  loading: boolean;
  error: string | null;
}

export const useCat = (id: string | null): UseCatResult => {
  const [cat, setCat] = useState<Cat | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchCat = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await catsApi.fetchCatById(id);
        setCat(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    fetchCat();
  }, [id]);

  return { cat, loading, error };
};
