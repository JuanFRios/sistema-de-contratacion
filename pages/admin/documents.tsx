import React, { useState } from 'react';
import { matchRoles } from 'utils/matchRoles';
import { useMutation, useQuery } from '@apollo/client';
import { Button, Dialog } from '@mui/material';
import { GET_DOCUMENTS } from 'graphql/queries/document';
import useFormData from 'hooks/useFormData';
import { toast } from 'react-toastify';
import { ButtonLoading } from '@components/utils/ButtonLoading';
import { CREATE_DOCUMENT } from 'graphql/mutations/document';

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

  if (loading) return <div>Loading....</div>;

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
        <div className='flex flex-wrap justify-center'>
          {data.getDocuments.map((d) => (
            <Document key={d.id} document={d} />
          ))}
        </div>
      </div>
      <Dialog open={openNewDialog} onClose={closeDialog}>
        <CreateDocumentDialog closeDialog={closeDialog} />
      </Dialog>
    </div>
  );
};

const Document = ({ document }) => {
  let classNameType;
  let spanType;
  switch (document.type) {
    case 'Company':
      classNameType =
        'text-sm text-sky-700 font-mono bg-sky-200 rounded-full px-2 flex items-center';
      spanType = 'Empresa';
      break;
    default:
      classNameType =
        'text-sm text-teal-800 font-mono bg-teal-100 rounded-full px-2 flex items-center';
      spanType = 'Candidato';
      break;
  }
  let classNameSignature;
  let spanSignature;
  switch (document.signature) {
    case true:
      classNameSignature =
        'text-sm text-teal-800 font-mono bg-teal-100 rounded-full px-2 flex items-center';
      spanSignature = 'Si';
      break;
    default:
      classNameSignature =
        'text-sm text-sky-700 font-mono bg-sky-200 rounded-full px-2 flex items-center';
      spanSignature = 'No';
      break;
  }

  return (
    <div>
      <div className='flex justify-center p-4'>
        <div
          className='p-3 border-2 border-inherit rounded-lg bg-slate-50 drop-shadow-lg text-slate-900
      hover:cursor-pointer hover:bg-slate-200
      w-96 h-48 overflow-auto'
        >
          <div className='flex-col justify-center'>
            <p className='font-semibold text-xl text-center pl-4 pb-2'>
              {document.name}
            </p>
            <p className='flex font-semibold pb-2'>
              Descripción:
              <p className='ml-2 font-normal '>{document.description}</p>
            </p>
            <p className='font-semibold float-left pb-1'>
              Encargado:
              <p className={classNameType}>{spanType}</p>
            </p>
            <p className='font-semibold float-right pb-1'>
              Requiere firma:
              <p className={classNameSignature}>{spanSignature}</p>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const CreateDocumentDialog = ({ closeDialog }) => {
  const { form, formData, updateFormData } = useFormData(null);
  const [createDocument, { loading }] = useMutation(CREATE_DOCUMENT);
  const submitForm = async (e) => {
    e.preventDefault();
    console.log(createDocument);
    try {
      await createDocument({
        variables: {
          data: {
            name: formData.name,
            description: formData.description,
            type: formData.type.value,
            signature: true,
            // formData.signature, HABILITAR
          },
        },
      });
      toast.success(`Documento ${formData.name} creado exitosamente`);
      closeDialog();
    } catch (error) {
      toast.error('Error creando el usuario');
      closeDialog();
    }
  };
  return (
    <div className='p-10 flex flex-col items-center'>
      <h2 className='my-3 mb-2 text-2xl font-extrabold text-gray-900'>
        Crear Documento
      </h2>
      <form
        ref={form}
        onChange={updateFormData}
        onSubmit={submitForm}
        className='flex flex-col'
      >
        <label
          htmlFor='name'
          className='my-4 font-semibold text-gray-900 duration-300 peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500'
        >
          <span>Nombre del Documento:</span>
          <input
            name='name'
            required
            className='py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-non focus:outline-none focus:ring-0 focus:border-blue-600 peer'
          />
        </label>
        <label
          htmlFor='description'
          className='my-4 font-semibold text-gray-900 duration-300 peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500'
        >
          <span>Descripción del Documento:</span>
          <input
            name='description'
            required
            className='py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-non focus:outline-none focus:ring-0 focus:border-blue-600 peer'
          />
        </label>
        <label
          htmlFor='type'
          className='my-4 font-semibold text-gray-900 duration-300 peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500'
        >
          <select
            name='type'
            required
            className='py-2.5 px-0 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block '
          >
            <option disabled selected>
              Seleccione el encargado de subir el documento
            </option>
            <option value='Company'>Empresa</option>
            <option value='Candidate'>Candidato</option>
          </select>
        </label>
        <div className='w-full flex justify-center mt-4'>
          <ButtonLoading isSubmit text='Crear Documento' loading={loading} />
        </div>
      </form>
    </div>
  );
};

export default Documents;
