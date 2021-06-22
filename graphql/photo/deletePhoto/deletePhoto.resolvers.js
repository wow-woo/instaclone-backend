import { PrismaDelete } from "@paljs/plugins";
import client from "../../../prismaClient";
import { protectResolver } from "../../users/users.utils";

const deletePhoto = async (_, { photoId }, { loggedInUser }) => {
  try {
    const photo = await client.photo.findUnique({
      where: { id: photoId },
      select: { userId: true },
    });

    if (!photo)
      return {
        ok: false,
        error: "No photo found",
      };

    if (photo.userId !== loggedInUser.id)
      return {
        ok: false,
        error: "you are Not authorized to delete the photo",
      };

    const prismaDelete = new PrismaDelete(client);
    await prismaDelete.onDelete({
      model: "Photo",
      where: { id: photoId },
      deleteParent: true,
    });

    return {
      ok: true,
    };
  } catch (error) {
    console.log("e ", error);

    return {
      ok: false,
      error: "Failed to delete the photo",
    };
  }
};

export default {
  Mutation: {
    deletePhoto: protectResolver(deletePhoto),
  },
};
