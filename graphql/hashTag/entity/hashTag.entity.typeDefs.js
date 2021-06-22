import { gql } from "apollo-server-express";

export default gql`
  type HashTag {
    id: Int!
    text: String!
    photos: [Photo!]
    totalPhotos: Int!
    createdAt: String
    updatedAt: String
  }
`;
