import { gql } from "apollo-server-express";

export default gql`
  type seeFollowingResult {
    ok: Boolean!
    error: String
    following: [User]
    has_next_page: Boolean
  }

  type Query {
    seeFollowing(userName: String!, afterId: Int): seeFollowingResult
  }
`;
