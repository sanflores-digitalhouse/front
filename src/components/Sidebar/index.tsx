import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LINK_LIST } from '../../constants';

export const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <nav
      className="tw-flex tw-w-64 tw-p-2 tw-border-r tw-border-neutral-blue-100 tw-overflow-auto tw-sticky tw-top-16"
      style={{
        minHeight: 'calc(100vh - 8rem)',
      }}
    >
      <ul className="tw-mt-8 tw-flex tw-flex-col tw-gap-y-4">
        {LINK_LIST.map((link) => (
          <li className="tw-pl-8" key={link.name}>
            <Link
              to={link.href}
              className={`tw-flex tw-items-center tw-gap-x-2 tw-text-neutral-gray-100 hover:tw-text-primary ${
                pathname === link.href ? '!tw-text-primary tw-font-bold' : ''
              }`}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
