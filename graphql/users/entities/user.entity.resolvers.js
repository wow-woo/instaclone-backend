import client from "../../../prismaClient";

export default {
  User: {
    totalFollowing: async (root) => {
      return await client.user.count({
        where: {
          follower: {
            some: {
              id: root.id,
            },
          },
        },
      });
    },
    totalFollower: async (root) => {
      return await client.user.count({
        where: {
          following: {
            some: {
              id: root.id,
            },
          },
        },
      });
    },
  },
};
