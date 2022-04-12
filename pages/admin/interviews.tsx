import React, { useState } from 'react';
import LoadingComponent from '@components/utils/LoadingComponent';
import { matchRoles } from 'utils/matchRoles';
import { useQuery } from '@apollo/client';
import { GET_INTERVIEWS } from 'graphql/queries/interviews';
import { useSession } from 'next-auth/react';
import { Button, Dialog } from '@mui/material';
import CreateInterviewDialog from '@components/admin/interviews/CreateInterviewDialog';
import InterviewItem from '@components/admin/interviews/InterviewItem';

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

  return (
    <div>
      <div className='w-full lg:w-11/12'>
        <div>
          <h1 className='flex justify-center pt-12 pb-6 font-bold text-4xl'>
            Entrevistas
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
            <InterviewItem key={i.id} interview={i} />
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

export default Interviews;
