import { NEW_MESSAGE } from "../../../constants";
import client from "../../../prismaClient";
import pubsub from "../../../pubsub";
import { protectResolver } from "../../users/users.utils";

const verifyRoom = async (roomId) => {
  if (!roomId) return false;

  try {
    return !!(await client.room.count({
      where: { id: roomId },
    }));
  } catch (error) {
    console.log("e", error);
    return false;
  }
};

const onRoom = async (id, opponentId) => {
  try {
    const { id: myRoom } = await client.room.findFirst({
      where: { users: { some: { id } } },
      select: { id: true },
    });
    const { id: opponentRoom } = await client.room.findFirst({
      where: { users: { some: { id: opponentId } } },
      select: { id: true },
    });

    return myRoom && opponentRoom && myRoom === opponentRoom && myRoom;
  } catch (error) {
    return false;
  }
};

const verifyOpponent = async (opponentId) => {
  try {
    if (!opponentId) return false;

    return !!(await client.user.count({
      where: { id: opponentId },
    }));
  } catch (error) {
    console.log("e", error);
    return false;
  }
};

const createRoom = async (id, opponentId) => {
  try {
    return await client.room.create({
      data: {
        users: {
          connect: [
            {
              id: opponentId,
            },
            {
              id: id,
            },
          ],
        },
      },
    });
  } catch (error) {
    console.log("e", error);

    return false;
  }
};

const sendMessage = async (
  _,
  { payload, roomId, opponentId },
  { loggedInUser: { id } }
) => {
  try {
    let newRoom = false;

    if (!(await verifyRoom(roomId))) {
      if (!(await verifyOpponent(opponentId)))
        return {
          ok: false,
          error: "wrong opponent",
        };

      const onSame = await onRoom(id, opponentId);

      if (onSame) {
        roomId = onSame;
      } else {
        newRoom = await createRoom(id, opponentId);
      }
    }

    const message = await client.message.create({
      data: {
        payload,
        user: {
          connect: {
            id,
          },
        },
        room: {
          connect: {
            id: newRoom ? newRoom.id : roomId,
          },
        },
      },
    });

    pubsub.publish(NEW_MESSAGE, { roomUpdates: { ...message } });

    return {
      ok: true,
      message,
    };
  } catch (error) {
    console.log("e", error);

    return {
      ok: false,
      error: "Failed to send a message",
    };
  }
};

export default {
  Mutation: {
    sendMessage: protectResolver(sendMessage),
  },
};
