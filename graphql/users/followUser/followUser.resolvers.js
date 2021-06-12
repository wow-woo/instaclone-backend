import client from "../../../prismaClient.js";
import { verifyTarget, protectResolver } from "../users.utils.js";

const followUser = async (_, { targetName }, { loggedInUser }) => {
  if (!(await verifyTarget(targetName, loggedInUser))) {
    return {
      ok: false,
      error: "the user that you are trying to follow is NOT correct",
    };
  }

  try {
    await client.user.update({
      where: {
        id: loggedInUser.id,
      },
      data: {
        following: {
          connect: {
            userName: targetName,
          },
        },
      },
    });
  } catch (error) {
    console.log("ee", error);
    return {
      ok: false,
      error: "Failed to follow a user",
    };
  }

  return {
    ok: true,
  };
};

export default {
  Mutation: {
    followUser: protectResolver(followUser),
  },
};
