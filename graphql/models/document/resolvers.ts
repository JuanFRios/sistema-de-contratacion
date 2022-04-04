import prisma from 'config/prisma';

const DocumentResolvers = {
  Query: {
    getDocuments: async () => await prisma.document.findMany({}),
  },
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
