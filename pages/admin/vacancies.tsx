import { useMutation, useQuery } from '@apollo/client';
import { ButtonLoading } from '@components/utils/ButtonLoading';
import Input from '@components/utils/Input';
import LoadingComponent from '@components/utils/LoadingComponent';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Dialog,
} from '@mui/material';
import { CREATE_VACANCY } from 'graphql/mutations/vacancy';
import { GET_VACANCIES } from 'graphql/queries/vacancy';
import useFormData from 'hooks/useFormData';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { matchRoles } from 'utils/matchRoles';
// eslint-disable-next-line import/no-named-as-default
import AdmissionProcess from '@components/admin/AdmissionProcess';
import { AdmissionStatus, findImage } from '@utils/admissionProcess';
import Image from 'next/image';

export async function getServerSideProps(context) {
  return {
    props: { ...(await matchRoles(context)) },
  };
}

const Vacancies = () => {
  const { data, loading } = useQuery(GET_VACANCIES, {
    fetchPolicy: 'cache-and-network',
  });
  const [expanded, setExpanded] = useState('');
  const [openNewDialog, setOpenNewDialog] = useState(false);

  const closeDialog = () => {
    setOpenNewDialog(false);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  if (loading) return <LoadingComponent />;

  return (
    <div className='flex justify-center'>
      <div className='w-full lg:w-3/5 '>
        <div className='flex justify-center pt-3 md:pt-12 pb-0 md:pb-6 font-bold text-4xl'>
          <p>Vacantes abiertas</p>
        </div>
        <div className='m-4 pb-0 md:pb-6 flex justify-end text-9xl'>
          <Button
            variant='contained'
            startIcon={<i className='fa-solid fa-plus' />}
            onClick={() => {
              setOpenNewDialog(true);
            }}
          >
            Nueva Vacante
          </Button>
        </div>
        {data.getVacancies.map((v) => (
          <Vacancy
            key={v.id}
            vacancy={v}
            expanded={expanded}
            handleChange={handleChange}
          />
        ))}
      </div>
      <Dialog open={openNewDialog} onClose={closeDialog}>
        <NewVacancy closeDialog={closeDialog} />
      </Dialog>
    </div>
  );
};

const Vacancy = ({ vacancy, expanded, handleChange }) => {
  const [openInfoDialog, setOpenInfoDialog] = useState(false);
  const icon = <i className='fa-solid fa-angle-down' />;
  const closeDialog = () => {
    setOpenInfoDialog(false);
  };
  return (
    <div className='py-1 text-lg'>
      <Accordion
        expanded={expanded === vacancy.id}
        onChange={handleChange(vacancy.id)}
      >
        <AccordionSummary
          expandIcon={icon}
          aria-controls='panel1bh-content'
          id='panel1bh-header'
          className='border-none'
        >
          <div className='flex justify-between items-center w-full'>
            <p className='font-semibold text-2xl'>{vacancy.position}</p>
            <button
              type='button'
              onClick={() => {
                setOpenInfoDialog(true);
              }}
            >
              <i className='fa-solid fa-ellipsis mx-4 text-blue-600 text-2xl' />
            </button>
          </div>
        </AccordionSummary>
        <AccordionDetails className='bg-slate-100'>
          {vacancy.admissionProcesess.length === 0 && (
            <p className='w-full text-center'>
              Aún no hay postulados para esta vacante
            </p>
          )}
          {vacancy.admissionProcesess.map((a) => (
            <ItemContratationProcess key={a.id} admissionProcess={a} />
          ))}
        </AccordionDetails>
      </Accordion>
      <Dialog open={openInfoDialog} onClose={closeDialog}>
        <VacancyDetail closeDialog={closeDialog} vacancy={vacancy} />
      </Dialog>
    </div>
  );
};

const ItemContratationProcess = ({ admissionProcess }) => {
  const [openProcessDialog, setOpenProcessDialog] = useState(false);
  const image = findImage(admissionProcess.candidate);
  const closeDialog = () => {
    setOpenProcessDialog(false);
  };
  let className;
  let span;
  switch (admissionProcess.status) {
    case AdmissionStatus.FASE_ENTREVISTAS:
      className =
        'text-sm text-sky-700 font-mono bg-sky-200 inline rounded-full px-2 align-top float-right';
      span = 'Fase entrevistas';
      break;
    case AdmissionStatus.FASE_CONTRATACION:
      className =
        'text-sm text-teal-800 font-mono bg-teal-100 inline rounded-full px-2 align-top float-right';
      span = 'Fase contratación';
      break;
    case AdmissionStatus.DESCARTADO:
      className =
        'text-sm text-red-800 font-mono bg-red-400 inline rounded-full px-2 align-top float-right';
      span = 'Descartado';
      break;
    default:
      className =
        'text-sm text-sky-700 font-mono bg-sky-200 inline rounded-full px-2 align-top float-right';
      span = 'Indeterminado';
      break;
  }

  return (
    <>
      <div className='flex justify-center text-xl my-2'>
        <div className='w-full md:w-11/12 h-fit rounded-lg bg-white p-4 flex flex-col items-center justify-between'>
          <div className='flex w-full justify-end'>
            <span className={className}>{span}</span>
          </div>
          <div className='flex justify-between w-full'>
            <div className='flex items-center'>
              <Image
                src={image}
                alt='Perfil del candidato'
                height={40}
                width={40}
                className='rounded-full'
              />
              <p className='px-2'>{admissionProcess.candidate.name}</p>
            </div>
            <button
              type='button'
              onClick={() => {
                setOpenProcessDialog(true);
              }}
            >
              <i className='fa-solid fa-eye mx-4 text-blue-600 text-2xl' />
            </button>
          </div>
        </div>
      </div>
      <Dialog open={openProcessDialog} onClose={closeDialog}>
        <AdmissionProcess
          closeDialog={closeDialog}
          admissionProcessId={admissionProcess.id}
        />
      </Dialog>
    </>
  );
};

const VacancyDetail = ({ closeDialog, vacancy }) => (
  <div className='p-10 flex flex-col items-start w-full'>
    <h2 className='my-3 mb-2 text-2xl font-extrabold text-gray-900 w-full text-center'>
      {vacancy.position}
    </h2>
    <p>
      {' '}
      <b>Rango salarial: </b> {vacancy.minimumSalary} - {vacancy.maximumSalary}
    </p>
    <p>
      {' '}
      <b>Fecha de ingreso: </b> {vacancy.startDate}
    </p>
    <p>
      {' '}
      <b>Número máximo de aspirantes: </b> {vacancy.candidatesQuantity}
    </p>

    <div className='w-full flex justify-center mt-4'>
      <button type='button' onClick={closeDialog}>
        Cerrar
      </button>
    </div>
  </div>
);

const NewVacancy = ({ closeDialog }) => {
  const { form, formData, updateFormData } = useFormData(null);
  const [createVacancy, { loading }] = useMutation(CREATE_VACANCY);
  const submitForm = async (e) => {
    e.preventDefault();
    await createVacancy({
      variables: {
        data: {
          position: formData.position,
          candidatesQuantity: parseInt(formData.candidatesQuantity, 10),
          description: formData.description,
          minimumSalary: formData.minimumSalary,
          maximumSalary: formData.maximumSalary,
          startDate: formData.startDate,
        },
      },
    });
    toast.success(`Cliente modificado exitosamente`);
    closeDialog();
  };
  return (
    <div className='p-10 flex flex-col items-center w-full'>
      <h2 className='my-3 mb-2 text-2xl font-extrabold text-gray-900'>
        Nueva Vacante
      </h2>
      <form
        ref={form}
        onChange={updateFormData}
        onSubmit={submitForm}
        className='flex flex-col'
      >
        <Input
          name='position'
          type='text'
          placeholder='Escribe el nombre de a vacante'
          text='Nombre de la vacante'
          required
        />
        <Input
          name='description'
          type='text'
          placeholder='Escribe la descripción'
          text='Descripción'
          required
        />
        <div className='flex flex-col md:flex-row'>
          <Input
            name='minimumSalary'
            type='number'
            placeholder='Escribe valor mínimo del salario'
            text='Base salarial'
            required
          />
          <Input
            name='maximumSalary'
            type='number'
            placeholder='Escribe valor máximo del salario'
            text='Salario máximo'
            required
          />
        </div>
        <div className='flex flex-col md:flex-row'>
          <Input
            name='candidatesQuantity'
            type='number'
            placeholder='Escribe el número máximo de candidatos'
            text='Número de candidatos'
            required
          />
          <Input
            name='startDate'
            type='date'
            placeholder='Escribe la fecha'
            text='Fecha de inicio de labores'
            required
          />
        </div>
        <div className='w-full flex justify-center mt-4'>
          <ButtonLoading isSubmit text='Crear Documento' loading={loading} />
        </div>
      </form>
    </div>
  );
};

export default Vacancies;
