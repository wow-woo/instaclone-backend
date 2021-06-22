import client from "../../../prismaClient";

export default {
  Photo: {
    user: async ({ userId }, _) => {
      return await client.user.findUnique({
        where: {
          id: userId,
        },
      });
    },

    hashTags: async ({ id }) => {
      return await client.hashTag.findMany({
        where: {
          photos: {
            some: { id },
          },
        },
      });
    },

    totalLikes: async ({ id }) => {
      return await client.like.count({ where: { photoId: id } });
    },

    isMine: async ({ userId }, _, { loggedInUser }) => {
      if (!loggedInUser) return false;

      return userId === loggedInUser.id;
    },

    totalComments: async ({ id }) => {
      return await client.comment.count({
        where: {
          photoId: id,
        },
      });
    },
  },
};
