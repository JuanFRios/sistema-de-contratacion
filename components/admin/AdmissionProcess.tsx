import { useMutation, useQuery } from '@apollo/client';
import { GET_ADMISSIONPROCESS_BY_CANDIDATE } from 'graphql/queries/admissionProcess';
import Image from 'next/image';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
// import StepContent from '@mui/material/StepContent';
import { Button, Dialog } from '@mui/material';
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
import ConfirmDialog from '@components/utils/ConfirmDialog';

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
  const [changeStatus] = useMutation(CHANGE_STATUS_ADMISSION_PROCESS, {
    refetchQueries: [GET_ADMISSIONPROCESS_BY_CANDIDATE],
  });

  if (admissionProcess.status === AdmissionStatus.FASE_ENTREVISTAS) {
    // setActiveStep(0);
  }
  if (admissionProcess.status === AdmissionStatus.DESCARTADO) {
    // setActiveStep(1);
  }

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

  const [OpenConfirmDialogDiscard, setOpenConfirmDialogDiscard] =
    useState(false);

  const closeConfirmDialogDiscard = () => {
    setOpenConfirmDialogDiscard(false);
  };

  const [OpenConfirmDialogContinue, setOpenConfirmDialogContinue] =
    useState(false);

  const closeConfirmDialogContinue = () => {
    setOpenConfirmDialogContinue(false);
  };

  if (activeStep === -1) {
    return (
      <>
        <Typography sx={{ mt: 2, mb: 2, color: 'red', fontSize: '18px' }}>
          El usuario ha sido descartado para la vacante
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
                    fontSize: '1rem',
                  },
                  '& .MuiStepLabel-alternativeLabel': {
                    marginTop: '3px',
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
                  onClick={() => setOpenConfirmDialogDiscard(true)}
                  sx={{ mr: 1 }}
                >
                  Descartar
                </Button>
              )}
              <Button
                variant='contained'
                color='success'
                onClick={() => setOpenConfirmDialogContinue(true)}
              >
                {admissionProcess.status !== AdmissionStatus.FASE_CONTRATACION
                  ? 'Terminar entrevistas'
                  : 'Siguiente'}
              </Button>
            </Box>
          </div>
          <div className='w-full flex justify-center mt-4'>
            <Dialog
              open={OpenConfirmDialogDiscard}
              onClose={closeConfirmDialogDiscard}
            >
              <ConfirmDialog
                closeDialog={closeConfirmDialogDiscard}
                onConfirm={handleDiscard}
                loading=''
                message='¿Seguro que desea descartar este candidato?'
              />
            </Dialog>
            <Dialog
              open={OpenConfirmDialogContinue}
              onClose={closeConfirmDialogContinue}
            >
              <ConfirmDialog
                closeDialog={closeConfirmDialogContinue}
                onConfirm={handleFinishInterviews}
                loading=''
                message='¿Seguro que desea continuar a la fase de contratacion al candidato?'
              />
            </Dialog>
          </div>
        </>
      )}
      {activeStep === 1 && (
        <>
          <DocumentsHire admissionProcess={admissionProcess} />
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color='success'
              variant='contained'
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
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
  if (loading) {
    return <LoadingComponent />;
  }
  return (
    <div>
      <div className='text-lg text-justify font-normal m-2 my-4'>
        Para finalizar el proceso de admisión Joinus debe adjuntar los
        siguientes documentos y{' '}
        <b>
          los documentos marcados con asterisco deben ser firmados por el
          candidato
        </b>
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
      {documents.getDocuments.map((document) => {
        if (document.type === DocumentType.CANDIDATE) {
          return (
            <div>
              <div className='text-lg text-justify font-normal m-2 my-4'>
                De igual forma el usuario debe cargar los siguientes documentos:
              </div>
              <DocumentInput
                key={document.id}
                document={document}
                admissionProcess={admissionProcess}
                showInput
              />
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

const DocumentInput = ({ document, admissionProcess, showInput }) => {
  const [createDocument] = useMutation(CREATE_OR_UPDATE_DOCUMENT_UPLOAD, {
    refetchQueries: [GET_ADMISSIONPROCESS_BY_CANDIDATE],
  });

  const uploaded = admissionProcess.uploadDocumentation.filter(
    (u) => u.documentId === document.id
  );
  const successCallback = async (e) => {
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
    <div className='flex font-bold justify-between'>
      <h6 className='mx-4 my-2 text-xl'>
        {document.name}
        {document.signature ? '*' : ''}
      </h6>
      {uploaded.length > 0 && <div>Descargar</div>}
      {showInput && (
        <div className='flex items-center bg-slate-400 hover:border-gray-400 border-2 rounded-lg cursor-pointer '>
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

const InterviewDeatail = () => (
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
          una persona tímida y poco expresiva El candidato es una persona tímida
          y poco expresiva El candidato es una persona tímida y poco expresiva
          El candidato es una persona tímida y poco expresiva{' '}
        </p>
      </div>
    </div>
  </div>
);

export default AdmissionProcess;
