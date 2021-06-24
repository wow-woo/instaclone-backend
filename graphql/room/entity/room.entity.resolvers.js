import client from "../../../prismaClient";

export default {
  Room: {
    users: async ({ id: roomId }) => {
      return await client.room
        .findUnique({
          where: { id: roomId },
        })
        .users({
          select: {
            id: true,
            email: true,
            userName: true,
            avatar: true,
          },
        });
    },
    messages: async ({ id: roomId }, { lastMessageId }) => {
      try {
        const messages = await client.message.findMany({
          where: { roomId },
          ...(lastMessageId && { cursor: { id: lastMessageId } }),
          // skip: 1,
          take: 20,
          orderBy: "desc",
        });

        return {
          ok: true,
          lastMessageId: messages[messages.length - 1].id,
        };
      } catch (error) {
        return {
          ok: false,
          error: "Failed on messages",
        };
      }
    },

    totalUnread: async ({ id: roomId }, _, { loggedInUser: { id } }) => {
      if (!id) return 0;

      return await client.message.count({
        where: { roomId, read: false, user: { id: { not: id } } },
      });
    },
  },
};
