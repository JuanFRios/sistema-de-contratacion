/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-alert */
/* eslint-disable no-sequences */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/button-has-type */
/* eslint-disable react/no-this-in-sfc */
import { useMutation, useQuery } from '@apollo/client';
import { GET_ADMISSIONPROCESS_BY_CANDIDATE } from 'graphql/queries/admissionProcess';
import Image from 'next/image';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
// import StepContent from '@mui/material/StepContent';
import { Button } from '@mui/material';
import FileUpload from '@components/FileUpload';
// import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { CHANGE_STATUS_ADMISSION_PROCESS } from 'graphql/mutations/admissionProcess';
import { toast } from 'react-toastify';
import { GET_REQUIRED_DOCUMENTS } from 'graphql/queries/document';
import { CREATE_OR_UPDATE_DOCUMENT_UPLOAD } from 'graphql/mutations/document';
import {
  findImage,
  DocumentType,
  steps,
  AdmissionStatus,
  decodeStep,
} from '@utils/admissionProcess';
import LoadingComponent from '@components/utils/LoadingComponent';

const AdmissionProcess = ({ closeDialog, admissionProcessId }) => {
  const { data: admissionProcess, loading } = useQuery(
    GET_ADMISSIONPROCESS_BY_CANDIDATE,
    {
      variables: {
        where: {
          id: admissionProcessId,
        },
      },
    }
  );
  console.log(admissionProcess, loading);

  if (loading) return <LoadingComponent />;

  // CAMBIAR A .candidate.profile.customImage
  const image = findImage(admissionProcess.getAdmissionProcess.candidate);

  return (
    <div className='p-10 flex flex-col justify-between w-full h-max-screen'>
      <div className='flex items-center justify-end w-full'>
        <p className='mr-3 text-sky-700 md:text-xl'>
          {admissionProcess.getAdmissionProcess.candidate.name}
        </p>
        <Image
          src={image}
          alt='Perfil del candidato'
          height={40}
          width={40}
          className='rounded-full'
        />
      </div>
      <div className='flex flex-col'>
        <div className='w-full text-center text-xl md:text-2xl font-semibold my-4'>
          Proceso de admisión{' '}
          {admissionProcess.getAdmissionProcess.vacancy.position}
        </div>
        <div className='h-full overflow-auto'>
          <BodyAdmissionProcess
            admissionProcess={admissionProcess.getAdmissionProcess}
          />
        </div>
      </div>

      <div className='flex justify-end mt-2'>
        <Button variant='contained' type='button' onClick={closeDialog}>
          Cerrar
        </Button>
      </div>
    </div>
  );
};

