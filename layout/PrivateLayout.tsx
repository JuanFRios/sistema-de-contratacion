/* eslint-disable no-restricted-imports */
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signIn, useSession } from 'next-auth/react';
import NotAuthorized from 'components/NoAuthorized';
import Sidebar from 'components/Sidebar';
import LoadingComponent from '@components/utils/LoadingComponent';

const PrivateLayout = ({ pageAuth, children }: any) => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <LoadingComponent />;
  }

  if (!session) {
    signIn('auth0');
    return <LoadingComponent />;
  }

  if (!pageAuth) {
    return <NotAuthorized />;
  }
  // eslint-disable-next-line no-console
  console.log(pageAuth);
  return (
    <div>
      <Sidebar child={children} />
      <ToastContainer />
    </div>
  );
};

export default PrivateLayout;
