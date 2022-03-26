/* eslint-disable no-restricted-imports */
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { signOut } from 'next-auth/react';
// import { signIn, signOut, useSession } from 'next-auth/react';
// import NotAuthorized from 'components/NoAuthorized';
// import Footer from 'components/Footer';
import Sidebar from 'components/Sidebar';

const PrivateLayout = ({ pageAuth, children }: any) => {
  // const PrivateLayout = ({ children }: any) => {
  // const { data: session, status } = useSession();

  // if (status === 'loading') {
  //   return <Loading />;
  // }

  // if (!session) {
  //   signIn('auth0');
  //   return <Loading />;
  // }

  // if (!pageAuth) {
  //   return <NotAuthorized />;
  // }
  // eslint-disable-next-line no-console
  console.log(pageAuth);
  return (
    <div>
      <Sidebar child={children} />
      {/* <button type='button' onClick={() => signOut()}>
        Cerrar Sesion
      </button> */}
      {/* {children} */}
      <ToastContainer />
    </div>
  );
};

// const Loading = () => <div>Loading...</div>;

export default PrivateLayout;
