import React from 'react';
import { ButtonLoading } from '@components/utils/ButtonLoading';
import { Button } from '@mui/material';

const ConfirmDialog = ({ closeDialog, onConfirm, loading, message }) => (
  <div>
    <p>{message}</p>
    <div>
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
