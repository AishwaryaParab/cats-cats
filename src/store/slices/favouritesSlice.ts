import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Favourite {
  id: number;
  image_id: string;
  image_url: string;
  created_at: string;
}

interface FavouritesState {
  items: Favourite[];
  favouriteImageIds: string[];
  loading: boolean;
  error: string | null;
  initialized: boolean; // why this?
}

const initialState: FavouritesState = {
  items: [],
  favouriteImageIds: [],
  loading: false,
  error: null,
  initialized: false,
};

export const fetchFavourites = createAsyncThunk(
  "/favourites/fetchFavourites",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/favourites");
      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || "Failed to fetch favorites");
      }

      return data.data;
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : "Failed to fetch favorites"
      );
    }
  }
);

export const addFavourite = createAsyncThunk(
  "/favourites/addFavourite",
  async (imageId: string, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/favourites", {
        method: "POST",
        headers: {
          Content_Type: "application/json",
        },
        body: JSON.stringify({ image_id: imageId }),
      });
      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || "Failed to add favorite");
      }

      return { ...data.data, image_id: imageId };
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : "Failed to add favorite"
      );
    }
  }
);

export const removeFavourite = createAsyncThunk(
  "/favourites/removeFavourite",
  async (favouriteId: number, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/favourites/${favouriteId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to remove favorite");
      }

      return favouriteId;
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : "Failed to remove favorite"
      );
    }
  }
);

const favouritesSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavourites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchFavourites.fulfilled,
        (state, action: PayloadAction<Favourite[]>) => {
          state.loading = false;
          state.items = action.payload;
          state.favouriteImageIds = action.payload.map((fav) => fav.image_id);
          state.initialized = true;
        }
      )
      .addCase(fetchFavourites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.initialized = true;
      })
      .addCase(addFavourite.pending, (state, action) => {
        // Optimistic Update
        const imageId = action.meta.arg;
        if (!state.favouriteImageIds.includes(imageId)) {
          state.favouriteImageIds.push(imageId);
        }
      })
      .addCase(
        addFavourite.fulfilled,
        (state, action: PayloadAction<Favourite>) => {
          state.items.push(action.payload);
          if (!state.favouriteImageIds.includes(action.payload.image_id)) {
            state.favouriteImageIds.push(action.payload.image_id);
          }
        }
      )
      .addCase(addFavourite.rejected, (state, action) => {
        // Revert Optimistic Update
        const imageId = action.meta.arg;
        state.favouriteImageIds = state.favouriteImageIds.filter(
          (id) => id !== imageId
        );
        state.error = action.payload as string;
      })
      .addCase(removeFavourite.pending, (state, action) => {
        const favouriteId = action.meta.arg;
        const favourite = state.items.find((fav) => fav.id === favouriteId);
        if (favourite) {
          state.favouriteImageIds = state.favouriteImageIds.filter(
            (id) => id !== favourite.image_id
          );
        }
      })
      .addCase(
        removeFavourite.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.items = state.items.filter((fav) => fav.id !== action.payload);
        }
      )
      .addCase(removeFavourite.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = favouritesSlice.actions;
export default favouritesSlice.reducer;
