import client from "../../../prismaClient";
import { parseForHashTag } from "../../users/users.utils";

export default {
  Mutation: {
    editPhoto: async (_, { photoId, caption }, { loggedInUser }) => {
      try {
        if (!loggedInUser) {
          return {
            ok: false,
            error: "you should log in first",
          };
        }

        const photo = await client.photo.findUnique({
          where: {
            id: photoId,
          },
          include: {
            hashTags: {
              select: {
                text: true,
              },
            },
          },
        });

        if (!photo) {
          return {
            ok: false,
            error: "No photo found",
          };
        }

        if (photo.userId !== loggedInUser.id) {
          return {
            ok: false,
            error: "you are NOT authorized to edit this photo",
          };
        }

        const hashTagObj = parseForHashTag(caption);

        const edited = await client.photo.update({
          where: {
            id: photoId,
          },
          data: {
            caption,
            hashTags: {
              disconnect: photo.hashTags,
              connectOrCreate: hashTagObj,
            },
          },
        });

        if (!edited) {
          return {
            ok: false,
            error: "Failed to update caption",
          };
        }

        return {
          ok: true,
        };
      } catch (error) {
        console.log(error);

        return {
          ok: false,
          error: "Failed to edit a photo",
        };
      }
    },
  },
};
