import React, { useState } from 'react';
import { matchRoles } from 'utils/matchRoles';
import axios, { AxiosRequestConfig } from 'axios';
import { ButtonLoading } from '@components/utils/ButtonLoading';
import { toast } from 'react-toastify';
import { nanoid } from 'nanoid';
import { useMutation, useQuery } from '@apollo/client';
import useFormData from 'hooks/useFormData';
import { CREATE_USER_ACCOUNT } from 'graphql/mutations/user';
import { Button, Dialog } from '@mui/material';
import { GET_CANDIDATES } from 'graphql/queries/user';

export async function getServerSideProps(context) {
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

const Candidates = ({ token }) => {
  const [openNewDialog, setOpenNewDialog] = useState(false);
  const closeDialog = () => {
    setOpenNewDialog(false);
  };

  const { data, loading } = useQuery(GET_CANDIDATES, {
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return <div>Loading....</div>;

  return (
    <div>
      <div>
        <div>
          <h1 className='text-3xl text-slate-900 font-bold text-center m-4'>
            Candidatos
          </h1>
        </div>
        <div className='m-2 flex justify-end'>
          <Button
            variant='contained'
            startIcon={<i className='fa-solid fa-plus' />}
            onClick={() => {
              setOpenNewDialog(true);
            }}
          >
            Nuevo Candidato
          </Button>
        </div>
        <div className='flex flex-col items-center'>
          {data.getCandidates.map((c) => (
            <Candidate key={c.id} candidate={c} />
          ))}
        </div>
      </div>
      <Dialog open={openNewDialog} onClose={closeDialog}>
        <CreateCandidateDialog closeDialog={closeDialog} token={token} />
      </Dialog>
    </div>
  );
};

const Candidate = ({ candidate }) => (
  <div>
    <div className='border-2 border-inherit rounded-lg bg-slate-50 drop-shadow-lg mx-20 my-3 max-w-xl text-slate-900 hover:cursor-pointer hover:bg-slate-100'>
      <div className='flex flex-col align-center'>
        <div className='grid grid-cols-3 m-3'>
          <div className='flex flex-col m-4'>
            <h2>{candidate.name}</h2>
            <h2>Documento: {candidate.identification}</h2>
          </div>
          <div className='flex flex-col m-4'>
            <h2 className='absolute right-0 mx-4'>Correo: {candidate.email}</h2>
            <h2 className='absolute inset-y-10 right-0 m-4'>
              Teléfono: {candidate.phone}
            </h2>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const CreateCandidateDialog = ({ closeDialog, token }) => {
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
            vacancyId: 'cl0y7uvp80032uou14bbvopvj',
            role: formData.role,
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
          <select name='role' required>
            <option disabled selected>
              Seleccione un rol
            </option>
            <option>Admin</option>
            <option>Candidate</option>
          </select>
        </label>
        <div className='w-full flex justify-center'>
          <ButtonLoading isSubmit text='Crear Usuario' loading={loading} />
        </div>
      </form>
    </div>
  );
};

export default Candidates;
