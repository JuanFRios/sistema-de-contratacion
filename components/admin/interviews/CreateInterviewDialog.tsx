import { useMutation, useQuery } from '@apollo/client';
import { ButtonLoading } from '@components/utils/ButtonLoading';
import Input from '@components/utils/Input';
import { CREATE_INTERVIEW } from 'graphql/mutations/interview';
import { GET_SIMPLE_ADMISSIONPROCESESS } from 'graphql/queries/vacancy';
import useFormData from 'hooks/useFormData';
import React from 'react';
import { toast } from 'react-toastify';
import LoadingComponent from '@components/utils/LoadingComponent';
import { AdmissionStatus } from 'utils/admissionProcess';
import moment from 'moment';
import { GET_INTERVIEWS } from 'graphql/queries/interviews';

const CreateInterviewDialog = ({ closeDialog, interviwerId }) => {
  const { form, formData, updateFormData } = useFormData(null);
  const [createUser, { loading }] = useMutation(CREATE_INTERVIEW, {
    refetchQueries: [GET_INTERVIEWS],
  });
  const { data: vacancies, loading: loadingVacancies } = useQuery(
    GET_SIMPLE_ADMISSIONPROCESESS,
    {
      fetchPolicy: 'cache-and-network',
    }
  );

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      await createUser({
        variables: {
          data: {
            name: formData.name,
            admissionProcessId: formData.admissionProcessId,
            interviewerId: interviwerId,
            date: formData.date,
            meetingDetail: formData.meetingDetail,
          },
        },
      });
      toast.success(`Usuario creado correctamente con la clave `, {
        autoClose: false,
      });
      closeDialog();
    } catch (error) {
      toast.error('Error creando el usuario');
      closeDialog();
    }
  };

  if (loadingVacancies) {
    return <LoadingComponent />;
  }

  const admissionProcess = [];
  vacancies.getVacancies.forEach((v) =>
    v.admissionProcesess.forEach((a) => {
      console.log(a);
      if (a.status === AdmissionStatus.FASE_ENTREVISTAS) {
        admissionProcess.push(a);
      }
    })
  );

  return (
    <div className='p-5 flex flex-col items-center font-semibold'>
      <h2 className='my-3 mb-2 text-2xl font-bold text-gray-900'>
        Nueva Entrevista
      </h2>
      <form
        ref={form}
        onChange={updateFormData}
        onSubmit={submitForm}
        className='flex flex-col items-start'
      >
        <Input
          name='name'
          type='text'
          min=''
          max=''
          placeholder='Escribe el asunto'
          text='Asunto'
          required
        />
        <Input
          name='meetingDetail'
          type='text'
          min=''
          max=''
          placeholder='Escribe los detalles y ubicación'
          text='Detalles'
          required
        />
        <Input
          name='date'
          type='datetime-local'
          min={moment().format()}
          max=''
          placeholder='Fecha de la entrevista'
          text='Fecha y hora'
          required
        />
        <label htmlFor='admissionProcessId' className='my-2 flex items-center'>
          <span className='mx-2'>Candidato:</span>
          <select
            name='admissionProcessId'
            required
            defaultValue='Seleccione un candidato'
            className='py-1.5 px-0 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block'
          >
            <option disabled>Seleccione un candidato</option>
            {admissionProcess.map((a) => (
              <option value={a.id} key={a.id}>
                {a.candidate.name}
              </option>
            ))}
          </select>
        </label>
        <div className='w-full flex justify-center pt-3'>
          <ButtonLoading isSubmit text='Crear entrevista' loading={loading} />
        </div>
      </form>
    </div>
  );
};

export default CreateInterviewDialog;
