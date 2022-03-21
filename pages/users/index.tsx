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
      url: 'https://ingenieria-web.us.auth0.com/api/v2/users',
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Il8tclhDdnpPNFBQZ2phV1ZBaEdxNyJ9.eyJpc3MiOiJodHRwczovL2luZ2VuaWVyaWEtd2ViLTIwMjIudXMuYXV0aDAuY29tLyIsInN1YiI6ImpFdDVSaFlFSm1sMWpseERRYVNKaHJ0blRFZFlOYzRSQGNsaWVudHMiLCJhdWQiOiJodHRwczovL2luZ2VuaWVyaWEtd2ViLTIwMjIudXMuYXV0aDAuY29tL2FwaS92Mi8iLCJpYXQiOjE2NDc4MzA4MzcsImV4cCI6MTY0NzkxNzIzNywiYXpwIjoiakV0NVJoWUVKbWwxamx4RFFhU0pocnRuVEVkWU5jNFIiLCJzY29wZSI6InJlYWQ6Y2xpZW50X2dyYW50cyBjcmVhdGU6Y2xpZW50X2dyYW50cyBkZWxldGU6Y2xpZW50X2dyYW50cyB1cGRhdGU6Y2xpZW50X2dyYW50cyByZWFkOnVzZXJzIHVwZGF0ZTp1c2VycyBkZWxldGU6dXNlcnMgY3JlYXRlOnVzZXJzIHJlYWQ6dXNlcnNfYXBwX21ldGFkYXRhIHVwZGF0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgZGVsZXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBjcmVhdGU6dXNlcnNfYXBwX21ldGFkYXRhIHJlYWQ6dXNlcl9jdXN0b21fYmxvY2tzIGNyZWF0ZTp1c2VyX2N1c3RvbV9ibG9ja3MgZGVsZXRlOnVzZXJfY3VzdG9tX2Jsb2NrcyBjcmVhdGU6dXNlcl90aWNrZXRzIHJlYWQ6Y2xpZW50cyB1cGRhdGU6Y2xpZW50cyBkZWxldGU6Y2xpZW50cyBjcmVhdGU6Y2xpZW50cyByZWFkOmNsaWVudF9rZXlzIHVwZGF0ZTpjbGllbnRfa2V5cyBkZWxldGU6Y2xpZW50X2tleXMgY3JlYXRlOmNsaWVudF9rZXlzIHJlYWQ6Y29ubmVjdGlvbnMgdXBkYXRlOmNvbm5lY3Rpb25zIGRlbGV0ZTpjb25uZWN0aW9ucyBjcmVhdGU6Y29ubmVjdGlvbnMgcmVhZDpyZXNvdXJjZV9zZXJ2ZXJzIHVwZGF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGRlbGV0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGNyZWF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIHJlYWQ6ZGV2aWNlX2NyZWRlbnRpYWxzIHVwZGF0ZTpkZXZpY2VfY3JlZGVudGlhbHMgZGVsZXRlOmRldmljZV9jcmVkZW50aWFscyBjcmVhdGU6ZGV2aWNlX2NyZWRlbnRpYWxzIHJlYWQ6cnVsZXMgdXBkYXRlOnJ1bGVzIGRlbGV0ZTpydWxlcyBjcmVhdGU6cnVsZXMgcmVhZDpydWxlc19jb25maWdzIHVwZGF0ZTpydWxlc19jb25maWdzIGRlbGV0ZTpydWxlc19jb25maWdzIHJlYWQ6aG9va3MgdXBkYXRlOmhvb2tzIGRlbGV0ZTpob29rcyBjcmVhdGU6aG9va3MgcmVhZDphY3Rpb25zIHVwZGF0ZTphY3Rpb25zIGRlbGV0ZTphY3Rpb25zIGNyZWF0ZTphY3Rpb25zIHJlYWQ6ZW1haWxfcHJvdmlkZXIgdXBkYXRlOmVtYWlsX3Byb3ZpZGVyIGRlbGV0ZTplbWFpbF9wcm92aWRlciBjcmVhdGU6ZW1haWxfcHJvdmlkZXIgYmxhY2tsaXN0OnRva2VucyByZWFkOnN0YXRzIHJlYWQ6aW5zaWdodHMgcmVhZDp0ZW5hbnRfc2V0dGluZ3MgdXBkYXRlOnRlbmFudF9zZXR0aW5ncyByZWFkOmxvZ3MgcmVhZDpsb2dzX3VzZXJzIHJlYWQ6c2hpZWxkcyBjcmVhdGU6c2hpZWxkcyB1cGRhdGU6c2hpZWxkcyBkZWxldGU6c2hpZWxkcyByZWFkOmFub21hbHlfYmxvY2tzIGRlbGV0ZTphbm9tYWx5X2Jsb2NrcyB1cGRhdGU6dHJpZ2dlcnMgcmVhZDp0cmlnZ2VycyByZWFkOmdyYW50cyBkZWxldGU6Z3JhbnRzIHJlYWQ6Z3VhcmRpYW5fZmFjdG9ycyB1cGRhdGU6Z3VhcmRpYW5fZmFjdG9ycyByZWFkOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGRlbGV0ZTpndWFyZGlhbl9lbnJvbGxtZW50cyBjcmVhdGU6Z3VhcmRpYW5fZW5yb2xsbWVudF90aWNrZXRzIHJlYWQ6dXNlcl9pZHBfdG9rZW5zIGNyZWF0ZTpwYXNzd29yZHNfY2hlY2tpbmdfam9iIGRlbGV0ZTpwYXNzd29yZHNfY2hlY2tpbmdfam9iIHJlYWQ6Y3VzdG9tX2RvbWFpbnMgZGVsZXRlOmN1c3RvbV9kb21haW5zIGNyZWF0ZTpjdXN0b21fZG9tYWlucyB1cGRhdGU6Y3VzdG9tX2RvbWFpbnMgcmVhZDplbWFpbF90ZW1wbGF0ZXMgY3JlYXRlOmVtYWlsX3RlbXBsYXRlcyB1cGRhdGU6ZW1haWxfdGVtcGxhdGVzIHJlYWQ6bWZhX3BvbGljaWVzIHVwZGF0ZTptZmFfcG9saWNpZXMgcmVhZDpyb2xlcyBjcmVhdGU6cm9sZXMgZGVsZXRlOnJvbGVzIHVwZGF0ZTpyb2xlcyByZWFkOnByb21wdHMgdXBkYXRlOnByb21wdHMgcmVhZDpicmFuZGluZyB1cGRhdGU6YnJhbmRpbmcgZGVsZXRlOmJyYW5kaW5nIHJlYWQ6bG9nX3N0cmVhbXMgY3JlYXRlOmxvZ19zdHJlYW1zIGRlbGV0ZTpsb2dfc3RyZWFtcyB1cGRhdGU6bG9nX3N0cmVhbXMgY3JlYXRlOnNpZ25pbmdfa2V5cyByZWFkOnNpZ25pbmdfa2V5cyB1cGRhdGU6c2lnbmluZ19rZXlzIHJlYWQ6bGltaXRzIHVwZGF0ZTpsaW1pdHMgY3JlYXRlOnJvbGVfbWVtYmVycyByZWFkOnJvbGVfbWVtYmVycyBkZWxldGU6cm9sZV9tZW1iZXJzIHJlYWQ6ZW50aXRsZW1lbnRzIHJlYWQ6YXR0YWNrX3Byb3RlY3Rpb24gdXBkYXRlOmF0dGFja19wcm90ZWN0aW9uIHJlYWQ6b3JnYW5pemF0aW9uc19zdW1tYXJ5IHJlYWQ6b3JnYW5pemF0aW9ucyB1cGRhdGU6b3JnYW5pemF0aW9ucyBjcmVhdGU6b3JnYW5pemF0aW9ucyBkZWxldGU6b3JnYW5pemF0aW9ucyBjcmVhdGU6b3JnYW5pemF0aW9uX21lbWJlcnMgcmVhZDpvcmdhbml6YXRpb25fbWVtYmVycyBkZWxldGU6b3JnYW5pemF0aW9uX21lbWJlcnMgY3JlYXRlOm9yZ2FuaXphdGlvbl9jb25uZWN0aW9ucyByZWFkOm9yZ2FuaXphdGlvbl9jb25uZWN0aW9ucyB1cGRhdGU6b3JnYW5pemF0aW9uX2Nvbm5lY3Rpb25zIGRlbGV0ZTpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgY3JlYXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJfcm9sZXMgcmVhZDpvcmdhbml6YXRpb25fbWVtYmVyX3JvbGVzIGRlbGV0ZTpvcmdhbml6YXRpb25fbWVtYmVyX3JvbGVzIGNyZWF0ZTpvcmdhbml6YXRpb25faW52aXRhdGlvbnMgcmVhZDpvcmdhbml6YXRpb25faW52aXRhdGlvbnMgZGVsZXRlOm9yZ2FuaXphdGlvbl9pbnZpdGF0aW9ucyIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.GhGDyyZsCYUG5hQN42cBCb35F7JAHeaj8WnKSm3fSQhr-S0YCYb78Cz2HCvZFe3NAUH_4GwyCzNo3GbT9ya0abH0o5wGvn9Fc3-rZhgHclL5Dv-gp3YuOzJGelDU_WaXEWGm1YEzrYQp2gDohrVkFqsvuwPsyvLfcWNgoYEws0e0UO1pSQOvhEIwVRX3ecDge-LGYLSlPOG7-jU48gZbCjG0kOjQ9Yfs0dSAOxXxh4DFA_VSC2VSjfb2agYjUCs_VBPmE5Q7rsHrUoBo95a5ea9czhRZQ8C2CgQEIP8gK-3lx2CSaOkaKNEJ3EWv3zEpO_ORw1abJLlALfMdAWcMIw',
        'Content-Type': 'application/json',
      },
      data: {
        mail: formData.email,
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
          },
        },
      });
      toast.success(`Usuario creado correctamente con la clave ${password}`, {
        autoClose: false,
      });
      closeDialog();
    } catch (error) {
      toast.error('Error creando el usuario', error);
      console.log(error);
      console.log('email', formData.email, formData.role);
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

export default Index;
