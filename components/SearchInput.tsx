import { TextField } from "@mui/material";

export function SearchInput(props: {
  onChange: (value: string) => void;
  value: string;
  className?: string;
  placeholder?: string;
}) {
  const { className, onChange, value, placeholder = "Search" } = props;
  return (
    <TextField
      placeholder={placeholder}
      className={className}
      value={value}
      size="small"
      onChange={(search) => onChange(search.target.value ?? "")}
    />
  );
}
