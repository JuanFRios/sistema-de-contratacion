import { Dialog } from '@mui/material';
import React, { useState } from 'react';
import MakeInterviewDialog from '@components/admin/interviews/MakeInterviewDialog';

const InterviewItem = ({ interview }) => {
  const [openMakeDialog, setOpenMakeDialog] = useState(false);
  const closeDialog = () => {
    setOpenMakeDialog(false);
  };
  return (
    <div>
      <div className='border-2 border-inherit rounded-lg bg-slate-50 drop-shadow-lg mx-20 my-3 max-w-xl text-slate-900 hover:cursor-pointer hover:bg-slate-100'>
        <div className='flex flex-col align-center'>
          <h1 className='flex-col text-md font-bold text-center m-2 '>
            {interview.name}
          </h1>
          <button type='button' onClick={() => setOpenMakeDialog(true)}>
            ir
          </button>
          <div className='grid grid-cols-3 m-3'>
            <div className=''>
              <h2>{interview.admissionProcess.vacancy.position}</h2>
              <h2>{interview.date}</h2>
            </div>
            <div className='flex justify-end'>
              <h2 className='items-right m-4'>{interview.date}</h2>
              {/* <h2 className='absolute inset-y-10 right-0 m-4'>
                  Hora: {interview.hour}
                </h2> */}
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
