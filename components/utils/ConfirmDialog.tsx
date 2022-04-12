import React from 'react';
import { ButtonLoading } from '@components/utils/ButtonLoading';
import { Button } from '@mui/material';

const ConfirmDialog = ({ closeDialog, onConfirm, loading, message }) => (
  <div className='m-5'>
    <p className='font-bold text-lg p-2'>{message}</p>
    <div className='m-2 flex justify-evenly'>
      <ButtonLoading isSubmit text='Sí' loading={loading} onClick={onConfirm} />
      <Button
        variant='contained'
        color='error'
        type='button'
        onClick={closeDialog}
      >
        No
      </Button>
    </div>
  </div>
);

export default ConfirmDialog;
