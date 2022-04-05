import { useQuery } from '@apollo/client';
import { GET_VACANCIES_BY_CANDIDATE } from 'graphql/queries/vacancy';
import React from 'react';
import { matchRoles } from 'utils/matchRoles';
import { useSession } from 'next-auth/react';

export async function getServerSideProps(context) {
  return {
    props: { ...(await matchRoles(context)) },
  };
}

const Vacancies = () => {
  const { data: session }: any = useSession();
  const idUser = session.user.id;
  const { data, loading } = useQuery(GET_VACANCIES_BY_CANDIDATE, {
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        candidateId: idUser,
      },
    },
  });
  if (loading) {
    return <div>loading...</div>;
  }

  console.log(data);

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

export default Vacancies;
