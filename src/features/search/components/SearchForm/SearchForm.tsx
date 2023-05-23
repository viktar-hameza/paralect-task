import React from "react";

import { Input, Button, createStyles } from "@mantine/core";
import { SearchIcon } from "./SearchIcon";

interface SearchFormProps
  extends Omit<React.HTMLAttributes<HTMLFormElement>, "onSubmit"> {
  initialValue: string;
  onSubmit: (value: string) => void;
}

const useStyles = createStyles((theme) => ({
  formSearch: {
    position: "relative",
    marginBottom: "16px",
  },
  formSearchBtn: {
    position: "absolute",
    top: "7.5px",
    right: "12px",
  },
}));

export const SearchForm = ({
  initialValue,
  onSubmit,
  ...rest
}: SearchFormProps) => {
  const { classes, cx } = useStyles();
  const [value, setValue] = React.useState(initialValue);

  return (
    <form
      className={classes.formSearch}
      autoCapitalize="off"
      autoCorrect="off"
      autoComplete="off"
      {...rest}
      onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(value.trim());
      }}
    >
      <Input
        style={{ fontSize: "14px" }}
        icon={<SearchIcon />}
        radius="8px"
        size="lg"
        placeholder="Введите название вакансии"
        value={value}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setValue(event.target.value)
        }
      />
      <Button radius="7px" className={classes.formSearchBtn} type="submit">
        Поиск
      </Button>
    </form>
  );
};
