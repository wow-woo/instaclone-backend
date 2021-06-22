import client from "../../../prismaClient";
import { protectResolver } from "../../users/users.utils";

const deleteComment = async (_, { commentId }, { loggedInUser }) => {
  try {
    const comment = await client.comment.findUnique({
      where: { id: commentId },
      select: {
        userId: true,
      },
    });

    if (!comment)
      return {
        ok: false,
        error: "No comment found",
      };

    if (comment.userId !== loggedInUser.id)
      return {
        ok: false,
        error: "No authorization to delete the comment",
      };

    await client.comment.delete({
      where: { id: commentId },
    });

    return {
      ok: true,
    };
  } catch (error) {
    console.log("e ", error);

    return {
      ok: false,
      error: "Failed to delete a comment",
    };
  }
};

export default {
  Mutation: {
    deleteComment: protectResolver(deleteComment),
  },
};
