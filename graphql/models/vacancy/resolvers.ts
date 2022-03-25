/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable arrow-body-style */
import prisma from 'config/prisma';

const VacancyResolvers = {
  Vacancy: {
    documents: async (parent, args) => {
      return await prisma.document.findMany({
        where: {
          vacancies: {
            some: {
              id: parent.id,
            },
          },
        },
      });
    },
  },
  Query: {
    getVacancies: async (parent: any, args: any) =>
      await prisma.vacancy.findMany({
        include: {
          admissionProcesess: true,
        },
      }),
    getVacancy: async (parent: any, args: any) =>
      await prisma.vacancy.findUnique({
        where: {
          id: args.id,
        },
      }),
  },
  Mutation: {
    createVacancy: async (parent, args) => {
      const documents = await prisma.document.findMany();
      return await prisma.vacancy.create({
        data: {
          ...args.data,
          startDate: new Date(args.data.startDate),
          documents: {
            connect: documents.map((d) => ({ id: d.id })),
          },
        },
        include: {
          documents: true,
        },
      });
    },
  },
};

export { VacancyResolvers };
