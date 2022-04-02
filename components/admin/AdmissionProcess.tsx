import React from 'react';

const AdmissionProcess = ({ closeDialog, admissionProcessId }) => {
  console.log('object');
  const submitForm = async (e) => {
    e.preventDefault();
    closeDialog();
  };
  return (
    <div className='p-10 flex flex-col items-center'>
      <div>AdmissionProcess {admissionProcessId}</div>
      <button type='button' onClick={submitForm}>
        Cerrar
      </button>
    </div>
  );
};

export default AdmissionProcess;
