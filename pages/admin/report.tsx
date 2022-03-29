import React from 'react';
import { matchRoles } from 'utils/matchRoles';

export async function getServerSideProps(context) {
  return {
    props: { ...(await matchRoles(context)) },
  };
}

const Report = () => (
  <div>
    <h1>Cantidad de documentos pendientes por cada proceso de contratación</h1>
  </div>
);

export default Report;
