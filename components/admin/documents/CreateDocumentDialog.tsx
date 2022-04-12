import { useMutation } from '@apollo/client';
import Input from '@components/utils/Input';
import { CREATE_DOCUMENT } from 'graphql/mutations/document';
import useFormData from 'hooks/useFormData';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Dialog } from '@mui/material';
import ConfirmDialog from '@components/utils/ConfirmDialog';

const CreateDocumentDialog = ({ closeDialog }) => {
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const closeConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };
  const { form, formData, updateFormData } = useFormData(null);
  const [createDocument, { loading }] = useMutation(CREATE_DOCUMENT);
  const submitForm = async (e) => {
    e.preventDefault();
    try {
      await createDocument({
        variables: {
          data: {
            name: formData.name,
            description: formData.description,
            type: formData.type,
            signature: formData.signature === 'true',
          },
        },
      });
      toast.success(`Documento ${formData.name} creado exitosamente`);
      closeDialog();
    } catch (error) {
      toast.error('Error creando el documento');
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
        <Input
          name='name'
          type='text'
          min=''
          max=''
          placeholder='Escribe el nombre del documento'
          text='Nombre'
          required
        />
        <Input
          name='description'
          type='text'
          min=''
          max=''
          placeholder='Escribe la descripción'
          text='Descripción'
          required
        />
        <label
          htmlFor='type'
          className='my-4 font-semibold text-gray-900 duration-300 peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500'
        >
          <select
            name='type'
            required
            className='py-2.5 px-0 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block'
          >
            <option disabled selected>
              Seleccione el encargado de subir el documento
            </option>
            <option value='Company'>Empresa</option>
            <option value='Candidate'>Candidato</option>
          </select>
        </label>
        <label
          htmlFor='signature'
          className='my-4 font-semibold text-gray-900 duration-300 peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500'
        >
          <select
            name='signature'
            required
            className='py-2.5 px-0 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block '
          >
            <option disabled selected>
              El documento requiere firma del candidato
            </option>
            <option value='true'>Sí</option>
            <option value='false'>No</option>
          </select>
        </label>
        <div className='w-full flex justify-center mt-4'>
          {/* <ButtonLoading isSubmit text='Crear Documento' loading={loading} /> */}
          <button onClick={() => setOpenConfirmDialog(true)} type='button'>
            ir
          </button>
        </div>
      </form>
      <Dialog open={openConfirmDialog} onClose={closeConfirmDialog}>
        <ConfirmDialog
          closeDialog={closeConfirmDialog}
          onConfirm={submitForm}
          loading={loading}
        />
      </Dialog>
    </div>
  );
};

export default CreateDocumentDialog;
