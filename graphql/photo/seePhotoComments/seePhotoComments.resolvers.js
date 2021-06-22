import client from "../../../prismaClient";

export default {
  Query: {
    seePhotoComments: async (_, { photoId, page }) => {
      const take = 10;

      try {
        const comments = await client.comment.findMany({
          where: { photoId },
          skip: page == 1 ? 0 : (page - 1) * take - 1,
          take,
          orderBy: {
            createdAt: "desc",
          },
        });

        return {
          ok: true,
          ...(comments && { comments }),
          currentPage: page,
          nextPage: comments.length >= take,
        };
      } catch (error) {
        console.log("e ", error);

        return {
          ok: false,
          error: "Failed to see comments of the photo",
        };
      }
    },
  },
};
