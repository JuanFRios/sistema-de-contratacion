import React from 'react';
import Link from 'next/link';
import { matchRoles } from 'utils/matchRoles';
import { useQuery } from '@apollo/client';
import { GET_INTERVIEWS } from 'graphql/queries/interviews';
// // import { ButtonLoading } from '@components/ButtonLoading';
// import PrivateComponent from 'components/utils/PrivateComponent';
import { useSession } from 'next-auth/react';

export async function getServerSideProps(context) {
  return {
    props: { ...(await matchRoles(context)) },
  };
}

const Interviews = () => {
  const { data: session }: any = useSession();

  const interviewerId = session.user.id;

  const { data, loading } = useQuery(GET_INTERVIEWS, {
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        interviewerId,
      },
    },
  });

  if (loading) return <div>Loading....</div>;
  console.log(data);

  return (
    <div>
      <div>
        <h1 className='text-3xl text-slate-900 font-bold text-center m-4'>
          Entrevistas
        </h1>
        <div className='flex flex-col items-center'>
          {data.getInterviewsByInterviewerId.map((i) => (
            <Interview key={i.id} route='admin/interview' interview={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

const Interview = ({ route, interview }) => (
  <Link href={route} passHref>
    <div>
      <div className='border-2 border-inherit rounded-lg bg-slate-50 drop-shadow-lg mx-20 my-3 max-w-xl text-slate-900 hover:cursor-pointer hover:bg-slate-100'>
        <div className='flex flex-col align-center'>
          <h1 className='flex-col text-md font-bold text-center m-2 '>
            {interview.name}
          </h1>
          <div className='grid grid-cols-3 m-3'>
            <div className=''>
              <h2>{interview.admissionProcess.vacancy.position}</h2>
              <h2>{interview.candidate.name}</h2>
            </div>
            <div className='flex justify-end'>
              <h2 className='items-right m-4'>{interview.date}</h2>
              {/* <h2 className='absolute inset-y-10 right-0 m-4'>
                Hora: {interview.hour}
              </h2> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  </Link>
);

export default Interviews;
