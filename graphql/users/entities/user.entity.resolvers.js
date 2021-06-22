import client from "../../../prismaClient";

export default {
  User: {
    totalFollowing: async ({ id }) => {
      return await client.user.count({
        where: {
          follower: {
            some: {
              id,
            },
          },
        },
      });
    },
    totalFollower: async ({ id }) => {
      return await client.user.count({
        where: {
          following: {
            some: {
              id,
            },
          },
        },
      });
    },
    isMe: ({ id }, _, { loggedInUser: { id: loggedInId } }) => {
      return id === loggedInId;
    },
    isFollowing: async ({ id }, _, { loggedInUser: { id: loggedInId } }) => {
      if (!loggedInId) return false;

      return await client.user.count({
        where: {
          id: loggedInId,
          following: {
            some: {
              id,
            },
          },
        },
      });
    },
    photos: ({ id }) => {
      client.user
        .findUnique({
          where: {
            id,
          },
        })
        .photos();
    },
  },
};
