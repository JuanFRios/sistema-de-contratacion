import { useQuery } from '@apollo/client';
import { GET_VACANCIES_BY_CANDIDATE } from 'graphql/queries/vacancy';
import React, { useState } from 'react';
import { matchRoles } from 'utils/matchRoles';
import { useSession } from 'next-auth/react';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { AdmissionStatus } from '@utils/admissionProcess';

export async function getServerSideProps(context) {
  return {
    props: { ...(await matchRoles(context)) },
  };
}

const Vacancies = () => {
  const { data: session }: any = useSession();
  const idUser = session.user.id;
  const icon = <i className='fa-solid fa-angle-down' />;
  const { data, loading } = useQuery(GET_VACANCIES_BY_CANDIDATE, {
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        candidateId: idUser,
      },
    },
  });

  const [expanded, setExpanded] = useState('');
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  if (loading) {
    return <div>loading...</div>;
  }

  const admissionProcess = data.getVacancyByCandidate.admissionProcesess.filter(
    (a) => a.candidate.id === idUser
  );

  let className;
  let span;
  switch (admissionProcess[0].status) {
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

  console.log(admissionProcess);

  return (
    <div className='flex justify-center'>
      <div className='w-full lg:w-3/5 '>
        <div className='flex flex-col'>
          <h1 className='w-full text-center text-3xl m-4 font-bold'>
            Procesos de admisión
          </h1>
          <div className='py-1 text-lg'>
            <Accordion expanded={expanded === 'v'} onChange={handleChange('v')}>
              <AccordionSummary
                expandIcon={icon}
                aria-controls='panel1bh-content'
                id='panel1bh-header'
                className='border-none'
              >
                <div className='flex justify-between items-center w-full'>
                  <p className='font-semibold text-2xl'>
                    {data.getVacancyByCandidate.position}
                  </p>
                  <div className='mr-4'>
                    <span className={className}>{span}</span>
                  </div>
                </div>
              </AccordionSummary>
              <AccordionDetails className='bg-slate-100'>
                <p className='w-full text-center'>
                  Aún no hay postulados para esta vacante
                </p>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vacancies;
