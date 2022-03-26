import React from 'react';
import Link from 'next/link';
import { matchRoles } from 'utils/matchRoles';

export async function getServerSideProps(context) {
  return {
    props: { ...(await matchRoles(context)) },
  };
}

const interviews = () => (
  <div>
    <div>
      <h1 className='text-3xl text-slate-900 font-bold text-center m-4'>
        Entrevistas
      </h1>
      <div className='flex flex-col items-center'>
        <Interview
          route='/admin/interview'
          interview='Entrevista psicológica'
          vacancy='Vacante 1'
          name='Pepito Perez'
          date='Martes 3 de marzo'
          hour='2pm'
        />
        <Interview
          route='/admin/interview'
          interview='Entrevista psicológica'
          vacancy='Vacante 1'
          name='Pepito Perez'
          date='Martes 3 de marzo'
          hour='2pm'
        />
        <Interview
          route='/admin/interview'
          interview='Entrevista psicológica'
          vacancy='Vacante 1'
          name='Pepito Perez'
          date='Martes 3 de marzo'
          hour='2pm'
        />
      </div>
    </div>
  </div>
);

const Interview = ({ route, interview, vacancy, name, date, hour }) => (
  <Link href={route} passHref>
    <div>
      <div className='border-2 border-inherit rounded-lg bg-slate-50 drop-shadow-lg mx-20 my-3 max-w-xl text-slate-900 hover:cursor-pointer hover:bg-slate-100'>
        <div className='flex flex-col align-center'>
          <h1 className='flex-col text-md font-bold text-center m-2 '>
            {interview}
          </h1>
          <div className='grid grid-cols-3 m-3'>
            <div className=''>
              <h2>{vacancy}</h2>
              <h2>{name}</h2>
            </div>
            <div className='flex justify-end'>
              <h2 className='items-right m-4'>{date}</h2>
              <h2 className='absolute inset-y-10 right-0 m-4'>Hora: {hour}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Link>
);

export default interviews;
