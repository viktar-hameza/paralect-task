import { createStyles, Container } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

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

const useStyles = createStyles((theme) => ({
  headerContainer: {
    height: "84px",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    "@media (max-width: 770px)": {
      flexDirection: "column",
      justifyContent: "center",
    },
  },
  nav: {
    display: "flex",
    gap: "60px",
    marginLeft: "280px",
    "@media (max-width: 770px)": {
      marginTop: "10px",
      marginLeft: "0",
    },
  },
  main: {
    position: "relative",
    paddingTop: "40px",
    paddingBottom: "40px",
    backgroundColor: theme.colors.greyScale[1],
    flex: "1",
  },
  link: {},
  linkActive: {
    color: theme.colors.blue[4],
  },
}));

export const Layout = ({ children }: LayoutProps) => {
  const { classes, cx } = useStyles();
  const { asPath } = useRouter();

  return (
    <>
      <header>
        <Container size="1148px" className={classes.headerContainer}>
          <Link href="/">
            <Image src="/logo-img.svg" width={141} height={36} alt="" />
          </Link>

          <div className={classes.nav} style={{}}>
            {MENU_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cx(classes.link, {
                  [classes.linkActive]: href === asPath,
                })}
              >
                {label}
              </Link>
            ))}
          </div>
        </Container>
      </header>

      <main className={classes.main}>
        <Container size="1148px">{children}</Container>
      </main>
    </>
  );
};
