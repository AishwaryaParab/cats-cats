import { Breed, catsApi } from "@/lib/api/cats";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useCompareCats = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBreedDetails = async () => {
      const breedIds = searchParams.get("breeds");

      if (!breedIds) {
        setError("No breeds selected for comparison");
        setLoading(false);
        return;
      }

      try {
        const breedPromises = breedIds
          .split(",")
          .map(async (breedId: string) => {
            return catsApi.fetchBreedById(breedId);
          });

        const breedDetails = await Promise.all(breedPromises);
        setBreeds(breedDetails);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    fetchBreedDetails();
  }, [searchParams]);

  const goBack = () => {
    router.back();
  };

  return { breeds, loading, error, goBack };
};
