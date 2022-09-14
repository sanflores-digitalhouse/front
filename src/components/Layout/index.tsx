import React from 'react';
import { Navbar } from '../Navbar';
import { Footer } from '../Footer';
import { Sidebar } from '../Sidebar';

interface NavbarProps {
  children: React.ReactNode;
}

const navbarHeight = '4rem';
const auth = { token: true };

export const Layout = ({ children }: NavbarProps): JSX.Element => {
  return (
    <>
      <div
        className="tw-flex"
        style={{
          marginTop: navbarHeight,
        }}
      >
        <Navbar />
        {auth.token && <Sidebar />}

        <main className="tw-flex tw-flex-1  tw-flex-wrap tw-overflow-auto">
          {children}
        </main>
      </div>
      <Footer />
    </>
  );
};
