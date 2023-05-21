import React from "react";
import { Skeleton, Button, Select, NumberInput } from "@mantine/core";

import { ToolbarFilters } from "../../types";
import { useCatalogues } from "@/features/shared/api/superjob/hooks";

interface FiltersToolbarProps {
  initialValue: ToolbarFilters;
  onApply: (filters: ToolbarFilters) => void;
  onClear: (filters: ToolbarFilters) => void;
}

export const FiltersToolbar = ({
  initialValue,
  onApply,
  onClear,
}: FiltersToolbarProps) => {
  const [filters, setFilters] = React.useState<ToolbarFilters>(initialValue);

  const { data = [], isLoading } = useCatalogues();

  const catalogues = React.useMemo(() => {
    return data.map(({ title_rus, key }) => ({
      value: String(key),
      label: title_rus,
    }));
  }, [data]);

  return (
    <div>
      <Skeleton visible={isLoading}>
        <Select
          value={filters["catalogues"]}
          onChange={(value) =>
            setFilters({ ...filters, catalogues: value || "" })
          }
          label="Отрасль"
          placeholder="Выберите отрасль"
          data={catalogues}
        />
        <NumberInput
          value={filters.payment_from || ""}
          onChange={(value) =>
            setFilters({ ...filters, payment_from: value || 0 })
          }
          placeholder="От"
        />
        <NumberInput
          value={filters.payment_to || ""}
          onChange={(value) =>
            setFilters({ ...filters, payment_to: value || 0 })
          }
          placeholder="До"
        />
        <Button onClick={() => onApply(filters)}>Применить</Button>
        <Button
          onClick={() => {
            setFilters(initialValue);
            onClear(initialValue);
          }}
        >
          Сбросить всё
        </Button>
      </Skeleton>
    </div>
  );
};
