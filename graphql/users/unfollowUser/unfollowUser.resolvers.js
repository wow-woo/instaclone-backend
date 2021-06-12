import client from "../../../prismaClient";
import { protectResolver, verifyTarget } from "../users.utils";

const unfollowUser = async (_, { targetName }, { loggedInUser }) => {
  if (!(await verifyTarget(targetName, loggedInUser))) {
    return {
      ok: false,
      error: "the user that you are trying to unfollow is NOT correct",
    };
  }

  try {
    await client.user.update({
      where: {
        id: loggedInUser.id,
      },
      data: {
        following: {
          disconnect: {
            userName: targetName,
          },
        },
      },
    });
  } catch (error) {
    return {
      ok: false,
      error: "Failed to unfollow the user",
    };
  }

  return {
    ok: true,
  };
};

export default {
  Mutation: {
    unfollowUser: protectResolver(unfollowUser),
  },
};
