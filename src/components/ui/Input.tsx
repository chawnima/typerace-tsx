interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export const TextInput = ({
  value,
  onChange,
  placeholder,
}: TextInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      className="py-1 px-4 focus:outline-none bg-white w-full rounded-md text-primary border-b-4 border-background-secondary"
      onChange={(e) => handleChange(e)}
    />
  );
};
