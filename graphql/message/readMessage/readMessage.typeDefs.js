import { gql } from "apollo-server-express";

export default gql`
  type ReadMessageResult {
    ok: Boolean!
    error: String
  }

  type Mutation {
    readMessage(messageId: Int!): ReadMessageResult!
  }
`;
