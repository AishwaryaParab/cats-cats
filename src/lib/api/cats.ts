import { CATS_PER_PAGE } from "../constants";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

export type SortOrder = "RAND" | "ASC" | "DESC";

export interface Breed {
  id: string;
  name: string;
  temperament: string;
  origin: string;
  description: string;
  life_span: string;
  energy_level: number;
  adaptability?: number;
  affection_level?: number;
  child_friendly?: number;
  intelligence?: number;
  social_needs?: number;
  shedding_level?: number;
  weight: {
    metric: string;
  };
}

export interface Cat {
  id: string;
  url: string;
  breeds?: Breed[];
  width: number;
  height: number;
}

export interface CatsApiPagination {
  totalCount: number;
  totalPages: number;
  currentPage: number;
  pageLimit: number;
}

export interface CatsApiResponse {
  success: boolean;
  data: Cat[];
  pagination: CatsApiPagination;
  message?: string;
}

export interface CatApiResponse {
  success: boolean;
  data: Cat;
  message?: string;
}

export interface FetchCatsParams {
  page?: number;
  limit?: number;
  order?: SortOrder;
  hasBreeds?: 0 | 1;
  breed_ids?: string;
}

export interface BreedData {
  id: string;
  name: string;
}

export interface BreedsApiResponse {
  success: boolean;
  data: BreedData[];
  message?: string;
}

export interface BreedDetailsApiResponse {
  success: boolean;
  data: Breed;
  message?: string;
}

export const catsApi = {
  async fetchCats(params: FetchCatsParams = {}): Promise<CatsApiResponse> {
    const {
      page = 1,
      limit = CATS_PER_PAGE,
      order = "RAND",
      hasBreeds = 1,
      breed_ids = "",
    } = params;

    const qs = new URLSearchParams({
      page: String(page),
      limit: String(limit),
      sort: order,
      has_breeds: String(hasBreeds),
      breed_ids: String(breed_ids),
    });
    try {
      const res = await fetch(`${API_BASE_URL}/cats?${qs.toString()}`);

      if (!res.ok) {
        throw new Error("Failed to fetch cats. Please try again!");
      }
      const json = (await res.json()) as CatsApiResponse;

      if (!json.success) {
        throw new Error(json.message || "Failed to fetch cats");
      }

      return json;
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Unexpected error while fetching cats";
      throw new Error(message);
    }
  },
  async fetchCatById(id: string): Promise<Cat> {
    if (!id) throw new Error("Cat ID is required.");

    try {
      const res = await fetch(`${API_BASE_URL}/cats/${id}`);
      if (!res.ok) {
        throw new Error("Failed to fetch cat. Please try again!");
      }

      const json = (await res.json()) as CatApiResponse;

      if (!json.success) {
        throw new Error(
          json.message || "Failed to fetch cat. Please try again!"
        );
      }

      return json.data;
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Unexpected error while fetching cat";
      throw new Error(message);
    }
  },
  async fetchBreeds(): Promise<BreedsApiResponse> {
    try {
      const res = await fetch(`${API_BASE_URL}/cats/breeds`);

      if (!res.ok) {
        throw new Error("Failed to fetch breeds. Please try again!");
      }
      const json = (await res.json()) as BreedsApiResponse;

      if (!json.success) {
        throw new Error(json.message || "Failed to fetch breeds");
      }

      return json;
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Unexpected error while fetching breeds";
      throw new Error(message);
    }
  },
  async fetchBreedById(id: string): Promise<Breed> {
    if (!id) throw new Error("Breed ID is required.");

    try {
      const res = await fetch(`${API_BASE_URL}/cats/breeds/${id}`);
      if (!res.ok) {
        throw new Error("Failed to fetch breed details. Please try again!");
      }

      const json = (await res.json()) as BreedDetailsApiResponse;

      if (!json.success) {
        throw new Error(
          json.message || "Failed to fetch breed details. Please try again!"
        );
      }

      return json.data;
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Unexpected error while fetching cat";
      throw new Error(message);
    }
  },
};
