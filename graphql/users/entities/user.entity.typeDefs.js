import { gql } from "apollo-server-express";

export default gql`
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

    # computed fileds
    totalFollowing: Int
    totalFollower: Int
    # isFollowing: Boolean!
    # isMe: Boolean!
  }
`;
