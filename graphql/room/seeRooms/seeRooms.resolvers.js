import client from "../../../prismaClient";
import { protectResolver } from "../../users/users.utils";

const seeRooms = async (_, __, { loggedInUser: { id } }) => {
  if (!id)
    return {
      ok: false,
      error: "please, sign in first",
    };

  try {
    const user = await client.user.count({
      where: { id },
    });

    if (!user)
      return {
        ok: false,
        error: "No user found",
      };

    const { rooms } = await client.user.findUnique({
      where: { id },
      select: { rooms: true },
    });

    console.log("room ", rooms);

    return {
      ok: true,
      rooms: rooms,
    };
  } catch (error) {
    console.log("e", error);

    return {
      ok: false,
      error: "Failed to retrieve rooms",
    };
  }
};
export default {
  Query: {
    seeRooms: protectResolver(seeRooms),
  },
};
