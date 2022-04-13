import { useMutation, useQuery } from '@apollo/client';
import { ButtonLoading } from '@components/utils/ButtonLoading';
import Input from '@components/utils/Input';
import axios, { AxiosRequestConfig } from 'axios';
import { CREATE_USER_ACCOUNT } from 'graphql/mutations/user';
import { GET_SIMPLE_VACANCIES } from 'graphql/queries/vacancy';
import useFormData from 'hooks/useFormData';
import { nanoid } from 'nanoid';
import React from 'react';
import { toast } from 'react-toastify';
import LoadingComponent from '@components/utils/LoadingComponent';
import { GET_CANDIDATES } from 'graphql/queries/user';

const CreateCandidateDialog = ({ closeDialog, token }) => {
  const { form, formData, updateFormData } = useFormData(null);
  const [createUser, { loading }] = useMutation(CREATE_USER_ACCOUNT, {
    refetchQueries: [GET_CANDIDATES],
  });
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
      toast.success(`Usuario creado correctamente con la clave ${password}*`, {
        autoClose: false,
      });
      console.log(`${password}*`);
      closeDialog();
    } catch (error) {
      toast.error('Error creando el usuario');
      closeDialog();
    }
  };

  if (loadingVacancies) {
    return <LoadingComponent />;
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
          min=''
          max=''
          placeholder='Escribe elnombre del usuario'
          text='Nombre'
          required
        />
        <Input
          name='email'
          type='text'
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
        <label htmlFor='vacancyId' className='my-2'>
          <span className='font-bold mx-2'>Vacante:</span>
          <select
            name='vacancyId'
            defaultValue='Seleccione una vacante'
            required
          >
            <option disabled>Seleccione una vacante</option>
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

export default CreateCandidateDialog;
