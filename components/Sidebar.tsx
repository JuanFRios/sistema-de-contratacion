import React, { useState } from 'react';
import Link from 'next/link';
// import logo from '../logo.svg';

const Sidebar = ({ child }: any) => {
  const [showResponsiveSidebar, setShowResponsiveSidebar] = useState(false);
  return (
    <div>
      <div className='md:hidden'>
        <div className='absolute w-full h-10 top-0'>
          <button
            className='p-2 '
            type='button'
            onClick={() => {
              setShowResponsiveSidebar(!showResponsiveSidebar);
            }}
          >
            <i className='fas fa-bars' />
          </button>
          {showResponsiveSidebar && (
            <nav className='flex items-center bg-indigo-700'>
              <ul className='flex flex-col p-3'>
                <LinkNavegacion texto='Inicio' ruta='/' />
                <LinkNavegacion texto='Perfil' ruta='/perfil' />
                <LinkNavegacion texto='Contacto' ruta='/contacto' />
              </ul>
            </nav>
          )}
        </div>
        <div className='pt-10 w-full h-full'>
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
    <nav className='flex flex-col items-start bg-indigo-700 w-72 absolute min-h-screen'>
      {/* <img className='mx-2 h-16' src={logo} alt='Logo React' /> */}
      <ul className='flex flex-col'>
        <LinkNavegacion texto='Inicio' ruta='/' />
        <LinkNavegacion texto='Perfil' ruta='/perfil' />
        <LinkNavegacion texto='Contacto' ruta='/contacto' />
      </ul>
    </nav>
    <div className='w-full absolute pl-72'>
      <div className='bg-red-500 w-full h-20'>Header</div>
    </div>
    <div className='pl-72 pt-20 w-full h-full absolute'>
      <div className='bg-green-500 w-full h-full overflow-auto'>{chil}</div>
    </div>
  </div>
);

const LinkNavegacion = ({ texto, ruta }) => (
  <li>
    <div>
      <Link href={ruta}>{texto}</Link>
    </div>
  </li>
);

export default Sidebar;
