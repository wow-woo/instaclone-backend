import client from "../../../prismaClient";
import { protectResolver } from "../users.utils";

const seeProfile = async (_, { userName }) => {
  const user = await client.user.findUnique({
    where: { userName },
  });

  return {
    ok: true,
    user,
  };
};

export default {
  Query: {
    seeProfile: protectResolver(seeProfile),
  },
};
