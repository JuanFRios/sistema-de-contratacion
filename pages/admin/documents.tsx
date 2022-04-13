import React, { useState } from 'react';
import { matchRoles } from 'utils/matchRoles';
import { useQuery } from '@apollo/client';
import { Button, Dialog } from '@mui/material';
import { GET_DOCUMENTS } from 'graphql/queries/document';
import LoadingComponent from '@components/utils/LoadingComponent';
import CreateDocumentDialog from '@components/admin/documents/CreateDocumentDialog';
import DocumentItem from '@components/admin/documents/DocumentItem';

export async function getServerSideProps(context) {
  return {
    props: { ...(await matchRoles(context)) },
  };
}

const Documents = () => {
  const { data, loading } = useQuery(GET_DOCUMENTS, {
    fetchPolicy: 'cache-and-network',
  });
  const [openNewDialog, setOpenNewDialog] = useState(false);

  const closeDialog = () => {
    setOpenNewDialog(false);
  };

  if (loading) return <LoadingComponent />;

  return (
    <div className='flex justify-center'>
      <div className='w-full lg:w-11/12 '>
        <div className='flex justify-center pt-12 pb-6 font-bold text-4xl'>
          <p>Listado de documentos</p>
        </div>
        <div className='m-4 pb-6 flex justify-end text-9xl'>
          <Button
            variant='contained'
            startIcon={<i className='fa-solid fa-plus' />}
            onClick={() => {
              setOpenNewDialog(true);
            }}
          >
            Nuevo Documento
          </Button>
        </div>
        {data.getDocuments.length === 0 && (
          <div className='flex w-full justify-center'>
            <p>Aún no se han creado documentos</p>
          </div>
        )}
        <div className='flex flex-wrap justify-center'>
          {data.getDocuments.map((d) => (
            <DocumentItem key={d.id} document={d} />
          ))}
        </div>
      </div>
      <Dialog open={openNewDialog} onClose={closeDialog}>
        <CreateDocumentDialog closeDialog={closeDialog} />
      </Dialog>
    </div>
  );
};

export default Documents;
