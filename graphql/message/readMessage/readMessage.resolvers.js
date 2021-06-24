import client from "../../../prismaClient";
import { protectResolver } from "../../users/users.utils";

const readMessage = async (_, { messageId }, { loggedInUser: { id } }) => {
  try {
    const message = await client.message.findFirst({
      where: {
        id: messageId,
        userId: { not: id },
        room: { users: { some: { id } } },
      },
      select: {
        id: true,
      },
    });

    if (!message)
      return {
        ok: false,
        error: "No that message found",
      };

    await client.message.update({
      where: { id: messageId },
      data: { read: true },
    });

    return {
      ok: true,
    };
  } catch (error) {
    return {
      ok: false,
      error: "Failed to read unread message",
    };
  }
};
export default {
  Mutation: {
    readMessage: protectResolver(readMessage),
  },
};
