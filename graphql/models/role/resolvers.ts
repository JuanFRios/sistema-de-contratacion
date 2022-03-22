import prisma from 'config/prisma';

const RoleResolvers = {
  Query: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getRoles: async (parent, args) => await prisma.role.findMany(),
  },
};

export { RoleResolvers };
