import client from "../../../prismaClient";
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
  console.log("avatar ", avatar);

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
        avatar,
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