import client from "../../../prismaClient";
import { getNextPage } from "../users.utils";

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

        const has_next_page = await getNextPage(
          takeAfter,
          takeNumber,
          following,
          user
        );

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
