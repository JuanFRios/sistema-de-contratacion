/* eslint-disable no-restricted-imports */
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signIn, signOut, useSession } from 'next-auth/react';
import NotAuthorized from '../components/NoAuthorized';
import Footer from '../components/Footer';

const PrivateLayout = ({ pageAuth, children }: any) => {
  // const PrivateLayout = ({ children }: any) => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <Loading />;
  }

  if (!session) {
    signIn('auth0');
    return <Loading />;
  }

  if (!pageAuth) {
    return <NotAuthorized />;
  }

  return (
    <div>
      <button type='button' onClick={() => signOut()}>
        Cerrar Sesion
      </button>
      {children}
      <ToastContainer />
      <Footer />
    </div>
  );
};

const Loading = () => <div>Loading...</div>;

export default PrivateLayout;
