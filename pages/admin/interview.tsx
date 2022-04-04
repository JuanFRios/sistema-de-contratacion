import React from 'react';
import Link from 'next/link';
import { GET_INTERVIEWS } from 'graphql/queries/interview';
import { useQuery } from '@apollo/client';
import { matchRoles } from 'utils/matchRoles';

// import useFormData from 'hooks/useFormData';

export async function getServerSideProps(context) {
  return {
    props: { ...(await matchRoles(context)) },
  };
}

const Interview = () => {
  const { data, loading } = useQuery(GET_INTERVIEWS, {
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return <div>Loading....</div>;

  return (
    <div>
      {data.getInterview.map((i) => (
        <InterviewDetail key={i.id} interview={i} />
      ))}
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-shadow

const InterviewDetail = ({ interview }) => (
  <div className='text-slate-900 place-items-center'>
    <div className='flex flex-col font-bold place-items-center text-4xl m-8 mx-4 my-4 border-2 border-inherit rounded-lg bg-slate-50 drop-shadow-lg'>
      <h1 className='mx-4 my-4'>{interview.name}</h1>
    </div>
    <div className='m-6 text-2xl '>
      <div className='flex mx-4'>
        <h1 className='font-bold mx-4'>Vacante: </h1>
        <h1>{interview.position}</h1>
      </div>
      <div className='flex mx-4'>
        <h1 className='font-bold mx-4'>Nombre: </h1>
        <h1>{interview.candidate.name}</h1>
      </div>
      <div className='flex mx-4'>
        <h1 className='font-bold mx-4'>Fecha: </h1>
        <h1>{interview.date}</h1>
      </div>
      <div className='flex mx-4'>
        <h1 className='font-bold mx-4'>Lugar: </h1>
        <h1>{interview.meetingDetail}</h1>
      </div>
    </div>
    <div className='flex mx-12 max-w-lg  '>
      <input
        className='transition px-3 py-4 mx-4 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-base border-0 shadow outline-none focus:outline-none focus:ring w-full h-40 pr-10 '
        type='text'
        name='comments'
        placeholder='Notas...'
      />
    </div>
    <Link href='/admin/createInterview' passHref>
      <div className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 max-w-min hover:cursor-pointer absolute bottom-10 right-10 m-4 '>
        Guardar
      </div>
    </Link>
  </div>
);

export default Interview;
