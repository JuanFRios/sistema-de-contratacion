import { useMutation, useQuery } from '@apollo/client';
import { GET_ADMISSIONPROCESS_BY_CANDIDATE } from 'graphql/queries/admissionProcess';
import Image from 'next/image';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
// import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import FileUpload from '@components/FileUpload';
// import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { CHANGE_STATUS_ADMISSION_PROCESS } from 'graphql/mutations/admissionProcess';
import { toast } from 'react-toastify';
import { GET_REQUIRED_DOCUMENTS } from 'graphql/queries/document';
import { CREATE_OR_UPDATE_DOCUMENT_UPLOAD } from 'graphql/mutations/document';
import {
  DocumentType,
  steps,
  AdmissionStatus,
  decodeStep,
} from '../../utils/admissionProcess';

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

  if (loading) return <div>Loading...</div>;

  let image =
    'https://res.cloudinary.com/proyecto-integrador-udea-2022/image/upload/v1647726660/Screenshot_from_2022-03-19_16-50-20_kqfsoy.png';
  if (
    admissionProcess.getAdmissionProcess.candidate.profile &&
    admissionProcess.getAdmissionProcess.candidate.profile.customImage
  ) {
    image = admissionProcess.getAdmissionProcess.candidate.profile.customImage;
  } else if (admissionProcess.getAdmissionProcess.candidate.image) {
    image = admissionProcess.getAdmissionProcess.candidate.image;
  }

  return (
    <div className='p-10 flex flex-col justify-between w-full h-max-screen'>
      <div className='flex items-center w-full'>
        <Image
          src={image}
          alt='Perfil del candidato'
          height={60}
          width={60}
          className='rounded-full'
        />
        <p>{admissionProcess.getAdmissionProcess.candidate.name}</p>
      </div>
      <div className='flex flex-col'>
        <div>AdmissionProcess {admissionProcessId}</div>
        <div className='h-full overflow-auto'>
          <BodyAdmissionProcess
            admissionProcess={admissionProcess.getAdmissionProcess}
          />
        </div>
      </div>

      <div className='flex justify-end'>
        <button type='button' onClick={closeDialog}>
          Cerrar
        </button>
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

  // const handleHire = async () => {
  //   await ChangeStatus(AdmissionStatus.CONTRATADO);
  //   setActiveStep(decodeStep(AdmissionStatus.CONTRATADO));
  // };

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
              <StepLabel {...labelProps}>{step.label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === 0 && (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
          <div className='h-fit overflow-auto'>
            <InterviewDeatail />
            <InterviewDeatail />
            <InterviewDeatail />
            <InterviewDeatail />
            <InterviewDeatail />
          </div>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            {admissionProcess.status !== AdmissionStatus.FASE_CONTRATACION && (
              <Button color='error' onClick={handleDiscard} sx={{ mr: 1 }}>
                Descartar
              </Button>
            )}
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleFinishInterviews}>
              {admissionProcess.status !== AdmissionStatus.FASE_CONTRATACION
                ? 'Terminar entrevistas'
                : 'Siguiente'}
            </Button>
          </Box>
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
              admissionProcessId={admissionProcess.id}
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
              admissionProcessId={admissionProcess.id}
            />
          );
        }
        return null;
      })}
    </div>
  );
};

const DocumentInput = ({ document, admissionProcessId }) => {
  console.log('object');
  const [createDocument] = useMutation(CREATE_OR_UPDATE_DOCUMENT_UPLOAD, {
    refetchQueries: [GET_ADMISSIONPROCESS_BY_CANDIDATE],
  });
  const successCallback = async (e) => {
    console.log(e);
    await createDocument({
      variables: {
        data: {
          admissionProcessId,
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
    </div>
  );
};

const InterviewDeatail = () => {
  console.log('object');
  return (
    <div className='flex items-start'>
      <Image
        src='https://res.cloudinary.com/proyecto-integrador-udea-2022/image/upload/v1647726660/Screenshot_from_2022-03-19_16-50-20_kqfsoy.png'
        alt='Perfil admin'
        height={60}
        width={60}
        className='rounded-full w-2/12'
      />
      <div className='flex flex-col items-start w-full'>
        <p>
          {' '}
          <b>Juan Fernando Ríos</b> hizo un comentario en{' '}
          <b>entrevista sicológica</b>
        </p>
        <p className='text-justify'>
          El candidato es una persona tímida y poco expresiva El candidato es
          una persona tímida y poco expresiva El candidato es una persona tímida
          y poco expresiva El candidato es una persona tímida y poco expresiva
          El candidato es una persona tímida y poco expresiva{' '}
        </p>
      </div>
    </div>
  );
};

export default AdmissionProcess;
