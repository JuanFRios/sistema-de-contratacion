/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
import prisma from 'config/prisma';

const UserResolvers = {
  User: {
    profile: async (parent, args) =>
      await prisma.profile.findUnique({
        where: {
          userId: parent.id,
        },
      }),
    role: async (parent, args) =>
      await prisma.role.findUnique({
        where: {
          id: parent.roleId,
        },
      }),
  },
  Query: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getUsers: async (parent: any, args: any) => await prisma.user.findMany({}),
    getCandidates: async () => {
      return await prisma.user.findMany({
        where: {
          role: {
            name: 'Candidate',
          },
        },
      });
    },
    getUser: async (parent, args) =>
      await prisma.user.findUnique({
        where: {
          email: args.email,
        },
      }),
  },
  Mutation: {
    createUserAccount: async (parent, args) =>
      await prisma.user.create({
        data: {
          email: args.data.email,
          name: args.data.name,
          image: args.data.image,
          role: {
            connect: {
              name: args.data.role,
            },
          },
          accounts: {
            create: {
              provider: 'auth0',
              type: 'oauth',
              providerAccountId: args.data.auth0Id,
            },
          },
          admissionProcesess: {
            create: {
              status: 'Interview_Phase',
              vacancyId: args.data.vacancyId,
            },
          },
          profile: {
            create: {
              phone: args.data.phone,
              identification: args.data.identification,
              address: args.data.address,
            },
          },
        },
      }),
  },
};

export { UserResolvers };
