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
import { findImage } from '@utils/admissionProcess';
import Input from '@components/utils/Input';

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
      <div className='flex justify-center pt-12 pb-6 font-bold text-4xl'>
        <p>Editar perfil</p>
      </div>
      <div className='flex flex-col md:flex-row justify-center items-center mt-12'>
        <div className='flex justify-center '>
          <div className='flex-col items-center md:pr-12'>
            <Image
              src={findImage(session.user)}
              alt='User Profile'
              height={120}
              width={120}
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
          <Input
            name='identification'
            type='text'
            min=''
            max=''
            placeholder='Escribe tu identificación'
            defaultValue={session.user.profile?.identification}
            text='Identificación'
            required
          />
          <Input
            name='phone'
            type='text'
            min=''
            max=''
            placeholder='Escribe tu teléfono'
            defaultValue={session.user.profile?.phone}
            text='Teléfono'
            required
          />
          <Input
            name='address'
            type='text'
            min=''
            max=''
            placeholder='Escribe tu direción'
            defaultValue={session.user.profile?.address}
            text='Dirección'
            required
          />
          <div className='w-full flex justify-center mt-4'>
            <ButtonLoading isSubmit text='Guardar' loading={loading} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
