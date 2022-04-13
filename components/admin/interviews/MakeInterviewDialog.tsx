import { useMutation } from '@apollo/client';
import ConfirmDialog from '@components/utils/ConfirmDialog';
import Input from '@components/utils/Input';
import LoadingComponent from '@components/utils/LoadingComponent';
import { Button, Dialog } from '@mui/material';
import { COMPLETE_INTERVIEW } from 'graphql/mutations/interview';
import { GET_INTERVIEWS } from 'graphql/queries/interviews';
import useFormData from 'hooks/useFormData';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const MakeInterviewDialog = ({ closeDialog, interview }) => {
  const { form, formData, updateFormData } = useFormData(null);
  const [completeInterview, { loading }] = useMutation(COMPLETE_INTERVIEW, {
    refetchQueries: [GET_INTERVIEWS],
  });
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const closeConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };
  let classNameStatus;
  let spanStatus;
  switch (interview.status) {
    case 'Completed':
      classNameStatus =
        'text-sm text-teal-800 font-mono bg-teal-100 rounded-full px-2 flex items-center';
      spanStatus = 'Realizada';
      break;
    default:
      classNameStatus =
        'text-sm text-red-800 font-mono bg-red-400 rounded-full px-2 flex items-center';
      spanStatus = 'Sin realizar';
      break;
  }
  const submitForm = async (e) => {
    e.preventDefault();

    try {
      await completeInterview({
        variables: {
          where: {
            id: interview.id,
          },
          data: {
            notes: formData.notes,
          },
        },
      });
      toast.success(`La entrevista ha sido completada`, {
        autoClose: false,
      });
      closeDialog();
    } catch (error) {
      toast.error('Error modificando la entrevista');
      closeDialog();
    }
  };
  if (loading) {
    return <LoadingComponent />;
  }
  return (
    <div
      className='p-3 border-2 border-inherit rounded-lg bg-slate-50 drop-shadow-lg text-slate-900
        w-96 max-w-sm'
    >
      <div className='flex-col justify-center'>
        <p className='font-semibold text-xl text-center pl-4 pb-2'>
          {interview.name}
        </p>
        <p className='flex font-semibold pb-2'>
          Vacante:
          <p className='ml-2 font-normal '>
            {interview.admissionProcess.vacancy.position}
          </p>
        </p>
        <p className='flex font-semibold pb-2'>
          Fecha y hora:
          <p className='ml-2 font-normal '>{interview.date}</p>
        </p>
        <div className='flex justify-between items-center'>
          <p className='flex font-semibold'>
            <p className='pr-3'>Estado:</p>
            <p className={classNameStatus}>{spanStatus}</p>
          </p>
        </div>
      </div>
      {interview.status === 'NotCompleted' && (
        <div>
          <form
            ref={form}
            onChange={updateFormData}
            onSubmit={submitForm}
            className='flex flex-col items-start'
          >
            <Input
              name='notes'
              type='text'
              min=''
              max=''
              placeholder='Escribir comentarios'
              text='Comentarios'
              required
            />

            <div className='w-full flex justify-between'>
              <Button
                variant='contained'
                color='primary'
                type='button'
                onClick={closeDialog}
              >
                Cerrar
              </Button>
              <Button
                variant='contained'
                color='success'
                type='button'
                onClick={() => setOpenConfirmDialog(true)}
              >
                Terminar entrevista
              </Button>
            </div>
          </form>
          <div className='w-full flex justify-center mt-4'>
            <Dialog open={openConfirmDialog} onClose={closeConfirmDialog}>
              <ConfirmDialog
                closeDialog={closeConfirmDialog}
                onConfirm={submitForm}
                loading={loading}
                message='¿Seguro que desea terminar esta entrevista?'
              />
            </Dialog>
          </div>
        </div>
      )}
      {interview.status === 'Completed' && (
        <div className=''>
          {interview.notes ? (
            <div className='flex font-semibold py-2'>
              <p className='pr-3'>Comentario:</p>
              <div className='flex text-justify border-2 rounded-lg border-slate-500 break-all '>
                <div className='p-1'>{interview.notes}</div>
              </div>
            </div>
          ) : (
            <div />
          )}
          <div className='my-2'>
            <Button
              variant='contained'
              color='primary'
              type='button'
              onClick={closeDialog}
            >
              Cerrar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
export default MakeInterviewDialog;
