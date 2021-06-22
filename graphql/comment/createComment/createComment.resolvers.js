import client from "../../../prismaClient";
import { protectResolver } from "../../users/users.utils";

const createComment = async (_, { photoId, payload }, { loggedInUser }) => {
  try {
    const photo = await client.photo.findUnique({
      where: { id: photoId },
    });

    if (!photo)
      return {
        ok: false,
        error: "No photo found",
      };

    if (
      await client.comment.findUnique({
        where: { photoId_userId: { photoId, userId: loggedInUser.id } },
      })
    )
      return {
        ok: false,
        error: "No more comment allowed on this photo",
      };

    console.log("a");

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

    console.log("b");

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
