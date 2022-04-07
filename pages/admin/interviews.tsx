import React, { useState } from 'react';
import Link from 'next/link';
import LoadingComponent from '@components/utils/LoadingComponent';
// import Link from 'next/link';
import { matchRoles } from 'utils/matchRoles';
import { useMutation, useQuery } from '@apollo/client';
import { GET_INTERVIEWS } from 'graphql/queries/interviews';
import { useSession } from 'next-auth/react';
import { Button, Dialog } from '@mui/material';
import useFormData from 'hooks/useFormData';
import { CREATE_INTERVIEW } from 'graphql/mutations/interview';
import { toast } from 'react-toastify';
import Input from '@components/utils/Input';
import { ButtonLoading } from '@components/utils/ButtonLoading';
import { GET_SIMPLE_ADMISSIONPROCESESS } from 'graphql/queries/vacancy';

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
            <Interview key={i.id} route='admin/interview' interview={i} />
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

const Interview = ({ route, interview }) => (
  <Link href={route} passHref>
    <div>
      <div className='border-2 border-inherit rounded-lg bg-slate-50 drop-shadow-lg mx-20 my-3 max-w-xl text-slate-900 hover:cursor-pointer hover:bg-slate-100'>
        <div className='flex flex-col align-center'>
          <h1 className='flex-col text-md font-bold text-center m-2 '>
            {interview.name}
          </h1>
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
    </div>
  </Link>
);

const CreateInterviewDialog = ({ closeDialog, interviwerId }) => {
  const { form, formData, updateFormData } = useFormData(null);
  const [createUser, { loading }] = useMutation(CREATE_INTERVIEW);
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
    return <div>loading...</div>;
  }

  const admissionProcess = [];
  vacancies.getVacancies.forEach((v) =>
    v.admissionProcesess.forEach((a) => {
      admissionProcess.push(a);
    })
  );

  return (
    <div className='p-5 flex flex-col items-center'>
      <h1>Crear nueva entrevista</h1>
      <form
        ref={form}
        onChange={updateFormData}
        onSubmit={submitForm}
        className='flex flex-col items-start'
      >
        <Input
          name='name'
          type='text'
          placeholder='Escribe el asunto'
          text='Asunto'
          required
        />
        <Input
          name='meetingDetail'
          type='text'
          placeholder='Escribe los detalles y ubicación'
          text='Detalles'
          required
        />
        <Input
          name='date'
          type='datetime-local'
          placeholder='Fecha de la entrevista'
          text='Fecha y hora'
          required
        />
        <label htmlFor='admissionProcessId' className='my-2'>
          <span className='font-bold mx-2'>Candidato:</span>
          <select name='admissionProcessId' required>
            <option disabled selected>
              Seleccione un candidato
            </option>
            {admissionProcess.map((a) => (
              <option value={a.id} key={a.id}>
                {a.candidate.name}
              </option>
            ))}
          </select>
        </label>
        <div className='w-full flex justify-center'>
          <ButtonLoading isSubmit text='Crear entrevista' loading={loading} />
        </div>
      </form>
    </div>
  );
};

export default Interviews;
