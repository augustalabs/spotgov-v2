import { Input } from "@/components/ui/input";

const TextColumn = ({ value }: { value: string }) => {
  return (
    <Input type="text" value={value} onChange={() => {}} className="min-w-32" />
  );
};

export default TextColumn;
