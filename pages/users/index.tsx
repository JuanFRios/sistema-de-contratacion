import React, { useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { matchRoles } from 'utils/matchRoles';
import { Dialog } from '@mui/material';
import useFormData from 'hooks/useFormData';
import { nanoid } from 'nanoid';
import { CREATE_USER_ACCOUNT } from 'graphql/mutations/user';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { ButtonLoading } from '@components/utils/ButtonLoading';

export async function getServerSideProps(context) {
  // const options: AxiosRequestConfig = {
  //   method: 'POST',
  //   url: `https://${process.env.AUTH0_ISSUER}/oauth/token`,
  //   data: {
  //     grant_type: 'client_credentials',
  //     client_id: process.env.AUTH0_API_ID,
  //     client_secret: process.env.AUTH0_API_SECRET,
  //     audience: `https://${process.env.AUTH0_ISSUER}/api/v2/`,
  //   },
  // };

  const options: AxiosRequestConfig = {
    method: 'POST',
    url: `https://${process.env.AUTH0_ISSUER}/oauth/token`,
    data: {
      grant_type: 'client_credentials',
      client_id: process.env.AUTH0_API_ID,
      client_secret: process.env.AUTH0_API_SECRET,
      audience: `https://${process.env.AUTH0_ISSUER}/api/v2/`,
    },
  };
  const TokenResponse = await axios.request(options);
  const token = TokenResponse.data.access_token;

  return {
    props: { token, ...(await matchRoles(context)) },
  };
}

const Index = ({ token }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const closeDialog = () => {
    setOpenDialog(false);
  };
  return (
    <div>
      <h1>Gestion de usuarios</h1>
      <button
        onClick={() => setOpenDialog(true)}
        type='button'
        className='button-primary'
      >
        Crear nuevo usuario
      </button>
      <Dialog open={openDialog} onClose={closeDialog}>
        <CreateUserDialog closeDialog={closeDialog} token={token} />
      </Dialog>
    </div>
  );
};

const CreateUserDialog = ({ closeDialog, token }) => {
  const { form, formData, updateFormData } = useFormData(null);
  const [createUser, { loading }] = useMutation(CREATE_USER_ACCOUNT);

  const submitForm = async (e) => {
    e.preventDefault();
    const password = nanoid();
    const options: AxiosRequestConfig = {
      method: 'POST',
      url: 'https://ingenieria-web-2022.us.auth0.com/api/v2/users',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: {
        email: formData.email,
        password: `${password}*`,
        connection: 'Username-Password-Authentication',
      },
    };

    try {
      const userCreateResponse = await axios.request(options);
      await createUser({
        variables: {
          data: {
            email: userCreateResponse.data.email,
            name: userCreateResponse.data.name,
            image: userCreateResponse.data.picture,
            auth0Id: userCreateResponse.data.user_id,
            role: formData.role,
            vacancyId: formData.vacancyId,
          },
        },
      });
      toast.success(`Usuario creado correctamente con la clave ${password}`, {
        autoClose: false,
      });
      closeDialog();
    } catch (error) {
      toast.error('Error creando el usuario');
      closeDialog();
    }
  };
  return (
    <div className='p-5 flex flex-col items-center'>
      <h1>Crear nuevo usuario</h1>
      <form
        ref={form}
        onChange={updateFormData}
        onSubmit={submitForm}
        className='flex flex-col items-start'
      >
        <label htmlFor='vacancyId'>
          <span className='font-bold mx-2'>vacancyId:</span>
          <input name='vacancyId' placeholder='vacancyId' required />
        </label>
        <label htmlFor='email'>
          <span className='font-bold mx-2'>Email:</span>
          <input
            name='email'
            placeholder='test@test.com'
            required
            type='email'
          />
        </label>
        <label htmlFor='role' className='my-2'>
          <span className='font-bold mx-2'>Rol:</span>
          <select name='role' required defaultValue='DEFAULT'>
            <option value='DEFAULT' disabled>
              Seleccione un rol
            </option>
            <option value='Admin'>Admin</option>
            <option value='Candidate'>Candidate</option>
          </select>
        </label>
        <div className='w-full flex justify-center'>
          <ButtonLoading isSubmit text='Crear Usuario' loading={loading} />
        </div>
      </form>
    </div>
  );
};

export default Index;
