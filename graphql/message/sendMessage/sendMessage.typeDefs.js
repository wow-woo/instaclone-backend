import { gql } from "apollo-server-express";

export default gql`
  type SendMessageResult {
    ok: Boolean!
    error: String
    message: Message
  }

  type Mutation {
    sendMessage(
      payload: String!
      roomId: Int
      opponentId: Int
    ): SendMessageResult!
  }
`;
