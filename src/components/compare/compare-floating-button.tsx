import { useCompare } from "@/context/compare-context";
import { Scale, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const CompareFloatingButton = () => {
  const router = useRouter();
  const { compareItems, clearCompare } = useCompare();

  if (compareItems.length === 0) return null;

  const handleCompare = () => {
    const breedIds = compareItems.map((item) => item.breedId).join(",");
    router.push(`/compare?breeds=${breedIds}`);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    clearCompare();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-4 duration-300">
      <div className="bg-foreground rounded-full shadow-2xl p-1 flex items-center space-x-2">
        {/* Compare Items Preview */}
        <div className="flex items-center space-x-1 px-3">
          <div className="flex -space-x-2">
            {compareItems.slice(0, 3).map((item, index) => (
              <div
                key={item.id}
                className="relative w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-gray-100"
                style={{ zIndex: 10 - index }}
              >
                <Image
                  src={item.imageUrl}
                  alt={item.breedName}
                  className="w-full h-full object-cover"
                  fill
                />
              </div>
            ))}
          </div>
          <span className="text-sm font-medium text-background ml-2">
            {compareItems.length} breed{compareItems.length > 1 ? "s" : ""}
          </span>
        </div>

        <button
          onClick={handleClear}
          className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-full hover:bg-red-50"
          aria-label="Clear all comparisons"
        >
          <X className="w-4 h-4" />
        </button>

        <button
          onClick={handleCompare}
          disabled={compareItems.length < 2}
          className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 ${
            compareItems.length >= 2
              ? "bg-primary hover:bg-secondary text-white shadow-lg hover:shadow-xl"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
          aria-label="Compare selected breeds"
        >
          <Scale className="w-5 h-5" />
          <span>Compare</span>
        </button>
      </div>
    </div>
  );
};

export default CompareFloatingButton;
