/* eslint-disable @next/next/link-passhref */
/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';

const Sidebar = ({ child }: any) => {
  const [showResponsiveSidebar, setShowResponsiveSidebar] = useState(false);
  return (
    <div>
      <div className='md:hidden'>
        <div className='absolute w-full h-20 top-0'>
          <div className='flex justify-between'>
            <button
              className='p-2 '
              type='button'
              onClick={() => {
                setShowResponsiveSidebar(!showResponsiveSidebar);
              }}
            >
              <i className='fas fa-bars' />
            </button>
            <div className='pr-1 pt-1'>
              <img src='/logo-joinus.png' alt='Logo join us' />
            </div>
          </div>
          {showResponsiveSidebar && (
            <nav className='flex items-center bg-indigo-700'>
              <ul className='flex flex-col p-3'>
                <LinkNavigation
                  text='Vacantes'
                  route='/'
                  icon='fa-solid fa-table-list'
                />
                <LinkNavigation
                  text='Entrevistas'
                  route='/candidate/vacancies'
                  icon='fa-solid fa-table-list'
                />
                <LinkNavigation
                  text='Candidatos'
                  route='/contacto'
                  icon='fa-solid fa-table-list'
                />
                <LinkNavigation
                  text='Documentos'
                  route='/contacto'
                  icon='fa-solid fa-file-lines'
                />
              </ul>
            </nav>
          )}
        </div>
        <div className='pt-20 w-full h-full'>
          <div className='bg-green-600 w-full h-full overflow-auto'>
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
    <nav className='flex flex-col items-start bg-white w-72 absolute min-h-screen border-r-2 z-10 divide-y'>
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
          <span className='font-extrabold text-xl text-center'>
            Juan Fernando Ríos
          </span>
          <span className='font-thin text-xl text-center'>
            juanfer4811@gmail.com
          </span>
        </div>
        <div className=' w-full mt-6'>
          <div className='border-2 mx-4 rounded-md bg-slate-100'>
            <Link href='/'>
              <div className='w-full hover:cursor-pointer flex justify-center'>
                <span className='ml-2'>Editar perfil</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <ul className='flex flex-col w-full mt-6'>
        <LinkNavigation
          text='Vacantes'
          route='/'
          icon='fa-solid fa-table-list'
        />
        <LinkNavigation
          text='Entrevistas'
          route='/admin/interviews'
          icon='fa-solid fa-video'
        />
        <LinkNavigation
          text='Candidatos'
          route='/admin/candidates'
          icon='fa-solid fa-user-group'
        />
        <LinkNavigation
          text='Documentos'
          route='/contacto'
          icon='fa-solid fa-folder-open'
        />
      </ul>
    </nav>
    <div className='w-full absolute pl-72'>
      <div className='bg-white w-full h-20 flex justify-end border-b-2 '>
        <div className='pr-9 pt-1'>
          <img src='/logo-joinus.png' alt='Logo join us' />
        </div>
      </div>
    </div>
    <div className='pl-72 pt-20 w-full h-full absolute'>
      <div className='bg-slate-100 w-full h-full overflow-auto'>{chil}</div>
    </div>
  </div>
);

const LinkNavigation = ({ text, route, icon }) => {
  const router = useRouter();
  return (
    <li
      className={
        router.pathname === route ? 'active linkNavigation' : 'linkNavigation'
      }
    >
      <Link href={route}>
        <div className='w-full hover:cursor-pointer'>
          <i className={icon} />
          <span className='ml-2'>{text}</span>
        </div>
      </Link>
    </li>
  );
};

export default Sidebar;
