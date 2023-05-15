import { useSearch } from "./hooks";
import { VacancyCard } from "./components/VacancyCard";

export const VacanciesList = () => {
  const vacancies = useSearch();

  return (
    <ul>
      {vacancies.map((vacancy) => {
        return (
          <li key={vacancy.id}>
            <VacancyCard vacancy={vacancy} />
          </li>
        );
      })}
    </ul>
  );
};
