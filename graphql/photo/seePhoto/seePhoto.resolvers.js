import client from "../../../prismaClient";

export default {
  Query: {
    seePhoto: async (_, { photoId }, { loggedInUser }) => {
      try {
        const photo = await client.photo.findUnique({
          where: {
            id: photoId,
          },
        });

        return {
          ok: true,
          photo,
        };
      } catch (error) {
        console.log("e ", error);

        return {
          ok: false,
          error,
        };
      }
    },
  },
};
