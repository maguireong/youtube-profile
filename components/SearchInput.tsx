import classNames from "classnames";

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
      className={classNames("ring-0 border-none outline-0", className)}
      value={value}
      type="search"
      onChange={(e) => onChange(e.currentTarget.value)}
    />
  );
}
