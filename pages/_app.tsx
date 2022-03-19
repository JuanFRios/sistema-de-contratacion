import '../styles/globals.css';
import type { AppProps } from 'next/app';
import {
  ApolloClient,
  InMemoryCache,
  from,
  HttpLink,
  ApolloProvider,
} from '@apollo/client';
import PrivateLayout from 'layout/PrivateLayout';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([
    new HttpLink({
      uri: 'http://localhost:3000/api/graphql',
    }),
  ]),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <PrivateLayout pageAuth={pageProps.auth}>
        {/* <PrivateLayout pageAuth={pageProps.auth}> */}
        <Component {...pageProps} />
      </PrivateLayout>
    </ApolloProvider>
  );
}

export default MyApp;
