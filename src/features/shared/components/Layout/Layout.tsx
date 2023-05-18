import { withTheme } from '@emotion/react';
import { createStyles, Header, Container, NavLink, rem } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';

interface LayoutProps extends React.PropsWithChildren {}

const MENU_LINKS = [
  {
    href: '/',
    label: 'Поиск вакансий',
  },
  {
    href: '/favorites',
    label: 'Избранное',
  },
];

const useStyles = createStyles((theme) => ({
  header: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    height: '100%',
  },
  nav: {
    display: 'flex',
    gap: '60px',
    marginLeft: '280px',
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
      <Header height={84}>
        <Container size='1148px' className={classes.header}>
          <Link href='/'>
            <Image src='/logo-img.svg' width={141} height={36} alt='' />
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
      </Header>

      <main>
        <Container size='1148px'>{children}</Container>
      </main>
    </>
  );
};
