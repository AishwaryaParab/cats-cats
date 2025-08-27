import Button from "@/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  hasNextPage: boolean;
}

const Pagination = ({
  currentPage,
  onPageChange,
  hasNextPage,
}: PaginationProps) => {
  return (
    <div className="flex justify-center items-center gap-4 my-4">
      {currentPage > 1 && (
        <Button
          className="flex items-center gap-1"
          onClick={() => onPageChange(currentPage - 1)}
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Previous</span>
        </Button>
      )}

      <span>Page {currentPage}</span>

      {hasNextPage && (
        <Button
          className="flex items-center gap-1"
          onClick={() => onPageChange(currentPage + 1)}
        >
          <span>Next</span>
          <ChevronRight className="w-5 h-5" />
        </Button>
      )}
    </div>
  );
};

export default Pagination;
