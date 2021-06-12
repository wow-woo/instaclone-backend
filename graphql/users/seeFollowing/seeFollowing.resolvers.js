import client from "../../../prismaClient";

export default {
  Query: {
    seeFollowing: async (_, { userName, afterId }) => {
      const takeNumber = 5;

      try {
        const user = client.user.findUnique({
          select: {
            following: true,
          },
          where: {
            userName,
          },
        });

        if (!(await user)) {
          return {
            ok: false,
            error: "No user found",
          };
        }

        const takeAfter = (user, afterId) => {
          return user.following({
            ...(afterId ? cursor : { id: afterId }),
            skip: afterId ? 1 : 0,
            take: takeNumber,
          });
        };
        const following = await takeAfter(user, afterId);

        const has_next_page = false;

        if (following.length >= takeNumber) {
          const nextPage = await takeAfter(
            user,
            following[following.length - 1].id
          ).length;

          if (nextPage.length > 0) {
            has_next_page = true;
          }
        }

        return {
          ok: true,
          following,
          has_next_page,
        };
      } catch (error) {
        console.log(error);

        return {
          ok: false,
          error: "Failed to retrieve following users",
        };
      }
    },
  },
};