const BodyAdmissionProcess = ({ admissionProcess }) => {
  const [activeStep, setActiveStep] = useState(
    decodeStep(admissionProcess.status)
  );
  const [changeStatus, { loading }] = useMutation(
    CHANGE_STATUS_ADMISSION_PROCESS
  );

  if (admissionProcess.status === AdmissionStatus.FASE_ENTREVISTAS) {
    // setActiveStep(0);
    console.log('s');
  }
  if (admissionProcess.status === AdmissionStatus.DESCARTADO) {
    // setActiveStep(1);
    console.log('object');
  }

  console.log(admissionProcess);
  console.log(loading);

  const ChangeStatus = async (status) => {
    try {
      await changeStatus({
        variables: {
          where: {
            id: admissionProcess.id,
          },
          data: { status },
        },
      });
    } catch (error) {
      toast.error('Error cambiando el estado del proceso de admisión');
    }
  };

  const handleFinishInterviews = async () => {
    if (admissionProcess.status !== AdmissionStatus.FASE_CONTRATACION) {
      await ChangeStatus(AdmissionStatus.FASE_CONTRATACION);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleDiscard = async () => {
    await ChangeStatus(AdmissionStatus.DESCARTADO);
    setActiveStep(decodeStep(AdmissionStatus.CONTRATADO));
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  if (activeStep === -1) {
    return (
      <>
        <Typography sx={{ mt: 2, mb: 1 }}>
          EL usuario ha sido descartado para la vacante
        </Typography>
      </>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((step) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          return (
            <Step key={step.label} {...stepProps}>
              <StepLabel
                sx={{
                  '& .MuiSvgIcon-root': {
                    width: '35px',
                    height: '35px',
                  },
                  '& .MuiStepLabel-label ': {
                    marginTop: '2.5px',
                    fontSize: '1rem',
                  },
                }}
                {...labelProps}
              >
                {step.label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === 0 && (
        <>
          <div className='h-fit overflow-auto mt-4 mt-'>
            <InterviewDeatail />
            <InterviewDeatail />
            <InterviewDeatail />
            <InterviewDeatail />
            <InterviewDeatail />
          </div>
          <div className='pt-3'>
            <Box sx={{ display: 'contents', flexDirection: 'column' }}>
              {admissionProcess.status !==
                AdmissionStatus.FASE_CONTRATACION && (
                <Button
                  variant='contained'
                  color='error'
                  onClick={handleDiscard}
                  sx={{ mr: 1 }}
                >
                  Descartar
                </Button>
              )}
              <Button
                variant='contained'
                color='success'
                onClick={handleFinishInterviews}
              >
                {admissionProcess.status !== AdmissionStatus.FASE_CONTRATACION
                  ? 'Terminar entrevistas'
                  : 'Siguiente'}
              </Button>
            </Box>
          </div>
        </>
      )}
      {activeStep === 1 && (
        <>
          <DocumentsHire admissionProcess={admissionProcess} />
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button color='inherit' onClick={handleBack} sx={{ mr: 1 }}>
              Ver entrevistas
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
          </Box>
        </>
      )}
    </Box>
  );
};

const DocumentsHire = ({ admissionProcess }) => {
  const { data: documents, loading } = useQuery(GET_REQUIRED_DOCUMENTS);
  console.log(documents, loading);
  if (loading) {
    return <div>loading..</div>;
  }
  return (
    <div>
      <div>
        Para finalizar el proceso de admisión Joinus debe adjuntar los
        siguientes documentos y los marcados con rojo deben ser firmados por el
        candidato:
      </div>
      {documents.getDocuments.map((document) => {
        if (document.type === DocumentType.COMPANY) {
          return (
            <DocumentInput
              key={document.id}
              document={document}
              admissionProcess={admissionProcess}
              showInput
            />
          );
        }
        return null;
      })}
      <div>
        De igual forma el usuario debe cargar los siguientes documentos:
      </div>
      {documents.getDocuments.map((document) => {
        if (document.type === DocumentType.CANDIDATE) {
          return (
            <DocumentInput
              key={document.id}
              document={document}
              admissionProcess={admissionProcess}
              showInput={false}
            />
          );
        }
        return null;
      })}
    </div>
  );
};

const DocumentInput = ({ document, admissionProcess, showInput }) => {
  console.log('object');
  const [createDocument] = useMutation(CREATE_OR_UPDATE_DOCUMENT_UPLOAD, {
    refetchQueries: [GET_ADMISSIONPROCESS_BY_CANDIDATE],
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
        <div className=' bg-slate-400 hover:border-gray-400 border-2 mx-2 rounded-lg text-center cursor-pointer'>
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

const InterviewDeatail = () => {
  console.log('object');
  return (
    <div className='flex pb-4'>
      <div className='flex items-center'>
        <Image
          src='https://res.cloudinary.com/proyecto-integrador-udea-2022/image/upload/v1647726660/Screenshot_from_2022-03-19_16-50-20_kqfsoy.png'
          alt='Perfil admin'
          height={60}
          width={60}
          className='rounded-full w-2/12'
        />
      </div>

      <div className='flex flex-col items-start w-full pl-4'>
        <p>
          {' '}
          <b>Juan Fernando Ríos</b> hizo un comentario en{' '}
          <b>entrevista sicológica</b>
        </p>
        <div className='text-justify border-2 rounded-lg border-slate-500'>
          <p className='p-1'>
            El candidato es una persona tímida y poco expresiva El candidato es
            una persona tímida y poco expresiva El candidato es una persona
            tímida y poco expresiva El candidato es una persona tímida y poco
            expresiva El candidato es una persona tímida y poco expresiva{' '}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdmissionProcess;
