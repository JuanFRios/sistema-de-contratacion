/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
import prisma from 'config/prisma';

const UploadedDocumentResolvers = {
  Query: {
    getUploadedDocuments: async () => {
      return await prisma.uploadedDocument.findMany({
        include: {
          admissionProcess: true,
          document: true,
        },
      });
    },
    getUploadedDocument: async (parent, args) => {
      return await prisma.uploadedDocument.findUnique({
        where: {
          id: args.id,
        },
        include: {
          admissionProcess: true,
          document: true,
        },
      });
    },
  },
};

export { UploadedDocumentResolvers };
