import prisma from 'config/prisma';

const DocumentResolvers = {
  Query: {},
  Mutation: {
    createDocument: async (parent, args) =>
      await prisma.document.create({
        data: {
          ...args.data,
        },
      }),
  },
};

export { DocumentResolvers };
