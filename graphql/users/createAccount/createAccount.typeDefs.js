import { gql } from "apollo-server-core";

export default gql`
  type CreateAccountResult {
    ok: Boolean!
    error: String
  }

  type Mutation {
    createAccount(
      userName: String!
      email: String!
      firstName: String!
      lastName: String
      bio: String
      avatar: Upload
      password: String!
    ): CreateAccountResult!
  }
`;
