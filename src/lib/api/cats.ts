import { CATS_PER_PAGE } from "../constants";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

export type SortOrder = "RANDOM" | "ASC" | "DESC";

export interface Breed {
  name: string;
  temperament: string;
  origin: string;
  description: string;
  life_span: string;
  energy_level: number;
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
}

export const catsApi = {
  async fetchCats(params: FetchCatsParams = {}): Promise<CatsApiResponse> {
    const {
      page = 1,
      limit = CATS_PER_PAGE,
      order = "RANDOM",
      hasBreeds = 1,
    } = params;

    const qs = new URLSearchParams({
      page: String(page),
      limit: String(limit),
      sort: order,
      has_breeds: String(hasBreeds),
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
};
