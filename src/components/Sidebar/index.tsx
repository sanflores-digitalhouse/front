import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const linkList = [
  {
    name: 'Dashboard',
    href: '/',
    icon: 'dashboard',
  },
  {
    name: 'Actividad',
    href: '/activity',
    icon: 'activity',
  },
  {
    name: 'Tu perfil',
    href: '/profile',
    icon: 'profile',
  },
  {
    name: 'Cargar Dinero',
    href: '/load-money',
    icon: 'load-money',
  },
  {
    name: 'Enviar Dinero',
    href: '/send-money',
    icon: 'send-money',
  },
  {
    name: 'Pagar Servicios',
    href: '/pay-services',
    icon: 'pay-services',
  },
  {
    name: 'Mis Tarjetas',
    href: '/my-cards',
    icon: 'my-cards',
  },
];

export const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <div
      className="tw-flex tw-w-64 tw-p-2 tw-border-r tw-border-neutral-blue-100 tw-overflow-auto tw-sticky tw-top-16"
      style={{
        minHeight: 'calc(100vh - 8rem)',
      }}
    >
      <ul className="tw-mt-8 tw-flex tw-flex-col tw-gap-y-4">
        {linkList.map((link) => (
          <li className='tw-pl-8' key={link.name}>
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
    </div>
  );
};
