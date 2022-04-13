/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable arrow-body-style */
import prisma from 'config/prisma';

const InterviewResolvers = {
  Interview: {
    admissionProcess: async (parent, args) => {
      return await prisma.admissionProcess.findUnique({
        where: {
          id: parent.admissionProcessId,
        },
      });
    },
    interviewer: async (parent, args) => {
      return await prisma.user.findUnique({
        where: {
          id: parent.interviewerId,
        },
      });
    },
  },
  Query: {
    getInterview: async (parent, args) => {
      return await prisma.interview.findUnique({
        where: {
          ...args.where,
        },
      });
    },
    getInterviewsByInterviewerId: async (parent, args) => {
      return await prisma.interview.findMany({
        where: {
          interviewerId: args.where.interviewerId,
        },
      });
    },
  },
  Mutation: {
    createInterview: async (parent, args) => {
      console.log(args);
      return await prisma.interview.create({
        data: {
          ...args.data,
          date: new Date(args.data.date),
          status: 'NotCompleted',
        },
      });
    },
    completeInterview: async (parent, args) => {
      return await prisma.interview.update({
        where: { ...args.where },
        data: {
          ...args.data,
          status: 'Completed',
        },
      });
    },
  },
};

export { InterviewResolvers };
