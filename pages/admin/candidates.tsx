import React from 'react';
import Link from 'next/link';

const candidates = () => (
  <div>
    <div>
      <div>
        <h1 className='text-3xl text-slate-900 font-bold text-center m-4'>
          Candidatos
        </h1>
        <Link href='/admin/createCandidate' passHref>
          <div className='text-white text-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 max-w-min hover:cursor-pointer w-full absolute right-40 mx-4 '>
            Nuevo candidato
          </div>
        </Link>
      </div>
      <div className='flex flex-col items-center'>
        <Candidate
          name='Pepito Perez'
          id='95949223'
          email='pepito.perez@gmail.com'
          phone='3213203403'
        />
        <Candidate
          name='Pepito Perez'
          id='95949223'
          email='pepito.perez@gmail.com'
          phone='3213203403'
        />
        <Candidate
          name='Pepito Perez'
          id='95949223'
          email='pepito.perez@gmail.com'
          phone='3213203403'
        />
      </div>
    </div>
  </div>
);

const Candidate = ({ name, id, email, phone }) => (
  <div>
    <div className='border-2 border-inherit rounded-lg bg-slate-50 drop-shadow-lg mx-20 my-3 max-w-xl text-slate-900 hover:cursor-pointer hover:bg-slate-100'>
      <div className='flex flex-col align-center'>
        <div className='grid grid-cols-3 m-3'>
          <div className=''>
            <h2>{name}</h2>
            <h2>Documento: {id}</h2>
          </div>
          <div className='flex justify-end '>
            <h2 className='absolute right-0 mx-4'>Correo: {email}</h2>
            <h2 className='absolute inset-y-10 right-0 mx-4'>
              Teléfono: {phone}
            </h2>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default candidates;
