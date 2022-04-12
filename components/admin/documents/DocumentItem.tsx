import React from 'react';

const DocumentItem = ({ document }) => {
  let classNameType;
  let spanType;
  switch (document.type) {
    case 'Company':
      classNameType =
        'text-sm text-sky-700 font-mono bg-sky-200 rounded-full px-2 flex items-center';
      spanType = 'Empresa';
      break;
    default:
      classNameType =
        'text-sm text-teal-800 font-mono bg-teal-100 rounded-full px-2 flex items-center';
      spanType = 'Candidato';
      break;
  }
  let classNameSignature;
  let spanSignature;
  switch (document.signature) {
    case true:
      classNameSignature =
        'text-sm text-teal-800 font-mono bg-teal-100 rounded-full px-2 flex items-center';
      spanSignature = 'Si';
      break;
    default:
      classNameSignature =
        'text-sm text-sky-700 font-mono bg-sky-200 rounded-full px-2 flex items-center';
      spanSignature = 'No';
      break;
  }

  return (
    <div>
      <div className='flex justify-center p-4 '>
        <div
          className='p-3 border-2 border-inherit rounded-lg bg-slate-50 drop-shadow-lg text-slate-900
        w-96 h-36 overflow-auto'
        >
          <div className='flex-col justify-center'>
            <p className='font-semibold text-xl text-center pl-4 pb-2'>
              {document.name}
            </p>
            <p className='flex font-semibold pb-2'>
              Descripción:
              <p className='ml-2 font-normal '>{document.description}</p>
            </p>
            <p className='font-semibold float-left pb-1'>
              Encargado:
              <p className={classNameType}>{spanType}</p>
            </p>
            <p className='font-semibold float-right pb-1'>
              Requiere firma:
              <p className={classNameSignature}>{spanSignature}</p>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentItem;
