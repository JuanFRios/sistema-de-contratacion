/* eslint-disable @next/next/link-passhref */
// eslint-disable-next-line @next/next/link-passhref
import React from 'react';
import Image from 'next/image';
import { Button } from '@mui/material';

const NotAuthorized = () => {
  const back = () => {
    window.history.back();
  };
  return (
    <div className='flex flex-col justify-center items-center m-6 border-4 border-blue-900'>
      <div>
        <Image
          src='https://res.cloudinary.com/djljdabgc/image/upload/v1649286906/403_Error_Forbidden-amico_1_jeyq6s.png'
          alt='403'
          height={500}
          width={500}
        />
      </div>
      <p className='font-extrabold text-center text-5xl m-2 pb-6'>
        No estás autorizado para ingresar a esta página
      </p>
      <div className='m-4 pb-6 flex justify-end text-9xl'>
        <Button
          variant='contained'
          startIcon={<i className='fa-solid fa-arrow-rotate-left' />}
          onClick={() => {
            back();
          }}
        >
          Regresar
        </Button>
      </div>
    </div>
  );
};

export default NotAuthorized;
