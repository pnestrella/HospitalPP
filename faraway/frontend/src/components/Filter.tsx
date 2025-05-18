import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"; // adjust the path if needed
import { FilterProps } from '@/types';

const Filter = <T extends string>({ value, onChange, options = [], placeholder = "Select an option" }: FilterProps<T>) => {
  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger className="w-[220px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default Filter;
