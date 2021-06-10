import { hashSync } from "bcrypt";
import client from "../../../prismaClient";

export default {
  Mutation: {
    createAccount: async (
      _,
      { userName, email, firstName, lastName, password, bio, avatar }
    ) => {
      try {
        //check duplication of email, username on DB in order to keep unique
        const isExisted = await client.user.findFirst({
          where: {
            OR: [{ userName }, { email }],
          },
        });

        //handle as duplication detected
        if (isExisted) {
          return {
            ok: false,
            error: "email and username already exists",
          };
        }

        //hash password
        const hashed = hashSync(password, 10);
        console.log("hashed", hashed);

        //save on DB and return created User
        const user = await client.user.create({
          data: {
            userName,
            email,
            firstName,
            lastName,
            bio,
            avatar,
            password: hashed,
          },
        });

        return {
          ok: true,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "Failed to create new account",
        };
      }
    },
  },
};
