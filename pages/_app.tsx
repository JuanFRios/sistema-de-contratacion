import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { WidgetLoader } from 'react-cloudinary-upload-widget';
import {
  ApolloClient,
  InMemoryCache,
  from,
  HttpLink,
  ApolloProvider,
} from '@apollo/client';
import PrivateLayout from 'layout/PrivateLayout';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([
    new HttpLink({
      uri: 'http://localhost:3000/api/graphql',
    }),
  ]),
});

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ApolloProvider client={client}>
        <WidgetLoader />
        <Head>
          <title>Join us</title>
        </Head>
        <PrivateLayout pageAuth={pageProps.auth}>
          <Component {...pageProps} />
        </PrivateLayout>
      </ApolloProvider>
    </SessionProvider>
  );
}

export default MyApp;
