import { withTheme } from "@emotion/react";
import { Header } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";

interface LayoutProps extends React.PropsWithChildren {}

const MENU_LINKS = [
  {
    href: "/",
    label: "Поиск вакансий",
  },
  {
    href: "/favorites",
    label: "Избранное",
  },
];

export const Layout = ({ children }: LayoutProps) => {
  const { asPath } = useRouter();

  return (
    <>
      <Header height={50}>
        header
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          {MENU_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              style={{ color: href === asPath ? "red" : "black" }}
            >
              {label}
            </Link>
          ))}
        </div>
      </Header>
      {children}
    </>
  );
};
