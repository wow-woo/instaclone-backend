import client from "../../../prismaClient";

export default {
  Query: {
    seeFollowers: async (_, { userName, page }, { loggedInUser }) => {
      try {
        const followers = await client.user
          .findUnique({
            where: {
              userName,
            },
          })
          .follower({
            skip: (page - 1) * 5 - 1 < 0 ? 0 : (page - 1) * 5 - 1,
            take: 5,
          });

        return {
          ok: true,
          followers,
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
