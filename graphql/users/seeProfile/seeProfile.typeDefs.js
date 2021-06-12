import { gql } from "apollo-server-core";

export default gql`
  type seeProfileResult {
    ok: Boolean!
    user: User
    error: String
  }

  type User {
    id: Int!
    userName: String!
    email: String!
    firstName: String!
    lastName: String
    bio: String
    avatar: String
    following: [User]
    follower: [User]
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    seeProfile(userName: String!): seeProfileResult
  }
`;
