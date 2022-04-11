import React, { useState } from 'react';
import { matchRoles } from 'utils/matchRoles';
import axios, { AxiosRequestConfig } from 'axios';
import { useQuery } from '@apollo/client';
import { Button, Dialog } from '@mui/material';
import { GET_CANDIDATES } from 'graphql/queries/user';
import LoadingComponent from '@components/utils/LoadingComponent';
import CreateCandidateDialog from '@components/admin/candidates/CreateCandidateDialog';
import CandidateItem from '@components/admin/candidates/CandidateItem';

export async function getServerSideProps(context) {
  const options: AxiosRequestConfig = {
    method: 'POST',
    url: `https://${process.env.AUTH0_ISSUER}/oauth/token`,
    data: {
      grant_type: 'client_credentials',
      client_id: process.env.AUTH0_API_ID,
      client_secret: process.env.AUTH0_API_SECRET,
      audience: `https://${process.env.AUTH0_ISSUER}/api/v2/`,
    },
  };
  const TokenResponse = await axios.request(options);
  const token = TokenResponse.data.access_token;

  return {
    props: { token, ...(await matchRoles(context)) },
  };
}

const Candidates = ({ token }) => {
  const [openNewDialog, setOpenNewDialog] = useState(false);
  const closeDialog = () => {
    setOpenNewDialog(false);
  };

  const { data, loading } = useQuery(GET_CANDIDATES, {
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return <LoadingComponent />;

  return (
    <div className='flex justify-center'>
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
            Nuevo Candidato
          </Button>
        </div>
        <div className='flex flex-wrap justify-center'>
          {data.getCandidates.map((c) => (
            <CandidateItem key={c.id} candidate={c} />
          ))}
        </div>
      </div>
      <Dialog open={openNewDialog} onClose={closeDialog}>
        <CreateCandidateDialog closeDialog={closeDialog} token={token} />
      </Dialog>
    </div>
  );
};

export default Candidates;
