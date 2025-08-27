"use client";

import { useEffect, useState } from "react";

interface UseFetchOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  body?: any;
}

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export const useFetch = <T = any>(
  url: string,
  options: UseFetchOptions,
  dependencies: any[] = []
): UseFetchResult<T> => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(url, {
          method: options?.method || "GET",
          headers: options?.headers,
          body: options?.body ? JSON.stringify(options.body) : undefined,
        });
        if (!res.ok) {
          throw new Error("Oops!! Failed to fetch details, please try again!");
        }
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, dependencies);

  return { data, loading, error };
};
