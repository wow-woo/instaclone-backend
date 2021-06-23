import client from "../../../prismaClient";
import { AWSUpload } from "../../../shared/aws_s3.utils";
import { parseForHashTag, protectResolver } from "../../users/users.utils";

const uploadPhoto = async (
  _,
  { upload, caption },
  { loggedInUser: { id } }
) => {
  try {
    let hashTagsObj = null;

    if (parseForHashTag(caption)) {
      hashTagsObj = parseForHashTag(caption);
    }

    const imageAddress = await AWSUpload("uploads", upload, id);
    // const imageAddress = await getUpload("photo", upload, id);

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
