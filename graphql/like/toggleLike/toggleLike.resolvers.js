import client from "../../../prismaClient";
import { protectResolver } from "../../users/users.utils";

const toggleLike = async (_, { photoId }, { loggedInUser }) => {
  try {
    const photo = await client.photo.findUnique({
      where: { id: photoId },
    });

    if (!photo) return { ok: false, error: "No photo found" };

    const liked = await client.like.findUnique({
      where: {
        photoId_userId: {
          photoId,
          userId: loggedInUser.id,
        },
      },
    });

    if (liked) {
      await client.like.delete({
        where: {
          photoId_userId: {
            photoId,
            userId: loggedInUser.id,
          },
        },
      });
    } else {
      await client.like.create({
        data: {
          user: {
            connect: {
              id: loggedInUser.id,
            },
          },
          photo: {
            connect: {
              id: photoId,
            },
          },
        },
      });
    }

    return {
      ok: true,
    };
  } catch (error) {
    console.log("e ", error);

    return {
      ok: false,
      error: "Failed to like the photo",
    };
  }
};

export default {
  Mutation: {
    toggleLike: protectResolver(toggleLike),
  },
};
