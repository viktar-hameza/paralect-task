import React from "react";
import { Vacancy } from "../../api/superjob/types";
import Link from "next/link";

import { Card, Button, Text, Title, createStyles } from "@mantine/core";

interface VacancyCardProps extends React.HTMLAttributes<HTMLElement> {
  vacancy: Vacancy;
  isFavorite: boolean;
  onClickFavorite: () => void;
}

export const VacancyCard = React.memo(
  ({ vacancy, isFavorite, onClickFavorite }: VacancyCardProps) => {
    return (
      <div>
        <Link href={`/vacancy/${vacancy.id}`} shallow>
          <Title fz="xl" fw={600} order={3} c="blue.4">
            {vacancy.profession}
          </Title>
        </Link>
        <Text>
          <Text fz="md" fw={600} span>
            з/п от {vacancy.payment_to} {vacancy.currency}
          </Text>
          {" - "}
          <Text span>{vacancy.type_of_work.title}</Text>
        </Text>
        <Text>
          <Image src="/iconCity.svg" width={20} height={20} alt="" />{" "}
          {vacancy.town.title}
        </Text>
        {vacancy.type_of_work.title} - от {vacancy.payment_from} до{" "}
        {vacancy.payment_to} - {vacancy.currency}
        {/* {vacancy.firm_name} */}
        <Button onClick={() => onClickFavorite()}>
          {isFavorite ? "Remove" : "Add"}
        </Button>
      </div>
    );
  }
);

VacancyCard.displayName = "Vacancy Card";
