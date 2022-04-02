/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
import prisma from 'config/prisma';

const AdmissionProcessResolvers = {
  AdmissionProcess: {
    candidate: async (parent, args) => {
      return await prisma.user.findUnique({
        where: {
          id: parent.candidateId,
        },
      });
    },
    vacancy: async (parent, args) => {
      return await prisma.vacancy.findUnique({
        where: {
          id: parent.vacancyId,
        },
      });
    },
    interviews: async (parent, args) => {
      return await prisma.interview.findMany({
        where: {
          admissionProcessId: parent.id,
        },
      });
    },
    uploadDocumentation: async (parent, args) => {
      return await prisma.uploadedDocument.findMany({
        where: {
          admissionProcessId: parent.id,
        },
      });
    },
  },
  Query: {
    getAdmissionProcessess: async () => {
      return await prisma.admissionProcess.findMany({});
    },
    getAdmissionProcess: async (parent, args) => {
      return await prisma.admissionProcess.findUnique({
        where: {
          ...args.where
        },
        include: {
          interviews: true,
          uploadDocumentation: true,
        },
      });
    },
  },
  Mutation: {
    // eslint-disable-next-line arrow-body-style
    createAdmissionProcess: async (parent, args) => {
      return await prisma.admissionProcess.create({
        data: {
          ...args.data,
        },
      });
    },
    changeStatusAdmissionProcess: async (parent, args) => {
      return await prisma.admissionProcess.update({
        where: { ...args.where },
        data: {
          ...args.data
        },
      });
    },
  },
};

export { AdmissionProcessResolvers };
