import jwt from "jsonwebtoken";
import client from "../../prismaClient";

export const getUser = async (token) => {
  let result = null;

  if (!token) return result;

  try {
    const { id } = await jwt.verify(token, process.env.SECRET_KEY);
    const user = await client.user.findUnique({ where: { id } });

    if (user) result = user;
  } catch (error) {
    //error
  }

  return result;
};

export const protectResolver = (resolver) => (root, args, context, info) => {
  if (!context.loggedInUser) {
    return {
      ok: false,
      error: "No Authentication",
    };
  }

  return resolver(root, args, context, info);
};

export const verifyTarget = async (targetName, loggedInUser) => {
  const targetPresent = await client.user.findUnique({
    where: {
      userName: targetName,
    },
  });

  if (!targetPresent) return false;

  return targetPresent.id != loggedInUser.id ? true : false;
};
