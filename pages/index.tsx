import type { NextPage } from 'next';
import Head from 'next/head';
import { matchRoles } from 'utils/matchRoles';
import { getSession } from 'next-auth/react';

export async function getServerSideProps(context) {
  const data: any = await getSession({ req: context.req });
  const userRole = data?.user?.role?.name;
  if (context.res) {
    let location;
    switch (userRole) {
      case 'Admin':
        location = '/admin/vacancies';
        break;
      case 'Candidate':
        location = '/candidate/vacancies';
        break;
      default:
        location = '/candidate/vacancies';
    }
    context.res.writeHead(301, {
      Location: location,
    });
    context.res.end();
  }
  return {
    props: { ...(await matchRoles(context)) },
  };
}

const Home: NextPage = () => (
  <div>
    <Head>
      <title>Join us</title>
      <meta name='description' content='Generated by create next app' />
      <link rel='icon' href='/favicon.ico' />
    </Head>
  </div>
);

export default Home;
