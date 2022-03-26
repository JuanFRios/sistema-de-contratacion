import React from 'react';
import { matchRoles } from 'utils/matchRoles';

export async function getServerSideProps(context) {
  return {
    props: { ...(await matchRoles(context)) },
  };
}

const documents = () => (
  <div>
    <div>documents</div>
  </div>
);

export default documents;
