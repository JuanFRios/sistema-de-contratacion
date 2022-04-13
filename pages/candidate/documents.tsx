/* eslint-disable consistent-return */
import React from 'react';
import { matchRoles } from 'utils/matchRoles';
import { Tooltip } from '@mui/material';
import { toast } from 'react-toastify';
import useFormData from 'hooks/useFormData';
import FileUpload from '@components/FileUpload';
import { GET_DOCUMENTS } from 'graphql/queries/document';
import { useQuery, useMutation } from '@apollo/client';
import { CREATE_DOCUMENT } from 'graphql/mutations/document';
import LoadingComponent from '@components/utils/LoadingComponent';

export async function getServerSideProps(context) {
  return {
    props: { ...(await matchRoles(context)) },
  };
}

const successCallback = (e) => {
  console.log(e);
  // setFileUrl(e.info.url);
};
const errorCallback = () => {
  toast.error('error uploading file');
};

const Documents = () => {
  const { form, formData, updateFormData } = useFormData(null);
  //   const [fileUrl, setFileUrl] = useState<string>(null);

  const { data, loading } = useQuery(GET_DOCUMENTS);

  const [createDocument] = useMutation(CREATE_DOCUMENT, {
    refetchQueries: [GET_DOCUMENTS],
  });
  const submitForm = async (e) => {
    console.log(formData);
    await createDocument({
      variables: {
        data: {
          name: data.name,
          document: e.fileUrl,
        },
      },
    });
    toast.success('document created ok');
  };

  if (loading) return <LoadingComponent />;

  return (
    <div className='text-slate-900'>
      <div>
        <h1 className='text-3xl text-slate-900 font-bold text-center m-4'>
          Fase de contratación
        </h1>
      </div>
      <form ref={form} onChange={updateFormData} onSubmit={submitForm}>
        <div className='m-4 my-4'>
          <p className='my-4'>
            Felicitaciones, estás a punto de unirte a nosotros. <br /> En este
            punto deberás subir los siguientes archivos:
          </p>
          <div>
            {data.getUploadedDocuments.map((document) => (
              <UploadedDocument
                key={document.id}
                document={document}
                button={false}
              />
            ))}
          </div>

          <p className='my-4'>
            Finalmente, deberás cargar los siguientes documentos firmados una
            vez la empresa los cargue:
          </p>
          <div>
            {data.getUploadedDocuments.map((document) => (
              <UploadedDocument
                key={document.id}
                document={document}
                button={false}
              />
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};

const UploadedDocument = ({ document, button }) => (
  <div>
    <h6 className=' my-4'>· {document.name}</h6>;
    {(() => {
      if (button) {
        return (
          <div className='bg-slate-400 hover:border-gray-400 border-2 rounded-lg text-center cursor-pointer'>
            <FileUpload
              folder='documents'
              text='Elegir'
              resourceType='raw'
              successCallback={successCallback}
              errorCallback={errorCallback}
            />
            <i className='fa-solid fa-file-arrow-up text-2xl text-slate-800 mx-4 ' />
          </div>
        );
      }
    })()}
  </div>
);

export default Documents;
