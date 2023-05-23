import React from "react";
import {
  Button,
  Select,
  NumberInput,
  createStyles,
  Text,
  Title,
  SimpleGrid,
  Paper,
} from "@mantine/core";

import { ToolbarFilters } from "../../types";
import { useCatalogues } from "@/features/shared/api/superjob/hooks";
import { IconClose } from "./IconClose";
import Image from "next/image";

interface FiltersToolbarProps {
  initialValue: ToolbarFilters;
  onApply: (filters: ToolbarFilters) => void;
  onClear: (filters: ToolbarFilters) => void;
}

const useStyles = createStyles((theme) => ({
  control: {
    border: "0",
    color: theme.colors.greyScale[4],
    "&:not(:disabled):hover": {
      backgroundColor: "transparent",
      color: theme.colors.blue[4],
    },
    "&:disabled": {
      color: theme.colors.greyScale[4],
    },
  },

  rightSection: {
    height: "auto",
  },

  filters: {
    position: "relative",
  },
  btnClear: {
    display: "flex",
    alignItems: "center",
    gap: "2px",
    backgroundColor: "transparent",
    cursor: "pointer",
    border: "0",
    fontSize: "14px",
    color: theme.colors.greyScale[4],
    ":hover": {
      color: theme.colors.blue[3],
      svg: {
        line: {
          stroke: theme.colors.blue[3],
        },
      },
    },
    ":active": {
      color: theme.colors.blue[4],
      svg: {
        line: {
          stroke: theme.colors.blue[4],
        },
      },
    },
  },
  filtersTop: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "28px",
  },
  btn: {
    marginTop: "20px",
  },
  item: {
    whiteSpace: "initial",
    "&:not(:disabled):hover": {
      backgroundColor: theme.colors.blue[1],
    },
  },
}));

export const FiltersToolbar = ({
  initialValue,
  onApply,
  onClear,
}: FiltersToolbarProps) => {
  const { classes } = useStyles();
  const [filters, setFilters] = React.useState<ToolbarFilters>(initialValue);

  const { data = [], isLoading } = useCatalogues();

  const catalogues = React.useMemo(() => {
    return data.map(({ title_rus, key }) => ({
      value: String(key),
      label: title_rus,
    }));
  }, [data]);

  return (
    <Paper p="lg" className={classes.filters} withBorder={true} radius={"md"}>
      <div className={classes.filtersTop}>
        <Title fz="xl" fw={600} order={2}>
          Фильтры
        </Title>
        <button
          className={classes.btnClear}
          onClick={() => {
            setFilters(initialValue);
            onClear(initialValue);
          }}
        >
          Сбросить всё
          <IconClose />
        </button>
      </div>

      <SimpleGrid cols={1} verticalSpacing="xs">
        <div>
          <Text fz="md" fw={700} mb="5px">
            Отрасль
          </Text>
          <Select
            classNames={{
              item: classes.item,
            }}
            rightSection={
              <Image src="/iconDown.svg" width={24} height={24} alt="" />
            }
            size="md"
            value={filters["catalogues"]}
            onChange={(value) =>
              setFilters({ ...filters, catalogues: value || "" })
            }
            placeholder="Выберите отрасль"
            data={catalogues}
          />
        </div>
        <div>
          <Text fz="md" fw={700} mb="5px">
            Оклад
          </Text>
          <SimpleGrid cols={1} verticalSpacing="xs">
            <NumberInput
              classNames={{
                control: classes.control,
                rightSection: classes.rightSection,
              }}
              size="md"
              min={0}
              value={filters.payment_from || ""}
              onChange={(value) =>
                setFilters({ ...filters, payment_from: value || 0 })
              }
              placeholder="От"
            />
            <NumberInput
              classNames={{
                control: classes.control,
                rightSection: classes.rightSection,
              }}
              size="md"
              min={0}
              value={filters.payment_to || ""}
              onChange={(value) =>
                setFilters({ ...filters, payment_to: value || 0 })
              }
              placeholder="До"
            />
          </SimpleGrid>
        </div>
      </SimpleGrid>

      <Button
        variant="filled"
        size="md"
        h={40}
        radius={8}
        fullWidth={true}
        className={classes.btn}
        onClick={() => onApply(filters)}
      >
        Применить
      </Button>
    </Paper>
  );
};
