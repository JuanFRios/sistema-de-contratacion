import React from 'react';
import { matchRoles } from 'utils/matchRoles';
import { Tooltip } from '@mui/material';
import { toast } from 'react-toastify';
import useFormData from 'hooks/useFormData';
import FileUpload from '@components/FileUpload';

export async function getServerSideProps(context) {
  return {
    props: { ...(await matchRoles(context)) },
  };
}

const Documents = () => {
  const { form, formData, updateFormData } = useFormData(null);
  //   const [fileUrl, setFileUrl] = useState<string>(null);

  const successCallback = (e) => {
    console.log(e);
    // setFileUrl(e.info.url);
  };
  const errorCallback = () => {
    toast.error('error uploading file');
  };
  const submitForm = async (e) => {
    e.preventDefault();
    console.log(formData);
    // await createDocument({
    //   variables: {
    //     data: {
    //       name: formData.name,
    //       document: fileUrl,
    //     },
    //   },
    // });
    toast.success('document created ok');
  };

  return (
    <div className='text-slate-900'>
      <div>
        <h1 className='text-3xl text-slate-900 font-bold text-center m-4'>
          Fase de contratación
        </h1>
      </div>
      <form ref={form} onChange={updateFormData} onSubmit={submitForm}>
        <div className='m-4 my-4'>
          <p className='my-4'>
            Felicitaciones, estás a punto de unirte a nosotros. <br /> En este
            punto deberás subir los siguientes archivos:
          </p>
          <h6 className='my-4'>· Cédula</h6>
          <h6 className=' my-4'>· Acta de graduación</h6>
          <p className='my-4'>
            Finalmente, deberás cargar los siguientes documentos firmados una
            vez la empresa los cargue:
          </p>
          <h6 className='my-4'>· Contrato</h6>
        </div>
        <div className='flex flex-col m-4 '>
          <h1>ARCHIVOS QUE DEBES CARGAR: </h1>
          <div className='flex flex-col'>
            <div className='flex my-4 font-bold'>
              <h6 className='mx-4 my-2'>Cédula:</h6>
              <div className='bg-slate-400 hover:border-gray-400 border-2 rounded-lg text-center cursor-pointer'>
                <FileUpload
                  folder='documents'
                  text='Elegir'
                  resourceType='raw'
                  successCallback={successCallback}
                  errorCallback={errorCallback}
                />
                <i className='fa-solid fa-file-arrow-up text-2xl text-slate-800 mx-4 ' />
              </div>
            </div>
            <div className='flex my-4 font-bold'>
              <h6 className='mx-4 my-2'>Acta de graduación:</h6>
              <div className='bg-slate-400 hover:border-gray-400 border-2 rounded-lg text-center cursor-pointer'>
                <FileUpload
                  folder='documents'
                  text='Elegir'
                  resourceType='raw'
                  successCallback={successCallback}
                  errorCallback={errorCallback}
                />
                <i className='fa-solid fa-file-arrow-up text-2xl text-slate-800 mx-4 ' />
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col m-4 mx-4 '>
          <h6 className=''>ARCHIVOS CARGADOS POR JOINUS: </h6>
          <div className='flex mx-8 my-4 '>
            <h6 className='font-bold m-2 '>Contrato:</h6>
            <Tooltip title='Download Document'>
              <a href='/admin/candidates' target='_blank' rel='noreferrer'>
                <div className='flex bg-slate-400 border-2 rounded-lg mx-4 text-center hover:border-gray-400'>
                  <h6 className='m-2'>Descargar</h6>
                  <i className='fa-solid fa-download text-2xl text-slate-800 mx-4 cursor-pointer' />
                </div>
              </a>
            </Tooltip>
          </div>
          <div className='flex mx-12 my-4'>
            <h6 className='font-bold mx-4 my-2'>Contrato firmado:</h6>
            <div className='bg-slate-400 hover:border-gray-400 border-2 rounded-lg text-center cursor-pointer'>
              <FileUpload
                folder='documents'
                text='Elegir'
                resourceType='raw'
                successCallback={successCallback}
                errorCallback={errorCallback}
              />
              <i className='fa-solid fa-file-arrow-up text-2xl text-slate-800 mx-4 ' />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Documents;
