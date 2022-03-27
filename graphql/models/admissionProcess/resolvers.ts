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
  },
  Query: {
    getAdmissionProcessess: async () => {
      return await prisma.admissionProcess.findMany({});
    },
    getAdmissionProcess: async (parent, args) => {
      return await prisma.admissionProcess.findUnique({
        where: {
          id: args.id,
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
  },
};

export { AdmissionProcessResolvers };
