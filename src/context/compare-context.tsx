import { MAX_COMPARE_COUNT } from "@/lib/constants";
import { createContext, ReactNode, useContext, useState } from "react";

interface CompareItem {
  id: string;
  breedId: string;
  breedName: string;
  imageUrl: string;
}

interface CompareContextState {
  compareItems: CompareItem[];
  addToCompare: (item: CompareItem) => boolean;
  removeFromCompare: (id: string) => void;
  clearCompare: () => void;
  isBreedInCompare: (breedId: string) => boolean;
  isImageInCompare: (imageId: string) => boolean;
  canAddMore: boolean;
}

const CompareContext = createContext<CompareContextState | undefined>(
  undefined
);

export const CompareProvider = ({ children }: { children: ReactNode }) => {
  const [compareItems, setCompareItems] = useState<CompareItem[]>([]);

  const addToCompare = (item: CompareItem): boolean => {
    if (compareItems.length > MAX_COMPARE_COUNT) return false;

    if (
      compareItems.some((compareItem) => compareItem.breedId === item.breedId)
    )
      return false;

    setCompareItems((prev) => [...prev, item]);
    return true;
  };

  const removeFromCompare = (id: string) => {
    setCompareItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCompare = () => {
    setCompareItems([]);
  };

  const isBreedInCompare = (breedId: string): boolean => {
    return compareItems.some((item) => item.breedId === breedId);
  };

  const isImageInCompare = (imageId: string): boolean => {
    return compareItems.some((item) => item.id === imageId);
  };

  const canAddMore = compareItems.length < MAX_COMPARE_COUNT;

  return (
    <CompareContext.Provider
      value={{
        compareItems,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isBreedInCompare,
        isImageInCompare,
        canAddMore,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error("useCompare must be used within a CompareProvider");
  }
  return context;
};
