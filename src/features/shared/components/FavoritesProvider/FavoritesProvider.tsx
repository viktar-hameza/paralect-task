import React from "react";
import Cookie from "js-cookie";

interface FavoritesContextInterface {
  values: Array<number>;
  add: (value: number) => void;
  remove: (value: number) => void;
  has: (value: number) => boolean;
}

const FavoritesContext = React.createContext<FavoritesContextInterface>({
  values: [],
  add: () => {},
  remove: () => {},
  has: () => false,
});

export function useFavorites() {
  const context = React.useContext(FavoritesContext);

  if (!context) {
    throw new Error(`useFavorites must be used within FavoritesProvider`);
  }

  return context;
}

interface FavoritesProviderProps extends React.PropsWithChildren {
  initialValue?: Array<number>;
}

export const FavoritesProvider = ({
  children,
  initialValue = [],
}: FavoritesProviderProps) => {
  const [values, setValues] = React.useState<Array<number>>(initialValue);

  const api = React.useMemo(() => {
    return {
      values,
      add: (value: number) => {
        const newValues = [value, ...values];
        setValues(newValues);
        Cookie.set("favorites", JSON.stringify(newValues), {
          expires: 365,
        });
      },
      remove: (value: number) => {
        const newValues = values.filter((favorite) => value !== favorite);
        setValues(newValues);
        Cookie.set("favorites", JSON.stringify(newValues), {
          expires: 365,
        });
      },
      has: (value: number) => {
        return values.includes(value);
      },
    };
  }, [values]);

  return (
    <FavoritesContext.Provider value={api}>
      {children}
    </FavoritesContext.Provider>
  );
};
