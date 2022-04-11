import Image from 'next/image';
import React from 'react';

const CandidateItem = ({ candidate }) => (
  <div>
    <div className='flex p-4'>
      <div
        className='border-2 border-inherit rounded-lg bg-slate-50 drop-shadow-lg text-slate-900 p-2
        hover:cursor-pointer hover:bg-slate-200
        w-96 h-44'
      >
        <div className='p-1 overflow-auto'>
          <div className='flex items-center pb-2'>
            <Image
              // CAMBIAR POR CANDIDATE.CUSTOMIMAGE
              src={candidate.image}
              alt='User profile'
              height={50}
              width={50}
              className='rounded-full'
            />
            <p className='font-semibold text-xl text-center pl-4 pb-2'>
              {candidate.name}
            </p>
          </div>
          <p className='flex font-semibold'>
            Documento:
            <p className='ml-2 font-normal'>{candidate.identification}</p>
          </p>
          <p className='flex font-semibold'>
            Correo:
            <p className='ml-2 font-normal'>{candidate.email}</p>
          </p>
          <p className='flex font-semibold'>
            Teléfono:
            <p className='ml-2 font-normal'>{candidate.phone}</p>
          </p>
        </div>
      </div>
    </div>
  </div>
);
export default CandidateItem;