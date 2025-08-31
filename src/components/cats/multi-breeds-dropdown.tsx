"use client";

import { BreedData } from "@/lib/api/cats";
import { Check, ChevronDown, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface MultiBreedsDropdown {
  breeds: BreedData[];
  selectedBreeds: string[];
  onBreedsChange: (selectedBreeds: string[]) => void;
  placeholder?: string;
  maxDisplayCount?: number;
  loading?: boolean;
}

const MultiBreedsDropdown = ({
  breeds,
  selectedBreeds,
  onBreedsChange,
  placeholder = "Select breeds...",
  maxDisplayCount = 3,
  loading,
}: MultiBreedsDropdown) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredBreeds = breeds.filter((breed) =>
    breed.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedBreedNames = breeds
    .filter((breed) => selectedBreeds.includes(breed.id))
    .map((breed) => breed.name);

  const handleBreedToggle = (breedId: string) => {
    if (selectedBreeds.includes(breedId)) {
      onBreedsChange(selectedBreeds.filter((id) => id !== breedId));
    } else {
      onBreedsChange([...selectedBreeds, breedId]);
    }
  };

  const handleClearAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    onBreedsChange([]);
  };

  const handleRemoveBreed = (breedId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onBreedsChange(selectedBreeds.filter((id) => id !== breedId));
  };

  const getDisplayText = () => {
    if (selectedBreedNames.length === 0) {
      return placeholder;
    }

    if (selectedBreedNames.length <= maxDisplayCount) {
      return selectedBreedNames.join(", ");
    }

    return `${selectedBreedNames.slice(0, maxDisplayCount).join(", ")} and ${
      selectedBreedNames.length - maxDisplayCount
    } more`;
  };

  return (
    <div className="w-full mb-8">
      <label className="block font-medium mb-2">Select Cat Breeds</label>

      <div className="relative" ref={dropdownRef}>
        <div
          onClick={() => !loading && setIsOpen(!isOpen)}
          className={`
            w-full px-4 py-3 text-left border rounded-xl shadow-sm transition-all duration-200
            ${isOpen ? "border-primary ring-1 ring-primary" : "border-accent"}
            ${
              loading
                ? "bg-accent text-gray-400 cursor-not-allowed"
                : "cursor-pointer"
            }
            ${selectedBreeds.length > 0 ? "text-foreground" : "text-gray-500"}
          `}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0 overflow-hidden">
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2" />
                  <span>Loading breeds...</span>
                </div>
              ) : (
                <span className="truncate">{getDisplayText()}</span>
              )}
            </div>

            <div className="flex items-center gap-2 ml-2">
              {selectedBreeds.length > 0 && !loading && (
                <button
                  onClick={handleClearAll}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                  title="Clear all selections"
                >
                  <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                </button>
              )}

              <ChevronDown
                className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </div>
          </div>
        </div>

        {selectedBreeds.length > 0 && !isOpen && (
          <div className="mt-2 flex flex-wrap gap-2">
            {breeds
              .filter((breed) => selectedBreeds.includes(breed.id))
              .slice(0, 5)
              .map((breed) => (
                <span
                  key={breed.id}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-violet-100 text-secondary text-sm rounded-full"
                >
                  {breed.name}
                  {!loading && (
                    <button
                      onClick={(e) => handleRemoveBreed(breed.id, e)}
                      className="hover:bg-violet-200 rounded-full p-0.5 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </span>
              ))}
            {selectedBreeds.length > 5 && (
              <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                +{selectedBreeds.length - 5} more
              </span>
            )}
          </div>
        )}

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-accent rounded-xl shadow-lg z-50 max-h-80">
            <div className="p-4 border-b border-accent">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search breeds..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 text-gray-500 pr-4 py-2 border border-accent rounded-lg focus:ring-2 focus:ring-violet-100 focus:border-primary outline-none"
                />
              </div>
            </div>

            <div className="px-4 py-2 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
              <span className="text-sm text-gray-600">
                {selectedBreeds.length} of {breeds.length} selected
              </span>
              {selectedBreeds.length > 0 && (
                <button
                  onClick={handleClearAll}
                  className="text-sm text-secondary hover:text-primary font-medium cursor-pointer"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Breeds list */}
            <div className="max-h-48 overflow-y-auto">
              {filteredBreeds.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  No breeds found matching "{searchTerm}"
                </div>
              ) : (
                filteredBreeds.map((breed) => {
                  const isSelected = selectedBreeds.includes(breed.id);
                  return (
                    <button
                      key={breed.id}
                      onClick={() => handleBreedToggle(breed.id)}
                      className={`
                        w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center justify-between
                        ${
                          isSelected
                            ? "bg-violet-50 text-secondary"
                            : "text-gray-700"
                        }
                      `}
                    >
                      <span className="font-medium">{breed.name}</span>
                      {isSelected && (
                        <Check className="w-5 h-5 text-secondary" />
                      )}
                    </button>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiBreedsDropdown;
