import React, { useState } from 'react';
import LoadingComponent from '@components/utils/LoadingComponent';
import { matchRoles } from 'utils/matchRoles';
import { useQuery } from '@apollo/client';
import { GET_INTERVIEWS } from 'graphql/queries/interviews';
import { useSession } from 'next-auth/react';
import { Button, Dialog } from '@mui/material';
import MakeInterviewDialog from '@components/admin/interviews/MakeInterviewDialog';
import CreateInterviewDialog from '@components/admin/interviews/CreateInterviewDialog';

export async function getServerSideProps(context) {
  return {
    props: { ...(await matchRoles(context)) },
  };
}

const Interviews = () => {
  const [openNewDialog, setOpenNewDialog] = useState(false);
  const closeDialog = () => {
    setOpenNewDialog(false);
  };
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

  if (loading) return <LoadingComponent />;
  console.log(data);

  return (
    <div>
      <div className='w-full lg:w-11/12'>
        <div>
          <h1 className='flex justify-center pt-12 pb-6 font-bold text-4xl'>
            Candidatos
          </h1>
        </div>
        <div className='m-4 pb-6 flex justify-end text-9xl'>
          <Button
            variant='contained'
            startIcon={<i className='fa-solid fa-plus' />}
            onClick={() => {
              setOpenNewDialog(true);
            }}
          >
            Nueva entrevista
          </Button>
        </div>
        <div className='flex flex-col items-center'>
          {data.getInterviewsByInterviewerId.map((i) => (
            <Interview key={i.id} interview={i} />
          ))}
        </div>
      </div>
      <Dialog open={openNewDialog} onClose={closeDialog}>
        <CreateInterviewDialog
          closeDialog={closeDialog}
          interviwerId={interviewerId}
        />
      </Dialog>
    </div>
  );
};

const Interview = ({ interview }) => {
  const [openMakeDialog, setOpenMakeDialog] = useState(false);
  const closeDialog = () => {
    setOpenMakeDialog(false);
  };
  return (
    <div>
      <div className='border-2 border-inherit rounded-lg bg-slate-50 drop-shadow-lg mx-20 my-3 max-w-xl text-slate-900 hover:cursor-pointer hover:bg-slate-100'>
        <div className='flex flex-col align-center'>
          <h1 className='flex-col text-md font-bold text-center m-2 '>
            {interview.name}
          </h1>
          <button type='button' onClick={() => setOpenMakeDialog(true)}>
            ir
          </button>
          <div className='grid grid-cols-3 m-3'>
            <div className=''>
              <h2>{interview.admissionProcess.vacancy.position}</h2>
              <h2>{interview.date}</h2>
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
      <Dialog open={openMakeDialog} onClose={closeDialog}>
        <MakeInterviewDialog closeDialog={closeDialog} interview={interview} />
      </Dialog>
    </div>
  );
};

export default Interviews;
