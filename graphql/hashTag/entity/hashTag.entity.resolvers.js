import client from "../../../prismaClient";

export default {
  HashTag: {
    totalPhotos: async ({ hashTagId }) => {
      return await client.photo.count({
        where: {
          hashTags: {
            some: {
              id: hashTagId,
            },
          },
        },
      });
    },
  },
};
