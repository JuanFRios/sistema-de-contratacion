import React from 'react';
import Link from 'next/link';

const createCandidate = () => (
  <div className='text-slate-900'>
    <div className='flex flex-col font-bold place-items-center text-4xl m-8 mx-4 my-4 border-2 border-inherit rounded-lg bg-slate-50 drop-shadow-lg'>
      <h1 className='mx-4 my-4'>Crear un nuevo candidato</h1>
    </div>
    <div className='flex flex-col w-full'>
      <form>
        <label className='flex m-8' htmlFor='name'>
          <span className='mx-4 font-bold'>Nombre: </span>
          <input
            className='rounded-lg border-2 border-slate-400 hover:border-slate-800'
            name='name'
            type='text'
          />
        </label>
        <label className='flex m-8' htmlFor='id'>
          <span className='mx-4 font-bold'>Cédula: </span>
          <input
            className='rounded-lg border-2 border-slate-400 hover:border-slate-800'
            name='id'
            type='text'
          />
        </label>
        <label className='flex m-8' htmlFor='email'>
          <span className='mx-4 font-bold'>Correo: </span>
          <input
            className='rounded-lg border-2 border-slate-400 hover:border-slate-800'
            name='email'
            type='email'
          />
        </label>
        <label className='flex m-8' htmlFor='phone'>
          <span className='mx-4 font-bold'>Teléfono: </span>
          <input
            className='rounded-lg border-2 border-slate-400 hover:border-slate-800'
            name='phone'
            type='text'
          />
        </label>
        <label className='flex m-8' htmlFor='user'>
          <span className='mx-4 font-bold'>Usuario: </span>
          <input
            className='rounded-lg border-2 border-slate-400 hover:border-slate-800'
            name='user'
            type='text'
          />
        </label>
        <label className='flex m-8' htmlFor='vacancy'>
          <span className='mx-4 font-bold'>Vacante: </span>
          <input
            className='rounded-lg border-2 border-slate-400 hover:border-slate-800'
            name='vacancy'
            type='text'
          />
        </label>
      </form>
      <Link href='/admin/candidates' passHref>
        <div className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 max-w-min hover:cursor-pointer absolute bottom-10 right-10 m-4 '>
          Guardar
        </div>
      </Link>
    </div>
  </div>
);

export default createCandidate;
