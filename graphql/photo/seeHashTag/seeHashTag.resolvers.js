import client from "../../../prismaClient";
import { getNextPage } from "../../users/users.utils";

export default {
  Query: {
    seeHashTag: async (_, { text, afterId }) => {
      try {
        const takeNumber = 5;
        const hashTag = client.hashTag.findUnique({
          where: {
            text,
          },
        });

        if (!(await hashTag)) {
          return {
            ok: false,
            error: "NO hash tag matched",
          };
        }

        const takeAfter = (hashTag, afterId) => {
          return hashTag.photos({
            ...(afterId && { cursor: { id: afterId } }),
            skip: afterId ? 1 : 0,
            take: takeNumber,
          });
        };

        const photos = await takeAfter(hashTag, afterId);

        const has_next_page = await getNextPage(
          takeAfter,
          takeNumber,
          photos,
          hashTag
        );

        return {
          ok: true,
          has_next_page,
          hashTag: {
            photos,
            ...(await hashTag),
          },
        };
      } catch (error) {
        console.log("e ", error);

        return {
          ok: false,
          error: "Failed to retrieve a hash tag",
        };
      }
    },
  },
};
