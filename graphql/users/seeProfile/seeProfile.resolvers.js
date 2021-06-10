import client from "../../../prismaClient";
import { protectResolver } from "../users.utils";

const seeProfile = (_, { userName }) => {
  return client.user.findUnique({
    where: { userName },
  });
};

export default {
  Query: {
    seeProfile: protectResolver(seeProfile),
  },
};
