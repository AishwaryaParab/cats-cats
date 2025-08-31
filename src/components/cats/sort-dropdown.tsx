import { SortOrder } from "@/lib/api/cats";

interface SortDropdownProps {
  value: SortOrder;
  onOptionChange: (value: SortOrder) => void;
  disabled?: boolean;
}

const SortDropdown = ({
  value,
  onOptionChange,
  disabled,
}: SortDropdownProps) => {
  return (
    <div className="flex items-center gap-2 my-4">
      <label htmlFor="sort" className="font-medium">
        Sort by:
      </label>

      <select
        id="sort"
        value={value}
        onChange={(e) => onOptionChange(e.target.value as SortOrder)}
        disabled={disabled}
        className={`border border-accent rounded-md px-3 py-2 focus:outline-none focus:ring-primary ${
          disabled ? "bg-accent text-gray-400 cursor-not-allowed" : ""
        }`}
        aria-label="Sort cats by order"
        aria-disabled={disabled}
      >
        <option value="RAND">Random</option>
        <option value="ASC">Ascending</option>
        <option value="DESC">Descending</option>
      </select>
    </div>
  );
};

export default SortDropdown;
