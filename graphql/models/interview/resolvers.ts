import prisma from 'config/prisma';

const InterviewResolvers = {
  Query: {},
  Mutation: {
    createInterview: async (parent, args) =>
      await prisma.interview.create({
        data: {
          ...args.data,
          date: new Date(args.data.date),
          status: "NotCompleted"
        },
      }),
  },
};

export { InterviewResolvers };
