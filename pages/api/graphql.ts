import 'reflect-metadata';
import 'ts-tiny-invariant';
import { ApolloServer } from 'apollo-server-micro';
import Cors from 'micro-cors';
import { types } from 'graphql/types';
import { resolvers } from 'graphql/resolvers';

// import { getSession } from 'next-auth/react';

const cors = Cors({
  allowMethods: ['POST', 'OPTIONS', 'GET', 'HEAD'],
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const functionHandler = async (req, res) => {
  const apolloServer = new ApolloServer({
    // context: async () => {
    //   const data: any = await getSession({ req });
    //   return { session: data };
    // },
    typeDefs: types,
    resolvers: resolvers,
    // introspection: true,
  });

  const startServer = apolloServer.start();
  await startServer;
  return apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res);
};

export default cors(async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.end();
    return false;
  }
  // const data: any = await getSession({ req });
  // if (!data && process.env.NODE_ENV === 'production') {
  //   res.status(401).send({ error: 'no autorizado' });
  // }
  return functionHandler(req, res);
});
