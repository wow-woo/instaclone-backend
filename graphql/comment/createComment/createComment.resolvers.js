import client from "../../../prismaClient";
import { protectResolver } from "../../users/users.utils";

const createComment = async (_, { photoId, payload }, { loggedInUser }) => {
  try {
    const photoCount = await client.photo.count({
      where: { id: photoId },
    });

    if (!photoCount)
      return {
        ok: false,
        error: "No photo found",
      };

    await client.comment.create({
      data: {
        photo: {
          connect: {
            id: photoId,
          },
        },
        user: {
          connect: {
            id: loggedInUser.id,
          },
        },
        payload,
      },
    });

    return {
      ok: true,
    };
  } catch (error) {
    console.log("e ", error);

    return {
      ok: false,
      error: "Failed to create a comment",
    };
  }
};

export default {
  Mutation: {
    createComment: protectResolver(createComment),
  },
};
