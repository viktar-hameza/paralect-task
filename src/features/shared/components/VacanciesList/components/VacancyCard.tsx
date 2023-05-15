import { Vacancy } from "../types";

interface VacancyCardProps extends React.HTMLAttributes<HTMLElement> {
  vacancy: Vacancy;
}

export const VacancyCard = ({ vacancy }: VacancyCardProps) => {
  return (
    <div>
      {vacancy.profession} - {vacancy.firm_name} - {vacancy.town.title} -{" "}
      {vacancy.type_of_work.title} - {vacancy.payment_to} - {vacancy.currency}
    </div>
  );
};
