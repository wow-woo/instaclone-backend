import client from "../../../prismaClient";
import fs from "fs";
import bcrypt from "bcrypt";
import { protectResolver } from "../users.utils";

const hashPw = (pw) => {
  if (!pw) return pw;

  return bcrypt.hashSync(pw, 10);
};

const editProfile = async (
  _,
  { userName, email, firstName, lastName, password, bio, avatar },
  { loggedInUser }
) => {
  const { filename, createReadStream } = await avatar;
  // reading file stream with readStream obj
  const streamReader = createReadStream();
  // save file
  const streamWriter = fs.createWriteStream(
    process.cwd() + "\\uploads\\" + filename
  );
  // pipe file stream
  streamReader.pipe(streamWriter);

  password = hashPw(password);

  try {
    const updatedUser = await client.user.update({
      where: {
        id: loggedInUser.id,
      },
      data: {
        userName,
        email,
        firstName,
        lastName,
        bio,
        avatar: process.cwd() + "\\uploads\\" + filename,
        password,
      },
    });

    if (updatedUser?.id) {
      return {
        ok: true,
      };
    } else {
      return {
        ok: false,
        error: "Could NOT update profile",
      };
    }
  } catch (error) {
    console.log("error", error);
    return {
      ok: false,
      error: "Failed to update",
    };
  }
};

export default {
  Mutation: {
    editProfile: protectResolver(editProfile),
  },
};
