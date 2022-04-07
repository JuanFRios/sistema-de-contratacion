import { useQuery } from '@apollo/client';
import { GET_ADMISSIONPROCESS_BY_CANDIDATE } from 'graphql/queries/admissionProcess';
import Image from 'next/image';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
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
  const submitForm = async (e) => {
    e.preventDefault();
    closeDialog();
  };

  if (loading) return <LoadingComponent />;

  return (
    <div className='p-10 flex flex-col items-center'>
      <div className='flex items-center'>
        <Image
          src={
            admissionProcess.getAdmissionProcess.candidate.profile
              ? admissionProcess.getAdmissionProcess.candidate.profile
                  .customImage
              : admissionProcess.getAdmissionProcess.candidate.image
          }
          alt='Perfil del candidato'
          height={60}
          width={60}
          className='rounded-full'
        />
        <p>{admissionProcess.getAdmissionProcess.candidate.name}</p>
      </div>
      <div>
        <div>AdmissionProcess {admissionProcessId}</div>
        <BodyAdmissionProcess />
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

const BodyAdmissionProcess = () => {
  const steps = [
    {
      label: 'Select campaign settings',
      description: `For each ad campaign that you create, you can control how much
                you're willing to spend on clicks and conversions, which networks
                and geographical locations you want your ads to show on, and more.`,
    },
    {
      label: 'Create an ad group',
      description:
        'An ad group contains one or more ads which target a shared set of keywords.',
    },
    {
      label: 'Create an ad',
      description: `Try out different ad text to see what brings in the most customers,
                and learn how to enhance your ads using features like ad extensions.
                If you run into any problems with your ads, find out how to tell if
                they're running and how to resolve approval issues.`,
    },
  ];
  const [activeStep, setActiveStep] = useState(0);

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
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation='horizontal'>
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 2 ? (
                  <Typography variant='caption'>Last step</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <InterviewDeatail />
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant='contained'
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? 'Finish' : 'Continue'}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
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
