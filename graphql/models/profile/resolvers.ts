/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
import prisma from 'config/prisma';

const ProfileResolvers = {
  Mutation: {
    // eslint-disable-next-line arrow-body-style
    updateProfileImage: async (parent, args) => {
      return await prisma.user.update({
        where: {
          id: args.user,
        },
        data: {
          profile: {
            upsert: {
              create: {
                customImage: args.image,
              },
              update: {
                customImage: {
                  set: args.image,
                },
              },
            },
          },
        },
      });
    },

    updateUser: async (parent, args) => {
      return await prisma.profile.update({
        where: {
          id: args.user,
        },
        data: {
          ...args.data,
        },
      });
    },
  },
};

export { ProfileResolvers };
