import { useQuery } from '@apollo/client';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Dialog,
} from '@mui/material';
import { GET_VACANCIES } from 'graphql/queries/vacancy';
import useFormData from 'hooks/useFormData';
import React, { useState } from 'react';
import { matchRoles } from 'utils/matchRoles';

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

  if (loading) return <div>Loading....</div>;

  return (
    <div className='flex justify-center'>
      <div className='w-full lg:w-3/5 '>
        <div className='flex justify-center p-6 font-bold text-3xl'>
          <p>Vacantes abiertas</p>
        </div>
        <div className='m-2 flex justify-end'>
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
    <div>
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
          {vacancy.admissionProcesess.map((a) => (
            <ItemContratationProcess key={a.id} admissionProcess={a} />
          ))}
        </AccordionDetails>
      </Accordion>
      <Dialog open={openInfoDialog} onClose={closeDialog}>
        <NewVacancy closeDialog={closeDialog} />
      </Dialog>
    </div>
  );
};

const ItemContratationProcess = ({ admissionProcess }) => {
  let className;
  let span;
  if (admissionProcess.status === 'Interview_Phase') {
    className =
      'text-sm text-teal-800 font-mono bg-teal-100 inline rounded-full px-2 align-top float-right';
    span = 'Entrevistas';
  }
  if (admissionProcess.status === 'Hiring_Phase') {
    className =
      'text-sm text-teal-800 font-mono bg-teal-100 inline rounded-full px-2 align-top float-right';
    span = 'Contratación';
  }
  return (
    <div className='flex justify-center text-xl my-1'>
      <div className='w-full md:w-11/12 h-20 rounded-lg bg-white p-4 flex items-center justify-between'>
        <p>{admissionProcess.candidate.name}</p>
        <span className={className}>{span}</span>
      </div>
    </div>
  );
};

const NewVacancy = ({ closeDialog }) => {
  const { form, formData, updateFormData } = useFormData(null);
  // const [updateClient, { loading }] = useMutation(EDIT_CLIENT, {
  //   refetchQueries: [GET_CLIENTES],
  // });
  const submitForm = async (e) => {
    e.preventDefault();
    console.log(formData);
    // await updateClient({
    //   variables: {
    //     updateClientId: client.id,
    //     name: formData.name,
    //   },
    // });
    // toast.success(`Cliente ${client.id} modificado exitosamente`);
    closeDialog();
  };
  return (
    <div className='p-10 flex flex-col items-center'>
      <h2 className='my-3 text-2xl font-extrabold text-gray-900'>
        Editar Cliente
      </h2>
      <form
        ref={form}
        onChange={updateFormData}
        onSubmit={submitForm}
        className='flex flex-col items-center'
      >
        <label htmlFor='name' className='flex flex-col'>
          <span>Nombre del Cliente:</span>
          <input name='name' />
        </label>
      </form>
    </div>
  );
};

export default Vacancies;
