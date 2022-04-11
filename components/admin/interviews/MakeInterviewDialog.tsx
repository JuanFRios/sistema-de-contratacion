import { useMutation } from '@apollo/client';
import { ButtonLoading } from '@components/utils/ButtonLoading';
import Input from '@components/utils/Input';
import LoadingComponent from '@components/utils/LoadingComponent';
import { COMPLETE_INTERVIEW } from 'graphql/mutations/interview';
import useFormData from 'hooks/useFormData';
import React from 'react';
import { toast } from 'react-toastify';

const MakeInterviewDialog = ({ closeDialog, interview }) => {
  const { form, formData, updateFormData } = useFormData(null);
  const [completeInterview, { loading }] = useMutation(COMPLETE_INTERVIEW);

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
      toast.error('Error creando el usuario');
      closeDialog();
    }
  };
  if (loading) {
    return <LoadingComponent />;
  }
  return (
    <div>
      <div>{interview.name}</div>
      <p>{interview.status}</p>
      <p>{interview.meetingDetail}</p>
      <p>{interview.date}</p>
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
              placeholder='Escribir comentarios'
              text='Comentarios'
              required
            />

            <div className='w-full flex justify-center'>
              <ButtonLoading
                isSubmit
                text='Terminar entrevista'
                loading={loading}
              />
              <button type='button' onClick={() => closeDialog()}>
                {' '}
                Cerrar
              </button>
            </div>
          </form>
        </div>
      )}
      {interview.status === 'Completed' && (
        <div>
          <p>{interview.notes}</p>
          <button type='button' onClick={() => closeDialog()}>
            {' '}
            Cerrar
          </button>
        </div>
      )}
    </div>
  );
};
export default MakeInterviewDialog;
