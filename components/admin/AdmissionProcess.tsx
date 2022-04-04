import { useQuery } from '@apollo/client';
import { GET_ADMISSIONPROCESS_BY_CANDIDATE } from 'graphql/queries/admissionProcess';
import Image from 'next/image';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
// import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
// import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import {
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
  const submitForm = async (e) => {
    e.preventDefault();
    closeDialog();
  };

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
    <div className='p-10 flex flex-col items-center w-full'>
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
      <div>
        <div>AdmissionProcess {admissionProcessId}</div>
        <BodyAdmissionProcess
          admissionProcess={decodeStep(
            admissionProcess.getAdmissionProcess.status
          )}
        />
      </div>

      <div className='flex justify-end'>
        <button type='button' onClick={submitForm}>
          Contratar
        </button>
        <button type='button' onClick={submitForm}>
          Descartar
        </button>
        <button type='button' onClick={submitForm}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

const BodyAdmissionProcess = ({ admissionProcess }) => {
  const [activeStep, setActiveStep] = useState(admissionProcess);
  if (admissionProcess === AdmissionStatus.FASE_ENTREVISTAS) {
    // setActiveStep(0);
    console.log('s');
  }
  if (admissionProcess === AdmissionStatus.DESCARTADO) {
    // setActiveStep(1);
    console.log('object');
  }

  console.log(admissionProcess);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

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
          <p>Holaaaaaaa</p>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color='inherit'
              disabled
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </>
      )}
      {activeStep === 1 && (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
          <InterviewDeatail />
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button color='inherit' onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </>
      )}
      {activeStep === steps.length && (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </>
      )}
      {activeStep === -1 && (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            EL usuario ha sido descartado para la vacante
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </>
      )}
    </Box>
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
        <p>Juan Fernando Ríos hizo un comentario en entrevista sicológica</p>
        <p className='text-justify'>
          El candidato es una persona tímida y poco expresiva El candidato es
          una persona tímida y poco expresiva El candidato es una persona tímida
          y poco expresiva El candidato es una persona tímida y poco expresiva
          El candidato es una persona tímida y poco expresiva El candidato es
          una persona tímida y poco expresivaEl candidato es una persona tímida
          y poco expresiva El candidato es una persona tímida y poco expresiva
          El candidato es una persona tímida y poco expresiva{' '}
        </p>
      </div>
    </div>
  );
};

export default AdmissionProcess;
