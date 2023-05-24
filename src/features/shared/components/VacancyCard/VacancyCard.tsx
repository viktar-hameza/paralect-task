import React from "react";
import { Vacancy } from "../../api/superjob/types";
import Link from "next/link";
import Image from "next/image";

import { Card, Text, Title, createStyles } from "@mantine/core";
import { FavoritesIcon } from "./FavoritesIcon";

interface VacancyCardProps extends React.HTMLAttributes<HTMLElement> {
  vacancy: Vacancy;
  isFavorite: boolean;
  isVacancyPage?: boolean;
  onClickFavorite: () => void;
}

const useStyles = createStyles((theme) => ({
  card: {
    display: "Flex",
    alignItems: "flex-start",
  },
  button: {
    marginLeft: "auto",
    border: "0",
    backgroundColor: "transparent",
    cursor: "pointer",
    "&:hover": {
      path: {
        stroke: theme.colors.blue[4],
      },
    },
  },
}));

export const VacancyCard = React.memo(
  ({
    vacancy,
    isFavorite,
    isVacancyPage,
    onClickFavorite,
  }: VacancyCardProps) => {
    const { classes } = useStyles();
    return (
      <Card
        data-elem={`vacancy-${vacancy.id}`}
        withBorder
        p="xl"
        radius="md"
        className={classes.card}
        key={vacancy.id}
      >
        <div>
          {isVacancyPage ? (
            <Title fz="28px" fw={700} order={1} mb={"12px"}>
              {vacancy.profession}, {vacancy.firm_name}
            </Title>
          ) : (
            <Link href={`/vacancy/${vacancy.id}`} shallow>
              <Title fz="xl" fw={600} order={3} c="blue.4" mb={"12px"}>
                {vacancy.profession}, {vacancy?.firm_name}
              </Title>
            </Link>
          )}

          <Text>
            <Text
              fz={isVacancyPage ? "20px" : "md"}
              fw={isVacancyPage ? 700 : 600}
              span
            >
              {vacancy.payment_from > 0 && vacancy.payment_to > 0
                ? `з/п ${vacancy.payment_from} - ${vacancy.payment_to} ${vacancy.currency} · `
                : ""}
              {vacancy.payment_from === 0 && vacancy?.payment_to > 0
                ? `з/п ${vacancy.payment_to} ${vacancy.currency} · `
                : ""}
              {vacancy.payment_from > 0 && vacancy.payment_to === 0
                ? `з/п от ${vacancy.payment_from} ${vacancy.currency} · `
                : ""}
            </Text>

            <Text span fz={isVacancyPage ? "20px" : "md"}>
              {vacancy.type_of_work.title}
            </Text>
          </Text>
          <Text mt={"12px"}>
            <Image src="/iconCity.svg" width={20} height={20} alt="" />{" "}
            {vacancy.town.title}
          </Text>
        </div>
        <button
          data-elem={`vacancy-${vacancy.id}-shortlist-button`}
          className={classes.button}
          onClick={() => onClickFavorite()}
        >
          <FavoritesIcon isFavorite={isFavorite} />
        </button>
      </Card>
    );
  }
);

VacancyCard.displayName = "Vacancy Card";
