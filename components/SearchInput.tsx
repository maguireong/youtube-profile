export function SearchInput(props: {
  onChange: (value: string) => void;
  value: string;
  className?: string;
  placeholder?: string;
}) {
  const { className, onChange, value, placeholder = "Search" } = props;
  return (
    <input
      placeholder={placeholder}
      className={className}
      value={value}
      type="search"
      onChange={(search) => onChange(search.target.value ?? "")}
    ></input>
  );
}
