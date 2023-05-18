import React from "react";
import { Vacancy } from "../../api/superjob/types";
import Link from "next/link";

interface VacancyCardProps extends React.HTMLAttributes<HTMLElement> {
  vacancy: Vacancy;
}

export const VacancyCard = React.memo(({ vacancy }: VacancyCardProps) => {
  return (
    <div>
      <Link href={`/vacancy/${vacancy.id}`} shallow>
        {vacancy.profession} - {vacancy.firm_name} - {vacancy.town.title} -{" "}
      </Link>
      {vacancy.type_of_work.title} - {vacancy.payment_to} - {vacancy.currency}
    </div>
  );
});

VacancyCard.displayName = "Vacancy Card";
