import { gql } from "apollo-server-express";

export default gql`
  type Room {
    id: Int
    users: [User]
    messages: [Message]
    totalUnread: Int
    createdAt: String
    updatedAt: String
  }
`;
