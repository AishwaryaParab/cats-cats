import { SortOrder } from "@/utils/types";

interface SortDropdownProps {
  value: SortOrder;
  onOptionChange: (value: SortOrder) => void;
}

const SortDropdown = ({ value, onOptionChange }: SortDropdownProps) => {
  return (
    <div className="flex items-center gap-2 my-4">
      <label htmlFor="sort" className="font-medium text-lg">
        Sort by:
      </label>

      <select
        id="sort"
        value={value}
        onChange={(e) => onOptionChange(e.target.value as SortOrder)}
        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary"
      >
        <option value="RANDOM">Random</option>
        <option value="ASC">Ascending</option>
        <option value="DESC">Descending</option>
      </select>
    </div>
  );
};

export default SortDropdown;
