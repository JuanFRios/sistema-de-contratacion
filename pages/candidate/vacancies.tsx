import React from 'react';
import { matchRoles } from 'utils/matchRoles';

export async function getServerSideProps(context) {
  return {
    props: { ...(await matchRoles(context)) },
  };
}

const vacancies = () => {
  console.log('jj');
  return (
    <div>
      <div className='p-10'>vacancies</div>
      <div className='p-10'>vacancies</div>
      <div className='p-10'>vacancies</div>
      <div className='p-10'>vacancies</div>
      <div className='p-10'>vacancies</div>
      <div className='p-10'>vacancies</div>
      <div className='p-10'>vacancies</div>
      <div className='p-10'>vacancies</div>
      <div className='p-10'>vacancies</div>
      <div className='p-10'>vacancies</div>
    </div>
  );
};

export default vacancies;
