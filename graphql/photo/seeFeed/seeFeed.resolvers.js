import client from "../../../prismaClient";
import { protectResolver } from "../../users/users.utils";

const seeFeed = async (_, __, { loggedInUser }) => {
  try {
    const photos = await client.photo.findMany({
      where: {
        OR: [
          {
            user: {
              follower: {
                some: {
                  id: loggedInUser.id,
                },
              },
            },
          },
          {
            userId: loggedInUser.id,
          },
        ],
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return {
      ok: true,
      photos,
    };
  } catch (error) {
    console.log("e ", error);

    return {
      ok: false,
      error: "Failed to retrieve my feed",
    };
  }
};

export default {
  Query: {
    seeFeed: protectResolver(seeFeed),
  },
};
