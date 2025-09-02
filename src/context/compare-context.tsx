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
  removeFromCompare: (breedId: string) => void;
  clearCompare: () => void;
  isInCompare: (breedId: string) => boolean;
  canAddMore: boolean;
}

const CompareContext = createContext<CompareContextState | undefined>(
  undefined
);

export const CompareProvider = ({ children }: { children: ReactNode }) => {
  const [compareItems, setCompareItems] = useState<CompareItem[]>([]);

  const addToCompare = (item: CompareItem): boolean => {
    if (compareItems.length > 3) return false;

    if (
      compareItems.some((compareItem) => compareItem.breedId === item.breedId)
    )
      return false;

    setCompareItems((prev) => [...prev, item]);
    return true;
  };

  const removeFromCompare = (breedId: string) => {
    setCompareItems((prev) => prev.filter((item) => item.breedId !== breedId));
  };

  const clearCompare = () => {
    setCompareItems([]);
  };

  const isInCompare = (breedId: string): boolean => {
    return compareItems.some((item) => item.breedId === breedId);
  };

  const canAddMore = compareItems.length < 3;

  return (
    <CompareContext.Provider
      value={{
        compareItems,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isInCompare,
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
