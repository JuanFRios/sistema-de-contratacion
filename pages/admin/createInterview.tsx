import React from 'react';
import Link from 'next/link';

const createInterview = () => (
  <div className='text-slate-900 '>
    <div className='flex flex-col font-bold place-items-center text-4xl m-8 mx-4 my-4 border-2 border-inherit rounded-lg bg-slate-50 drop-shadow-lg'>
      <h1 className='mx-4 my-4'>Crear una nueva entrevista</h1>
    </div>
    <div className='flex flex-col w-full'>
      <form className='m-8 my-8 mx-8'>
        <div className='flex m-8 '>
          <span className='mx-4 font-bold'>Vacante</span>
          <DropdownComponent option='una vacante' variables='Vacante 1' />
        </div>
        <div className='flex m-8 '>
          <span className='mx-4 font-bold'>Candidato</span>
          <DropdownComponent option='un candidato' variables='Candidato1' />
        </div>
        <label className='flex m-8' htmlFor='date'>
          <span className='mx-4 font-bold'>Fecha</span>
          <input
            className='rounded-lg border-2 border-slate-400 hover:border-slate-800'
            name='date'
            type='date'
          />
        </label>
        <label className='flex m-8' htmlFor='hour'>
          <span className='mx-4 font-bold'>Hora</span>
          <input
            className='rounded-lg border-2 border-slate-400 hover:border-slate-800'
            name='hour'
            type='time'
          />
        </label>
        <label className='flex m-8' htmlFor='details'>
          <span className='mx-4 font-bold'>Detalles</span>
          <input
            className='rounded-lg border-2 border-slate-400 hover:border-slate-800'
            name='details'
            type='text'
          />
        </label>
        <label className='flex m-8' htmlFor='place'>
          <span className='mx-4 font-bold'>Lugar</span>
          <input
            className='rounded-lg border-2 border-slate-400 hover:border-slate-800'
            name='place'
            type='text'
          />
        </label>
      </form>
      <Link href='/admin/interviews' passHref>
        <div className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 max-w-min hover:cursor-pointer absolute bottom-10 right-10 m-4 '>
          Guardar
        </div>
      </Link>
    </div>
  </div>
);

const DropdownComponent = ({ option, variables }) => (
  <div className='rounded-lg  '>
    <select
      className='hover:border-slate-800 cursor-pointer h-30'
      name='vacancy'
    >
      <option className='hover:bg-slate-400' value=''>
        Seleccione {option}
      </option>
      <option className=''>{variables}</option>
    </select>
  </div>
);

export default createInterview;
