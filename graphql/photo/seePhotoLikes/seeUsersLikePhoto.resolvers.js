import client from "../../../prismaClient";

export default {
  Query: {
    seeUsersLikePhoto: async (_, { photoId }) => {
      try {
        const users = await client.like.findMany({
          where: { photoId },
          select: {
            user: {
              select: {
                userName: true,
              },
            },
          },
        });

        return {
          ok: true,
          users: users.map((user) => user.user),
        };
      } catch (error) {
        console.log("e ", error);

        return {
          ok: false,
          error: "Failed to retrieve users, that like the photo",
        };
      }
    },
  },
};
