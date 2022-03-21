import prisma from 'config/prisma';

const VacancyResolvers = {
  Vacancy: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    documents: async (parent, args) =>
      await prisma.document.findMany({
        where: {
          vacancies: {
            some: {
              id: parent.id,
            },
          },
        },
      }),
  },
  Query: {},
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
