import client from "../../../prismaClient";

export default {
  Query: {
    seeFollowers: async (_, { userName, page }, { loggedInUser }) => {
      try {
        const user = client.user.findUnique({
          where: {
            userName,
          },
          select: {
            follower: true,
          },
        });

        if (!(await user)) {
          return {
            ok: false,
            error: "No user found",
          };
        }

        const followers = await user.follower({
          skip: (page - 1) * 5,
          take: 5,
        });

        const totalPages = await client.user.count({
          where: {
            following: {
              some: {
                userName,
              },
            },
          },
        });

        return {
          ok: true,
          followers,
          currentPage: page,
          totalPages: Math.ceil(totalPages / 5),
        };
      } catch (error) {
        console.log("e ", error);

        return {
          ok: false,
          error: "Failed to bring followers",
        };
      }
    },
  },
};
