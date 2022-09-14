import React from 'react';
import { Navbar } from '../Navbar';
import { Footer } from '../Footer';
import { Sidebar } from '../Sidebar';

interface NavbarProps {
  children: React.ReactNode;
  isAuthenticated?: boolean;
}

const navbarHeight = '4rem';

export const Layout = ({ children, isAuthenticated = false }: NavbarProps): JSX.Element => {
  return (
    <>
      <div
        className="tw-flex"
        style={{
          marginTop: navbarHeight,
        }}
      >
        <Navbar isAuthenticated={isAuthenticated} />
        {isAuthenticated && <Sidebar />}

        <main
          className="tw-flex tw-flex-col tw-flex-1  tw-flex-wrap tw-overflow-auto"
          style={{
            minHeight: 'calc(100vh - 8rem)',
          }}
        >
          {children}
        </main>
      </div>
      <Footer />
    </>
  );
};
