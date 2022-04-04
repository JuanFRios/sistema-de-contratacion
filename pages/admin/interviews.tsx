import React from 'react';
// import Link from 'next/link';
import { matchRoles } from 'utils/matchRoles';
import { useQuery } from '@apollo/client';
import { GET_INTERVIEWS } from 'graphql/queries/interview';
// // import { ButtonLoading } from '@components/ButtonLoading';
// import PrivateComponent from 'components/utils/PrivateComponent';

export async function getServerSideProps(context) {
  return {
    props: { ...(await matchRoles(context)) },
  };
}

const Interviews = () => {
  const { data, loading } = useQuery(GET_INTERVIEWS, {
    fetchPolicy: 'cache-and-network',
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
          <div>
            {/* {data.getInterviewsByInterviewerId.map((i) => (
              <Interview key={i.id} route='admin/interviews/' interview={i} />
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
};

// const Interview = ({ route, interview }) => (
//   <Link href={route} passHref>
//     <div>
//       <div className='border-2 border-inherit rounded-lg bg-slate-50 drop-shadow-lg mx-20 my-3 max-w-xl text-slate-900 hover:cursor-pointer hover:bg-slate-100'>
//         <div className='flex flex-col align-center'>
//           <h1 className='flex-col text-md font-bold text-center m-2 '>
//             {interview}
//           </h1>
//           <div className='grid grid-cols-3 m-3'>
//             <div className=''>
//               <h2>{interview.vacancy}</h2>
//               <h2>{interview.name}</h2>
//             </div>
//             <div className='flex justify-end'>
//               <h2 className='items-right m-4'>{interview.date}</h2>
//               {/* <h2 className='absolute inset-y-10 right-0 m-4'>
//                 Hora: {interview.hour}
//               </h2> */}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </Link>
// );

export default Interviews;
