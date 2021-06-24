import client from "../../../prismaClient";

export default {
  Message: {
    user: async ({ id: messageId }) => {
      const user = await client.message
        .findUnique({
          where: { id: messageId },
        })
        .user();

      return user;
    },
  },
};
