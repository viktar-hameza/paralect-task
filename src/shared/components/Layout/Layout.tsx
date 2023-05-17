import { withTheme } from '@emotion/react';
import { Header } from '@mantine/core';

interface LayoutProps extends React.PropsWithChildren {}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header height={50}>header</Header>
      {children}
    </>
  );
};
