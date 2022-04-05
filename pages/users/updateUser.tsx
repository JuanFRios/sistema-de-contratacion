import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_USER_ACCOUNT } from 'graphql/mutations/user';
import { GET_USER_PROFILE } from 'graphql/queries/user';
import useFormData from 'hooks/useFormData';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import router, { useRouter } from 'next/router';
import React from 'react';
import { toast } from 'react-toastify';
import { matchRoles } from 'utils/matchRoles';
import Image from 'next/image';
import FileUpload from '@components/FileUpload';
// import Link from 'next/link';

export async function getServerSideProps(context) {
  return {
    props: { ...(await matchRoles(context)) },
  };
}

const UpdateUser = () => {
  const { data: session }: any = useSession();
  console.log('sesion', session);

  const { data: userData } = useQuery(GET_USER_PROFILE, {
    variables: {
      email: session.user.email,
    },
  });

  //   const [updateImage] = useMutation(UPDATE_PROFILE_IMAGE, {
  //     refetchQueries: [GET_USER_PROFILE],
  //   });

  //   if (loading) return <div>Loading...</div>;
  //   const router = useRouter();
  const { form, formData, updateFormData } = useFormData(null);
  const [updateUser, { data, loading }] = useMutation(UPDATE_USER_ACCOUNT, {
    refetchQueries: [GET_USER_PROFILE],
  });

  const submitForm = async (e) => {
    // e.preventDefault();
    await updateUser({
      variables: {
        user: userData.getUser.profile.id,
        data: {
          phone: formData.phone,
          identification: formData.identification,
          address: formData.address,
          customImage: e.info.url,
        },
      },
    });
    toast.success('Perfil modificado con éxito');
  };
  const errorCallback = () => {
    toast.error('error uploading file');
  };

  //   if (loading) return <div>Loading....</div>;

  return (
    <div className='text-slate-900 '>
      {/* {data && <div>data loaded</div>} */}
      <div className='flex flex-col font-bold place-items-center text-4xl m-8 mx-4 my-4 border-2 border-inherit rounded-lg bg-slate-50 drop-shadow-lg'>
        <h1 className='mx-4 my-4'>Editar perfil</h1>
      </div>
      <div className='flex flex-col w-full'>
        <div className='w-full flex flex-col items-center p-10'>
          <h1 className='text-2xl font-bold text-gray-900 my-4'>
            User Profile
          </h1>
          <Image
            src={session.user.profile?.customImage ?? session.user.Image}
            alt='User Profile'
            height={120}
            width={120}
            className='rounded-full'
          />
          <div className='my-2'>
            <FileUpload
              errorCallback={errorCallback}
              successCallback={submitForm}
              folder='profile-images'
              resourceType='image'
              text='Change Image'
            />
          </div>
        </div>
        {/* <form
          ref={form}
          onChange={updateFormData}
          onSubmit={submitForm}
          className='m-8 my-8 mx-8'
        > */}
        <div className='flex m-8 '>
          <span className='mx-4 font-bold'>Vacante</span>
          {/* <DropdownComponent option='una vacante' variables='Vacante 1' /> */}
        </div>
        <div className='flex m-8 '>
          <span className='mx-4 font-bold'>Candidato</span>
          {/* <DropdownComponent option='un candidato' variables='Candidato1' /> */}
        </div>
        <label className='flex m-8' htmlFor='date'>
          <span className='mx-4 font-bold'>Fecha</span>
          <input
            className='rounded-lg border-2 border-slate-400 hover:border-slate-800'
            name='date'
            type='date'
          />
        </label>
        <label className='flex m-8' htmlFor='hour'>
          <span className='mx-4 font-bold'>Hora</span>
          <input
            className='rounded-lg border-2 border-slate-400 hover:border-slate-800'
            name='hour'
            type='time'
          />
        </label>
        <label className='flex m-8' htmlFor='details'>
          <span className='mx-4 font-bold'>Detalles</span>
          <input
            className='rounded-lg border-2 border-slate-400 hover:border-slate-800'
            name='details'
            type='text'
          />
        </label>
        <label className='flex m-8' htmlFor='place'>
          <span className='mx-4 font-bold'>Lugar</span>
          <input
            className='rounded-lg border-2 border-slate-400 hover:border-slate-800'
            name='place'
            type='text'
          />
        </label>
        {/* </form> */}
        <Link href='/admin/interviews' passHref>
          <div className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 max-w-min hover:cursor-pointer absolute bottom-10 right-10 m-4 '>
            Guardar
          </div>
        </Link>
      </div>
    </div>
  );
};

export default UpdateUser;
