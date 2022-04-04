/* eslint-disable @next/next/link-passhref */
/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { adminMenuOptions, candidateMenuOptions } from 'utils/menu';
import { signOut, useSession } from 'next-auth/react';

const Sidebar = ({ child }: any) => {
  const [showResponsiveSidebar, setShowResponsiveSidebar] = useState(false);
  return (
    <div>
      <div className='md:hidden'>
        <div className='absolute w-full h-20 top-0 z-10 bg-white'>
          <div className='flex justify-between'>
            <button
              className='p-2 '
              type='button'
              onClick={() => {
                setShowResponsiveSidebar(!showResponsiveSidebar);
              }}
            >
              <i className='fas fa-bars text-4xl' />
            </button>
            <div className='pr-1 flex items-center'>
              <img src='/logo-joinus.png' alt='Logo join us' />
            </div>
          </div>
          {showResponsiveSidebar && (
            <nav className='flex items-center bg-white border-y-2'>
              <MenuOptions />
            </nav>
          )}
        </div>
        <div className='pt-20 w-full h-screen'>
          <div className='bg-slate-100 w-full h-full overflow-auto'>
            {child}
          </div>
        </div>
      </div>
      <SidebarBig chil={child} />
    </div>
  );
};

const SidebarBig = ({ chil }: any) => (
  <div className='hidden md:flex'>
    <nav className='flex flex-col bg-white w-72 absolute min-h-screen border-r-2 z-10 divide-y'>
      <div className='w-full h-fit flex flex-col items-center justify-center'>
        <div className='pt-4'>
          <Image
            src='/no-profile.jpeg'
            alt='User Profile'
            height={120}
            width={120}
            className='rounded-full'
          />
        </div>
        <div className='flex flex-col w-full px-4'>
          <span className='font-bold text-2xl text-center'>
            Juan Fernando Ríos
          </span>
          <span className='font-light text-lg text-center'>
            juanfer4811@gmail.com
          </span>
        </div>
        <div className='w-2/3 my-4'>
          <div className='border-2 mx-4 rounded-full border-slate-300 hover:border-blue-400'>
            <Link href='/'>
              <div className='w-full hover:cursor-pointer flex justify-center'>
                <i className='fa-solid fa-pen-to-square my-1' />
                <span className='ml-2'>Editar perfil</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className='font-normal'>
        <MenuOptions />
      </div>
      <div className='bottom-0 absolute w-full my-2 py-2'>
        <div className='mx-4'>
          <div className='flex justify-center font-semibold text-xl'>
            <button
              type='button'
              className='bottom-0 '
              onClick={() => signOut()}
            >
              <i className='fa-solid fa-door-open' />
              <span className='ml-2 font-semibold text-xl'>Cerrar Sesion</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
    <div className='w-full pl-72'>
      <div className='bg-white w-full h-20 flex justify-end items-center border-b-2 '>
        <div className='pr-9'>
          <img src='/logo-joinus.png' alt='Logo join us' />
        </div>
      </div>
    </div>
    <div className='pl-72 pt-20 w-full h-full absolute'>
      <div className='bg-slate-100 w-full h-full overflow-auto'>{chil}</div>
    </div>
  </div>
);

const MenuOptions = () => {
  const { data: session }: any = useSession();
  const roleUser = session.user.role.name;
  let menuItems = [];
  if (roleUser === 'Admin') {
    menuItems = adminMenuOptions.map(({ text, route, icon }) => (
      <LinkNavigation text={text} route={route} icon={icon} key={route} />
    ));
  }
  if (roleUser === 'Candidate') {
    menuItems = candidateMenuOptions.map(({ text, route, icon }) => (
      <LinkNavigation text={text} route={route} icon={icon} key={route} />
    ));
  }
  return (
    <ul className='flex flex-col w-full sm:p-3 md:mt-6 md:p-0 divide-y md:divide-none'>
      {menuItems}
    </ul>
  );
};

const LinkNavigation = ({ text, route, icon }) => {
  const router = useRouter();
  return (
    <li
      className={
        router.pathname === route ? 'active linkNavigation' : 'linkNavigation'
      }
    >
      <Link href={route}>
        <div className='w-full hover:cursor-pointer flex items-center'>
          <i className={`${icon} hidden md:flex`} />
          <span className='ml-2'>{text}</span>
        </div>
      </Link>
    </li>
  );
};

export default Sidebar;
