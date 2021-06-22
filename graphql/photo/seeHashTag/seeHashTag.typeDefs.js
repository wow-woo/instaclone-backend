import { gql } from "apollo-server-core";

export default gql`
  type SeeHashTagResult {
    ok: Boolean!
    error: String
    hashTag: HashTag
    has_next_page: Boolean
  }

  type Query {
    seeHashTag(text: String!, afterId: Int): SeeHashTagResult!
  }
`;
