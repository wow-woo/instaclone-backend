import client from "../../../prismaClient";

const verifyKeyword = (keyword) => {
  return keyword.length;
};

export default {
  Query: {
    searchPhotos: async (_, { keyword }, { id }) => {
      try {
        if (!verifyKeyword(keyword)) {
          return {
            ok: false,
            error: "No keyword to look for photos",
          };
        }

        const photos = await client.photo.findMany({
          where: {
            caption: {
              startsWith: keyword,
            },
          },
        });

        return {
          ok: true,
          photos,
        };
      } catch (error) {
        return {
          ok: false,
          error: "Failed to retrieve photos",
        };
      }
    },
  },
};
