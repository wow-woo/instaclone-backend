import { withFilter } from "apollo-server-express";
import { NEW_MESSAGE } from "../../../constants";
import client from "../../../prismaClient";
import pubsub from "../../../pubsub";

const roomUpdates = async (root, args, ctx, info) => {
  if (!ctx?.loggedInUser) throw new Error("please, log in first");

  const room = await client.room.count({
    where: { id: args?.roomId, users: { some: { id: ctx?.loggedInUser?.id } } },
  });

  if (!room) {
    throw new Error("No authorization on the room");
  }

  return withFilter(
    (ddd, args, ctx) => {
      return pubsub.asyncIterator(NEW_MESSAGE);
    },
    ({ roomUpdates: { roomId: id } }, { roomId }, ctx) => {
      return roomId && id && !!id == roomId;
    }
  )(root, args, ctx, info);
};

export default {
  Subscription: {
    roomUpdates: {
      subscribe: roomUpdates,
    },
  },
};
