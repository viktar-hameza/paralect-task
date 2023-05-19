import React from "react";

interface SearchFormProps
  extends Omit<React.HTMLAttributes<HTMLFormElement>, "onSubmit"> {
  initialValue: string;
  onSubmit: (value: string) => void;
}

export const SearchForm = ({
  initialValue,
  onSubmit,
  ...rest
}: SearchFormProps) => {
  const [value, setValue] = React.useState(initialValue);

  return (
    <form
      autoCapitalize="off"
      autoCorrect="off"
      autoComplete="off"
      {...rest}
      onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(value.trim());
      }}
    >
      <input
        autoCapitalize="off"
        autoCorrect="off"
        autoComplete="off"
        value={value}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setValue(event.target.value)
        }
      />
      <button type="submit">Поиск</button>
    </form>
  );
};
