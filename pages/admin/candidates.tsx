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
import Image from 'next/image';
import { GET_SIMPLE_VACANCIES } from 'graphql/queries/vacancy';
import Input from '@components/utils/Input';

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
    <div className='flex justify-center'>
      <div className='w-full lg:w-11/12'>
        <div>
          <h1 className='flex justify-center pt-12 pb-6 font-bold text-4xl'>
            Candidatos
          </h1>
        </div>
        <div className='m-4 pb-6 flex justify-end text-9xl'>
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
        <div className='flex flex-wrap justify-center'>
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

const CreateCandidateDialog = ({ closeDialog, token }) => {
  const { form, formData, updateFormData } = useFormData(null);
  const [createUser, { loading }] = useMutation(CREATE_USER_ACCOUNT);
  const { data: vacancies, loading: loadingVacancies } = useQuery(
    GET_SIMPLE_VACANCIES,
    {
      fetchPolicy: 'cache-and-network',
    }
  );

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
            name: formData.name,
            image: userCreateResponse.data.picture,
            auth0Id: userCreateResponse.data.user_id,
            vacancyId: formData.vacancyId,
            role: 'Candidate',
            phone: formData.phone,
            identification: formData.identification,
            address: formData.address,
          },
        },
      });
      console.log(`${password}*`);
      toast.success(`Usuario creado correctamente con la clave ${password}*`, {
        autoClose: false,
      });
      closeDialog();
    } catch (error) {
      toast.error('Error creando el usuario');
      closeDialog();
    }
  };

  if (loadingVacancies) {
    return <div>loading...</div>;
  }

  return (
    <div className='p-5 flex flex-col items-center'>
      <h1>Crear nuevo usuario</h1>
      <form
        ref={form}
        onChange={updateFormData}
        onSubmit={submitForm}
        className='flex flex-col items-start'
      >
        <Input
          name='name'
          type='text'
          placeholder='Escribe elnombre del usuario'
          text='Nombre'
          required
        />
        <Input
          name='email'
          type='text'
          placeholder='Escribe el email del usuario'
          text='E-mail'
          required
        />
        <div className='flex flex-col md:flex-row'>
          <Input
            name='phone'
            type='text'
            placeholder='Escribe el número telefónico'
            text='Teléfono'
            required
          />
          <Input
            name='identification'
            type='text'
            placeholder='Escribe el número de identificación'
            text='Identificación'
            required
          />
        </div>
        <Input
          name='address'
          type='text'
          placeholder='Escribe la dirección'
          text='Dirección'
          required
        />
        <label htmlFor='vacancyId' className='my-2'>
          <span className='font-bold mx-2'>Vacante:</span>
          <select name='vacancyId' required>
            <option disabled selected>
              Seleccione una vacante
            </option>
            {vacancies.getVacancies.map((v) => (
              <option value={v.id} key={v.id}>
                {v.position}
              </option>
            ))}
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
