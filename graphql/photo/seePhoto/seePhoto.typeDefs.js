import { gql } from "apollo-server-express";

export default gql`
  type SeePhotoResult {
    ok: Boolean!
    error: String
    photo: Photo
  }

  type Query {
    seePhoto(photoId: Int!): SeePhotoResult
  }
`;
