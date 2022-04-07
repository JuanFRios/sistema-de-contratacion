/* eslint-disable prefer-destructuring */
import { useQuery, useMutation } from '@apollo/client';
import { GET_VACANCIES_BY_CANDIDATE } from 'graphql/queries/vacancy';
import React, { useState } from 'react';
import { matchRoles } from 'utils/matchRoles';
import { useSession } from 'next-auth/react';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { AdmissionStatus, DocumentType } from '@utils/admissionProcess';
import { GET_REQUIRED_DOCUMENTS } from 'graphql/queries/document';
import { CREATE_OR_UPDATE_DOCUMENT_UPLOAD } from 'graphql/mutations/document';
import { toast } from 'react-toastify';
import FileUpload from '@components/FileUpload';

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

  let admissionProcess = data.getVacancyByCandidate.admissionProcesess.filter(
    (a) => a.candidate.id === idUser
  );

  admissionProcess = admissionProcess[0];

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
                {admissionProcess.status ===
                  AdmissionStatus.FASE_ENTREVISTAS && (
                  <Interviews interviews={admissionProcess.interviews} />
                )}
                {admissionProcess.status ===
                  AdmissionStatus.FASE_CONTRATACION && (
                  <Documentation admissionProcess={admissionProcess} />
                )}
                {admissionProcess.status === AdmissionStatus.DESCARTADO && (
                  <p className='w-full text-center'>
                    Tu proceso de admisión ha sido terminado, postúlate a
                    futuras vacantes
                  </p>
                )}
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
};

const Interviews = ({ interviews }) => {
  console.log(interviews);
  return (
    <div>
      {interviews.length === 0 && (
        <p className='w-full text-center'>
          Aún no hay postulados para esta vacante
        </p>
      )}
      {interviews.map((i) => (
        <Interview key={i.id} interview={i} />
      ))}
    </div>
  );
};

const Documentation = ({ admissionProcess }) => {
  const { data: documents, loading } = useQuery(GET_REQUIRED_DOCUMENTS);
  console.log(documents, loading);
  if (loading) {
    return <div>loading..</div>;
  }
  console.log(admissionProcess.uploadDocumentation);
  return (
    <div>
      {documents.getDocuments.map((document) => {
        if (document.type === DocumentType.CANDIDATE) {
          return (
            <DocumentInput
              key={document.id}
              document={document}
              admissionProcess={admissionProcess}
              showInput={
                (document.type === DocumentType.COMPANY &&
                  document.signature) ||
                document.type === DocumentType.CANDIDATE
              }
            />
          );
        }
        return null;
      })}
    </div>
  );
};

const Interview = ({ interview }) => {
  console.log(interview);
  return (
    <div>
      <p>{interview.name}</p>
      <p>{interview.date}</p>
      <p>{interview.meetingDetail}</p>
      <p>{interview.status}</p>
      <p>{interview.interviewer.name}</p>
    </div>
  );
};

const DocumentInput = ({ document, admissionProcess, showInput }) => {
  console.log('object');
  const [createDocument] = useMutation(CREATE_OR_UPDATE_DOCUMENT_UPLOAD, {
    refetchQueries: [GET_VACANCIES_BY_CANDIDATE],
  });

  const uploaded = admissionProcess.uploadDocumentation.filter(
    (u) => u.documentId === document.id
  );
  console.log(uploaded);
  const successCallback = async (e) => {
    console.log(e);
    await createDocument({
      variables: {
        data: {
          admissionProcessId: admissionProcess.id,
          fileUrl: e.info.url,
          documentId: document.id,
        },
      },
    });
    toast.success('document created ok');
    // setFileUrl(e.info.url);
  };
  const errorCallback = () => {
    toast.error('error uploading file');
  };
  return (
    <div className='flex font-bold'>
      <h6 className='mx-4 my-2'>
        {document.name} {document.signature ? '*' : ''}:
      </h6>
      {uploaded.length > 0 && <div>Descargar</div>}
      {showInput && (
        <div className='bg-slate-400 hover:border-gray-400 border-2 mx-2 rounded-lg text-center cursor-pointer'>
          <FileUpload
            folder='documents'
            text='Elegir'
            resourceType='auto'
            successCallback={successCallback}
            errorCallback={errorCallback}
          />
          <i className='fa-solid fa-file-arrow-up text-2xl text-slate-800 mx-4' />
        </div>
      )}
    </div>
  );
};

export default Vacancies;
