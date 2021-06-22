import { gql } from "apollo-server-express";

export default gql`
  type deletePhotoResult {
    ok: Boolean!
    error: String
  }

  type Mutation {
    deletePhoto(photoId: Int!): deletePhotoResult!
  }
`;
