import React from 'react';
import { ButtonLoading } from '@components/utils/ButtonLoading';

const ConfirmDialog = ({ closeDialog, onConfirm, loading }) => {
  console.log(closeDialog);
  return (
    <div>
      <div>
        <ButtonLoading
          isSubmit={false}
          text='Sí'
          loading={loading}
          onClick={onConfirm}
        />
      </div>
    </div>
  );
};

export default ConfirmDialog;
