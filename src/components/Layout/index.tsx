import React from 'react';
import { Navbar } from '../Navbar';
import { Footer } from '../Footer';

interface NavbarProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: NavbarProps): JSX.Element => {
  return (
    <>
      <Navbar />
      <main className="tw-flex-1">{children}</main>
      <Footer />
    </>
  );
};
