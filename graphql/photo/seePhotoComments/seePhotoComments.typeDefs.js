import { gql } from "apollo-server-express";

export default gql`
  type SeePhotoCommentsResult {
    ok: Boolean
    error: String
    comments: [Comment]
    currentPage: Int!
    nextPage: Boolean!
  }

  type Query {
    seePhotoComments(photoId: Int!, page: Int): SeePhotoCommentsResult!
  }
`;
