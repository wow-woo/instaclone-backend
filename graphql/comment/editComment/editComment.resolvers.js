import client from "../../../prismaClient";
import { protectResolver } from "../../users/users.utils";

const editComment = async (_, { commentId, payload }, { loggedInUser }) => {
  try {
    const comment = await client.comment.findUnique({
      where: { id: commentId },
      select: { userId: true },
    });

    if (!comment)
      return {
        ok: false,
        error: "No comment found",
      };

    if (comment.userId !== loggedInUser.id)
      return {
        ok: false,
        error: "No authorization to edit",
      };

    await client.comment.update({
      where: { id: commentId },
      data: { payload },
    });

    return {
      ok: true,
    };
  } catch (error) {
    return {
      ok: false,
      error: "Failed to edit a comment",
    };
  }
};

export default {
  Mutation: {
    editComment: protectResolver(editComment),
  },
};
