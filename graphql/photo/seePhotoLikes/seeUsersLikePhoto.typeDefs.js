import { gql } from "apollo-server-express";

export default gql`
  type seePhotoLikeUser {
    ok: Boolean!
    error: String
    users: [User]
  }

  type Query {
    seeUsersLikePhoto(photoId: Int!): seePhotoLikeUser!
  }
`;
