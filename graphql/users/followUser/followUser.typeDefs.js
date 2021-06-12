import { gql } from "apollo-server-express";

export default gql`
  type FollowUserResult {
    ok: Boolean!
    error: String
  }

  type Mutation {
    followUser(targetName: String!): FollowUserResult
  }
`;
