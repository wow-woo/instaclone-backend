import { gql } from "apollo-server-express";

export default gql`
  type Photo {
    id: Int!
    imageAddress: String!
    caption: String!
    userId: Int
    user: User!
    hashTags: [HashTag]
    totalLikes: Int
    isMine: Boolean
    totalComments: Int
    createdAt: String!
    updatedAt: String!
  }
`;
