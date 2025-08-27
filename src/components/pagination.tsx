import Button from "@/ui/button";

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
        <Button onClick={() => onPageChange(currentPage - 1)}>Previous</Button>
      )}

      <span>Page {currentPage}</span>

      {hasNextPage && (
        <Button onClick={() => onPageChange(currentPage + 1)}>Next</Button>
      )}
    </div>
  );
};

export default Pagination;
