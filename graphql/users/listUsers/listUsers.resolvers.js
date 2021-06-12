import client from "../../../prismaClient";

export default {
  Query: {
    listUsers: async (_, { userName, afterId }) => {
      const takeNumber = 5;

      try {
        const users = await client.user.findMany({
          where: {
            contains: {
              userName: userName,
              mode: "insensitive",
            },
          },
          ...(afterId && {
            cursor: {
              id: afterId,
            },
          }),
          skip: afterId ? 1 : 0,
          take: takeNumber,
        });

        return {
          ok: true,
          users,
        };
      } catch (error) {
        console.log("e", error);

        return {
          ok: false,
          error: "Failed to retrieve list of users",
        };
      }
    },
  },
};
