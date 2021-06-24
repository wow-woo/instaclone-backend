import client from "../../../prismaClient";
import { protectResolver } from "../../users/users.utils";

const seeRoom = async (_, { roomId }, { loggedInUser: { id } }) => {
  try {
    const room = await client.room.findFirst({
      where: { id: roomId, users: { some: { id } } },
    });

    if (!room)
      return {
        ok: false,
        error: "empty room",
      };

    return {
      ok: true,
      room,
    };
  } catch (error) {
    return {
      ok: false,
      error: "Failed to see the room",
    };
  }
};

export default {
  Query: {
    seeRoom: protectResolver(seeRoom),
  },
};
