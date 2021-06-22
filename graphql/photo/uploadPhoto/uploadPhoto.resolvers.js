import client from "../../../prismaClient";
import { parseForHashTag, protectResolver } from "../../users/users.utils";

const uploadPhoto = async (
  _,
  { upload, caption },
  { getUpload, loggedInUser: { id } }
) => {
  try {
    console.log(upload);
    console.log("caption ", caption);
    let hashTagsObj = null;

    if (parseForHashTag(caption)) {
      hashTagsObj = parseForHashTag(caption);
    }

    const imageAddress = await getUpload("photo", upload, id);

    const photo = await client.photo.create({
      data: {
        imageAddress,
        caption,
        user: {
          connect: {
            id,
          },
        },
        ...(hashTagsObj && {
          hashTags: {
            connectOrCreate: hashTagsObj,
          },
        }),
        // : { hashTags: [] }),
      },
    });

    console.log("photo ", photo);

    return {
      ok: true,
      photo,
    };
  } catch (error) {
    console.log("e", error);

    return {
      ok: false,
      error: "Failed to upload photo",
    };
  }
};

export default {
  Mutation: {
    uploadPhoto: protectResolver(uploadPhoto),
  },
};
