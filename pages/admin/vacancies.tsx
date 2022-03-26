import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Dialog,
} from '@mui/material';
import useFormData from 'hooks/useFormData';
import React, { useState } from 'react';
import { matchRoles } from 'utils/matchRoles';

export async function getServerSideProps(context) {
  return {
    props: { ...(await matchRoles(context)) },
  };
}

const Vacancies = () => {
  const [expanded, setExpanded] = useState('');
  const [openNewDialog, setOpenNewDialog] = useState(false);

  const icon = <i className='fa-solid fa-angle-down' />;

  const closeDialog = () => {
    setOpenNewDialog(false);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

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

        <Accordion
          expanded={expanded === 'panel1'}
          onChange={handleChange('panel1')}
        >
          <AccordionSummary
            expandIcon={icon}
            aria-controls='panel1bh-content'
            id='panel1bh-header'
            className='border-none'
          >
            <div className='flex justify-between items-center w-full'>
              <p className='font-semibold text-2xl'>Vacante 1</p>
              <button
                type='button'
                onClick={() => {
                  setOpenNewDialog(true);
                }}
              >
                <i className='fa-solid fa-ellipsis mx-4 text-blue-600 text-2xl' />
              </button>
            </div>
          </AccordionSummary>
          <AccordionDetails className='bg-slate-100'>
            <ItemContratationProcess />
            <ItemContratationProcess />
            <ItemContratationProcess />
            <ItemContratationProcess />
            <ItemContratationProcess />
          </AccordionDetails>
        </Accordion>
      </div>
      <Dialog open={openNewDialog} onClose={closeDialog}>
        <NewVacancy closeDialog={closeDialog} />
      </Dialog>
    </div>
  );
};

const ItemContratationProcess = () => (
  <div className='flex justify-center text-xl my-1'>
    <div className='w-full md:w-11/12 h-20 rounded-lg bg-white p-4 flex items-center justify-between'>
      <p>Juan Fernando Ríos Franco</p>
      <p>Estado: En aprobación</p>
    </div>
  </div>
);

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
