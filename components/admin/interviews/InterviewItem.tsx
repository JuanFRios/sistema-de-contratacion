import { Dialog, IconButton } from '@mui/material';
import React, { useState } from 'react';
import MakeInterviewDialog from '@components/admin/interviews/MakeInterviewDialog';
import moment from 'moment';

const InterviewItem = ({ interview }) => {
  const [openMakeDialog, setOpenMakeDialog] = useState(false);
  const closeDialog = () => {
    setOpenMakeDialog(false);
  };
  let classNameStatus;
  let spanStatus;
  switch (interview.status) {
    case 'Completed':
      classNameStatus =
        'text-sm text-teal-800 font-mono bg-teal-100 rounded-full px-2 flex items-center';
      spanStatus = 'Realizada';
      break;
    default:
      classNameStatus =
        'text-sm text-red-800 font-mono bg-red-400 rounded-full px-2 flex items-center';
      spanStatus = 'Sin realizar';
      break;
  }
  return (
    <div className='flex justify-center p-4 '>
      <div
        className='p-3 border-2 border-inherit rounded-lg bg-slate-50 drop-shadow-lg text-slate-900
        w-96 h-44 overflow-auto'
      >
        <div className='flex-col justify-center'>
          <p className='font-semibold text-xl text-center pl-4 pb-2'>
            {interview.name}
          </p>
          <p className='flex font-semibold pb-2'>
            Vacante:
            <p className='ml-2 font-normal '>
              {interview.admissionProcess.vacancy.position}
            </p>
          </p>
          <p className='flex font-semibold pb-2'>
            Fecha y hora:
            <p className='ml-2 font-normal '>
              {moment(interview.date).format('DD-MM-YYYY LT')}
            </p>
          </p>
          <div className='flex justify-between items-center'>
            <p className='flex font-semibold pb-1'>
              <p className='pr-3'>Estado:</p>
              <p className={classNameStatus}>{spanStatus}</p>
            </p>
            <div className=' flex items-center hover:bg-blue-500 rounded-full fill-black'>
              <IconButton
                aria-label='comments'
                component='span'
                onClick={() => setOpenMakeDialog(true)}
                sx={{
                  '&.MuiButtonBase-root': { color: 'black' },
                }}
              >
                <i className='fa-solid fa-pen-to-square ' />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
      <Dialog open={openMakeDialog} onClose={closeDialog}>
        <MakeInterviewDialog closeDialog={closeDialog} interview={interview} />
      </Dialog>
    </div>
  );
};
export default InterviewItem;
