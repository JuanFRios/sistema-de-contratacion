import { useMutation, useQuery } from '@apollo/client';
import { ButtonLoading } from '@components/utils/ButtonLoading';
import Input from '@components/utils/Input';
import axios, { AxiosRequestConfig } from 'axios';
import { CREATE_USER_ACCOUNT } from 'graphql/mutations/user';
import { GET_SIMPLE_VACANCIES } from 'graphql/queries/vacancy';
import useFormData from 'hooks/useFormData';
import { nanoid } from 'nanoid';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import LoadingComponent from '@components/utils/LoadingComponent';
import { Button, Dialog } from '@mui/material';
import Image from 'next/image';

const CreateCandidateDialog = ({ closeDialog, token }) => {
  const { form, formData, updateFormData } = useFormData(null);
  const [createUser, { loading }] = useMutation(CREATE_USER_ACCOUNT);
  const { data: vacancies, loading: loadingVacancies } = useQuery(
    GET_SIMPLE_VACANCIES,
    {
      fetchPolicy: 'cache-and-network',
    }
  );
  const [openPassword, setopenPassword] = useState(false);
  const password = nanoid();

  const submitForm = async (e) => {
    e.preventDefault();
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
      setopenPassword(true);
    } catch (error) {
      toast.error('Error creando el usuario');
      closeDialog();
    }
  };

  if (loadingVacancies) {
    return <LoadingComponent />;
  }

  return (
    <div className='p-5 flex flex-col items-center font-semibold'>
      <h2 className='my-3 mb-2 text-2xl font-bold text-gray-900'>
        Nuevo Candidato
      </h2>
      <form
        ref={form}
        onChange={updateFormData}
        onSubmit={submitForm}
        className='flex flex-col items-start'
      >
        <Input
          name='name'
          type='text'
          min=''
          max=''
          placeholder='Escribe el nombre del usuario'
          text='Nombre'
          required
        />
        <Input
          name='email'
          type='email'
          min=''
          max=''
          placeholder='Escribe el email del usuario'
          text='E-mail'
          required
        />
        <div className='flex flex-col md:flex-row'>
          <Input
            name='phone'
            type='text'
            min=''
            max=''
            placeholder='Escribe el número telefónico'
            text='Teléfono'
            required
          />
          <Input
            name='identification'
            type='text'
            min=''
            max=''
            placeholder='Escribe el número de identificación'
            text='Identificación'
            required
          />
        </div>
        <Input
          name='address'
          type='text'
          min=''
          max=''
          placeholder='Escribe la dirección'
          text='Dirección'
          required
        />
        <label htmlFor='vacancyId' className='my-2 flex items-center'>
          <span className='mx-2'>Vacante:</span>
          <select
            name='vacancyId'
            required
            className='py-1.5 px-0 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block'
          >
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
        <div className='w-full flex justify-between pt-5'>
          <Button variant='contained' type='button' onClick={closeDialog}>
            Cerrar
          </Button>
          <ButtonLoading isSubmit text='Crear usuario' loading={loading} />
        </div>
      </form>
      <div>
        <Dialog open={openPassword}>
          <div className='p-5 flex flex-col items-center font-medium text-xl'>
            <p className='my-3 mb-2 text-2xl font-bold text-gray-900'>
              Usuario creado correctamente
            </p>
            <div className='py-3'>
              <Image
                src='https://res.cloudinary.com/djljdabgc/image/upload/v1649732941/6586148_accept_check_good_mark_ok_icon_dvjgww.png'
                alt='success'
                height={45}
                width={45}
              />
            </div>
            <div className='flex items-center'>
              <p className='pr-2'> Contraseña:</p>
              <b className='font-mono text-xl text-red-500'>{password}</b>
            </div>
            <p className='pt-2'>
              {' '}
              <i className='fa-solid fa-circle-info p-1' />
              Recuerde que esta contraseña debe ser entregada al candidato
            </p>
            <div className='pt-5'>
              <Button
                variant='contained'
                color='primary'
                type='button'
                onClick={closeDialog}
              >
                OK
              </Button>
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default CreateCandidateDialog;
