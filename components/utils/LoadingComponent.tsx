import React from 'react';
import ReactLoading from 'react-loading';

const LoadingComponent = () => (
  <div className='flex flex-col justify-center items-center h-screen'>
    <ReactLoading type='spinningBubbles' color='#000' height={80} width={80} />
    <p className='font-mono text-xl'>Cargando</p>
  </div>
);

export default LoadingComponent;
