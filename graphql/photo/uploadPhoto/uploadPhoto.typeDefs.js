import { gql } from "apollo-server-core";

export default gql`
  type uploadPhotoResult {
    ok: Boolean!
    error: String
    photo: Photo
  }

  type Mutation {
    uploadPhoto(upload: Upload!, caption: String): uploadPhotoResult
  }
`;
