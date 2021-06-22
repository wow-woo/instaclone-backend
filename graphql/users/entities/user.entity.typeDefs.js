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
    photos: [Photo]
    following: [User]
    follower: [User]
    createdAt: String!
    updatedAt: String!

    # computed fields
    totalFollowing: Int
    totalFollower: Int
    isFollowing: Boolean!
    isMe: Boolean!
  }
`;
