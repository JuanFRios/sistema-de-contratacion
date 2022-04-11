import { useMutation, useQuery } from '@apollo/client';
import {
  UPDATE_PROFILE_IMAGE,
  UPDATE_USER_ACCOUNT,
} from 'graphql/mutations/user';
import { GET_USER_PROFILE } from 'graphql/queries/user';
import useFormData from 'hooks/useFormData';
import { useSession } from 'next-auth/react';
import React from 'react';
import { toast } from 'react-toastify';
import { matchRoles } from 'utils/matchRoles';
import Image from 'next/image';
import FileUpload from '@components/FileUpload';
import { ButtonLoading } from '@components/utils/ButtonLoading';
import LoadingComponent from '@components/utils/LoadingComponent';
import { findImage } from '../../utils/admissionProcess';

export async function getServerSideProps(context) {
  return {
    props: { ...(await matchRoles(context)) },
  };
}

const UpdateUser = () => {
  const { data: session }: any = useSession();

  const { data: userData, loading } = useQuery(GET_USER_PROFILE, {
    variables: {
      email: session.user.email,
    },
  });

  const [updateProfileImage] = useMutation(UPDATE_PROFILE_IMAGE, {
    refetchQueries: [GET_USER_PROFILE],
  });
  const [updateUser] = useMutation(UPDATE_USER_ACCOUNT, {
    refetchQueries: [GET_USER_PROFILE],
  });
  const { form, formData, updateFormData } = useFormData(userData);

  const lalalal = async (e) => {
    await updateProfileImage({
      variables: {
        user: userData.getUser.id,
        image: e.info.url,
      },
    });
    toast.success('La imagen se actualizó correctamente');
  };
  const errorCallback = () => {
    toast.error('Error actualizando la imagen');
  };

  const submitForm = async (e) => {
    e.preventDefault();
    await updateUser({
      variables: {
        user: session.user.profile.id,
        data: {
          phone: formData.phone,
          identification: formData.identification,
          address: formData.address,
        },
      },
    });
    toast.success('Perfil modificado con éxito');
  };

  if (loading) return <LoadingComponent />;

  return (
    <div className='flex flex-col w-full text-slate-900'>
      {/* {data && <div>data loaded</div>} */}
      <div className='flex flex-col font-bold place-items-center text-4xl m-8 mx-4 my-4 border-2 border-inherit rounded-lg bg-slate-50 drop-shadow-lg'>
        <h1 className='mx-4 my-4'>Editar perfil</h1>
      </div>
      <div className='flex justify-center items-center mt-12'>
        <div className='flex justify-center '>
          <div className='flex-col items-center mr-12'>
            <Image
              src={findImage(session.user)}
              alt='User Profile'
              height={200}
              width={200}
              className='rounded-full'
            />
            <div className='my-2 text-center text-xl font-normal hover:text-blue-600 '>
              <FileUpload
                errorCallback={errorCallback}
                successCallback={lalalal}
                folder='profile-images'
                resourceType='image'
                text='Cambiar imagen'
              />
            </div>
          </div>
        </div>

        <form
          ref={form}
          onChange={updateFormData}
          onSubmit={submitForm}
          className='m-8 flex flex-col'
        >
          <label
            className='flex items-center justify-between my-4 font-semibold text-gray-900 duration-300 peer-focus:left-0 peer-focus:text-blue-600'
            htmlFor='place'
          >
            <span className='mx-4 font-bold text-2xl'>Identificación</span>
            <input
              className='py-2.5 text-xl font-normal px-3 text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-non focus:outline-none focus:ring-0 focus:border-blue-600 '
              name='identification'
              type='text'
              defaultValue={session.user.profile?.identification}
              required
            />
          </label>
          <label
            className='flex items-center justify-between my-4 font-semibold text-gray-900 duration-300 peer-focus:left-0 peer-focus:text-blue-600'
            htmlFor='details'
          >
            <span className='mx-4 font-bold text-2xl'>Telefono</span>
            <input
              className='py-2.5 text-xl font-normal px-3 text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-non focus:outline-none focus:ring-0 focus:border-blue-600'
              name='phone'
              type='text'
              onChange={updateFormData}
              defaultValue={session.user.profile?.phone}
              required
            />
          </label>
          <label
            className='flex items-center justify-between my-4 font-semibold text-gray-900 duration-300 peer-focus:left-0 peer-focus:text-blue-600'
            htmlFor='place'
          >
            <span className='mx-4 font-bold text-2xl'>Dirección</span>
            <input
              className='py-2.5 text-xl font-normal px-3 text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-non focus:outline-none focus:ring-0 focus:border-blue-600'
              name='address'
              type='text'
              defaultValue={session.user.profile?.address}
              required
            />
          </label>
          <div className='w-full flex justify-center mt-4'>
            <ButtonLoading isSubmit text='Guardar' loading={loading} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
