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
  Mutation: {
    createOrUpdateUploadedDocument: async (parent, args) => {
      const uploadedDocument = await prisma.uploadedDocument.findFirst({
        where: {
          AND:
            [{ admissionProcessId: args.data.admissionProcessId },
            { documentId: args.data.documentId }
            ]
        }
      });
      if (uploadedDocument) {
        // Lo actualiza
        return await prisma.uploadedDocument.update({
          where: { id: uploadedDocument.id },
          data: {
            fileUrl: args.data.fileUrl
          },
        });
      } else {
          return await prisma.uploadedDocument.create({
          data: {
            ...args.data
          },
        })
      }
    },
  }
};

export { UploadedDocumentResolvers };
