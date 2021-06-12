import { gql } from "apollo-server-express";

export default gql`
  type ListUsersResult {
    ok: Boolean!
    error: String
    users: [User]
  }

  type Query {
    listUsers(userName: String!, afterId: Int): ListUsersResult
  }
`;
