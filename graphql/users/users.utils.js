import jwt from "jsonwebtoken";
import client from "../../prismaClient";
import fs from "fs";

export const getNextPage = async (
  takeAfter,
  takeNumber,
  current,
  promiseTable
) => {
  if (current.length < takeNumber) return false;

  const nextPage = await takeAfter(promiseTable, current[current.length - 1].id)
    .length;

  if (nextPage.length > 0) {
    return true;
  }
};

export const parseForHashTag = (str) => {
  if (!str) return [];

  const reg = /[＃|#][ㄱ-ㅎ|ㅏ-ㅣ|가-힣|ぁ-んァ-ン|一-龯|\w]+/g;
  return str.match(reg).map((text) => {
    return {
      where: {
        text: text.slice(1, text.length),
      },
      create: { text: text.slice(1, text.length) },
    };
  });
};

export const getUpload = async (type, fileUpload, id) => {
  if (!fileUpload) {
    return undefined;
  }

  const { filename, createReadStream } = await fileUpload;

  const uniqueFileName = type + "_" + id + "_" + Date.now() + "_" + filename;

  // reading file stream with readStream obj
  const streamReader = createReadStream();
  // save file
  const streamWriter = fs.createWriteStream(
    process.cwd() + "\\uploads\\" + uniqueFileName
  );
  // pipe file stream
  streamReader.pipe(streamWriter);

  return "static\\" + uniqueFileName;
};

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
