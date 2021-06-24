import { gql } from "apollo-server-express";

export default gql`
  type SeeRoomResult {
    ok: Boolean!
    error: String
    room: Room
  }

  type Query {
    seeRoom(roomId: Int!): SeeRoomResult!
  }
`;
