import React from 'react';
import { Navbar } from '../Navbar';
import { Footer } from '../Footer';

interface NavbarProps {
  children: React.ReactNode;
}

const navbarHeight = '4rem';

export const Layout = ({ children }: NavbarProps): JSX.Element => {
  return (
    <>
      <Navbar />
      <main className="tw-flex tw-flex-col tw-w-full tw-max-w-full" style={{
        minHeight: 'calc(100vh - 8rem)',
        marginTop: navbarHeight,
      }}>{children}</main>
      <Footer />
    </>
  );
};
