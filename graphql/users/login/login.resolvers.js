import { compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
import client from "../../../prismaClient";

export default {
  Mutation: {
    login: async (_, { userName, password }) => {
      try {
        //find user matching userName
        const user = await client.user.findFirst({
          where: {
            userName,
          },
        });

        if (!user) {
          //throw error
        }

        //compare password
        const match = compareSync(password, user.password);

        if (!match) {
          //throw error
        }

        //generate a token
        const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY);

        return {
          ok: true,
          token,
        };
      } catch (error) {
        return {
          ok: false,
          error,
        };
      }
    },
  },
};
